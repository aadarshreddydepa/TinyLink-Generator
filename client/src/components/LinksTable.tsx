import React, { useEffect, useMemo, useState } from "react";
import { api, BASE_URL, LinkItem } from "../services/api";
import CopyButton from "./CopyButton";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function shortDate(d?: string | null) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
}

export default function LinksTable() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState<"created" | "clicks">("created");
  const navigate = useNavigate();

  async function fetchLinks() {
    setLoading(true);
    try {
      const res = await api.get<LinkItem[]>("/links");
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    return links
      .filter((l) => {
        if (!t) return true;
        return (
          l.code.toLowerCase().includes(t) || l.url.toLowerCase().includes(t)
        );
      })
      .sort((a, b) => {
        if (sortBy === "clicks") return b.clicks - a.clicks;
        // created desc
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      });
  }, [links, q, sortBy]);

  async function onDelete(code: string) {
    if (!confirm(`Delete ${code}? This action cannot be undone.`)) return;
    try {
      await api.delete(`/links/${code}`);
      setLinks((prev) => prev.filter((p) => p.code !== code));
    } catch (err) {
      alert("Failed to delete");
    }
  }

  if (loading) {
    return <div className="p-4 bg-white rounded shadow">Loading links...</div>;
  }

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search code or URL"
            className="p-2 border rounded"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="p-2 border rounded text-sm"
          >
            <option value="created">Newest</option>
            <option value="clicks">Top clicks</option>
          </select>
        </div>
        <button
          onClick={fetchLinks}
          className="px-3 py-1 border rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No links yet. Create a short link to get started.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="text-left text-sm text-gray-600">
              <tr>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Target URL</th>
                <th className="px-3 py-2">Clicks</th>
                <th className="px-3 py-2">Last Clicked</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((l) => (
                <tr key={l.code} className="border-t">
                  <td className="px-3 py-2 align-top">
                    <div className="font-medium">{l.code}</div>
                    <div className="text-xs text-gray-500">/{l.code}</div>
                  </td>
                  <td className="px-3 py-2 max-w-[400px]">
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate"
                      title={l.url}
                    >
                      {l.url}
                    </a>
                  </td>
                  <td className="px-3 py-2">{l.clicks}</td>
                  <td className="px-3 py-2">{shortDate(l.lastClicked)}</td>
                  <td className="px-3 py-2 space-x-2">
                    <CopyButton text={`${BASE_URL.replace(/\/$/, '')}/${l.code}`} />
                    <button
                      onClick={() => navigate(`/code/${l.code}`)}
                      className="px-2 py-1 border rounded text-xs"
                    >
                      Stats
                    </button>
                    <button
                      onClick={() => onDelete(l.code)}
                      className="px-2 py-1 bg-red-50 border border-red-200 text-red-700 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
