import React, { useEffect, useState } from 'react';
import { IonPage, IonImg } from '@ionic/react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import authStore from '../../stores/AuthStore';
import Button from '../../components/commons/button/Button';
import Field from '../../components/commons/field/Field';
import { version } from '../../../package.json';

import './Login.scss';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await authStore.login(email, password);
      if (authStore.isAuthenticated) {
        history.push('/home');
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <IonPage>
      <div className="login-container">
        <div className="login-header">
          <h1>Check!</h1>
          <p>Make your to-do list easily</p>
        </div>
        <IonImg src="/assets/images/todo-list.png" alt="Login" className="login-image" />
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <Field label="Email" value={email} onChange={setEmail} text="email" required />
            <Field label="Password" type="password" value={password} onChange={setPassword} required />
            <Button className='login-button' type="submit" text="LogIn" expand="block" fill="solid" />
          </form>
          <Button className='register-button' text="Register" onClick={handleRegister} expand="block" fill="outline" />
        </div>
        <div className='app-version'>
          Versi {version}
          <p>&copy; {new Date().getFullYear()} pipigendut. All rights reserved.</p>
        </div>
      </div>
    </IonPage>
  );
};

export default observer(Login);