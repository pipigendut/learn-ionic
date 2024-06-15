import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';
import './Field.scss'; // Import stylesheet for the field component

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  [key: string]: any; // Allow any other props
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, ...restProps }) => {
  return (
    <div className="custom-field">
      <IonItem className="custom-input">
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput
          value={value}
          onIonInput={(e) => onChange(e.detail.value!)}
          onIonChange={(e) => onChange(e.detail.value!)}
          {...restProps} // Spread all other props to IonInput
        />
      </IonItem>
    </div>
  );
};

export default Field;