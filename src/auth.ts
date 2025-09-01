import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'sek_token';

export async function setToken(token: string) {
  await Preferences.set({ key: TOKEN_KEY, value: token });
}
export async function getToken() {
  const r = await Preferences.get({ key: TOKEN_KEY }); return r.value;
}
export async function clearToken() {
  await Preferences.remove({ key: TOKEN_KEY });
}
