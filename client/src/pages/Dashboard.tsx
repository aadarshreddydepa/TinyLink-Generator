import React from "react";
import LinkForm from "../components/LinkForm";
import LinksTable from "../components/LinksTable";

export default function Dashboard() {
  const [tick, setTick] = React.useState(0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Pro Tip Marquee */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="marquee-container">
          <div className="marquee-content text-sm font-medium">
            Pro Tip: Custom codes help your audience remember your links. Try
            using your brand name or a relevant keyword! &nbsp;&nbsp;&nbsp; •
            &nbsp;&nbsp;&nbsp; Create an account to manage your links better!
            &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; TinyLink is the fastest way
            to shorten URLs.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Create Link Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-2xl p-6 md:p-8 h-full hover-lift">
            <h2 className="text-2xl font-bold mb-1 text-slate-800">
              Create New Link
            </h2>
            <p className="text-slate-500 mb-6">
              Shorten your long URLs and track their performance.
            </p>
            <LinkForm onCreated={() => setTick((t) => t + 1)} />
          </div>
        </div>

        {/* Right Column: How it works */}
        <div className="lg:col-span-1">
          <div
            className="glass-panel rounded-2xl p-6 h-full hover-lift"
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-lg font-bold mb-4 text-slate-800">
              How it works
            </h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <p className="text-sm text-slate-600 pt-1">
                  Paste your long URL into the input field.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <p className="text-sm text-slate-600 pt-1">
                  Optionally set a custom alias for your link.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </div>
                <p className="text-sm text-slate-600 pt-1">
                  Share your new short link and track clicks!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Width: Your Links Table */}
      <div
        className="glass-panel rounded-2xl p-6 md:p-8 hover-lift"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-800">Your Links</h3>
        </div>
        <LinksTable key={tick} />
      </div>
    </div>
  );
}
