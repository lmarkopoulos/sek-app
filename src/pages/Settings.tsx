import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Ρυθμίσεις</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <p>Περισσότερες ρυθμίσεις θα προστεθούν αργότερα (π.χ. αλλαγή στοιχείων, γλώσσα).</p>
      </IonContent>
    </IonPage>
  );
};
export default Settings;
