

import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonToast
} from '@ionic/react';
import { observer } from 'mobx-react-lite';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import authStore from './stores/AuthStore';
import LoadingOverlay from './components/commons/loading/LoadingOverlay';
import NavigationBar from './components/templates/NavigationBar';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  if (authStore.isLoading) return <LoadingOverlay show={authStore.isLoading} />;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route path="/register" render={() => (
              authStore.isAuthenticated ? <Redirect to="/home" /> : <Register />
            )} />
            <Route path="/login" render={() => (
              authStore.isAuthenticated ? <Redirect to="/home" /> : <Login />
            )} />
            <Route exact path="/" render={() => (
              authStore.isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/login" />
            )} />
            <NavigationBar />
          </Switch>
        </IonRouterOutlet>
        <IonToast
              isOpen={!!authStore?.error}
              message={authStore?.error || ''}
              onDidDismiss={() => {authStore.setError('')}}
              duration={3000}
        ></IonToast>
      </IonReactRouter>
    </IonApp>
  );
};

export default observer(App);
