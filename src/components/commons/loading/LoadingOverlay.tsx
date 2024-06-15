import React from 'react';
import { IonSpinner } from '@ionic/react';
import './LoadingOverlay.scss';

interface LoadingOverlayProps {
  show: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <IonSpinner name="lines" color="warning" />
    </div>
  );
};

export default LoadingOverlay;