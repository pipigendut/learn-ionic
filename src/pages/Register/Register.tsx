import React, { useState } from 'react';
import { IonPage, IonImg } from '@ionic/react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import authStore from '../../stores/AuthStore';
import Button from '../../components/commons/button/Button';
import Field from '../../components/commons/field/Field';
import './Register.scss';

const Register: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await authStore.register(email, password);
      if (authStore.isAuthenticated) {
        history.push('/home');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to register');
    }
  };

  const handleLoginRedirect = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <div className="register-container">
        <div className="register-header">
          <h1>Registration Form</h1>
        </div>
        <IonImg src="/assets/images/in_person_registration.svg" alt="Login" className="register-image" />
        <div className="register-form">
          <form onSubmit={handleRegister}>
            <Field label="Email" value={email} onChange={setEmail} type="email" required />
            <Field label="Password" value={password} onChange={setPassword} type="password" required />
            <Field label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} type="password" required />
            {error && <p className="error-message">{error}</p>}
            <Button className='register-button' text="Register" type="submit" expand="block" fill="solid" />
          </form>
          <Button className='back-button' text="Back to Login" onClick={handleLoginRedirect} expand="block" fill="outline" />
        </div>
      </div>
    </IonPage>
  );
};

export default observer(Register);