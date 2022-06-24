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
  useIonToast,
} from '@ionic/react';
import { qrCodeOutline } from 'ionicons/icons';
import { useState, useRef } from 'react';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router';
import logo from '../../assets/photos/logo-real.png';
import { UserManager } from '../../providers/local-providers/UserManager';
import { UserStorage } from '../../providers/local-providers/UserStorage';
import './Login.css';

const Login: React.FC = () => {
  const userManager = new UserManager();
  const userStorage = new UserStorage();
  const history = useHistory();
  const passedValueRef = useRef<HTMLIonInputElement>(null);
  passedValueRef?.current?.focus();
  const [password, setPassword] = useState<string>('');
  const [present, dismiss] = useIonToast();

  if (userStorage.getUsertoken() != '') {
    return <Redirect to='/home' />;
  }

  const login = () => {
    if (
      passedValueRef?.current?.value != '' &&
      passedValueRef?.current?.value != null
    ) {
      userManager
        .login(passedValueRef?.current?.value as string)
        .then((data) => {
          if (data) {
            //redirect to /home
            history.push('/home');
          } else {
            present({
              buttons: [{ text: 'zavřít', handler: () => dismiss() }],
              message: 'Špatné párovací údaje',
            });
          }
        });
    } else {
      present({
        buttons: [{ text: 'zavřít', handler: () => dismiss() }],
        message: 'Zadejte prosím párovací číslo',
      });
    }
  };

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
              <h1>Zavlažovací systém </h1>
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
              <IonLabel position='floating'>Zadejte párovací heslo</IonLabel>
              <IonInput
                ref={passedValueRef}
                type='text'
                value={password}
                clearInput
                required
              ></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class='ion-text-center'>
            <IonButton onClick={() => login()}>Přihlásit se</IonButton>
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
