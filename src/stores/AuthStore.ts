import { makeAutoObservable } from 'mobx';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { saveProfile } from '../services/ProfileService';
import storageService from '../services/StorageService';

class AuthStore {
  user: any = {};
  isLoading: boolean = true;
  error: string | null = null;
  profile: any = { todos: [] };  // Initialize with an empty todos array

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      this.user = userCredential.user;
    } catch (error: any) {
      console.error("Login error", error);
      this.error = error.message || 'Failed to log in';
      this.user = {};
    } finally {
      this.isLoading = false;
    }
  }

  async register(email: string, password: string) {
    this.isLoading = true;
    this.error = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await saveProfile(userCredential.user.uid, { username: email });
      this.user = userCredential.user;
    } catch (error: any) {
      console.error('Registration error:', error);
      this.error = error.message || 'Failed to register';
      this.user = {};
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.isLoading = true;
    this.error = null;
    try {
      await signOut(auth);
      this.user = {};
      this.profile = { todos: [] };
    } catch (error: any) {
      console.error("Logout error", error);
      this.error = error.message || 'Failed to log out';
    } finally {
      this.isLoading = false;
    }
  }

  checkAuth() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        await this.getProfile();
      } else {
        this.user = {};
        this.profile = { todos: [] };
      }
      this.isLoading = false;
    });
  }

  async getProfile() {
    if (this.user?.uid) {
      try {
        this.profile = await storageService.getItem(this.user.uid) || { todos: [] };
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        this.error = error.message || 'Failed to fetch profile';
      }
    }
  }

  async setProfile(profile: any) {
    if (this.user?.uid) {
      try {
        await storageService.setItem(this.user.uid, profile);
        this.profile = profile;
      } catch (error: any) {
        console.error('Error saving profile:', error);
        this.error = error.message || 'Failed to save profile';
      }
    }
  }

  async addOrUpdateTodo(newTodo: any) {
    const todos = [...this.profile.todos||[]];
    const existingTodoIndex = todos.findIndex(todo => todo.id === newTodo.id);

    if (existingTodoIndex >= 0) {
      todos[existingTodoIndex] = newTodo;
    } else {
      todos.push(newTodo);
    }

    const updatedProfile = { ...this.profile, todos };
    await this.setProfile(updatedProfile);
  }

  async deleteTodo(id: number) {
    const todos = this.profile.todos.filter((todo: any) => todo.id !== id);
    const updatedProfile = { ...this.profile, todos };
    await this.setProfile(updatedProfile);
  }

  async toggleComplete(id: number) {
    const todos = this.profile.todos.map((todo: any) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const updatedProfile = { ...this.profile, todos };
    await this.setProfile(updatedProfile);
  }

  setError(errorMessage: string) {
    this.error = errorMessage;
  }

  get isAuthenticated() {
    return !!this.user?.uid;
  }
}

const authStore = new AuthStore();
export default authStore;