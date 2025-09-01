import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonButton, IonText } from '@ionic/react';
import { getPolls, sendVote } from '../api';

type Poll = { id:number; question:string; options:{id:number;text:string;votes?:number}[] };

const Voting: React.FC = () => {
  const [canVote, setCanVote] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [sel, setSel] = useState<Record<number, number>>({});
  const [msg, setMsg] = useState('');

  useEffect(() => { (async () => {
    try { const r:any = await getPolls(); setCanVote(!!r.can_vote); setPolls(r.polls||[]); }
    catch (e:any) { setMsg('Αδυναμία φόρτωσης ψηφοφοριών.'); }
  })(); }, []);

  async function vote(pollId:number) {
    if (!canVote) { setMsg('Απαιτείται επαλήθευση κινητού.'); return; }
    const optionId = sel[pollId]; if (!optionId) { setMsg('Επιλέξτε επιλογή.'); return; }
    setMsg('Αποστολή...');
    try { await sendVote(pollId, optionId); setMsg('Η ψήφος καταχωρήθηκε.'); }
    catch (e:any) { setMsg(e.message || 'Σφάλμα υποβολής.'); }
  }

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonTitle>Ψηφοφορία</IonTitle></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
        {!canVote && <IonText color="warning"><p>Για να ψηφίσετε, επαληθεύστε πρώτα το κινητό σας.</p></IonText>}
        {polls.map(p => (
          <div key={p.id} style={{marginBottom:24}}>
            <h3>{p.question}</h3>
            <IonRadioGroup value={sel[p.id] || undefined} onIonChange={e => setSel(s => ({ ...s, [p.id]: e.detail.value }))}>
              <IonList>
                {p.options.map(o => (
                  <IonItem key={o.id}>
                    <IonLabel>{o.text}</IonLabel>
                    <IonRadio slot="end" value={o.id} />
                  </IonItem>
                ))}
              </IonList>
            </IonRadioGroup>
            <IonButton onClick={() => vote(p.id)} disabled={!canVote}>Υποβολή</IonButton>
          </div>
        ))}
        {msg && <p>{msg}</p>}
      </IonContent>
    </IonPage>
  );
};
export default Voting;
