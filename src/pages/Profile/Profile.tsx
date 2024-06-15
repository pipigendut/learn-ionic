import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonButton, IonAvatar, IonImg, IonSpinner } from '@ionic/react';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/AuthStore';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import './Profile.scss';

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePhotoUpload = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt // Allows the user to choose between camera and gallery
      });
  
      const photoDataUrl = image.dataUrl!;
      authStore.setProfile({photo: photoDataUrl});
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await authStore.logout();
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="profile-container">
        <IonAvatar className="profile-avatar">
          {authStore.profile.photo ? <IonImg src={authStore.profile.photo} /> : <IonImg src="/assets/images/default-avatar.png" />}
        </IonAvatar>
        <IonButton onClick={handlePhotoUpload}>Upload Photo</IonButton>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={authStore.user.email} disabled />
        </IonItem>
        <IonButton className="logout-button" onClick={handleLogout} expand="block" fill="outline">
          {loading ? <IonSpinner name="crescent" /> : 'Logout'}
        </IonButton>
      </div>
    </IonPage>
  );
};

export default observer(Profile);