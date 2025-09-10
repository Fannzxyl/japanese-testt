import React, { useState } from 'react';
import { vocabulary } from '../constants';
import { Vocabulary as VocabType } from '../types';
import { Volume2 } from 'lucide-react';

const VocabularyCard: React.FC<{ item: VocabType }> = ({ item }) => {
    
    const handlePlayAudio = (text: string, lang: string = 'ja-JP') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    };

    return (
        <div className="relative bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md transition-transform hover:scale-105">
            {item.kanji && <p className="text-3xl font-bold">{item.kanji}</p>}
            <p className={`text-xl ${item.kanji ? 'text-slate-500 dark:text-slate-400' : 'text-3xl font-bold'}`}>{item.kana}</p>
            <p className="text-md text-slate-600 dark:text-slate-300 mt-1">{item.romaji}</p>
            <p className="text-lg font-semibold mt-3">{item.meaning}</p>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 italic">"{item.example}"</p>
            </div>
            <button onClick={() => handlePlayAudio(item.kana)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <Volume2 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </button>
        </div>
    );
};

const Vocabulary: React.FC = () => {
    const topics = [...new Set(vocabulary.map(v => v.topic))];
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);

    const filteredVocab = vocabulary.filter(v => v.topic === selectedTopic);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">JFT A2 Vocabulary</h2>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
                <h3 className="font-semibold mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {topics.map(topic => (
                        <button
                            key={topic}
                            onClick={() => setSelectedTopic(topic)}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedTopic === topic ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVocab.map(item => (
                    <VocabularyCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Vocabulary;