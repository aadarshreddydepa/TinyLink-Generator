import React from 'react';
import LinkForm from '../components/LinkForm';
import LinksTable from '../components/LinksTable';

export default function Dashboard() {
  const [tick, setTick] = React.useState(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Create a short link</h2>
          <LinkForm onCreated={() => setTick(t => t + 1)} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">How it works</h2>
          <div className="p-4 bg-white rounded shadow text-sm text-gray-700 space-y-2">
            <p>Create short links (6–8 chars). The service returns a short URL. Visiting <code>/code</code> redirects to the original URL and increments clicks.</p>
            <p>Use the table to copy, view stats, or delete links.</p>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-2">Your links</h3>
        <LinksTable key={tick} />
      </section>
    </div>
  );
}
