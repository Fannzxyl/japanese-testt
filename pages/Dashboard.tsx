import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, BrainCircuit, Shield, ArrowRight, Target, Calendar, RotateCcw, RefreshCcw } from 'lucide-react';

// ==== helpers (localStorage) ====
type LastTest = {
  date: string; script: 'hiragana' | 'katakana' | 'both' | 'kanji';
  qType: string; mode: 'typing' | 'mcq'; count: number; correct: number; wrong: number; wrongKeys?: string[];
};

const readJSON = <T,>(k: string, def: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) as T : def;
  } catch {
    return def;
  }
};

const todayKey = () => new Date().toISOString().slice(0, 10);

// ==== small UI atoms ====
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

const Dashboard: React.FC = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  // State untuk menyimpan data yang dibaca dari localStorage
  const [dailyGoal, setDailyGoal] = useState(50);
  const [todayAnswers, setTodayAnswers] = useState(0);
  const [dueReviews, setDueReviews] = useState(0);
  const [lastTest, setLastTest] = useState<LastTest | null>(null);

  useEffect(() => {
    // Membaca data dari localStorage saat komponen dimuat
    const goal = Number(localStorage.getItem('nl:dailyGoal') || 50);
    const answers = Number(localStorage.getItem(`nl:answers:${todayKey()}`) || 0);
    const reviews = Number(localStorage.getItem('nl:srs:due') || 0);
    const last = readJSON<LastTest | null>('nl:lastTest', null);

    setDailyGoal(goal);
    setTodayAnswers(answers);
    setDueReviews(reviews);
    setLastTest(last);
  }, []);

  const weeklyData = [
    { name: 'Mon', hours: 2 }, { name: 'Tue', hours: 3 }, { name: 'Wed', hours: 1.5 },
    { name: 'Thu', hours: 4 }, { name: 'Fri', hours: 2.5 }, { name: 'Sat', hours: 5 }, { name: 'Sun', hours: 1 },
  ];

  const dailyPct = useMemo(() => dailyGoal ? Math.round((todayAnswers / dailyGoal) * 100) : 0, [todayAnswers, dailyGoal]);

  // ===== quick actions =====
  const goPractice = () => navigate('/kana');
  const goTest = () => navigate('/test');
  const resumeLast = () => {
    if (!lastTest) return goTest();
    localStorage.setItem('kanaTrainer_preset', 'all');
    localStorage.setItem('kanaTrainer_lastMode', JSON.stringify({
      script: lastTest.script, direction: lastTest.qType, mode: lastTest.mode, count: Math.min(25, lastTest.count || 10),
    }));
    goTest();
  };
  const reviewMistakes = () => {
    if (!lastTest?.wrongKeys?.length) return goTest();
    localStorage.setItem('kanaTrainer_preset', 'custom');
    localStorage.setItem('kanaTrainer_singleTokens', JSON.stringify(lastTest.wrongKeys));
    goTest();
  };

  return (
    <div className="space-y-8">
      {/* Header + CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Welcome back, {user.displayName}!</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Lanjutkan progresmu — target harian, review due, dan resume tes terakhir siap di sini.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={goPractice} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-100 font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Latihan Cepat
          </button>
          <button onClick={goTest} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
            Start Test <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Actionable cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Daily Goal */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-700" />
              <span className="font-semibold">Daily Goal</span>
            </div>
            <span className="text-sm text-slate-500">{todayAnswers}/{dailyGoal}</span>
          </div>
          <ProgressBar value={dailyPct} />
          <p className="text-xs text-slate-500 mt-2">Jawaban benar hari ini.</p>
        </div>

        {/* Due Reviews */}
        <StatCard title="Due Reviews (SRS)" value={dueReviews} icon={<RefreshCcw className="h-6 w-6 text-teal-800" />} color="bg-teal-200 dark:bg-teal-900/50" />

        {/* Resume Last */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-purple-700" />
              <span className="font-semibold">Resume Last Test</span>
            </div>
            <button onClick={resumeLast} className="text-blue-600 hover:underline text-sm">Lanjut</button>
          </div>
          {lastTest ? (
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {lastTest.script} • {lastTest.qType} • {lastTest.mode === 'typing' ? 'Ketik' : 'Pilihan Ganda'} — Skor {lastTest.correct}/{lastTest.count}
            </p>
          ) : (
            <p className="text-sm text-slate-500 mt-2">Belum ada riwayat — mulai tes dulu.</p>
          )}
        </div>

        {/* Review Mistakes */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Review Mistakes</span>
            <button onClick={reviewMistakes} disabled={!lastTest?.wrongKeys?.length}
              className={`text-sm ${lastTest?.wrongKeys?.length ? 'text-blue-600 hover:underline' : 'text-slate-400 cursor-not-allowed'}`}>
              Mulai
            </button>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            {lastTest?.wrongKeys?.length ? `${lastTest.wrongKeys.length} huruf salah terakhir.` : 'Tidak ada data salah terakhir.'}
          </p>
        </div>
      </div>

      {/* Stat lama kamu tetap ada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total EXP" value={user.exp} icon={<BrainCircuit className="h-6 w-6 text-purple-800" />} color="bg-purple-200 dark:bg-purple-900/50" />
        <StatCard title="Gems" value={user.gems} icon={<Shield className="h-6 w-6 text-green-800" />} color="bg-green-200 dark:bg-green-900/50" />
        <StatCard title="Current Streak" value={`${user.streak} days`} icon={<Calendar className="h-6 w-6 text-red-800" />} color="bg-red-200 dark:bg-red-900/50" />
        <StatCard title="Words Learned" value="258" icon={<Target className="h-6 w-6 text-orange-800" />} color="bg-orange-200 dark:bg-orange-900/50" />
      </div>

      {/* Chart & progress lama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm ring-1 ring-black/5">
          <h3 className="text-lg font-semibold">Weekly Study Hours</h3>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100,116,139,.3)" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,.9)', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} cursor={{ fill: 'rgba(203,213,225,.3)' }} />
                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
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
