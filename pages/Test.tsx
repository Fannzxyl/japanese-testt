import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { hiragana, katakana, vocabulary, kanjiList } from '../constants';
import { TestConfig, TestQuestion, TestAttempt, PresetKey, Kana, Vocabulary, Kanji } from '../types';
import { CheckCircle, XCircle, Timer, ChevronLeft, Volume2 } from 'lucide-react';

// --- UTILITY FUNCTIONS ---
const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

const normalizeRomaji = (input: string): string => {
    return input.trim().toLowerCase()
        .replace(/ō|ô/g, 'ou')
        .replace(/ū|û/g, 'uu');
};

const checkRomajiAnswer = (userInput: string, correctAnswers: string[]): boolean => {
    const normalizedInput = normalizeRomaji(userInput);
    const normalizedCorrectAnswers = correctAnswers.map(normalizeRomaji);

    // sokuon (っ) check
    if (normalizedCorrectAnswers[0].match(/^[kstnhmyrwgzdbp] っ/)) {
        const base = normalizedCorrectAnswers[0].split(' ')[0];
        const consonant = base.charAt(base.length -1);
        if (normalizedInput === base.slice(0, -1) + consonant + base.slice(base.length-1)) {
            return true;
        }
    }
    
    // Standard check
    return normalizedCorrectAnswers.includes(normalizedInput);
};


const generateQuestions = (config: TestConfig): TestQuestion[] => {
    let source: (Kana | Vocabulary | Kanji)[] = [];
    
    if (config.domain === 'kana') {
        const kanaSource = config.script === 'hiragana' ? hiragana : config.script === 'katakana' ? katakana : [...hiragana, ...katakana];
        
        if (config.selection.kind === 'list' && config.selection.value.length > 0) {
            source = kanaSource.filter(k => config.selection.value.includes(k.char));
        } else if (config.selection.kind === 'preset') {
            switch(config.selection.value) {
                case 'base': source = kanaSource.filter(k => k.group === 'Gojūon'); break;
                case 'dakuten': source = kanaSource.filter(k => k.group === 'Dakuten' || k.group === 'Handakuten'); break;
                case 'youon': source = kanaSource.filter(k => k.group.includes('Yōon')); break;
                case 'all':
                default: source = kanaSource;
            }
        } else {
             source = kanaSource;
        }

    } else if (config.domain === 'vocabulary') {
        source = vocabulary; // Add topic filtering later
    } else {
        source = kanjiList; // Add level filtering later
    }

    const questions: TestQuestion[] = shuffleArray(source).slice(0, config.count).map(item => {
        let question: TestQuestion = { prompt: '', answer: [] };
        if ('char' in item) { // Kana
             question = { prompt: item.char, answer: [item.romaji] };
             // Handle cases like じ/ぢ and ず/づ
             if (item.romaji === 'ji') question.answer.push('di');
             if (item.romaji === 'zu') question.answer.push('du');
        } else if ('kana' in item) { // Vocabulary
             question = { prompt: item.kanji || item.kana, answer: [item.meaning], promptMeta: item.kana };
        } else if ('character' in item) { // Kanji
             question = { prompt: item.character, answer: [item.meaning] };
        }
        
        if (config.mode === 'mcq') {
             const distractors = shuffleArray(source.filter(s => s !== item)).slice(0, 3);
             const choices = shuffleArray([
                'romaji' in item ? item.romaji : item.meaning, 
                ...distractors.map(d => 'romaji' in d ? d.romaji : d.meaning)
             ]);
             question.choices = choices;
        }
        return question;
    });

    return questions;
};


// --- UI COMPONENTS ---
const TestResults: React.FC<{ attempts: TestAttempt[], onRestart: () => void, onRestartIncorrect: () => void }> = ({ attempts, onRestart, onRestartIncorrect }) => {
    const correctCount = attempts.filter(a => a.isCorrect).length;
    const totalCount = attempts.length;
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const incorrectAttempts = attempts.filter(a => !a.isCorrect);

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-2">Session Complete!</h2>
            <p className="text-center text-slate-500 dark:text-slate-400 mb-6">Here's your performance summary.</p>

            <div className="text-center mb-8">
                <p className="text-5xl font-bold">{accuracy}%</p>
                <p className="text-slate-600 dark:text-slate-300">Accuracy ({correctCount}/{totalCount})</p>
            </div>

            {incorrectAttempts.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Review Incorrect Items</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar pr-2">
                        {incorrectAttempts.map((attempt, index) => (
                            <div key={index} className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{attempt.question.prompt}</p>
                                    <p className="text-sm text-red-500">Your answer: {attempt.userAnswer}</p>
                                    <p className="text-sm text-green-500">Correct: {attempt.question.answer.join(' / ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={onRestart} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700">Start New Test</button>
                {incorrectAttempts.length > 0 && 
                  <button onClick={onRestartIncorrect} className="w-full bg-slate-200 dark:bg-slate-700 font-bold py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">
                    Retry Incorrect ({incorrectAttempts.length})
                  </button>
                }
            </div>
        </div>
    );
};

const TestRunner: React.FC<{ config: TestConfig, onFinish: (attempts: TestAttempt[]) => void, onExit: () => void }> = ({ config, onFinish, onExit }) => {
    const [questions, setQuestions] = useState<TestQuestion[]>([]);
    const [attempts, setAttempts] = useState<TestAttempt[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    
    const [timeLeft, setTimeLeft] = useState(config.challenge.enabled ? config.challenge.durationSec : 0);
    const timerRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setQuestions(generateQuestions(config));
    }, [config]);
    
    // Challenge Timer Logic
    useEffect(() => {
        if (!config.challenge.enabled) return;
        if (timeLeft > 0) {
            // FIX: Use window.setTimeout to ensure the browser's implementation is used, which returns a number.
            timerRef.current = window.setTimeout(() => setTimeLeft(t => t - 1), 1000);
        } else {
            if(timerRef.current) clearTimeout(timerRef.current);
            onFinish(attempts);
        }
        return () => { if(timerRef.current) clearTimeout(timerRef.current); };
    }, [timeLeft, config.challenge.enabled, onFinish, attempts]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const currentQuestion = questions[currentIndex];

    const processAnswer = (answer: string) => {
        if (!currentQuestion) return;
        const isCorrect = config.mode === 'typing' 
            ? checkRomajiAnswer(answer, currentQuestion.answer)
            : currentQuestion.answer.includes(answer);
        
        setFeedback(isCorrect ? 'correct' : 'incorrect');
        setAttempts(prev => [...prev, { question: currentQuestion, userAnswer: answer, isCorrect }]);

        setTimeout(() => {
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex(i => i + 1);
                setInputValue('');
                setFeedback(null);
                inputRef.current?.focus();
            } else {
                onFinish([...attempts, { question: currentQuestion, userAnswer: answer, isCorrect }]);
            }
        }, isCorrect ? 800 : 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedback || !inputValue) return;
        processAnswer(inputValue);
    };
    
    if (questions.length === 0) {
        return <div className="text-center"><p>Generating questions...</p></div>
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={onExit} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white">
                    <ChevronLeft className="w-5 h-5" /> Back to Config
                </button>
                {config.challenge.enabled && (
                    <div className="flex items-center gap-2 text-lg font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
                        <Timer className="w-5 h-5" /> {formatTime(timeLeft)}
                    </div>
                )}
            </div>
            
            {/* Main Test Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                <p className="text-center text-slate-500 mb-6">{currentIndex + 1} / {questions.length}</p>
                <div className="bg-slate-100 dark:bg-slate-700/50 min-h-[150px] flex items-center justify-center rounded-lg text-center p-4">
                    <p className="text-8xl font-bold">{currentQuestion.prompt}</p>
                </div>

                {config.mode === 'typing' && (
                    <form onSubmit={handleSubmit} className="mt-6">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type the romaji..."
                            disabled={feedback !== null}
                            autoFocus
                            className={`w-full text-center text-xl p-4 rounded-lg bg-white dark:bg-slate-800 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${feedback === 'correct' && 'border-green-500 ring-green-500/50'}
                                ${feedback === 'incorrect' && 'border-red-500 ring-red-500/50'}
                                ${feedback === null && 'border-slate-300 dark:border-slate-600'}
                            `}
                        />
                        {feedback === 'incorrect' && <p className="text-red-500 text-center mt-2">Correct answer: {currentQuestion.answer.join(' / ')}</p>}
                        <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:bg-slate-400" disabled={feedback !== null || !inputValue}>
                            Submit
                        </button>
                    </form>
                )}

                {config.mode === 'mcq' && currentQuestion.choices && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        {currentQuestion.choices.map((choice, index) => {
                            const isCorrectChoice = currentQuestion.answer.includes(choice);
                            const isSelected = feedback && inputValue === choice;
                            let buttonClass = 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600';
                            if (isSelected && feedback === 'correct') buttonClass = 'bg-green-500 text-white';
                            if (isSelected && feedback === 'incorrect') buttonClass = 'bg-red-500 text-white';
                            if (feedback && isCorrectChoice) buttonClass = 'bg-green-500 text-white';

                            return (
                                <button
                                    key={index}
                                    onClick={() => { setInputValue(choice); processAnswer(choice); }}
                                    disabled={feedback !== null}
                                    className={`p-4 rounded-lg font-semibold text-lg transition-colors ${buttonClass}`}
                                >
                                    {choice}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const Test: React.FC = () => {
    const { settings, setLastTestConfig } = useAppStore();
    const location = useLocation();
    const navigate = useNavigate();

    const initialConfig: TestConfig = {
        domain: 'kana',
        script: 'hiragana',
        direction: 'kana-to-romaji',
        mode: 'typing',
        count: 10,
        challenge: { enabled: false, durationSec: 180 },
        selection: { kind: 'preset', value: 'all' },
    };
    
    const [config, setConfig] = useState<TestConfig>(settings.lastTestConfig || initialConfig);
    const [testState, setTestState] = useState<'configuring' | 'running' | 'finished'>('configuring');
    const [attempts, setAttempts] = useState<TestAttempt[]>([]);

    useEffect(() => {
        if (location.state?.prefillConfig) {
            setConfig(prev => ({ ...prev, ...location.state.prefillConfig }));
            // Clear the state so it doesn't persist on refresh
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate]);

    const startTest = () => {
        setLastTestConfig(config);
        setTestState('running');
        setAttempts([]);
    };
    
    const finishTest = (finalAttempts: TestAttempt[]) => {
        setAttempts(finalAttempts);
        setTestState('finished');
    };

    const restartTest = () => {
        setTestState('configuring');
    }
    
    const restartIncorrect = () => {
        const incorrectChars = attempts.filter(a => !a.isCorrect).map(a => a.question.prompt);
        if (incorrectChars.length === 0) return;
        
        const newConfig: TestConfig = {
            ...config,
            selection: { kind: 'list', value: incorrectChars },
            count: incorrectChars.length
        };
        setConfig(newConfig);
        setTestState('running');
        setAttempts([]);
    }

    if (testState === 'running') {
        return <TestRunner config={config} onFinish={finishTest} onExit={() => setTestState('configuring')} />;
    }
    
    if (testState === 'finished') {
        return <TestResults attempts={attempts} onRestart={restartTest} onRestartIncorrect={restartIncorrect} />;
    }

    // CONFIGURATION UI
    const setConfigValue = <K extends keyof TestConfig>(key: K, value: TestConfig[K]) => {
        setConfig(prev => ({...prev, [key]: value}));
    };
    const setPreset = (preset: PresetKey) => setConfig(prev => ({...prev, selection: { kind: 'preset', value: preset }}));

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Test Suite</h2>
            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-md">
                {/* Domain Selection */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-3">1. Select Domain</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {(['kana', 'vocabulary', 'kanji'] as const).map(d => (
                            <button key={d} onClick={() => setConfigValue('domain', d)} className={`p-4 rounded-lg font-semibold border-2 transition-colors ${config.domain === d ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
                                {d.charAt(0).toUpperCase() + d.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {config.domain === 'kana' && (
                    <div className="mb-6">
                        <h3 className="font-semibold mb-3">2. Kana Options</h3>
                        <div className="flex flex-wrap gap-2">
                             {(['all', 'base', 'dakuten', 'youon'] as PresetKey[]).map(p => (
                                <button key={p} onClick={() => setPreset(p)} className={`px-3 py-1 rounded-full text-sm ${config.selection.kind === 'preset' && config.selection.value === p ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{p}</button>
                             ))}
                        </div>
                         <div className="grid sm:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Script</label>
                                <select value={config.script} onChange={e => setConfigValue('script', e.target.value as TestConfig['script'])} className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2">
                                    <option value="hiragana">Hiragana</option>
                                    <option value="katakana">Katakana</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                         </div>
                    </div>
                )}
                
                 <div className="mb-6">
                    <h3 className="font-semibold mb-3">3. Test Mode</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-sm font-medium mb-1">Mode</label>
                             <select value={config.mode} onChange={e => setConfigValue('mode', e.target.value as TestConfig['mode'])} className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2">
                                <option value="typing">Typing</option>
                                <option value="mcq">Multiple Choice</option>
                                <option value="listening" disabled>Listening (soon)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Number of Questions</label>
                            <input type="number" value={config.count} onChange={e => setConfigValue('count', parseInt(e.target.value) || 10)} min="5" max="100" className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2"/>
                        </div>
                    </div>
                 </div>

                <div className="mb-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold">Challenge Mode</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Race against the clock.</p>
                        </div>
                        <input type="checkbox" checked={config.challenge.enabled} onChange={e => setConfig(p => ({...p, challenge: {...p.challenge, enabled: e.target.checked}}))} className="w-5 h-5"/>
                    </div>
                    {config.challenge.enabled && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-1">Duration</label>
                             <div className="flex gap-2">
                                 {([180, 300, 600] as const).map(d => (
                                     <button key={d} onClick={() => setConfig(p => ({...p, challenge: {...p.challenge, durationSec: d}}))} className={`px-4 py-2 rounded-lg ${config.challenge.durationSec === d ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                         {d/60} min
                                     </button>
                                 ))}
                            </div>
                        </div>
                    )}
                </div>

                <button onClick={startTest} disabled={config.count < 5} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:scale-100">
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default Test;