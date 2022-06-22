import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonRouterOutlet,
  IonMenuButton,
  IonItem,
  IonList,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { water, logOut } from 'ionicons/icons';

import { UserStorage } from '../../providers/local-providers/UserStorage';

import './Home.css';
import { UserManager } from '../../providers/local-providers/UserManager';

const Home: React.FC = () => {
  const userStorage = new UserStorage();
  const userManager = new UserManager();
  const history = useHistory();

  if (userStorage.getUsertoken() == '') {
    history.push('/login');
  }

  const logOutfc = () => {
    userManager.logout();
    history.replace('/login');
  };

  return (
    <>
      <IonPage>
        <IonMenu side='start' menuId='menu' contentId='menuContent'>
          <IonHeader>
            <IonToolbar color='secondary'>
              <IonTitle>
                <IonIcon class='water-icon' color='primary' icon={water} />
                PORT
                <IonIcon class='water-icon' color='primary' icon={water} />
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem onClick={() => logOutfc()} class='ion-align-items-end'>
                <IonGrid>
                  <IonRow>
                    <IonCol size='9'>
                      <IonText class='log-out'>Odhlásit se</IonText>
                    </IonCol>
                    <IonCol size='2'>
                      <IonIcon icon={logOut} size='large' />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot='start'></IonMenuButton>
            <IonTitle>Domů</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id='menuContent'></IonContent>
      </IonPage>
    </>
  );
};

export default Home;
