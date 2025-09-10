import React, { useState, useMemo, useEffect, useRef } from 'react';
import { hiragana, katakana } from '../constants';
import { Kana } from '../types';
import { X } from 'lucide-react';

const KanaCard: React.FC<{ kana: Kana; isFlipped: boolean; onClick: () => void }> = ({ kana, isFlipped, onClick }) => {
    return (
        <div className="perspective-1000" onClick={onClick}>
            <div className={`relative w-20 h-28 transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-700 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800 dark:text-white">{kana.char}</span>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg flex items-center justify-center rotate-y-180">
                    <span className="text-3xl font-semibold text-blue-800 dark:text-blue-200">{kana.romaji}</span>
                </div>
            </div>
        </div>
    );
};

const KanaGrid: React.FC<{ kanaList: Kana[] }> = ({ kanaList }) => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
            {kanaList.map((kana, index) => (
                <KanaCard key={index} kana={kana} isFlipped={flippedIndex === index} onClick={() => handleCardClick(index)} />
            ))}
        </div>
    );
};

// Drill Modal Component (defined in the same file)
const DrillModal: React.FC<{ drillChars: Kana[]; onClose: () => void }> = ({ drillChars, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showSummary, setShowSummary] = useState(false);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
    const inputRef = useRef<HTMLInputElement>(null);

    const currentKana = drillChars[currentIndex];

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentIndex]);
    
    const handleNext = () => {
        setIsCorrect(null);
        setInputValue('');
        if (currentIndex < drillChars.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setShowSummary(true);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isCorrect !== null) { // If answer is already submitted, just go to next
            handleNext();
            return;
        }
        
        const correct = inputValue.trim().toLowerCase() === currentKana.romaji;
        setIsCorrect(correct);
        setStats(prev => correct ? { ...prev, correct: prev.correct + 1 } : { ...prev, incorrect: prev.incorrect + 1 });
    }
    
    if (showSummary) {
        return (
             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Drill Complete!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Here's your score:</p>
                    <div className="space-y-3">
                        <p className="text-lg font-medium">Correct: <span className="font-bold text-green-500">{stats.correct}</span></p>
                        <p className="text-lg font-medium">Incorrect: <span className="font-bold text-red-500">{stats.incorrect}</span></p>
                        <p className="text-xl font-bold mt-4">Accuracy: {drillChars.length > 0 ? Math.round((stats.correct / drillChars.length) * 100) : 0}%</p>
                    </div>
                    <button onClick={onClose} className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><X/></button>
                <div className="text-center">
                    <p className="text-sm text-slate-500">{currentIndex + 1} / {drillChars.length}</p>
                    <div className="my-8 flex items-center justify-center">
                         <p className="text-8xl font-bold">{currentKana.char}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type the romaji"
                            readOnly={isCorrect !== null}
                            className={`w-full text-center text-xl p-4 rounded-lg bg-white dark:bg-slate-800 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                                ${isCorrect === true ? 'border-green-500' : ''}
                                ${isCorrect === false ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}
                            `}
                        />
                        {isCorrect === false && <p className="text-red-500 mt-2">Correct answer: {currentKana.romaji}</p>}
                        <button type="submit" className={`w-full mt-4 font-bold py-3 rounded-lg text-white transition-colors
                            ${isCorrect !== null ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            {isCorrect !== null ? 'Next' : 'Check'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


const KanaTrainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
    const [customDrillChars, setCustomDrillChars] = useState<string[]>([]);
    const [isDrillModalOpen, setIsDrillModalOpen] = useState(false);

    const currentKanaList = activeTab === 'hiragana' ? hiragana : katakana;

    const groupedKana = useMemo(() => {
        const groups: { [key: string]: Kana[] } = {
            'Gojūon': [],
            'Dakuten & Handakuten': [],
            'Yōon': [],
        };
        currentKanaList.forEach(kana => {
            if (kana.group === 'Gojūon') groups['Gojūon'].push(kana);
            else if (kana.group === 'Dakuten' || kana.group === 'Handakuten') groups['Dakuten & Handakuten'].push(kana);
            else if (kana.group.includes('Yōon')) groups['Yōon'].push(kana);
        });
        return groups;
    }, [currentKanaList]);

    const toggleCustomDrillChar = (char: string) => {
        setCustomDrillChars(prev => 
            prev.includes(char) ? prev.filter(c => c !== char) : [...prev, char]
        );
    };

    const selectKanaGroup = (groupType: 'Gojūon' | 'Dakuten' | 'Yōon' | 'All') => {
        if (groupType === 'All') {
            setCustomDrillChars(currentKanaList.map(k => k.char));
            return;
        }
        
        let chars: string[] = [];
        if (groupType === 'Gojūon') chars = currentKanaList.filter(k => k.group === 'Gojūon').map(k => k.char);
        if (groupType === 'Dakuten') chars = currentKanaList.filter(k => k.group === 'Dakuten' || k.group === 'Handakuten').map(k => k.char);
        if (groupType === 'Yōon') chars = currentKanaList.filter(k => k.group.includes('Yōon')).map(k => k.char);
        setCustomDrillChars(chars);
    };

    const drillKana = currentKanaList.filter(k => customDrillChars.includes(k.char));

    return (
        <div className="space-y-8">
            <style>{`.perspective-1000 { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } .rotate-y-180 { transform: rotateY(180deg); } .backface-hidden { backface-visibility: hidden; }`}</style>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                 <h2 className="text-2xl font-bold mb-2">Custom Drill</h2>
                 <p className="text-slate-500 dark:text-slate-400 mb-4">Select characters or use the presets below to start a practice session.</p>
                 <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                     <span className="self-center font-semibold mr-2">Presets:</span>
                     <button onClick={() => selectKanaGroup('All')} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">All</button>
                     <button onClick={() => selectKanaGroup('Gojūon')} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">Gojūon</button>
                     <button onClick={() => selectKanaGroup('Dakuten')} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">Dakuten/Handakuten</button>
                     <button onClick={() => selectKanaGroup('Yōon')} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">Yōon</button>
                     <button onClick={() => setCustomDrillChars([])} className="px-3 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full text-sm">Clear</button>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4 max-h-32 overflow-y-auto no-scrollbar">
                    {currentKanaList.map(kana => (
                        <button 
                            key={kana.char}
                            onClick={() => toggleCustomDrillChar(kana.char)}
                            className={`w-12 h-12 text-lg rounded-md transition-colors flex items-center justify-center ${customDrillChars.includes(kana.char) ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            {kana.char}
                        </button>
                    ))}
                 </div>
                 <button onClick={() => setIsDrillModalOpen(true)} disabled={customDrillChars.length < 5} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">
                     Start Drill ({customDrillChars.length})
                 </button>
            </div>

            <div>
                <div className="border-b border-slate-200 dark:border-slate-700 mb-6">
                    <nav className="-mb-px flex space-x-6">
                        <button
                            onClick={() => { setActiveTab('hiragana'); setCustomDrillChars([]); }}
                            className={`py-3 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'hiragana' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Hiragana
                        </button>
                        <button
                            onClick={() => { setActiveTab('katakana'); setCustomDrillChars([]); }}
                            className={`py-3 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'katakana' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                        >
                            Katakana
                        </button>
                    </nav>
                </div>
                 {Object.entries(groupedKana).map(([groupName, kanaList]) => (
                    <div key={groupName} className="mb-10">
                        <h3 className="text-xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">{groupName}</h3>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                            <KanaGrid kanaList={kanaList} />
                        </div>
                    </div>
                ))}
            </div>
            {isDrillModalOpen && <DrillModal drillChars={drillKana} onClose={() => setIsDrillModalOpen(false)} />}
        </div>
    );
};

export default KanaTrainer;