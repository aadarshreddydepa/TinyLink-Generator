import React, { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    }
  }

  return (
    <button
      onClick={onCopy}
      className="px-2 py-1 bg-gray-100 border rounded text-xs hover:bg-gray-200"
      aria-label="Copy short url"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
