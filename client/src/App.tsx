import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
