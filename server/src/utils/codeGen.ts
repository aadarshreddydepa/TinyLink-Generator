// generate random code fallback when custom not provided
export function randomCode(len = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i=0;i<len;i++) s += chars.charAt(Math.floor(Math.random()*chars.length));
  return s;
}
