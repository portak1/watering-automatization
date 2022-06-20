import {
  IonPage,
  IonContent,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons';
import { useState } from 'react';

import logo from '../../assets/photos/logo-real.png';
import './Login.css';

async function login(): Promise<void> {}

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  return (
    <IonPage id='login-page'>
      <IonContent fullscreen>
        <IonRow>
          <IonCol>
            <IonImg id='logo' src={logo} alt='logo' />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class='ion-text-center'>
            <IonText color={'secondary'}>
              <h1>zavlažovací systém </h1>
            </IonText>
            <IonText color={'primary'}>
              <h1>
                <b>PORT</b>
              </h1>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size='12'>
            <IonItem id='pass-input'>
              <IonLabel position='floating'>zadejte heslo</IonLabel>
              <IonInput value={password} clearInput required></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class='ion-text-center'>
            <IonButton>Přihlásit se</IonButton>
          </IonCol>
          <IonCol class='ion-text-center'>
            <IonButton>
              <IonIcon icon={qrCodeOutline} />
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
