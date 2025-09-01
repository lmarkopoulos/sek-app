import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonText } from '@ionic/react';
import { registerMember, verifyPhone, verifyEmail } from '../api';
import { setToken } from '../auth';

const Register: React.FC = () => {
  const [step, setStep] = useState<'form'|'phone'|'email'>('form');
  const [name, setName] = useState(''); const [surname, setSurname] = useState('');
  const [business, setBusiness] = useState(''); const [phone, setPhone] = useState(''); const [email, setEmail] = useState('');
  const [codePhone, setCodePhone] = useState(''); const [codeEmail, setCodeEmail] = useState('');
  const [msg, setMsg] = useState('');

  async function submitForm() {
    setMsg('');
    if (!name || !surname || !business || !phone || !email) { setMsg('Συμπληρώστε όλα τα πεδία.'); return; }
    try {
      const r:any = await registerMember({ name, surname, business, phone, email });
      if (r.ok) setStep('phone');
    } catch (e:any) { setMsg(e.message || 'Αποτυχία εγγραφής.'); }
  }

  async function submitPhone() {
    setMsg('');
    if (!codePhone.trim()) { setMsg('Πληκτρολογήστε τον κωδικό SMS.'); return; }
    try {
      const r:any = await verifyPhone({ phone, code: codePhone.trim() });
      if (r.ok) { setMsg('Το κινητό επαληθεύτηκε. Ελέγξτε το email σας.'); setStep('email'); }
    } catch (e:any) { setMsg(e.message || 'Λάθος κωδικός κινητού.'); }
  }

  async function submitEmail() {
    setMsg('');
    if (!codeEmail.trim()) { setMsg('Πληκτρολογήστε τον κωδικό email.'); return; }
    try {
      const r:any = await verifyEmail({ email, code: codeEmail.trim() });
      if (r.token) { await setToken(r.token); window.location.href = '/dashboard'; }
    } catch (e:any) { setMsg(e.message || 'Λάθος κωδικός email.'); }
  }

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Εγγραφή</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        {step === 'form' && (<>
          <IonList>
            <IonItem><IonLabel position="stacked">Όνομα</IonLabel><IonInput value={name} onIonChange={e => setName(e.detail.value!)} /></IonItem>
            <IonItem><IonLabel position="stacked">Επώνυμο</IonLabel><IonInput value={surname} onIonChange={e => setSurname(e.detail.value!)} /></IonItem>
            <IonItem><IonLabel position="stacked">Επωνυμία</IonLabel><IonInput value={business} onIonChange={e => setBusiness(e.detail.value!)} /></IonItem>
            <IonItem><IonLabel position="stacked">Κινητό</IonLabel><IonInput inputmode="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} /></IonItem>
            <IonItem><IonLabel position="stacked">Email</IonLabel><IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} /></IonItem>
          </IonList>
          <IonButton expand="block" onClick={submitForm} style={{marginTop:12}}>Συνέχεια</IonButton>
          <p style={{marginTop:12}}>Έχετε λογαριασμό; <a href="/login">Είσοδος</a></p>
        </>)}

        {step === 'phone' && (<>
          <p>Σας στείλαμε SMS στο {phone}. Εισάγετε τον κωδικό επαλήθευσης.</p>
          <IonItem><IonLabel position="stacked">Κωδικός SMS</IonLabel><IonInput value={codePhone} onIonChange={e => setCodePhone(e.detail.value!)} /></IonItem>
          <IonButton expand="block" onClick={submitPhone} style={{marginTop:12}}>Επαλήθευση κινητού</IonButton>
        </>)}

        {step === 'email' && (<>
          <p>Ελέγξτε το email σας ({email}) και εισάγετε τον κωδικό.</p>
          <IonItem><IonLabel position="stacked">Κωδικός Email</IonLabel><IonInput value={codeEmail} onIonChange={e => setCodeEmail(e.detail.value!)} /></IonItem>
          <IonButton expand="block" onClick={submitEmail} style={{marginTop:12}}>Ολοκλήρωση</IonButton>
        </>)}

        {msg && <IonText color="medium"><p style={{marginTop:12}}>{msg}</p></IonText>}
      </IonContent>
    </IonPage>
  );
};
export default Register;
