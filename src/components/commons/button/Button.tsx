import React from 'react';
import { IonButton } from '@ionic/react';
import './Button.scss';

interface ButtonProps extends Omit<React.ComponentProps<typeof IonButton>, 'onClick'> {
  text: string;
  onClick?: () => void; // Make onClick optional
}

const Button: React.FC<ButtonProps> = ({ text, color='primary', onClick, ...restProps }) => {
  return (
    <IonButton id="custom-button" color={color} {...restProps} onClick={onClick}>
      {text}
    </IonButton>
  );
};

export default Button;