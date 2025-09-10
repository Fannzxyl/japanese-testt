import React, { useState, useEffect, useRef } from 'react';
import { Timer, CheckCircle, XCircle } from 'lucide-react';
import { hiragana, katakana } from '../constants';
import { Kana } from '../types';

const allKana = [...hiragana, ...katakana];
const getRandomKana = () => allKana[Math.floor(Math.random() * allKana.length)];

const Challenge: React.FC = () => {
    const [duration, setDuration] = useState<number>(3); // in minutes
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [answer, setAnswer] = useState('');
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<Kana | null>(null);

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            // FIX: Use window.setTimeout to ensure the browser's implementation is used, which returns a number.
            timerRef.current = window.setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsFinished(true);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
        return () => {
            if(timerRef.current) clearTimeout(timerRef.current);
        };
    }, [isActive, timeLeft]);
    
    const startChallenge = () => {
        setTimeLeft(duration * 60);
        setIsActive(true);
        setIsFinished(false);
        setCorrect(0);
        setIncorrect(0);
        setCurrentQuestion(getRandomKana());
        setAnswer('');
    };

    const resetChallenge = () => {
        setIsActive(false);
        setIsFinished(false);
        setTimeLeft(0);
        if (timerRef.current) clearTimeout(timerRef.current);
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentQuestion) return;

        if(answer.trim().toLowerCase() === currentQuestion.romaji) {
            setCorrect(c => c + 1);
        } else {
            setIncorrect(i => i + 1);
        }
        setAnswer('');
        setCurrentQuestion(getRandomKana());
    }

    if (!isActive && !isFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center max-w-md">
                    <Timer className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Challenge Mode</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Test your knowledge against the clock. Choose your challenge duration.</p>
                    <div className="flex justify-center space-x-3 mb-6">
                        {[3, 5, 10].map(d => (
                             <button key={d} onClick={() => setDuration(d)} className={`px-6 py-2 rounded-full font-semibold transition-colors ${duration === d ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                {d} min
                            </button>
                        ))}
                    </div>
                    <button onClick={startChallenge} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform hover:scale-105">
                        Start Challenge
                    </button>
                </div>
            </div>
        );
    }
    
    if (isFinished) {
        return (
             <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Time's up!</h2>
                     <p className="text-slate-500 dark:text-slate-400 mb-6">Here's your performance summary.</p>
                     <div className="space-y-4 text-left">
                        <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                            <div className="flex items-center">
                                <CheckCircle className="h-6 w-6 text-green-600 mr-3"/>
                                <span className="font-semibold">Correct Answers</span>
                            </div>
                            <span className="font-bold text-lg">{correct}</span>
                        </div>
                        <div className="flex items-center justify-between bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">
                            <div className="flex items-center">
                                <XCircle className="h-6 w-6 text-red-600 mr-3"/>
                                <span className="font-semibold">Incorrect Answers</span>
                            </div>
                            <span className="font-bold text-lg">{incorrect}</span>
                        </div>
                     </div>
                     <button onClick={resetChallenge} className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-700">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md text-center">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-3">
                         <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-1"/>
                            <span className="font-semibold">{correct}</span>
                        </div>
                         <div className="flex items-center text-red-600">
                            <XCircle className="h-5 w-5 mr-1"/>
                            <span className="font-semibold">{incorrect}</span>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-4 py-2 rounded-lg">
                        {formatTime(timeLeft)}
                    </div>
                </div>

                <div className="bg-slate-100 dark:bg-slate-700/50 min-h-[150px] flex items-center justify-center rounded-lg">
                    <p className="text-8xl font-bold">{currentQuestion?.char}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type the romaji..."
                        readOnly={isFinished}
                        autoFocus
                        className="w-full text-center text-xl p-4 rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                     <button type="submit" className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Challenge;