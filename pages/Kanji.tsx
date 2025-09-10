
import React from 'react';
import { kanjiList } from '../constants';
import { Kanji as KanjiType } from '../types';

const KanjiCard: React.FC<{ item: KanjiType }> = ({ item }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 flex items-center justify-center rounded-lg mb-4">
            <p className="text-6xl font-serif">{item.character}</p>
        </div>
        <p className="text-lg font-semibold">{item.meaning}</p>
        <div className="flex space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
            <span>On: {item.onyomi.join(', ')}</span>
            <span>Kun: {item.kunyomi.join(', ')}</span>
        </div>
        <div className="mt-2 text-xs">
            <span>Strokes: {item.strokes}</span> | <span>JLPT N{item.jlptLevel}</span>
        </div>
    </div>
);

const Kanji: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Beginner Kanji (A2 Level)</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {kanjiList.map(item => (
                    <KanjiCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Kanji;
