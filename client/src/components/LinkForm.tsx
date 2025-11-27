import React, { useState } from 'react';
import { api } from '../services/api';

export default function LinkForm({ onCreated }: { onCreated: () => void }) {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  function validateCode(c: string) {
    return c === '' || /^[A-Za-z0-9]{6,8}$/.test(c);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!url.trim()) return setErr('Target URL is required');
    if (!validateCode(code)) return setErr('Code must match [A-Za-z0-9]{6,8}');
    setLoading(true);
    try {
      await api.post('/links', { url: url.trim(), code: code || undefined });
      setUrl(''); setCode('');
      onCreated();
    } catch (err: any) {
      if (err.response?.status === 409) setErr('Code already exists');
      else setErr('Failed to create link');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded shadow">
      <div>
        <label className="block text-sm font-medium">Target URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/page"
          className="w-full mt-1 p-2 border rounded"
          aria-label="Target URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Custom code (optional)</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="6-8 chars [A-Za-z0-9]"
          className="w-full mt-1 p-2 border rounded"
          aria-label="Custom code"
        />
        <p className="text-xs text-gray-500 mt-1">Leave blank to generate automatically.</p>
      </div>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
        <button
          type="button"
          onClick={() => { setUrl(''); setCode(''); setErr(null); }}
          className="px-3 py-2 border rounded text-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

