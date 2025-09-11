import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// Data Kana yang disematkan langsung untuk menghindari masalah impor
const hiragana = [
    { char: 'あ', romaji: 'a', group: 'Gojūon' },
    { char: 'い', romaji: 'i', group: 'Gojūon' },
    { char: 'う', romaji: 'u', group: 'Gojūon' },
    { char: 'え', romaji: 'e', group: 'Gojūon' },
    { char: 'お', romaji: 'o', group: 'Gojūon' },
    { char: 'か', romaji: 'ka', group: 'Gojūon' },
    { char: 'き', romaji: 'ki', group: 'Gojūon' },
    { char: 'く', romaji: 'ku', group: 'Gojūon' },
    { char: 'け', romaji: 'ke', group: 'Gojūon' },
    { char: 'こ', romaji: 'ko', group: 'Gojūon' },
    { char: 'さ', romaji: 'sa', group: 'Gojūon' },
    { char: 'し', romaji: 'shi', group: 'Gojūon' },
    { char: 'す', romaji: 'su', group: 'Gojūon' },
    { char: 'せ', romaji: 'se', group: 'Gojūon' },
    { char: 'そ', romaji: 'so', group: 'Gojūon' },
    { char: 'た', romaji: 'ta', group: 'Gojūon' },
    { char: 'ち', romaji: 'chi', group: 'Gojūon' },
    { char: 'つ', romaji: 'tsu', group: 'Gojūon' },
    { char: 'て', romaji: 'te', group: 'Gojūon' },
    { char: 'と', romaji: 'to', group: 'Gojūon' },
    { char: 'な', romaji: 'na', group: 'Gojūon' },
    { char: 'に', romaji: 'ni', group: 'Gojūon' },
    { char: 'ぬ', romaji: 'nu', group: 'Gojūon' },
    { char: 'ね', romaji: 'ne', group: 'Gojūon' },
    { char: 'の', romaji: 'no', group: 'Gojūon' },
    { char: 'は', romaji: 'ha', group: 'Gojūon' },
    { char: 'ひ', romaji: 'hi', group: 'Gojūon' },
    { char: 'ふ', romaji: 'fu', group: 'Gojūon' },
    { char: 'へ', romaji: 'he', group: 'Gojūon' },
    { char: 'ほ', romaji: 'ho', group: 'Gojūon' },
    { char: 'ま', romaji: 'ma', group: 'Gojūon' },
    { char: 'み', romaji: 'mi', group: 'Gojūon' },
    { char: 'む', romaji: 'mu', group: 'Gojūon' },
    { char: 'め', romaji: 'me', group: 'Gojūon' },
    { char: 'も', romaji: 'mo', group: 'Gojūon' },
    { char: 'や', romaji: 'ya', group: 'Yōon' },
    { char: 'ゆ', romaji: 'yu', group: 'Yōon' },
    { char: 'よ', romaji: 'yo', group: 'Yōon' },
    { char: 'ら', romaji: 'ra', group: 'Gojūon' },
    { char: 'り', romaji: 'ri', group: 'Gojūon' },
    { char: 'る', romaji: 'ru', group: 'Gojūon' },
    { char: 'れ', romaji: 're', group: 'Gojūon' },
    { char: 'ろ', romaji: 'ro', group: 'Gojūon' },
    { char: 'わ', romaji: 'wa', group: 'Gojūon' },
    { char: 'を', romaji: 'wo', group: 'Gojūon' },
    { char: 'ん', romaji: 'n', group: 'Gojūon' },
    { char: 'が', romaji: 'ga', group: 'Dakuten' },
    { char: 'ぎ', romaji: 'gi', group: 'Dakuten' },
    { char: 'ぐ', romaji: 'gu', group: 'Dakuten' },
    { char: 'げ', romaji: 'ge', group: 'Dakuten' },
    { char: 'ご', romaji: 'go', group: 'Dakuten' },
    { char: 'ざ', romaji: 'za', group: 'Dakuten' },
    { char: 'じ', romaji: 'ji', group: 'Dakuten' },
    { char: 'ず', romaji: 'zu', group: 'Dakuten' },
    { char: 'ぜ', romaji: 'ze', group: 'Dakuten' },
    { char: 'ぞ', romaji: 'zo', group: 'Dakuten' },
    { char: 'だ', romaji: 'da', group: 'Dakuten' },
    { char: 'ぢ', romaji: 'ji', group: 'Dakuten' },
    { char: 'づ', romaji: 'zu', group: 'Dakuten' },
    { char: 'で', romaji: 'de', group: 'Dakuten' },
    { char: 'ど', romaji: 'do', group: 'Dakuten' },
    { char: 'ば', romaji: 'ba', group: 'Dakuten' },
    { char: 'び', romaji: 'bi', group: 'Dakuten' },
    { char: 'ぶ', romaji: 'bu', group: 'Dakuten' },
    { char: 'べ', romaji: 'be', group: 'Dakuten' },
    { char: 'ぼ', romaji: 'bo', group: 'Dakuten' },
    { char: 'ぱ', romaji: 'pa', group: 'Handakuten' },
    { char: 'ぴ', romaji: 'pi', group: 'Handakuten' },
    { char: 'ぷ', romaji: 'pu', group: 'Handakuten' },
    { char: 'ぺ', romaji: 'pe', group: 'Handakuten' },
    { char: 'ぽ', romaji: 'po', group: 'Handakuten' },
    { char: 'きゃ', romaji: 'kya', group: 'Yōon' },
    { char: 'きゅ', romaji: 'kyu', group: 'Yōon' },
    { char: 'きょ', romaji: 'kyo', group: 'Yōon' },
    { char: 'しゃ', romaji: 'sha', group: 'Yōon' },
    { char: 'しゅ', romaji: 'shu', group: 'Yōon' },
    { char: 'しょ', romaji: 'sho', group: 'Yōon' },
    { char: 'ちゃ', romaji: 'cha', group: 'Yōon' },
    { char: 'ちゅ', romaji: 'chu', group: 'Yōon' },
    { char: 'ちょ', romaji: 'cho', group: 'Yōon' },
    { char: 'にゃ', romaji: 'nya', group: 'Yōon' },
    { char: 'にゅ', romaji: 'nyu', group: 'Yōon' },
    { char: 'にょ', romaji: 'nyo', group: 'Yōon' },
    { char: 'ひゃ', romaji: 'hya', group: 'Yōon' },
    { char: 'ひゅ', romaji: 'hyu', group: 'Yōon' },
    { char: 'ひょ', romaji: 'hyo', group: 'Yōon' },
    { char: 'みゃ', romaji: 'mya', group: 'Yōon' },
    { char: 'みゅ', romaji: 'myu', group: 'Yōon' },
    { char: 'みょ', romaji: 'myo', group: 'Yōon' },
    { char: 'りゃ', romaji: 'rya', group: 'Yōon' },
    { char: 'りゅ', romaji: 'ryu', group: 'Yōon' },
    { char: 'りょ', romaji: 'ryo', group: 'Yōon' },
    { char: 'ぎゃ', romaji: 'gya', group: 'Yōon' },
    { char: 'ぎゅ', romaji: 'gyu', group: 'Yōon' },
    { char: 'ぎょ', romaji: 'gyo', group: 'Yōon' },
    { char: 'じゃ', romaji: 'ja', group: 'Yōon' },
    { char: 'じゅ', romaji: 'ju', group: 'Yōon' },
    { char: 'じょ', romaji: 'jo', group: 'Yōon' },
    { char: 'びゃ', romaji: 'bya', group: 'Yōon' },
    { char: 'びゅ', romaji: 'byu', group: 'Yōon' },
    { char: 'びょ', romaji: 'byo', group: 'Yōon' },
    { char: 'ぴゃ', romaji: 'pya', group: 'Yōon' },
    { char: 'ぴゅ', romaji: 'pyu', group: 'Yōon' },
    { char: 'ぴょ', romaji: 'pyo', group: 'Yōon' },
];

const katakana = [
    { char: 'ア', romaji: 'a', group: 'Gojūon' },
    { char: 'イ', romaji: 'i', group: 'Gojūon' },
    { char: 'ウ', romaji: 'u', group: 'Gojūon' },
    { char: 'エ', romaji: 'e', group: 'Gojūon' },
    { char: 'オ', romaji: 'o', group: 'Gojūon' },
    { char: 'カ', romaji: 'ka', group: 'Gojūon' },
    { char: 'キ', romaji: 'ki', group: 'Gojūon' },
    { char: 'ク', romaji: 'ku', group: 'Gojūon' },
    { char: 'ケ', romaji: 'ke', group: 'Gojūon' },
    { char: 'コ', romaji: 'ko', group: 'Gojūon' },
    { char: 'サ', romaji: 'sa', group: 'Gojūon' },
    { char: 'シ', romaji: 'shi', group: 'Gojūon' },
    { char: 'ス', romaji: 'su', group: 'Gojūon' },
    { char: 'セ', romaji: 'se', group: 'Gojūon' },
    { char: 'ソ', romaji: 'so', group: 'Gojūon' },
    { char: 'タ', romaji: 'ta', group: 'Gojūon' },
    { char: 'チ', romaji: 'chi', group: 'Gojūon' },
    { char: 'ツ', romaji: 'tsu', group: 'Gojūon' },
    { char: 'テ', romaji: 'te', group: 'Gojūon' },
    { char: 'ト', romaji: 'to', group: 'Gojūon' },
    { char: 'ナ', romaji: 'na', group: 'Gojūon' },
    { char: 'ニ', romaji: 'ni', group: 'Gojūon' },
    { char: 'ヌ', romaji: 'nu', group: 'Gojūon' },
    { char: 'ネ', romaji: 'ne', group: 'Gojūon' },
    { char: 'ノ', romaji: 'no', group: 'Gojūon' },
    { char: 'ハ', romaji: 'ha', group: 'Gojūon' },
    { char: 'ヒ', romaji: 'hi', group: 'Gojūon' },
    { char: 'フ', romaji: 'fu', group: 'Gojūon' },
    { char: 'ヘ', romaji: 'he', group: 'Gojūon' },
    { char: 'ホ', romaji: 'ho', group: 'Gojūon' },
    { char: 'マ', romaji: 'ma', group: 'Gojūon' },
    { char: 'ミ', romaji: 'mi', group: 'Gojūon' },
    { char: 'ム', romaji: 'mu', group: 'Gojūon' },
    { char: 'メ', romaji: 'me', group: 'Gojūon' },
    { char: 'モ', romaji: 'mo', group: 'Gojūon' },
    { char: 'ヤ', romaji: 'ya', group: 'Yōon' },
    { char: 'ユ', romaji: 'yu', group: 'Yōon' },
    { char: 'ヨ', romaji: 'yo', group: 'Yōon' },
    { char: 'ラ', romaji: 'ra', group: 'Gojūon' },
    { char: 'リ', romaji: 'ri', group: 'Gojūon' },
    { char: 'ル', romaji: 'ru', group: 'Gojūon' },
    { char: 'レ', romaji: 're', group: 'Gojūon' },
    { char: 'ロ', romaji: 'ro', group: 'Gojūon' },
    { char: 'ワ', romaji: 'wa', group: 'Gojūon' },
    { char: 'ヲ', romaji: 'wo', group: 'Gojūon' },
    { char: 'ン', romaji: 'n', group: 'Gojūon' },
    { char: 'ガ', romaji: 'ga', group: 'Dakuten' },
    { char: 'ギ', romaji: 'gi', group: 'Dakuten' },
    { char: 'グ', romaji: 'gu', group: 'Dakuten' },
    { char: 'ゲ', romaji: 'ge', group: 'Dakuten' },
    { char: 'ゴ', romaji: 'go', group: 'Dakuten' },
    { char: 'ザ', romaji: 'za', group: 'Dakuten' },
    { char: 'ジ', romaji: 'ji', group: 'Dakuten' },
    { char: 'ズ', romaji: 'zu', group: 'Dakuten' },
    { char: 'ゼ', romaji: 'ze', group: 'Dakuten' },
    { char: 'ゾ', romaji: 'zo', group: 'Dakuten' },
    { char: 'ダ', romaji: 'da', group: 'Dakuten' },
    { char: 'ヂ', romaji: 'ji', group: 'Dakuten' },
    { char: 'ヅ', romaji: 'zu', group: 'Dakuten' },
    { char: 'デ', romaji: 'de', group: 'Dakuten' },
    { char: 'ド', romaji: 'do', group: 'Dakuten' },
    { char: 'バ', romaji: 'ba', group: 'Dakuten' },
    { char: 'ビ', romaji: 'bi', group: 'Dakuten' },
    { char: 'ブ', romaji: 'bu', group: 'Dakuten' },
    { char: 'ベ', romaji: 'be', group: 'Dakuten' },
    { char: 'ボ', romaji: 'bo', group: 'Dakuten' },
    { char: 'パ', romaji: 'pa', group: 'Handakuten' },
    { char: 'ピ', romaji: 'pi', group: 'Handakuten' },
    { char: 'プ', romaji: 'pu', group: 'Handakuten' },
    { char: 'ペ', romaji: 'pe', group: 'Handakuten' },
    { char: 'ポ', romaji: 'po', group: 'Handakuten' },
    { char: 'キャ', romaji: 'kya', group: 'Yōon' },
    { char: 'キュ', romaji: 'kyu', group: 'Yōon' },
    { char: 'キョ', romaji: 'kyo', group: 'Yōon' },
    { char: 'シャ', romaji: 'sha', group: 'Yōon' },
    { char: 'シュ', romaji: 'shu', group: 'Yōon' },
    { char: 'ショ', romaji: 'sho', group: 'Yōon' },
    { char: 'チャ', romaji: 'cha', group: 'Yōon' },
    { char: 'チュ', romaji: 'chu', group: 'Yōon' },
    { char: 'チョ', romaji: 'cho', group: 'Yōon' },
    { char: 'ニャ', romaji: 'nya', group: 'Yōon' },
    { char: 'ニュ', romaji: 'nyu', group: 'Yōon' },
    { char: 'ニョ', romaji: 'nyo', group: 'Yōon' },
    { char: 'ヒャ', romaji: 'hya', group: 'Yōon' },
    { char: 'ヒュ', romaji: 'hyu', group: 'Yōon' },
    { char: 'ヒョ', romaji: 'hyo', group: 'Yōon' },
    { char: 'ミャ', romaji: 'mya', group: 'Yōon' },
    { char: 'ミュ', romaji: 'myu', group: 'Yōon' },
    { char: 'ミョ', romaji: 'myo', group: 'Yōon' },
    { char: 'リャ', romaji: 'rya', group: 'Yōon' },
    { char: 'リュ', romaji: 'ryu', group: 'Yōon' },
    { char: 'リョ', romaji: 'ryo', group: 'Yōon' },
    { char: 'ギャ', romaji: 'gya', group: 'Yōon' },
    { char: 'ギュ', romaji: 'gyu', group: 'Yōon' },
    { char: 'ギョ', romaji: 'gyo', group: 'Yōon' },
    { char: 'ジャ', romaji: 'ja', group: 'Yōon' },
    { char: 'ジュ', romaji: 'ju', group: 'Yōon' },
    { char: 'ジョ', romaji: 'jo', group: 'Yōon' },
    { char: 'ビャ', romaji: 'bya', group: 'Yōon' },
    { char: 'ビュ', romaji: 'byu', group: 'Yōon' },
    { char: 'ビョ', romaji: 'byo', group: 'Yōon' },
    { char: 'ピャ', romaji: 'pya', group: 'Yōon' },
    { char: 'ピュ', romaji: 'pyu', group: 'Yōon' },
    { char: 'ピョ', romaji: 'pyo', group: 'Yōon' },
];

interface Kana {
    char: string;
    romaji: string;
    group: string;
}

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

const KanaTrainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'hiragana' | 'katakana'>('hiragana');
    const [customDrillChars, setCustomDrillChars] = useState<string[]>([]);
    const navigate = useNavigate();

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
            else if (kana.group && kana.group.includes('Yōon')) groups['Yōon'].push(kana);
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
        else if (groupType === 'Dakuten') chars = currentKanaList.filter(k => k.group === 'Dakuten' || k.group === 'Handakuten').map(k => k.char);
        else if (groupType === 'Yōon') chars = currentKanaList.filter(k => k.group?.includes('Yōon')).map(k => k.char);
        
        setCustomDrillChars(chars);
    };
    
    const handleStartDrill = () => {
        if (customDrillChars.length === 0) return;
        const drillConfig = {
            domain: 'kana',
            script: activeTab,
            selection: {
                kind: 'list',
                value: customDrillChars,
            },
            count: customDrillChars.length,
        };
        navigate('/test', { state: { prefillConfig: drillConfig } });
    };

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
                 <button onClick={handleStartDrill} disabled={customDrillChars.length === 0} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">
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
        </div>
    );
};

export default KanaTrainer;
