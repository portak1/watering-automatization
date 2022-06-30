import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonItem,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonRouterOutlet,
  IonTabs,
  IonTab,
  IonTabButton,
  IonLabel,
  IonTabBar,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { water, logOut, home, calendar, cog } from 'ionicons/icons';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import { UserStorage } from '../../providers/local-providers/UserStorage';
import './Home.css';
import { UserManager } from '../../providers/local-providers/UserManager';
import Sections from '../Sections/Sections';
const Home: React.FC = () => {
  const userStorage = new UserStorage();
  const userManager = new UserManager();
  const history = useHistory();

  if (userStorage.getUsertoken() == '') {
    return <Redirect to='/login' />;
  }

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/sections'>
            <Sections />
          </Route>
          <Route exact path='/home'>
            <Redirect to='/sections' />;
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton href='/sections' tab='sections'>
            <IonLabel>Domů</IonLabel>
            <IonIcon icon={home}></IonIcon>
          </IonTabButton>

          <IonTabButton>
            <IonLabel>Kalendář</IonLabel>
            <IonIcon icon={calendar}></IonIcon>
          </IonTabButton>

          <IonTabButton>
            <IonLabel>Programy</IonLabel>
            <IonIcon icon={cog}></IonIcon>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default Home;
