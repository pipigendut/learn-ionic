import React from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ToDoList from '../../components/templates/ToDoList';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home Page</IonTitle>
      </IonToolbar>
    </IonHeader>
    <ToDoList/>
  </IonPage>
);

export default Home;