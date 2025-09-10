import React, { useState, useEffect, useRef } from 'react';
import { Volume2, CheckCircle, XCircle, ChevronRight, Play } from 'lucide-react';

// Added a type for the kana items for better type safety
interface KanaItem {
    char: string;
    romaji: string;
    group: string;
}

interface KanjiItem {
    id: number;
    character: string;
    meaning: string;
    onyomi: string[];
    kunyomi: string[];
    strokes: number;
    jlptLevel: number;
}

// Data Hiragana, Katakana, dan Kanji
const dataSets = {
    hiragana: [
        { char: "あ", romaji: "a", group: "a" }, { char: "い", romaji: "i", group: "a" }, { char: "う", romaji: "u", group: "a" }, { char: "え", romaji: "e", group: "a" }, { char: "お", romaji: "o", group: "a" },
        { char: "か", romaji: "ka", group: "k" }, { char: "き", romaji: "ki", group: "k" }, { char: "く", romaji: "ku", group: "k" }, { char: "け", romaji: "ke", group: "k" }, { char: "こ", romaji: "ko", group: "k" },
        { char: "さ", romaji: "sa", group: "s" }, { char: "し", romaji: "shi", group: "s" }, { char: "す", romaji: "su", group: "s" }, { char: "せ", romaji: "se", group: "s" }, { char: "そ", romaji: "so", group: "s" },
        { char: "た", romaji: "ta", group: "t" }, { char: "ち", romaji: "chi", group: "t" }, { char: "つ", romaji: "tsu", group: "t" }, { char: "て", romaji: "te", group: "t" }, { char: "と", romaji: "to", group: "t" },
        { char: "な", romaji: "na", group: "n" }, { char: "に", romaji: "ni", group: "n" }, { char: "ぬ", romaji: "nu", group: "n" }, { char: "ね", romaji: "ne", group: "n" }, { char: "の", romaji: "no", group: "n" },
        { char: "は", romaji: "ha", group: "h" }, { char: "ひ", romaji: "hi", group: "h" }, { char: "ふ", romaji: "fu", group: "h" }, { char: "へ", romaji: "he", group: "h" }, { char: "ほ", romaji: "ho", group: "h" },
        { char: "ま", romaji: "ma", group: "m" }, { char: "み", romaji: "mi", group: "m" }, { char: "む", romaji: "mu", group: "m" }, { char: "め", "romaji": "me", group: "m" }, { char: "も", romaji: "mo", group: "m" },
        { char: "や", romaji: "ya", group: "y" }, { char: "ゆ", romaji: "yu", group: "y" }, { char: "よ", romaji: "yo", group: "y" },
        { char: "ら", romaji: "ra", group: "r" }, { char: "り", romaji: "ri", group: "r" }, { char: "る", romaji: "ru", group: "r" }, { char: "れ", romaji: "re", group: "r" }, { char: "ろ", romaji: "ro", group: "r" },
        { char: "わ", romaji: "wa", group: "w" }, { char: "を", romaji: "wo", group: "w" },
        { char: "ん", romaji: "n", group: "n_special" }
    ],
    katakana: [
        { char: "ア", romaji: "a", group: "a" }, { char: "イ", romaji: "i", group: "a" }, { char: "ウ", romaji: "u", group: "a" }, { char: "エ", romaji: "e", group: "a" }, { char: "オ", romaji: "o", group: "a" },
        { char: "カ", romaji: "ka", group: "k" }, { char: "キ", romaji: "ki", group: "k" }, { char: "ク", romaji: "ku", group: "k" }, { char: "ケ", romaji: "ke", group: "k" }, { char: "コ", romaji: "ko", group: "k" },
        { char: "サ", romaji: "sa", group: "s" }, { char: "シ", romaji: "shi", group: "s" }, { char: "ス", romaji: "su", group: "s" }, { char: "セ", romaji: "se", group: "s" }, { char: "ソ", romaji: "so", group: "s" },
        { char: "タ", romaji: "ta", group: "t" }, { char: "チ", romaji: "chi", group: "t" }, { char: "ツ", romaji: "tsu", group: "t" }, { char: "テ", romaji: "te", group: "t" }, { char: "ト", romaji: "to", group: "t" },
        { char: "ナ", romaji: "na", group: "n" }, { char: "ニ", romaji: "ni", group: "n" }, { char: "ヌ", romaji: "nu", group: "n" }, { char: "ネ", romaji: "ne", group: "n" }, { char: "ノ", romaji: "no", group: "n" },
        { char: "ハ", romaji: "ha", group: "h" }, { char: "ヒ", romaji: "hi", group: "h" }, { char: "フ", romaji: "fu", group: "h" }, { char: "ヘ", romaji: "he", group: "h" }, { char: "ホ", romaji: "ho", group: "h" },
        { char: "マ", romaji: "ma", group: "m" }, { char: "ミ", romaji: "mi", group: "m" }, { char: "ム", romaji: "mu", group: "m" }, { char: "メ", romaji: "me", group: "m" }, { char: "モ", romaji: "mo", group: "m" },
        { char: "ヤ", romaji: "ya", group: "y" }, { char: "ユ", romaji: "yu", group: "y" }, { char: "ヨ", romaji: "yo", group: "y" },
        { char: "ラ", romaji: "ra", group: "r" }, { char: "リ", romaji: "ri", group: "r" }, { char: "ル", romaji: "ru", group: "r" }, { char: "レ", romaji: "re", group: "r" }, { char: "ロ", romaji: "ro", group: "r" },
        { char: "ワ", romaji: "wa", group: "w" }, { char: "ヲ", romaji: "wo", group: "w" },
        { char: "ン", romaji: "n", group: "n_special" }
    ],
    kanji: [
        { id: 1, character: "日", meaning: "Sun, day", onyomi: ["ニチ", "ジツ"], kunyomi: ["ひ", "び", "か"], strokes: 4, jlptLevel: 5 },
        { id: 2, character: "본", meaning: "Book, origin", onyomi: ["ホン"], kunyomi: ["もと"], strokes: 5, jlptLevel: 5 },
        { id: 3, character: "人", meaning: "Person", onyomi: ["ジン", "ニン"], kunyomi: ["ひと"], strokes: 2, jlptLevel: 5 },
        { id: 4, character: "大", meaning: "Big, large", onyomi: ["ダイ", "タイ"], kunyomi: ["おお"], strokes: 3, jlptLevel: 5 },
        { id: 5, character: "학", meaning: "Study, learn", onyomi: ["ガク"], kunyomi: ["まな(ぶ)"], strokes: 8, jlptLevel: 5 },
        { id: 6, character: "수", meaning: "Water", onyomi: ["スイ"], kunyomi: ["みず"], strokes: 4, jlptLevel: 5 },
        { id: 7, character: "상", meaning: "Up, above", onyomi: ["ジョウ", "ショウ"], kunyomi: ["うえ", "あ(がる)", "かみ"], strokes: 3, jlptLevel: 5 },
        { id: 8, character: "하", meaning: "Down, below", onyomi: ["カ", "ゲ"], kunyomi: ["した", "さ(がる)"], strokes: 3, jlptLevel: 5 },
        { id: 9, character: "전", meaning: "Before, in front", onyomi: ["ゼン"], kunyomi: ["まえ"], strokes: 9, jlptLevel: 5 },
        { id: 10, character: "후", meaning: "After, behind", onyomi: ["ゴ", "コウ"], kunyomi: ["あと", "うし(ろ)"], strokes: 9, jlptLevel: 5 },
        { id: 11, character: "화", meaning: "To talk", onyomi: ["ワ"], kunyomi: ["はな(す)", "はなし"], strokes: 13, jlptLevel: 5 },
        { id: 12, character: "수", meaning: "Hand", onyomi: ["シュ"], kunyomi: ["て"], strokes: 4, jlptLevel: 5 },
        { id: 13, character: "원", meaning: "Yen, circle", onyomi: ["エン"], kunyomi: ["まる(い)"], strokes: 4, jlptLevel: 5 },
        { id: 14, character: "시", meaning: "Time", onyomi: ["ジ"], kunyomi: ["とき"], strokes: 10, jlptLevel: 5 },
        { id: 15, character: "분", meaning: "Minute, to divide", onyomi: ["ブン", "フン", "プン"], kunyomi: ["わ(ける)"], strokes: 4, jlptLevel: 5 },
    ],
};

const KANA_ORDER: Array<{ key: string; hira: string; kata: string; group: string }> = [
    { key: "a", hira: "あ", kata: "ア", group: "a" }, { key: "i", hira: "い", kata: "イ", group: "a" }, { key: "u", hira: "う", kata: "ウ", group: "a" }, { key: "e", hira: "え", kata: "エ", group: "a" }, { key: "o", hira: "お", kata: "オ", group: "a" },
    { key: "ka", hira: "か", kata: "カ", group: "ka" }, { key: "ki", hira: "き", kata: "キ", group: "ka" }, { key: "ku", hira: "く", kata: "ク", group: "ka" }, { key: "ke", hira: "け", kata: "ケ", group: "ka" }, { key: "ko", hira: "こ", kata: "コ", group: "ka" },
    { key: "sa", hira: "さ", kata: "サ", group: "sa" }, { key: "shi", hira: "し", kata: "シ", group: "sa" }, { key: "su", hira: "す", kata: "ス", group: "sa" }, { key: "se", hira: "せ", kata: "セ", group: "sa" }, { key: "so", hira: "そ", kata: "ソ", group: "sa" },
    { key: "ta", hira: "た", kata: "タ", group: "ta" }, { key: "chi", hira: "ち", kata: "チ", group: "ta" }, { key: "tsu", hira: "つ", kata: "ツ", group: "ta" }, { key: "te", hira: "て", kata: "テ", group: "ta" }, { key: "to", hira: "と", kata: "ト", group: "ta" },
    { key: "na", hira: "な", kata: "ナ", group: "na" }, { key: "ni", hira: "に", kata: "ニ", group: "na" }, { key: "nu", hira: "ぬ", kata: "ヌ", group: "na" }, { key: "ne", hira: "ね", kata: "ネ", group: "na" }, { key: "no", hira: "の", kata: "ノ", group: "na" },
    { key: "ha", hira: "は", kata: "ハ", group: "ha" }, { key: "hi", hira: "ひ", kata: "ヒ", group: "ha" }, { key: "fu", hira: "ふ", kata: "フ", group: "ha" }, { key: "he", hira: "へ", kata: "ヘ", group: "ha" }, { key: "ho", hira: "ほ", kata: "ホ", group: "ha" },
    { key: "ma", hira: "ま", kata: "マ", group: "ma" }, { key: "mi", hira: "み", kata: "ミ", group: "ma" }, { key: "mu", hira: "む", kata: "ム", group: "ma" }, { key: "me", hira: "め", kata: "メ", group: "ma" }, { key: "mo", hira: "も", kata: "モ", group: "ma" },
    { key: "ya", hira: "や", kata: "ヤ", group: "ya" }, { key: "yu", hira: "ゆ", kata: "ユ", group: "ya" }, { key: "yo", hira: "よ", kata: "ヨ", group: "yo" },
    { key: "ra", hira: "ら", kata: "ラ", group: "ra" }, { key: "ri", hira: "り", kata: "リ", group: "ra" }, { key: "ru", hira: "る", kata: "ル", group: "ra" }, { key: "re", hira: "れ", kata: "レ", group: "ra" }, { key: "ro", hira: "ろ", kata: "ロ", group: "ra" },
    { key: "wa", hira: "わ", kata: "ワ", group: "wa" }, { key: "wo", hira: "を", kata: "ヲ", group: "wo" }, { key: "n", hira: "ん", kata: "ン", group: "n" },
    { key: "ga", hira: "が", kata: "ガ", group: "ga" }, { key: "gi", hira: "ぎ", kata: "ギ", group: "ga" }, { key: "gu", hira: "ぐ", kata: "グ", group: "ga" }, { key: "ge", hira: "げ", kata: "ゲ", group: "ga" }, { key: "go", hira: "ご", kata: "ゴ", group: "ga" },
    { key: "za", hira: "ざ", kata: "ザ", group: "za" }, { key: "ji", hira: "じ", kata: "ジ", group: "za" }, { key: "zu", hira: "ず", kata: "ズ", group: "za" }, { key: "ze", hira: "ぜ", kata: "ゼ", group: "za" }, { key: "zo", hira: "ぞ", kata: "ゾ", group: "za" },
    { key: "da", hira: "だ", kata: "ダ", group: "da" }, { key: "ji", hira: "ぢ", kata: "ヂ", group: "da" }, { key: "zu", hira: "づ", kata: "ヅ", group: "da" }, { key: "de", hira: "で", kata: "デ", group: "da" }, { key: "do", hira: "ど", kata: "ド", group: "da" },
    { key: "ba", hira: "ば", kata: "バ", group: "ba" }, { key: "bi", hira: "び", kata: "ビ", group: "ba" }, { key: "bu", hira: "ぶ", kata: "ブ", group: "ba" }, { key: "be", hira: "べ", kata: "ベ", group: "ba" }, { key: "bo", hira: "ぼ", kata: "ボ", group: "ba" },
    { key: "pa", hira: "ぱ", kata: "パ", group: "pa" }, { key: "pi", hira: "ぴ", kata: "ピ", group: "pa" }, { key: "pu", hira: "ぷ", kata: "プ", group: "pa" }, { key: "pe", hira: "ぺ", kata: "ペ", group: "pa" }, { key: "po", hira: "ぽ", kata: "ポ", group: "pa" },
    { key: "kya", hira: "きゃ", kata: "キャ", group: "kya" }, { key: "kyu", hira: "きゅ", kata: "キュ", group: "kya" }, { key: "kyo", hira: "きょ", kata: "キョ", group: "kya" },
    { key: "sha", hira: "しゃ", kata: "シャ", group: "sha" }, { key: "shu", hira: "しゅ", kata: "シュ", group: "sha" }, { key: "sho", hira: "しょ", kata: "ショ", group: "sha" },
    { key: "cha", hira: "ちゃ", kata: "チャ", group: "cha" }, { key: "chu", hira: "ちゅ", kata: "チュ", group: "cha" }, { key: "cho", hira: "ちょ", kata: "チョ", group: "cha" },
    { key: "nya", hira: "にゃ", kata: "ニャ", group: "nya" }, { key: "nyu", hira: "にゅ", kata: "ニュ", group: "nya" }, { key: "nyo", hira: "にょ", kata: "ニョ", group: "nya" },
    { key: "hya", hira: "ひゃ", kata: "ヒャ", group: "hya" }, { key: "hyu", hira: "ひゅ", kata: "ヒュ", group: "hya" }, { key: "hyo", hira: "ひょ", kata: "ヒョ", group: "hya" },
    { key: "mya", hira: "みゃ", kata: "ミャ", group: "mya" }, { key: "myu", hira: "みゅ", kata: "ミュ", group: "mya" }, { key: "myo", hira: "みょ", kata: "ミョ", group: "mya" },
    { key: "rya", hira: "りゃ", kata: "リャ", group: "rya" }, { key: "ryu", hira: "りゅ", kata: "リュ", group: "rya" }, { key: "ryo", hira: "りょ", kata: "リョ", group: "rya" },
    { key: "gya", hira: "ぎゃ", kata: "ギャ", group: "gya" }, { key: "gyu", hira: "ぎゅ", kata: "ギュ", group: "gya" }, { key: "gyo", hira: "ぎょ", kata: "ギョ", group: "gya" },
    { key: "ja", hira: "じゃ", kata: "ジャ", group: "ja" }, { key: "ju", hira: "じゅ", kata: "ジュ", group: "ja" }, { key: "jo", hira: "じょ", kata: "ジョ", group: "ja" },
    { key: "bya", hira: "びゃ", kata: "ビャ", group: "bya" }, { key: "byu", hira: "びゅ", kata: "ビュ", group: "bya" }, { key: "byo", hira: "びょ", kata: "ビョ", group: "bya" },
    { key: "pya", hira: "ぴゃ", kata: "パ", group: "pya" }, { key: "pyu", hira: "ぴゅ", kata: "ピュ", group: "pya" }, { key: "pyo", hira: "ぴょ", kata: "ピョ", group: "pya" },
];

// Definisi Tipe Data
export type SelectionMode = "range" | "single" | "preset";
export type Selection =
    | { kind: "range"; value: { from: string; to: string } }
    | { kind: "single"; value: string[] }
    | { kind: "preset"; value: "all" | "aiueo" | "base" | "dakuten" | "youon" | "jft" | "pairswap" };

export interface TestConfig {
    domain: "kana";
    script: "hiragana" | "katakana" | "both";
    direction: "kana-to-romaji" | "romaji-to-kana";
    mode: "typing" | "mcq" | "listening";
    count: number;
    selection: Selection;
    challenge: { enabled: boolean; durationSec: number };
    createdAt: string;
}


// Fungsi untuk mengacak array
const shuffleArray = <T extends any[]>(array: T): T => {
    let newArray = [...array] as T;
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Komponen untuk menampilkan kartu Kanji
const KanjiCard: React.FC<{ item: KanjiItem }> = ({ item }) => (
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

const KanjiLearn: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Beginner Kanji (N5-N4 Level)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {dataSets.kanji.map(item => (
                    <KanjiCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

// Util untuk normalisasi input
const normalize = (s: string): string => s.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
const keyIndex = new Map(KANA_ORDER.map((x, i) => [x.key, i]));

// Fungsi untuk menyelesaikan seleksi
const resolveSelection = (sel: Selection): { keys: string[], invalidTokens: string[] } => {
    let resolvedKeys: string[] = [];
    let invalidTokens: string[] = [];
    const allKeys = KANA_ORDER.map(x => x.key);

    if (sel.kind === "preset") {
        if (sel.value === "all") resolvedKeys = allKeys;
        if (sel.value === "aiueo") resolvedKeys = ["a", "i", "u", "e", "o"];
        if (sel.value === "base") resolvedKeys = KANA_ORDER.filter(item => item.group.length === 1 && !['y', 'w', 'n'].includes(item.group)).map(x => x.key);
        if (sel.value === "dakuten") resolvedKeys = KANA_ORDER.filter(item => ["g", "z", "d", "b", "p"].includes(item.group)).map(x => x.key);
        if (sel.value === "youon") resolvedKeys = KANA_ORDER.filter(item => item.key.length === 3).map(x => x.key);
    }

    if (sel.kind === "single") {
        const tokens = normalize(sel.value.join(" ")).split(" ").filter(Boolean);
        const uniqueTokens = Array.from(new Set(tokens));
        resolvedKeys = uniqueTokens.filter(t => keyIndex.has(t));
        invalidTokens = uniqueTokens.filter(t => !keyIndex.has(t));
    }

    if (sel.kind === "range") {
        const from = normalize(sel.value.from);
        const to = normalize(sel.value.to);
        const a = keyIndex.get(from);
        const b = keyIndex.get(to);

        if (a != null && b != null) {
            const [lo, hi] = a <= b ? [a, b] : [b, a];
            resolvedKeys = KANA_ORDER.slice(lo, hi + 1).map(x => x.key);
        }
    }

    return { keys: resolvedKeys, invalidTokens };
};

// Fungsi untuk membangun bank soal dari selection
const buildKanaBank = (cfg: TestConfig) => {
    const { keys } = resolveSelection(cfg.selection);
    const items = KANA_ORDER.filter(x => keys.includes(x.key));
    const pickChar = (x: typeof KANA_ORDER[number]) =>
        cfg.script === "hiragana" ? x.hira : cfg.script === "katakana" ? x.kata : [x.hira, x.kata][Math.random() < .5 ? 0 : 1];

    return items.map(x => ({
        romaji: x.key,
        kana: pickChar(x)
    }));
};

const App = () => {
    const [currentView, setCurrentView] = useState('kana');
    const [testSet, setTestSet] = useState<'hiragana' | 'katakana' | 'both' | 'kanji'>('both');
    const [qType, setQType] = useState('k2r');
    const [answerMode, setAnswerMode] = useState('type');
    const [testCount, setTestCount] = useState(25);
    const [sylPerItem, setSylPerItem] = useState(3);
    const [challengeMode, setChallengeMode] = useState(false);
    const [duration, setDuration] = useState(3);
    const [selectionMode, setSelectionMode] = useState<SelectionMode>("range");
    const [rangeFrom, setRangeFrom] = useState('a');
    const [rangeTo, setRangeTo] = useState('n');
    const [singleGroup, setSingleGroup] = useState('a i u e o');
    const [selection, setSelection] = useState<Selection>({ kind: "range", value: { from: 'a', to: 'n' } });

    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [testItems, setTestItems] = useState<any[]>([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [streak, setStreak] = useState(0);
    const [incorrectlyAnswered, setIncorrectlyAnswered] = useState<any[]>([]);

    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const answerInputRef = useRef<HTMLInputElement>(null);

    const isTypingMode = answerMode === 'type';
    const isListeningType = qType.includes('audio');
    const isKanjiTest = testSet === 'kanji';

    const currentKanaBank = buildKanaBank({
        domain: "kana",
        script: testSet === 'hiragana' || testSet === 'katakana' ? testSet : 'both',
        direction: "kana-to-romaji",
        mode: "typing",
        count: 0,
        selection: selection,
        challenge: { enabled: false, durationSec: 60 },
        createdAt: new Date().toISOString()
    });
    const previewCount = currentKanaBank.length;
    const invalidTokens = selectionMode === "single" ? resolveSelection(selection).invalidTokens : [];
    const startButtonDisabled = previewCount === 0 || testCount > previewCount * 4;

    useEffect(() => {
        if (isTestActive && challengeMode) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        finishTest();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearTimeout(timerRef.current as ReturnType<typeof setTimeout>);
    }, [isTestActive, challengeMode, timeLeft]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isTestActive || isTestFinished) return;
            if (e.key === 'Enter') {
                if (answerMode === 'type') {
                    handleCheck();
                }
            } else if (e.key === 'ArrowRight') {
                handleSkip();
            } else if (e.key.toLowerCase() === 'r' && (qType === 'audio_k2r' || qType === 'audio_r2k')) {
                const currentQuestion = testItems[currentItemIndex];
                if (currentQuestion) {
                    playAudio(currentQuestion.qItem.char);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isTestActive, isTestFinished, answerMode, qType, currentItemIndex, testItems]);

    useEffect(() => {
        if (isTestActive && answerInputRef.current && answerMode === 'type') {
            answerInputRef.current.focus();
        }
    }, [currentItemIndex, isTestActive, answerMode]);

    useEffect(() => {
        const storedSelection = localStorage.getItem('test.selection');
        if (storedSelection) {
            const parsedSelection = JSON.parse(storedSelection);
            if (parsedSelection.kind === "range") {
                setSelectionMode("range");
                setRangeFrom(parsedSelection.value.from);
                setRangeTo(parsedSelection.value.to);
            } else if (parsedSelection.kind === "single") {
                setSelectionMode("single");
                setSingleGroup(parsedSelection.value.join(' '));
            }
            setSelection(parsedSelection);
        }
    }, []);

    useEffect(() => {
        if (!isTestActive) {
            const newSelection = selectionMode === "range"
                ? { kind: "range", value: { from: rangeFrom, to: rangeTo } }
                : { kind: "single", value: singleGroup.split(" ") };
            setSelection(newSelection as Selection);
            localStorage.setItem('test.selection', JSON.stringify(newSelection));
        }
    }, [selectionMode, rangeFrom, rangeTo, singleGroup, isTestActive]);

    const playAudio = (text: string, lang = 'ja-JP') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Browser Anda tidak mendukung text-to-speech.');
        }
    };

    const generateTestItems = () => {
        const testConfig: TestConfig = {
            domain: "kana",
            script: testSet === 'hiragana' || testSet === 'katakana' ? testSet : 'both',
            direction: "kana-to-romaji", // unused for now
            mode: "typing", // unused for now
            count: testCount,
            selection: selection,
            challenge: { enabled: challengeMode, durationSec: duration * 60 },
            createdAt: new Date().toISOString()
        };

        const bank = buildKanaBank(testConfig);
        const items = [];
        for (let i = 0; i < testConfig.count; i++) {
            let qItem: any, options: string[] = [];
            
            // Dapatkan item pertanyaan acak dari bank
            qItem = bank[Math.floor(Math.random() * bank.length)];
            
            items.push({ qItem, options });
        }
        setTestItems(items);
        setCurrentItemIndex(0);
        setUserAnswer('');
        setIsAnswerCorrect(null);
        setCorrectCount(0);
        setIncorrectCount(0);
        setStreak(0);
        setIncorrectlyAnswered([]);
    };

    const startTest = () => {
        generateTestItems();
        setIsTestActive(true);
        setIsTestFinished(false);
        if (challengeMode) {
            setTimeLeft(duration * 60);
        }
        window.dispatchEvent(new CustomEvent("test:start", { detail: { 
            domain: "kana",
            script: testSet,
            count: testCount,
            selection: selection,
            challenge: { enabled: challengeMode, durationSec: duration * 60 },
            createdAt: new Date().toISOString()
        } }));
    };

    const handleAnswer = (answer: string) => {
        const currentItem = testItems[currentItemIndex];
        const isKanjiTest = testSet === 'kanji';
        const correctAnswer = isKanjiTest ? (currentItem.qItem as KanjiItem).meaning : (currentItem.qItem as KanaItem).romaji;
        const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();
        setIsAnswerCorrect(isCorrect);

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setStreak(prev => prev + 1);
        } else {
            setIncorrectCount(prev => prev + 1);
            setStreak(0);
            setIncorrectlyAnswered(prev => {
                const itemToAdd = isKanjiTest ? currentItem.qItem : { char: (currentItem.qItem as KanaItem).char, romaji: (currentItem.qItem as KanaItem).romaji };
                if (!prev.find(item => item.character === itemToAdd.character || item.char === itemToAdd.char)) {
                    return [...prev, itemToAdd];
                }
                return prev;
            });
        }

        setTimeout(() => {
            if (currentItemIndex + 1 >= testCount) {
                finishTest();
            } else {
                setCurrentItemIndex(prev => prev + 1);
                setUserAnswer('');
                setIsAnswerCorrect(null);
            }
        }, 500);
    };

    const handleCheck = () => {
        if (!userAnswer.trim()) return;
        handleAnswer(userAnswer);
    };

    const handleSkip = () => {
        setIncorrectCount(prev => prev + 1);
        setStreak(0);
        setIncorrectlyAnswered(prev => {
            const currentItem = testItems[currentItemIndex];
            const isKanjiTest = testSet === 'kanji';
            const itemToAdd = isKanjiTest ? currentItem.qItem : { char: (currentItem.qItem as KanaItem).char, romaji: (currentItem.qItem as KanaItem).romaji };
            if (!prev.find(item => item.character === itemToAdd.character || item.char === itemToAdd.char)) {
                return [...prev, itemToAdd];
            }
            return prev;
        });

        if (currentItemIndex + 1 >= testCount) {
                finishTest();
            } else {
                setCurrentItemIndex(prev => prev + 1);
                setUserAnswer('');
                setIsAnswerCorrect(null);
            }
    };

    const finishTest = () => {
        setIsTestActive(false);
        setIsTestFinished(true);
        clearTimeout(timerRef.current as ReturnType<typeof setTimeout>);
    };

    const restartTest = () => {
        setIsTestFinished(false);
        setIsTestActive(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const progressBarWidth = testCount > 0 ? (currentItemIndex / testCount) * 100 : 0;
    const currentQuestion = testItems[currentItemIndex];

    return (
        <div className="p-6 font-sans antialiased bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200">
            <style>{`
                .mc-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                @media (min-width: 860px) { .mc-grid { grid-template-columns: repeat(4, 1fr); } }
                .mc-btn {
                    padding: 1rem; border-radius: 0.5rem; text-align: center; font-size: 1.5rem; font-weight: bold;
                    background-color: #f1f5f9; color: #1e293b; transition: all 0.2s;
                    border: 2px solid #e2e8f0;
                }
                .dark .mc-btn { background-color: #334155; color: #e2e8f0; border-color: #475569; }
                .mc-btn:hover { background-color: #e2e8f0; transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .dark .mc-btn:hover { background-color: #475569; }
                .row.center { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
                @media (min-width: 640px) { .row.center { flex-direction: row; justify-content: center; } }
            `}</style>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Navigation Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => { setCurrentView('kana'); restartTest(); }}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                            currentView === 'kana' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                    >
                        Latihan Kana
                    </button>
                    <button
                        onClick={() => setCurrentView('kanji')}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                            currentView === 'kanji' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-400 dark:hover:bg-slate-600'
                        }`}
                    >
                        Belajar Kanji
                    </button>
                </div>

                {/* Conditional Rendering */}
                {currentView === 'kanji' ? (
                    <KanjiLearn />
                ) : !isTestActive ? (
                    isTestFinished ? (
                        <div className="flex flex-col items-center justify-center p-6">
                            <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                                <h2 className="text-3xl font-bold mb-4">Tes Selesai!</h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">Berikut ringkasan hasil Anda.</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/50 p-4 rounded-lg">
                                        <span className="flex items-center font-semibold text-green-700 dark:text-green-300"><CheckCircle className="mr-2" /> Jawaban Benar</span>
                                        <span className="text-lg font-bold">{correctCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">
                                        <span className="flex items-center font-semibold text-red-700 dark:text-red-300"><XCircle className="mr-2" /> Jawaban Salah</span>
                                        <span className="text-lg font-bold">{incorrectCount}</span>
                                    </div>
                                </div>
                                {incorrectlyAnswered.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold mb-3">Latihan lagi untuk ini:</h3>
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {incorrectlyAnswered.map(item => (
                                                <div key={item.char || item.character} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-medium">
                                                    {item.character || item.char} ({item.romaji || item.meaning})
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <button onClick={restartTest} className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                    Coba Lagi
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <h2 className="text-3xl font-bold">Latihan Hiragana & Katakana</h2>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="testSet" className="font-semibold mb-1">Set:</label>
                                        <select id="testSet" value={testSet} onChange={e => setTestSet(e.target.value as 'hiragana' | 'katakana' | 'both' | 'kanji')}
                                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                                            <option value="hiragana">Hiragana</option>
                                            <option value="katakana">Katakana</option>
                                            <option value="both">Keduanya</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="qType" className="font-semibold mb-1">Tipe Soal:</label>
                                        <select id="qType" value={qType} onChange={e => setQType(e.target.value)}
                                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700" disabled={testSet === 'kanji'}>
                                            <option value="k2r">Kana → Romaji</option>
                                            <option value="r2k">Romaji → Kana</option>
                                            <option value="seq">Rangkaian Romaji → Kana</option>
                                            <option value="audio_k2r">Listening (Kana → Romaji)</option>
                                            <option value="audio_r2k">Listening (Romaji → Kana)</option>
                                            <option value="kseq">Kana Sequence (Ketik Romaji)</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="answerMode" className="font-semibold mb-1">Mode Jawaban:</label>
                                        <select id="answerMode" value={answerMode} onChange={e => setAnswerMode(e.target.value)}
                                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                                            <option value="type">Ketik</option>
                                            <option value="mc">Pilihan Ganda</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="testCount" className="font-semibold mb-1">Jumlah Soal:</label>
                                        <input id="testCount" type="number" min="1" value={testCount} onChange={e => setTestCount(parseInt(e.target.value))}
                                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700" />
                                        <div className="flex gap-2 mt-2">
                                            {[10, 25, 50, 100].map(count => (
                                                <button key={count} onClick={() => setTestCount(count)}
                                                    className="px-3 py-1 text-sm rounded-full bg-slate-200 dark:bg-slate-700">
                                                    {count}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                    <div className="flex flex-col">
                                        <label htmlFor="selectionMode" className="font-semibold mb-2">Pilih mode:</label>
                                        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                                            <button onClick={() => setSelectionMode('range')} className={`flex-1 py-2 rounded-lg font-medium transition-colors ${selectionMode === 'range' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Rentang</button>
                                            <button onClick={() => setSelectionMode('single')} className={`flex-1 py-2 rounded-lg font-medium transition-colors ${selectionMode === 'single' ? 'bg-blue-600 text-white shadow-sm' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Grup Tunggal</button>
                                        </div>
                                    </div>
                                    {selectionMode === 'range' ? (
                                        <div className="flex flex-col">
                                            <div className="flex gap-2 items-center mb-1">
                                                <input type="text" value={rangeFrom} onChange={e => setRangeFrom(e.target.value)} placeholder="Dari (contoh: a)" className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 placeholder-slate-400" />
                                                <span className="font-semibold text-slate-500">→</span>
                                                <input type="text" value={rangeTo} onChange={e => setRangeTo(e.target.value)} placeholder="Sampai (contoh: m)" className="flex-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 placeholder-slate-400" />
                                            </div>
                                            <p className="text-sm text-slate-500 italic">Jika 'Dari' &gt; 'Sampai', sistem akan menukar otomatis.</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <input type="text" value={singleGroup} onChange={e => setSingleGroup(e.target.value)} placeholder="a i u e o" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 placeholder-slate-400 mb-1" />
                                            <p className="text-sm text-slate-500 italic">Pisahkan dengan spasi. Contoh: a ka sa shi kyo.</p>
                                            {invalidTokens.length > 0 && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    Beberapa token diabaikan karena tidak dikenali: {invalidTokens.slice(0, 3).join(', ')}{invalidTokens.length > 3 ? '...' : ''}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-center p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-medium">
                                        Dipilih: {previewCount} huruf
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <input type="checkbox" id="challengeMode" checked={challengeMode} onChange={e => setChallengeMode(e.target.checked)} className="rounded text-blue-600" />
                                    <label htmlFor="challengeMode" className="font-semibold">Challenge Mode</label>
                                    {challengeMode && (
                                        <select value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700">
                                            <option value={1}>1 menit</option>
                                            <option value={3}>3 menit</option>
                                            <option value={5}>5 menit</option>
                                            <option value={10}>10 menit</option>
                                        </select>
                                    )}
                                </div>
                                <button
                                    onClick={startTest}
                                    id="btnStart"
                                    className={`w-full font-bold py-3 rounded-lg shadow-md transition-all mt-4 ${startButtonDisabled ? 'bg-slate-400 dark:bg-slate-600 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    title="Tekan Enter untuk memeriksa jawaban, → untuk melewati"
                                    disabled={startButtonDisabled}
                                >
                                    Mulai Tes
                                </button>
                                {startButtonDisabled && (
                                    <p className="text-center text-red-500 mt-2">
                                        Pilih rentang/daftar yang valid atau atur jumlah soal lebih rendah.
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                ) : (
                    // In-test UI
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div id="progressbar" className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressBarWidth}%` }}></div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl text-center space-y-6">
                            {challengeMode && (
                                <p id="challengeTimeLeft" aria-live="polite" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    Sisa: {formatTime(timeLeft)}
                                </p>
                            )}

                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Soal {currentItemIndex + 1} dari {testCount}
                            </div>

                            <div className="min-h-[10rem] flex flex-col items-center justify-center">
                                {/* Prompt Area */}
                                {isKanjiTest ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <p id="qKanji" className="text-9xl font-bold">{currentQuestion?.qItem?.character}</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <p id="qKana" className="text-9xl font-bold">{currentQuestion?.qItem?.char}</p>
                                        {isListeningType && (
                                            <button onClick={() => playAudio((currentQuestion?.qItem as KanaItem).char)} aria-label="Putar audio kembali" className="p-3 rounded-full bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors">
                                                <Volume2 className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                                            </button>
                                        )}
                                    </div>
                                )}
                                {(qType === 'seq' || qType === 'kseq') && (
                                    <p id="qRomaji" className="text-5xl font-bold">{currentQuestion?.qItem?.romaji}</p>
                                )}
                            </div>

                            {/* Jawaban */}
                            {isTypingMode ? (
                                <div className="space-y-4">
                                    <input
                                        id="ans"
                                        type="text"
                                        value={userAnswer}
                                        onChange={e => setUserAnswer(e.target.value)}
                                        placeholder="Ketik jawaban di sini"
                                        ref={answerInputRef}
                                        className="w-full text-center text-2xl p-4 rounded-lg bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <button id="btnCheck" onClick={handleCheck} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                        Periksa Jawaban
                                    </button>
                                </div>
                            ) : (
                                <div className="mc-grid">
                                    {currentQuestion?.options.map((option: string) => (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(option)}
                                            className="mc-btn">
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Feedback dan Streak */}
                            <div className="flex flex-col items-center gap-2">
                                {isAnswerCorrect === true && (
                                    <div className="flex items-center text-green-600 font-semibold transition-transform duration-300 animate-pulse">
                                        <CheckCircle className="h-5 w-5 mr-2" /> Benar!
                                    </div>
                                )}
                                {isAnswerCorrect === false && (
                                    <div className="flex items-center text-red-600 font-semibold transition-transform duration-300 animate-pulse">
                                        <XCircle className="h-5 w-5 mr-2" /> Salah.
                                    </div>
                                )}
                                <p className={`text-xl font-bold ${isAnswerCorrect ? 'text-green-600' : 'text-slate-500'}`}>
                                    Streak: {streak}
                                </p>
                            </div>

                            <div className="row center mt-6">
                                <button onClick={handleSkip} id="btnSkip" className="px-5 py-2 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-400 dark:hover:bg-slate-600 transition-all" title="Tekan → untuk melewati">
                                    <ChevronRight className="h-5 w-5 inline-block mr-2" /> Lewati
                                </button>
                                <button onClick={finishTest} id="btnEnd" className="px-5 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all">
                                    Selesai Tes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
