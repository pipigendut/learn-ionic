import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonButtons,
  IonText,
  IonModal,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { trash, create, add } from 'ionicons/icons';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/AuthStore';
import './ToDoList.scss';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoList: React.FC = observer(() => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('incomplete');
  const [showModal, setShowModal] = useState<boolean>(false);

  const todos = authStore.profile.todos || [];

  const handleAddOrUpdateTodo = async () => {
    if (newTodo.trim() === '') return;

    const newTodoItem: Todo = {
      id: isEditing && editingId ? editingId : Date.now(),
      text: newTodo,
      completed: false,
    };

    await authStore.addOrUpdateTodo(newTodoItem);

    setIsEditing(false);
    setEditingId(null);
    setNewTodo('');
    setShowModal(false);
  };

  const handleDeleteTodo = async (id: number) => {
    await authStore.deleteTodo(id);
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todos.find((todo: Todo) => todo.id === id);
    if (todoToEdit) {
      setNewTodo(todoToEdit.text);
      setIsEditing(true);
      setEditingId(id);
      setShowModal(true);
    }
  };

  const handleToggleComplete = async (id: number) => {
    await authStore.toggleComplete(id);
  };

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'incomplete') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const completedCount = todos.filter((todo: Todo) => todo.completed).length;

  return (
    <IonContent className="ion-padding">
      <section className="todohero_section">
        <div>
          <p className="text_large">Task Done</p>
          <p className="text_small">Keep it up</p>
        </div>
        <div>
          <IonText color="primary" className="completed-text">
            {completedCount}/{todos.length}
          </IonText>
        </div>
      </section>
      <div className="header-info">
        <IonSegment
          value={filter}
          onIonChange={e => setFilter(e.detail.value as 'all' | 'completed' | 'incomplete')}
        >
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="incomplete">
            <IonLabel>Todo</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="completed">
            <IonLabel>Completed</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      <IonList>
        {filteredTodos.map((todo: Todo) => (
          <IonItem key={todo.id} className="todo-item">
            <IonCheckbox
              slot="start"
              checked={todo.completed}
              onIonChange={() => handleToggleComplete(todo.id)}
            />
            <IonLabel className={todo.completed ? 'completed' : ''}>{todo.text}</IonLabel>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={() => handleEditTodo(todo.id)}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton fill="clear" onClick={() => handleDeleteTodo(todo.id)}>
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </IonButtons>
          </IonItem>
        ))}
      </IonList>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={() => setShowModal(true)}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              value={newTodo}
              placeholder="Enter task"
              onIonChange={e => setNewTodo(e.detail.value!)}
              onIonInput={e => setNewTodo(e.detail.value!)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  handleAddOrUpdateTodo();
                }
              }}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleAddOrUpdateTodo}>
            {isEditing ? 'Update' : 'Add'}
          </IonButton>
        </IonContent>
      </IonModal>
    </IonContent>
  );
});

export default ToDoList;