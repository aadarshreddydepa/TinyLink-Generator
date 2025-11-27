import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
const API_BASE = import.meta.env.VITE_API_BASE || BASE_URL;

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 8000
});

export type LinkItem = {
  _id?: string;
  code: string;
  url: string;
  clicks: number;
  createdAt?: string;
  lastClicked?: string | null;
};
