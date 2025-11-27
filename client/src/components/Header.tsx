import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white font-bold">
            TL
          </div>
          <div>
            <h1 className="text-lg font-semibold">TinyLink</h1>
            <p className="text-xs text-gray-500">Short links, simple analytics</p>
          </div>
        </Link>
        <nav className="text-sm text-gray-600">
          <a href="/healthz" className="mr-4 hover:text-gray-900">Health</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900">Repo</a>
        </nav>
      </div>
    </header>
  );
}
