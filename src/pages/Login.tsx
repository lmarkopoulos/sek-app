import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/react';
import { requestLoginCode, verifyLoginCode } from '../api';
import { setToken } from '../auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState(''); const [phone, setPhone] = useState('');
  const [code, setCode] = useState(''); const [sent, setSent] = useState(false); const [msg, setMsg] = useState('');

  async function send() {
    setMsg('');
    if (!email && !phone) { setMsg('Συμπληρώστε email ή κινητό.'); return; }
    try {
      const r:any = await requestLoginCode({ email: email || undefined, phone: phone || undefined });
      setSent(true);
      setMsg(r.dev_code ? `Στάλθηκε κωδικός (dev: ${r.dev_code}).` : 'Στάλθηκε κωδικός.');
    } catch (e:any) { setMsg(e.message || 'Αποτυχία αποστολής.'); }
  }
  async function verify() {
    setMsg('');
    if (!code.trim()) { setMsg('Πληκτρολογήστε τον κωδικό.'); return; }
    try {
      const r:any = await verifyLoginCode({ email: email || undefined, phone: phone || undefined, code: code.trim() });
      if (r.token) { await setToken(r.token); window.location.href = '/dashboard'; }
    } catch (e:any) { setMsg(e.message || 'Λάθος κωδικός.'); }
  }

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Είσοδος</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem><IonLabel position="stacked">Email (ή)</IonLabel><IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} /></IonItem>
          <IonItem><IonLabel position="stacked">Κινητό</IonLabel><IonInput inputmode="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} /></IonItem>
        </IonList>
        {!sent ? (
          <IonButton expand="block" onClick={send} style={{marginTop:12}}>Αποστολή κωδικού</IonButton>
        ) : (
          <>
            <IonItem style={{marginTop:12}}><IonLabel position="stacked">Κωδικός</IonLabel><IonInput value={code} onIonChange={e => setCode(e.detail.value!)} /></IonItem>
            <IonButton expand="block" onClick={verify} style={{marginTop:12}}>Σύνδεση</IonButton>
          </>
        )}
        {msg && <IonText color="medium"><p style={{marginTop:12}}>{msg}</p></IonText>}
        <p style={{marginTop:12}}>Νέος χρήστης; <a href="/register">Εγγραφή</a></p>
      </IonContent>
    </IonPage>
  );
};
export default Login;
