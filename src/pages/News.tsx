import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import { getNews } from '../api';

type NewsItem = { id:number; title:string; excerpt:string; date:string; link:string };

const News: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => { (async () => {
    try {
      const r:any = await getNews(); setItems(r.items || []);
    } catch (e:any) { setMsg('Σφάλμα φόρτωσης ειδήσεων.'); }
  })(); }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>Ιδιωτικά Νέα</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{display:'flex', gap:8, marginBottom:12}}>
          <IonButton href="/login" color="primary" expand="block">Είσοδος</IonButton>
          <IonButton href="/register" color="primary" fill="outline" expand="block">Εγγραφή</IonButton>
        </div>
        {msg && <p>{msg}</p>}
        {items.map(n => (
          <IonCard key={n.id} button onClick={() => window.open(n.link, '_blank')} className="card-elevated">
            <IonCardHeader><IonCardTitle>{n.title}</IonCardTitle></IonCardHeader>
            <IonCardContent>
              <div dangerouslySetInnerHTML={{ __html: n.excerpt }} />
              <small>{new Date(n.date).toLocaleString()}</small>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};
export default News;
