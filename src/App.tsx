import React, { useEffect, useState } from 'react';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { homeOutline, checkboxOutline, newspaperOutline, cardOutline, settingsOutline } from 'ionicons/icons';
import { getToken, clearToken } from './auth';

import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Voting from './pages/Voting';
import Payments from './pages/Payments';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => { (async () => setAuthed(!!(await getToken())))(); }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {!authed ? (
          <IonRouterOutlet>
            <Route path="/" exact component={News} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route render={() => <Redirect to="/" />} />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/voting" exact component={Voting} />
              <Route path="/news" exact component={News} />
              <Route path="/payments" exact component={Payments} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon icon={homeOutline} /><IonLabel>Πίνακας</IonLabel>
              </IonTabButton>
              <IonTabButton tab="voting" href="/voting">
                <IonIcon icon={checkboxOutline} /><IonLabel>Ψηφοφορία</IonLabel>
              </IonTabButton>
              <IonTabButton tab="news" href="/news">
                <IonIcon icon={newspaperOutline} /><IonLabel>Νέα</IonLabel>
              </IonTabButton>
              <IonTabButton tab="payments" href="/payments">
                <IonIcon icon={cardOutline} /><IonLabel>Συνδρομή</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings" onClick={() => {/* keep */}}>
                <IonIcon icon={settingsOutline} /><IonLabel>Ρυθμίσεις</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
