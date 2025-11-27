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
    return <div className="p-4 bg-white rounded shadow">Loading stats...</div>;
  if (err)
    return (
      <div className="p-4 bg-white rounded shadow">
        {err} — <Link to="/">Back</Link>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded shadow">
      {!link ? (
        <div>No data</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Stats for {link.code}</h2>
              <p className="text-sm text-gray-500">{link.url}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{link.clicks}</div>
              <div className="text-xs text-gray-500">total clicks</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Created</div>
              <div className="font-medium">
                {link.createdAt
                  ? new Date(link.createdAt).toLocaleString()
                  : "-"}
              </div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Last clicked</div>
              <div className="font-medium">
                {link.lastClicked
                  ? new Date(link.lastClicked).toLocaleString()
                  : "-"}
              </div>
            </div>
            <div className="p-3 border rounded">
              <div className="text-xs text-gray-500">Short URL</div>
              <div className="font-medium">
                <a
                  href={`${BASE_URL.replace(/\/$/, "")}/${link.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`${BASE_URL.replace(/\/$/, "")}/${link.code}`}
                </a>
              </div>
            </div>
          </div>

          <div>
            <Link to="/" className="px-3 py-2 bg-gray-100 rounded">
              Back to dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
