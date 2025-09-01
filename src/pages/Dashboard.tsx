import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { getMe } from '../api';
import { clearToken } from '../auth';

const Dashboard: React.FC = () => {
  const [me, setMe] = useState<any>(null);

  useEffect(() => { (async () => {
    try { const r:any = await getMe(); setMe(r); } catch {}
  })(); }, []);

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Πίνακας</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="card-elevated">
          <IonCardHeader><IonCardTitle>Λογαριασμός</IonCardTitle></IonCardHeader>
          <IonCardContent>
            {me && (
              <IonList>
                <IonItem><IonLabel>Όνομα</IonLabel><IonLabel slot="end">{me.name}</IonLabel></IonItem>
                <IonItem><IonLabel>Επωνυμία</IonLabel><IonLabel slot="end">{me.business || '-'}</IonLabel></IonItem>
                <IonItem><IonLabel>Κινητό</IonLabel><IonLabel slot="end">{me.phone}</IonLabel></IonItem>
                <IonItem><IonLabel>Email</IonLabel><IonLabel slot="end">{me.email}</IonLabel></IonItem>
                <IonItem><IonLabel>Κινητό επαληθευμένο</IonLabel><IonLabel slot="end">{me.phone_verified ? 'Ναι' : 'Όχι'}</IonLabel></IonItem>
              </IonList>
            )}
            <div style={{display:'flex', gap:8, marginTop:12}}>
              <IonButton href="/voting" disabled={!me?.phone_verified} expand="block">Τρέχουσες ψηφοφορίες</IonButton>
              <IonButton href="/payments" fill="outline" expand="block">Πληρωμή συνδρομής</IonButton>
            </div>
            <IonButton color="medium" expand="block" style={{marginTop:12}} onClick={async () => { await clearToken(); window.location.href='/'; }}>Αποσύνδεση</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Dashboard;
