// src/App.tsx
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore'; // Pastikan path ini benar

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SearchModal from './components/SearchModal';
import AiSenseiModal from './components/AiSenseiModal'; // Pastikan path ini benar

import Dashboard from './pages/Dashboard';
import KanaTrainer from './pages/KanaTrainer';
import Vocabulary from './pages/Vocabulary';
import Kanji from './pages/Kanji';
import WritingPractice from './pages/WritingPractice';
import Settings from './pages/Settings'; // Pastikan path ini benar (komponen Settings Anda)

import Challenge from './pages/Challenge';

const PageLayout: React.FC = () => {
  const { isSidebarCollapsed, settings } = useAppStore();
  return (
    // Kelas dark:bg-slate-900 dan dark:text-slate-200 di sini akan bereaksi terhadap kelas 'dark' pada <html>
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Sidebar />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <Topbar />
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 ${!settings.showScrollbars && 'no-scrollbar'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const { settings, isAiSenseiOpen, closeAiSensei, isSearchModalOpen } = useAppStore();

  // Efek ini membaca settings.theme dan menambahkan/menghapus kelas 'dark' dari elemen <html>
  useEffect(() => {
    if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    // Opsional: tambahkan transisi ke elemen <html> untuk perubahan tema yang lebih mulus
    // Ini membantu visualisasi perubahan warna menjadi lebih halus
    document.documentElement.style.transition = 'background-color 0.2s ease, color 0.2s ease';
  }, [settings.theme]); // Efek ini akan dijalankan setiap kali settings.theme berubah

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="kana" element={<KanaTrainer />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="kanji" element={<Kanji />} />
          <Route path="test" element={<Challenge />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="writing" element={<WritingPractice />} />
          <Route path="settings" element={<Settings />} /> {/* Menggunakan komponen Settings yang diimpor */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      {/* Render modal jika state di store adalah true */}
      {isSearchModalOpen && <SearchModal />}
      {isAiSenseiOpen && <AiSenseiModal closeAiSensei={closeAiSensei} />}
    </HashRouter>
  );
};

export default App;