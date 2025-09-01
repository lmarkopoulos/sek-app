import { Capacitor } from '@capacitor/core';
import { getToken } from './auth';

const PLATFORM = Capacitor.getPlatform(); // 'web' | 'android' | 'ios'

// .env.local (dev):
// VITE_API_BASE=http://sek.local/wp-json/sek/v1
// VITE_API_BASE_ANDROID=http://10.0.2.2/wp-json/sek/v1  (αν LocalWP ακούει στην 80)
// ή http://10.0.2.2:8080/wp-json/sek/v1
const BASES: Record<string,string> = {
  web:      import.meta.env.VITE_API_BASE         ?? 'http://sek.local/wp-json/sek/v1',
  android:  import.meta.env.VITE_API_BASE_ANDROID ?? 'http://10.0.2.2/wp-json/sek/v1',
  ios:      import.meta.env.VITE_API_BASE_IOS     ?? 'http://sek.local/wp-json/sek/v1',
};
export const API_BASE = BASES[PLATFORM] || BASES.web;

async function api<T = any>(endpoint: string, options: RequestInit = {}, timeoutMs = 15000): Promise<T> {
  const token = await getToken();
  const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    });
    if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
    const txt = await res.text();
    return (txt ? JSON.parse(txt) : {}) as T;
  } finally { clearTimeout(t); }
}

// === Auth / Registration ===
export const registerMember = (p: {name:string; surname:string; business:string; phone:string; email:string}) =>
  api('/register', { method: 'POST', body: JSON.stringify(p) });

export const verifyPhone = (p: { phone:string; code:string }) =>
  api('/verify-phone', { method: 'POST', body: JSON.stringify(p) });

export const verifyEmail = (p: { email:string; code:string }) =>
  api('/verify-email', { method: 'POST', body: JSON.stringify(p) });

export const requestLoginCode = (p: { email?:string; phone?:string }) =>
  api('/login/request', { method: 'POST', body: JSON.stringify(p) });

export const verifyLoginCode = (p: { email?:string; phone?:string; code:string }) =>
  api('/login/verify', { method: 'POST', body: JSON.stringify(p) });

// === Member / News / Voting ===
export const getMe   = () => api('/members/me');
export const updateMe= (payload: any) => api('/members/update', { method: 'POST', body: JSON.stringify(payload) });
export const getNews = () => api('/news');
export const getPolls= () => api('/polls');
export const sendVote= (pollId:number, optionId:number) =>
  api('/vote', { method: 'POST', body: JSON.stringify({ pollId, optionId }) });

// === WooCommerce (open URL in in-app browser) ===
export const wcProductLink = (product_id:number) => api(`/wc/product?product_id=${product_id}`);
