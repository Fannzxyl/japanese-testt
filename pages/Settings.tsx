import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Settings as SettingsType, User } from '../types';

const Settings: React.FC = () => {
    const { settings, setSettings, theme, toggleTheme, user } = useAppStore();

    const handleSettingChange = <K extends keyof SettingsType,>(key: K, value: SettingsType[K]) => {
        if (key === 'theme') {
            toggleTheme();
        } else {
            setSettings({ [key]: value });
        }
    };
    
    const handleResetProgress = () => {
        if (window.confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
            // In a real app, this would trigger an API call or clear local storage.
            alert('Progress has been reset. (Simulation)');
        }
    };

    const handleExportData = () => {
        const dataToExport = {
            user,
            settings,
            // In a real app, you'd include learning progress, SRS queue, etc.
            progress: {
                learnedKana: 150,
                learnedVocab: 258,
                learnedKanji: 10
            }
        };

        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataToExport, null, 2))}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = `nihongolab_data_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    };


    const SettingRow: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-slate-200 dark:border-slate-700">
            <div className="mb-3 sm:mb-0">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{description}</p>
            </div>
            <div>{children}</div>
        </div>
    );

    const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                checked ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
            }`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                checked ? 'translate-x-6' : 'translate-x-1'
            }`} />
        </button>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Settings</h2>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-md">
                <SettingRow title="Theme" description="Choose between light and dark comfort mode.">
                    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 p-1 rounded-full">
                        <button onClick={() => handleSettingChange('theme', 'light')} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${theme === 'light' ? 'bg-white shadow' : ''}`}>Light</button>
                        <button onClick={() => handleSettingChange('theme', 'dark')} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${theme === 'dark' ? 'bg-slate-800 shadow text-white' : ''}`}>Dark</button>
                    </div>
                </SettingRow>

                <SettingRow title="UI Language" description="Select the display language for the interface.">
                     <select 
                        value={settings.language} 
                        onChange={(e) => handleSettingChange('language', e.target.value as 'id' | 'en')}
                        className="bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="en">English</option>
                        <option value="id">Bahasa Indonesia</option>
                    </select>
                </SettingRow>

                <SettingRow title="Audio Auto-play" description="Automatically play audio for new flashcards.">
                    <Toggle checked={settings.audioAutoplay} onChange={(v) => handleSettingChange('audioAutoplay', v)} />
                </SettingRow>
                
                <SettingRow title="Search History" description="Save your recent searches. Turned off by default for privacy.">
                    <Toggle checked={settings.searchHistoryEnabled} onChange={(v) => handleSettingChange('searchHistoryEnabled', v)} />
                </SettingRow>

                <SettingRow title="AI Chat History" description="Save your AI Sensei chats. Turned off by default for privacy.">
                    <Toggle checked={settings.aiChatHistoryEnabled} onChange={(v) => handleSettingChange('aiChatHistoryEnabled', v)} />
                </SettingRow>

                 <SettingRow title="Show Scrollbars" description="Make scrollbars visible for accessibility.">
                    <Toggle checked={settings.showScrollbars} onChange={(v) => handleSettingChange('showScrollbars', v)} />
                </SettingRow>
                
                <div className="pt-6">
                     <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
                     <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <button onClick={handleResetProgress} className="px-4 py-2 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50">Reset Progress</button>
                        <button onClick={handleExportData} className="px-4 py-2 border border-slate-300 dark:border-slate-600 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">Export My Data</button>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;