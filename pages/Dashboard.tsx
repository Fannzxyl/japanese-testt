// src/pages/Dashboard.tsx (Ini adalah struktur yang benar, berdasarkan komponen Dashboard yang Anda berikan)

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, BrainCircuit, Shield, ArrowRight, Target, Calendar, RotateCcw, RefreshCcw, Goal } from 'lucide-react';

// Pastikan useAppStore diimpor dari lokasi yang benar jika tidak berada di file ini
// import { useAppStore } from '../store/useAppStore'; // Jika useAppStore ada di file terpisah

// --- Placeholder for useAppStore (jika Anda masih menggunakannya sebagai placeholder di sini) ---
const useAppStore = () => ({
  user: {
    displayName: "Pengguna Dummy",
    exp: 1250,
    gems: 300,
    streak: 5
  },
  settings: {
    theme: 'light',
    showScrollbars: true,
  },
  isSidebarCollapsed: false,
  isAiSenseiOpen: false,
  closeAiSensei: () => {},
  isSearchModalOpen: false
});
// --- End Placeholder useAppStore ---


const Dashboard: React.FC = () => {
    // Data dummy untuk Dashboard
    const { user } = useAppStore(); // Ambil user dari useAppStore jika sudah terpisah
    const navigate = useNavigate();
    const [dailyGoal] = useState(50);
    const [todayAnswers] = useState(30);
    const [dueReviews] = useState(15);
    const [lastTest] = useState({ script: 'hiragana', qType: 'kana-to-romaji', mode: 'typing', count: 10, correct: 8, wrong: 2, wrongKeys: ['ko', 'sa']});
    const weeklyData = [
        { name: 'Min', answers: 10 }, { name: 'Sen', answers: 15 }, { name: 'Sel', answers: 20 },
        { name: 'Rab', answers: 30 }, { name: 'Kam', answers: 25 }, { name: 'Jum', answers: 40 }, { name: 'Sab', answers: 30 },
    ];
    const dailyPct = useMemo(() => dailyGoal ? Math.round((todayAnswers/dailyGoal)*100) : 0, [todayAnswers, dailyGoal]);

    const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{title}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </div>
    );
    const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
        </div>
    );

    const goPractice = () => navigate('/kana');
    const goTest = () => navigate('/test');
    const resumeLast = () => {};
    const reviewMistakes = () => {};

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Selamat datang kembali, {user.displayName}!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Lanjutkan progresmu.</p>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={goPractice} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-medium px-4 py-2 rounded-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5" /> Latihan Cepat
                    </button>
                    <button type="button" onClick={goTest} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
                        Start Test <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Goal className="h-5 w-5 text-blue-700" />
                            <span className="font-semibold">Target Harian</span>
                        </div>
                        <span className="text-sm text-slate-500">{todayAnswers}/{dailyGoal}</span>
                    </div>
                    <ProgressBar value={dailyPct} />
                    <p className="text-xs text-slate-500 mt-2">Jawaban benar hari ini.</p>
                </div>
                <StatCard title="Review Tertunda (SRS)" value={dueReviews} icon={<RefreshCcw className="h-6 w-6 text-teal-800" />} color="bg-teal-200 dark:bg-teal-900/50" />
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <RotateCcw className="h-5 w-5 text-purple-700" />
                            <span className="font-semibold">Lanjut Tes Terakhir</span>
                        </div>
                        {lastTest ? (
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{lastTest.script} • Skor {lastTest.correct}/{lastTest.count}</p>
                        ) : (<p className="text-sm text-slate-500 mt-2">Belum ada riwayat tes terakhir.</p>)}
                    </div>
                    <button type="button" onClick={resumeLast} disabled={!lastTest} className={`mt-4 w-full text-center font-medium py-2 rounded-lg transition-colors ${lastTest ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}>Lanjut Tes</button>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-orange-700" />
                            <span className="font-semibold">Review Kesalahan</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                            {lastTest?.wrongKeys?.length ? `${lastTest.wrongKeys.length} karakter salah terakhir.` : 'Tidak ada data kesalahan terbaru.'}
                        </p>
                    </div>
                    <button type="button" onClick={reviewMistakes} disabled={!lastTest?.wrongKeys?.length} className={`mt-4 w-full text-center font-medium py-2 rounded-lg transition-colors ${lastTest?.wrongKeys?.length ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}>Mulai Review</button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total EXP" value={user.exp} icon={<BrainCircuit className="h-6 w-6 text-purple-800" />} color="bg-purple-200 dark:bg-purple-900/50" />
                <StatCard title="Gems" value={user.gems} icon={<Shield className="h-6 w-6 text-green-800" />} color="bg-green-200 dark:bg-green-900/50" />
                <StatCard title="Current Streak" value={`${user.streak} hari`} icon={<Calendar className="h-6 w-6 text-red-800" />} color="bg-red-200 dark:bg-red-900/50" />
                <StatCard title="Words Learned" value="258" icon={<BookOpen className="h-6 w-6 text-orange-800" />} color="bg-orange-200 dark:bg-orange-900/50" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm ring-1 ring-black/5">
                    <h3 className="text-lg font-semibold">Jawaban Benar Mingguan</h3>
                    <div className="h-72 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100,116,139,.3)" />
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,.9)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} cursor={{ fill: 'rgba(203,213,225,.3)' }} />
                                <Bar dataKey="answers" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm ring-1 ring-black/5">
                        <div className="flex items-center gap-2 mb-2"><BookOpen className="h-6 w-6 text-pink-800" /><h4 className="font-semibold">Hiragana</h4></div>
                        <ProgressBar value={95} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm ring-1 ring-black/5">
                        <div className="flex items-center gap-2 mb-2"><BookOpen className="h-6 w-6 text-sky-800" /><h4 className="font-semibold">Katakana</h4></div>
                        <ProgressBar value={80} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm ring-1 ring-black/5">
                        <div className="flex items-center gap-2 mb-2"><BrainCircuit className="h-6 w-6 text-teal-800" /><h4 className="font-semibold">JFT A2 Vocab</h4></div>
                        <ProgressBar value={45} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;