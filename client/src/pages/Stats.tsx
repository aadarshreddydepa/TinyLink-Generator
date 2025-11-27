import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, BASE_URL, LinkItem } from "../services/api";

export default function Stats() {
  const { code } = useParams<{ code: string }>();
  const [link, setLink] = useState<LinkItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    api
      .get<LinkItem>(`/links/${code}`)
      .then((res) => setLink(res.data))
      .catch((e) => {
        setErr("Not found");
      })
      .finally(() => setLoading(false));
  }, [code]);

  if (loading)
    return (
      <div className="glass-panel p-12 text-center rounded-2xl">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-500">Loading stats...</p>
      </div>
    );

  if (err)
    return (
      <div className="glass-panel p-8 text-center rounded-2xl">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{err}</h3>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-700 font-medium"
        >
          &larr; Back to dashboard
        </Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Dashboard
      </Link>

      {!link ? (
        <div className="glass-panel p-8 text-center rounded-2xl">
          No data found
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-slate-800">
                    /{link.code}
                  </h2>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-2 break-all"
                >
                  {link.url}
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`${BASE_URL.replace(/\/$/, "")}/${link.code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  Visit Link
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <div className="text-4xl font-bold text-slate-800 mb-1">
                {link.clicks}
              </div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                Total Clicks
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold text-slate-800 mb-1">
                {link.createdAt
                  ? new Date(link.createdAt).toLocaleDateString()
                  : "-"}
              </div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                Created Date
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-lg font-semibold text-slate-800 mb-1">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleDateString()
                  : "Never"}
              </div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">
                Last Clicked
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
