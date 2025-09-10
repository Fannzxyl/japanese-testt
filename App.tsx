import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useAppStore } from './store/useAppStore';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import KanaTrainer from './pages/KanaTrainer';
import Vocabulary from './pages/Vocabulary';
import Kanji from './pages/Kanji';
import Test from './pages/Test';
import WritingPractice from './pages/WritingPractice';
import Settings from './pages/Settings';
import SearchModal from './components/SearchModal';
import AiSenseiModal from './components/AiSenseiModal';

const PageLayout: React.FC = () => {
    const { isSidebarCollapsed, settings } = useAppStore();
    return (
        <div className={`flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200`}>
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
    const { settings } = useAppStore();

    useEffect(() => {
        if (settings.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [settings.theme]);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="kana" element={<KanaTrainer />} />
                    <Route path="vocabulary" element={<Vocabulary />} />
                    <Route path="kanji" element={<Kanji />} />
                    <Route path="test" element={<Test />} />
                    <Route path="writing" element={<WritingPractice />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
            {useAppStore.getState().isSearchModalOpen && <SearchModal />}
            {useAppStore.getState().isAiSenseiOpen && <AiSenseiModal />}
        </HashRouter>
    );
};

export default App;
