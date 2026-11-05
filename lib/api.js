const API = process.env.NEXT_PUBLIC_API_URL;
export async function api(path, opts = {}, secure = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (secure) {
    const t = await fetch('/api/token').then((r) => r.json());
    headers.Authorization = 'Bearer ' + t.token;
  }
  const res = await fetch(API + path, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data;
}
export async function uploadImage(file) {
  const fd = new FormData(); fd.append('image', file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: 'POST', body: fd });
  const d = await r.json();
  if (!d.success) throw new Error('Image upload failed. Try a smaller image.');
  return d.data.url;
}
