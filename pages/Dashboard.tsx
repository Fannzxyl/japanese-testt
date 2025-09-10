import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, BrainCircuit, Shield, ArrowRight, Target, Calendar } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
        </div>
    </div>
);

const ProgressCard: React.FC<{ title: string; icon: React.ReactNode; progress: number; color: string }> = ({ title, icon, progress, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
            <div className={`p-2 rounded-full ${color}`}>
                {icon}
            </div>
            <span className="font-semibold text-slate-600 dark:text-slate-300">{progress}%</span>
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
            <div className={`${color} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
    const { user } = useAppStore();
    const navigate = useNavigate();
    const weeklyData = [
        { name: 'Mon', hours: 2 },
        { name: 'Tue', hours: 3 },
        { name: 'Wed', hours: 1.5 },
        { name: 'Thu', hours: 4 },
        { name: 'Fri', hours: 2.5 },
        { name: 'Sat', hours: 5 },
        { name: 'Sun', hours: 1 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Welcome back, {user.displayName}!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Let's continue your Japanese learning journey.</p>
                </div>
                 <button onClick={() => navigate('/kana')} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2">
                    Continue Learning <ArrowRight className="h-5 w-5"/>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total EXP" value={user.exp} icon={<BrainCircuit className="h-6 w-6 text-purple-800"/>} color="bg-purple-200 dark:bg-purple-900/50" />
                <StatCard title="Gems" value={user.gems} icon={<Shield className="h-6 w-6 text-green-800"/>} color="bg-green-200 dark:bg-green-900/50" />
                <StatCard title="Current Streak" value={`${user.streak} days`} icon={<Calendar className="h-6 w-6 text-red-800"/>} color="bg-red-200 dark:bg-red-900/50" />
                <StatCard title="Words Learned" value="258" icon={<Target className="h-6 w-6 text-orange-800"/>} color="bg-orange-200 dark:bg-orange-900/50" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold">Weekly Study Hours</h3>
                    <div className="h-72 mt-4">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(100, 116, 139, 0.3)"/>
                                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }}/>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '0.5rem',
                                    }}
                                    cursor={{ fill: 'rgba(203, 213, 225, 0.3)' }}
                                />
                                <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-6">
                    <ProgressCard title="Hiragana" progress={95} icon={<BookOpen className="h-6 w-6 text-pink-800"/>} color="bg-pink-200 dark:bg-pink-900/50" />
                    <ProgressCard title="Katakana" progress={80} icon={<BookOpen className="h-6 w-6 text-sky-800"/>} color="bg-sky-200 dark:bg-sky-900/50" />
                    <ProgressCard title="JFT A2 Vocab" progress={45} icon={<BrainCircuit className="h-6 w-6 text-teal-800"/>} color="bg-teal-200 dark:bg-teal-900/50" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;