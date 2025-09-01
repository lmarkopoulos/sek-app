import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { wcProductLink } from '../api';

// Βάλτε εδώ το product_id της συνδρομής από WooCommerce
const DEFAULT_PRODUCT_ID = 68;

const Payments: React.FC = () => {
  const [productId, setProductId] = useState(String(DEFAULT_PRODUCT_ID));
  const [msg, setMsg] = useState('');

  async function openCheckout() {
    setMsg('');
    const pid = parseInt(productId, 10); if (!pid) { setMsg('Μη έγκυρο product id'); return; }
    try {
      const r:any = await wcProductLink(pid);
      if (r.url) {
        await Browser.open({ url: r.url });
      } else setMsg('Δεν βρέθηκε link προϊόντος.');
    } catch (e:any) { setMsg(e.message || 'Σφάλμα φόρτωσης.'); }
  }

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Πληρωμή Συνδρομής</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">WooCommerce Product ID</IonLabel>
          <IonInput value={productId} onIonChange={e => setProductId(e.detail.value!)} />
        </IonItem>
        <IonButton expand="block" onClick={openCheckout} style={{marginTop:12}}>Μετάβαση σε Checkout</IonButton>
        {msg && <IonText color="medium"><p>{msg}</p></IonText>}
      </IonContent>
    </IonPage>
  );
};
export default Payments;
