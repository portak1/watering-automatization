import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonMenuButton,
  IonItem,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonRouterLink,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { water, logOut } from 'ionicons/icons';
import { Redirect } from 'react-router';

import { UserStorage } from '../../providers/local-providers/UserStorage';
import './Sections.css';
import { UserManager } from '../../providers/local-providers/UserManager';
import { APISectionProvider } from '../../providers/API-providers/api-section-provider';
import { useState, useEffect } from 'react';
const Sections: React.FC = () => {
  const userStorage = new UserStorage();
  const userManager = new UserManager();
  const history = useHistory();
  const apiSectionProvider = new APISectionProvider();
  const [sections, setSections] = useState();

  useEffect(() => {
    apiSectionProvider
      .fetchSections(userStorage.getUserId() as number)
      .then((data) => data.json())
      .then((data) => {
        console.log(data.result);
        setSections(
          data.result.map((values: any, key: number) => {
            var sectionLink = '/section?id=' + values.id;
            return (
              <IonCard key={key} class='section-card'>
                <IonCardHeader>
                  <IonGrid>
                    <IonRow>
                      <IonCol class='ion-text-center' size='8'>
                        <IonCardTitle>{values.name}</IonCardTitle>
                        <IonCardSubtitle>
                          {values.active ? 'aktivní' : 'neaktivní'}
                        </IonCardSubtitle>
                      </IonCol>
                      <IonCol class='ion-text-center' size='4'>
                        <IonCardTitle>{values.watering_time}</IonCardTitle>
                        <a href={sectionLink}>změnit</a>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardHeader>
              </IonCard>
            );
          })
        );
      });
  }, []);

  if (userStorage.getUsertoken() == '') {
    return <Redirect to='/login' />;
  }

  const logOutfc = () => {
    userManager.logout();
    history.replace('/login');
  };

  return (
    <>
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
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot='start'></IonMenuButton>
            <IonTitle>Domů</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id='menuContent'>{sections}</IonContent>
      </IonPage>
    </>
  );
};

export default Sections;
