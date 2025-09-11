import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Volume2, CheckCircle, XCircle, ChevronRight, Play, Award, Clock, Search, ListFilter } from 'lucide-react';

// --- Data & Konfigurasi ---
// Interface untuk entri Kana di KANA_ORDER_FULL
interface KanaOrderEntry {
    key: string; // Romaji key like 'a', 'ka', 'kya'
    hira: string; // Hiragana character
    kata: string; // Katakana character
    group: string; // Group key like 'a', 'k', 'kya'
    type: "base" | "dakuten" | "youon"; // Type of kana
}

// Data lengkap Hiragana, Katakana, dan Romaji mappings
export const KANA_ORDER_FULL: KanaOrderEntry[] = [
    { key: "a", hira: "あ", kata: "ア", group: "a", type: "base" }, { key: "i", hira: "い", kata: "イ", group: "a", type: "base" }, { key: "u", hira: "う", kata: "ウ", group: "a", type: "base" }, { key: "e", hira: "え", kata: "エ", group: "a", type: "base" }, { key: "o", hira: "お", kata: "オ", group: "a", type: "base" },
    { key: "ka", hira: "か", kata: "カ", group: "ka", type: "base" }, { key: "ki", hira: "き", kata: "キ", group: "ka", type: "base" }, { key: "ku", hira: "く", kata: "ク", group: "ka", type: "base" }, { key: "ke", hira: "け", kata: "ケ", group: "ka", type: "base" }, { key: "ko", hira: "こ", kata: "コ", group: "ka", type: "base" },
    { key: "sa", hira: "さ", kata: "サ", group: "sa", type: "base" }, { key: "shi", hira: "し", kata: "シ", group: "sa", type: "base" }, { key: "su", hira: "す", kata: "ス", group: "sa", type: "base" }, { key: "se", hira: "せ", kata: "セ", group: "sa", type: "base" }, { key: "so", hira: "そ", kata: "ソ", group: "sa", type: "base" },
    { key: "to", hira: "と", kata: "ト", group: "ta", type: "base" },

    { key: "na", hira: "な", kata: "ナ", group: "na", type: "base" }, { key: "ni", hira: "に", kata: "ニ", group: "na", type: "base" }, { key: "nu", hira: "ぬ", kata: "ヌ", group: "na", type: "base" }, { key: "ne", hira: "ね", kata: "ネ", group: "na", type: "base" }, { key: "no", hira: "の", kata: "ノ", group: "na", type: "base" },
    { key: "ha", hira: "は", kata: "ハ", group: "ha", type: "base" }, { key: "hi", hira: "ひ", kata: "ヒ", group: "ha", type: "base" }, { key: "fu", hira: "ふ", kata: "フ", group: "ha", type: "base" }, { key: "he", hira: "へ", kata: "ヘ", group: "ha", type: "base" }, { key: "ho", hira: "ほ", kata: "ホ", group: "ha", type: "base" },
    { key: "ma", hira: "ま", kata: "マ", group: "ma", type: "base" }, { key: "mi", hira: "み", kata: "ミ", group: "ma", type: "base" }, { key: "mu", hira: "む", kata: "ム", group: "ma", type: "base" }, { key: "me", hira: "め", kata: "メ", group: "ma", type: "base" }, { key: "mo", hira: "も", kata: "モ", group: "ma", type: "base" },
    { key: "ya", hira: "や", kata: "ヤ", group: "y", type: "base" }, { key: "yu", hira: "ゆ", kata: "ユ", group: "y", type: "base" }, { key: "yo", hira: "よ", kata: "ヨ", group: "y", type: "base" },
    { key: "ra", hira: "ら", kata: "ラ", group: "r", type: "base" }, { key: "ri", hira: "り", kata: "リ", group: "r", type: "base" }, { key: "ru", hira: "る", kata: "ル", group: "r", type: "base" }, { key: "re", hira: "れ", kata: "レ", group: "r", type: "base" }, { key: "ro", hira: "ろ", kata: "ロ", group: "r", type: "base" },
    { key: "wa", hira: "わ", kata: "ワ", group: "w", type: "base" }, { key: "wo", hira: "を", kata: "ヲ", group: "w", type: "base" }, { key: "n", hira: "ん", kata: "ン", group: "n", type: "base" },

    // Dakuten & Handakuten
    { key: "ga", hira: "が", kata: "ガ", group: "g", type: "dakuten" }, { key: "gi", hira: "ぎ", kata: "ギ", group: "g", type: "dakuten" }, { key: "gu", hira: "ぐ", kata: "グ", group: "g", type: "dakuten" }, { key: "ge", hira: "げ", kata: "ゲ", group: "g", type: "dakuten" }, { key: "go", hira: "ご", kata: "ゴ", group: "g", type: "dakuten" },
    { key: "za", hira: "ざ", kata: "ザ", group: "z", type: "dakuten" }, { key: "ji", hira: "じ", kata: "ジ", group: "z", type: "dakuten" }, { key: "zu", hira: "ず", kata: "ズ", group: "z", type: "dakuten" }, { key: "ze", hira: "ぜ", kata: "ゼ", group: "z", type: "dakuten" }, { key: "zo", hira: "ぞ", kata: "ゾ", group: "z", type: "dakuten" },
    { key: "da", hira: "だ", kata: "ダ", group: "d", type: "dakuten" }, { key: "dji", hira: "ぢ", kata: "ヂ", group: "d", type: "dakuten" }, { key: "dzu", hira: "づ", kata: "ヅ", group: "d", type: "dakuten" }, { key: "de", hira: "で", kata: "デ", group: "d", type: "dakuten" }, { key: "do", hira: "ど", kata: "ド", group: "d", type: "dakuten" },
    { key: "ba", hira: "ば", kata: "バ", group: "b", type: "dakuten" }, { key: "bi", hira: "び", kata: "ビ", group: "b", type: "dakuten" }, { key: "bu", hira: "ぶ", kata: "ブ", group: "b", type: "dakuten" }, { key: "be", hira: "べ", kata: "ベ", group: "b", type: "dakuten" }, { key: "bo", hira: "ぼ", kata: "ボ", group: "b", type: "dakuten" },
    { key: "pa", hira: "ぱ", kata: "パ", group: "p", type: "dakuten" }, { key: "pi", hira: "ぴ", kata: "ピ", group: "p", type: "dakuten" }, { key: "pu", hira: "ぷ", kata: "プ", group: "p", type: "dakuten" }, { key: "pe", hira: "ぺ", kata: "ペ", group: "p", type: "dakuten" }, { key: "po", hira: "ぽ", kata: "ポ", group: "p", type: "dakuten" },

    // Youon
    { key: "kya", hira: "きゃ", kata: "キャ", group: "ky", type: "youon" }, { key: "kyu", hira: "きゅ", kata: "キュ", group: "ky", type: "youon" }, { key: "kyo", hira: "きょ", kata: "キョ", group: "ky", type: "youon" },
    { key: "sha", hira: "しゃ", kata: "シャ", group: "sh", type: "youon" }, { key: "shu", hira: "しゅ", kata: "シュ", group: "sh", type: "youon" }, { key: "sho", hira: "しょ", kata: "ショ", group: "sh", type: "youon" },
    { key: "cha", hira: "ちゃ", kata: "チャ", group: "ch", type: "youon" }, { key: "chu", hira: "ちゅ", kata: "チュ", group: "ch", type: "youon" }, { key: "cho", hira: "ちょ", kata: "チョ", group: "ch", type: "youon" },
    { key: "nya", hira: "にゃ", kata: "ニャ", group: "ny", type: "youon" }, { key: "nyu", hira: "にゅ", kata: "ニュ", group: "ny", type: "youon" }, { key: "nyo", hira: "にょ", kata: "ニョ", group: "ny", type: "youon" },
    { key: "hya", hira: "ひゃ", kata: "ヒャ", group: "hy", type: "youon" }, { key: "hyu", hira: "ひゅ", kata: "ヒュ", group: "hy", type: "youon" }, { key: "hyo", hira: "ひょ", kata: "ヒョ", group: "hy", type: "youon" },
    { key: "mya", hira: "みゃ", kata: "ミャ", group: "my", type: "youon" }, { key: "myu", hira: "みゅ", kata: "ミュ", group: "my", type: "youon" }, { key: "myo", hira: "みょ", kata: "ミョ", group: "my", type: "youon" },
    { key: "rya", hira: "りゃ", kata: "リャ", group: "ry", type: "youon" }, { key: "ryu", hira: "りゅ", kata: "リュ", group: "ry", type: "youon" }, { key: "ryo", hira: "りょ", kata: "リョ", group: "ry", type: "youon" },
    { key: "gya", hira: "ぎゃ", kata: "ギャ", group: "gy", type: "youon" }, { key: "gyu", hira: "ぎゅ", kata: "ギュ", group: "gy", type: "youon" }, { key: "gyo", hira: "ぎょ", kata: "ギョ", group: "gy", type: "youon" },
    { key: "ja", hira: "じゃ", kata: "ジャ", group: "j", type: "youon" }, { key: "ju", hira: "じゅ", kata: "ジュ", group: "j", type: "youon" }, { key: "jo", hira: "じょ", kata: "ジョ", group: "j", type: "youon" },
    { key: "bya", hira: "びゃ", kata: "ビャ", group: "by", type: "youon" }, { key: "byu", hira: "びゅ", kata: "ビュ", group: "by", type: "youon" }, { key: "byo", hira: "びょ", kata: "ビョ", group:"by", type: "youon" },
    { key: "pya", hira: "ぴゃ", kata: "パ", group: "py", type: "youon" }, { key: "pyu", hira: "ぴゅ", kata: "ピュ", group: "py", type: "youon" }, { key: "pyo", hira: "ぴょ", kata: "ピョ", group: "py", type: "youon" },
];

export const KANA_GROUPS = Array.from(new Set(KANA_ORDER_FULL.map(item => item.group))).map(groupKey => {
    const groupItems = KANA_ORDER_FULL.filter(item => item.group === groupKey);
    const label = groupItems.map(item => item.key).join(' ');
    const type = groupItems[0]?.type || 'base'; // Assuming consistent type within a group
    return { key: groupKey, label, type };
});

const HIRA_MAP = new Map(KANA_ORDER_FULL.map(item => [item.key, item.hira]));
const KATA_MAP = new Map(KANA_ORDER_FULL.map(item => [item.key, item.kata]));
const ROMAJI_TO_KANA_MAP = {
    'hiragana': HIRA_MAP,
    'katakana': KATA_MAP,
    'both': new Map<string, string>([...HIRA_MAP, ...KATA_MAP]) // Combined map for 'both' script
};

// --- Definisi Tipe Data ---
interface KanaItem {
    char: string;
    romaji: string;
}

export type SelectionMode = "range" | "single" | "preset";
export type PresetSelectionValue = "all" | "base-all" | "dakuten-all" | "youon-all" | "jft-drill" | "aiueo-m" | "confusion" | "srs-due" | "custom";
export type TestScript = "hiragana" | "katakana" | "both";
export type QuestionDirection = "kana-to-romaji" | "romaji-to-kana" | "audio-kana-to-romaji" | "audio-romaji-to-kana";
export type AnswerMode = "typing" | "mcq";

export interface TestSelection {
    kind: SelectionMode;
    value: { from?: string; to?: string; tokens?: string[]; preset?: PresetSelectionValue; customSet?: string[] };
}

export interface TestConfig {
    script: TestScript;
    direction: QuestionDirection;
    mode: AnswerMode;
    count: number;
    selection: TestSelection;
    challenge: { enabled: boolean; durationSec: number };
}

// Initial state for test configuration
const initialTestConfig: TestConfig = {
    script: "hiragana",
    direction: "kana-to-romaji",
    mode: "typing",
    count: 10,
    selection: { kind: "preset", value: { preset: "all" } },
    challenge: { enabled: false, durationSec: 3 * 60 }, // Default 3 minutes
};

// --- Utility Functions ---

// Fungsi untuk mengacak array
const shuffleArray = <T,>(array: T[]): T[] => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Util untuk normalisasi input
const normalize = (s: string): string => s.normalize("NFKC").toLowerCase().trim().replace(/\s+/g, " ");
const keyIndex = new Map(KANA_ORDER_FULL.map((x, i) => [x.key, i]));
const groupKeyIndex = new Map(KANA_GROUPS.map((x, i) => [x.key, i]));

// Fungsi untuk menyelesaikan seleksi berdasarkan TestSelection
const resolveSelection = (selection: TestSelection): { keys: string[], invalidTokens: string[], rangeLabel: string } => {
    let resolvedKeys: string[] = [];
    let invalidTokens: string[] = [];
    let rangeLabel: string = "Semua";
    const allKeys = KANA_ORDER_FULL.map(x => x.key);

    if (selection.kind === "preset") {
        const preset = selection.value.preset;
        if (preset === "all") {
            resolvedKeys = allKeys;
            rangeLabel = "Semua Kana";
        } else if (preset === "base-all") {
            resolvedKeys = KANA_ORDER_FULL.filter(item => item.type === "base").map(x => x.key);
            rangeLabel = "Dasar semua";
        } else if (preset === "dakuten-all") {
            resolvedKeys = KANA_ORDER_FULL.filter(item => item.type === "dakuten").map(x => x.key);
            rangeLabel = "Dakuon/Handakuon";
        } else if (preset === "youon-all") {
            resolvedKeys = KANA_ORDER_FULL.filter(item => item.type === "youon").map(x => x.key);
            rangeLabel = "Youon";
        } else if (preset === "jft-drill") {
            // JFT Drill logic from index.html (aiueo -> ra/ro, plus ga-go, za-zo, da-do)
            const jftGroupsKeys = KANA_GROUPS.filter(g =>
                (groupKeyIndex.get(g.key)! >= (groupKeyIndex.get('a') || 0) && groupKeyIndex.get(g.key)! <= (groupKeyIndex.get('r') || KANA_GROUPS.length - 1)) ||
                (['g', 'z', 'd'].includes(g.key) && g.type === "dakuten")
            ).map(g => g.key);
            resolvedKeys = KANA_ORDER_FULL.filter(item => jftGroupsKeys.includes(item.group)).map(item => item.key);
            rangeLabel = "JFT Drill";
        } else if (preset === "aiueo-m") {
            const fromIdx = keyIndex.get('a');
            const toIdx = keyIndex.get('mo'); // 'mo' is the last item in 'ma mi mu me mo' group
            if (fromIdx !== undefined && toIdx !== undefined) {
                resolvedKeys = KANA_ORDER_FULL.slice(fromIdx, toIdx + 1).map(x => x.key);
                rangeLabel = "a i u e o → ma mi mu me mo";
            } else {
                resolvedKeys = []; // Handle case where indices are not found
                rangeLabel = "Rentang tidak valid";
            }
        } else if (preset === "custom") {
            // The logic for custom selection is handled directly when the modal saves
            resolvedKeys = selection.value.customSet || [];
            rangeLabel = `Huruf Tertentu (${resolvedKeys.length})`;
        } else if (preset === "confusion" || preset === "srs-due") {
             // For now, in this isolated component, these will just return all keys
            resolvedKeys = allKeys;
            rangeLabel = {
                "confusion": "Latih Pasangan Tertukar (demo)",
                "srs-due": "Review Hari Ini (demo)"
            }[preset] || "Custom (demo)";
        } else {
            // Specific group presets like "a", "ka", etc.
            const groupItem = KANA_GROUPS.find(g => g.key === preset);
            if (groupItem) {
                resolvedKeys = KANA_ORDER_FULL.filter(item => item.group === preset).map(x => x.key);
                rangeLabel = groupItem.label;
            }
        }
    } else if (selection.kind === "single") {
        const tokens = normalize(selection.value.tokens?.join(" ") || "").split(" ").filter(Boolean);
        const uniqueTokens = Array.from(new Set(tokens));
        resolvedKeys = uniqueTokens.filter(t => keyIndex.has(t));
        invalidTokens = uniqueTokens.filter(t => !keyIndex.has(t));
        rangeLabel = tokens.join(', ') || "Grup Tunggal";
    } else if (selection.kind === "range") {
        const fromKey = normalize(selection.value.from || "");
        const toKey = normalize(selection.value.to || "");
        const fromIdx = keyIndex.get(fromKey);
        const toIdx = keyIndex.get(toKey);

        if (fromIdx !== undefined && toIdx !== undefined) {
            const [lo, hi] = fromIdx <= toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx]; // Auto-swap
            resolvedKeys = KANA_ORDER_FULL.slice(lo, hi + 1).map(x => x.key);
            rangeLabel = `${KANA_GROUPS.find(g => g.key === KANA_ORDER_FULL[lo].group)?.label || KANA_ORDER_FULL[lo].key} → ${KANA_GROUPS.find(g => g.key === KANA_ORDER_FULL[hi].group)?.label || KANA_ORDER_FULL[hi].key}`;
        } else if (fromIdx !== undefined) {
            resolvedKeys = [KANA_ORDER_FULL[fromIdx].key];
            rangeLabel = KANA_GROUPS.find(g => g.key === KANA_ORDER_FULL[fromIdx].group)?.label || KANA_ORDER_FULL[fromIdx].key;
        } else if (toIdx !== undefined) {
            resolvedKeys = [KANA_ORDER_FULL[toIdx].key];
            rangeLabel = KANA_GROUPS.find(g => g.key === KANA_ORDER_FULL[toIdx].group)?.label || KANA_ORDER_FULL[toIdx].key;
        }
    }

    return { keys: resolvedKeys, invalidTokens, rangeLabel };
};

// Fungsi untuk membangun bank soal dari selection
const buildKanaBank = (config: TestConfig): KanaItem[] => {
    const { keys } = resolveSelection(config.selection);
    const items = KANA_ORDER_FULL.filter(x => keys.includes(x.key));

    return items.map(x => {
        let char: string;
        if (config.script === "hiragana") char = x.hira;
        else if (config.script === "katakana") char = x.kata;
        else char = [x.hira, x.kata][Math.random() < .5 ? 0 : 1]; // "both" script

        return { romaji: x.key, char };
    });
};

const romajiStringToKana = (str: string, script: "hiragana" | "katakana" | "both"): string => {
    let s = str.toLowerCase().replace(/\s+/g, '');
    let out = '';
    const map = ROMAJI_TO_KANA_MAP[script];

    // Longer matches first
    const romajiSortedByLength = Array.from(map.keys()).sort((a, b) => b.length - a.length);

    while (s.length) {
        let matched = false;

        if (s.length >= 2 && !'aeiouy'.includes(s[0]) && s[0] === s[1] && s[0] !== 'n') {
            out += (script === 'hiragana' || script === 'both' ? 'っ' : 'ッ');
            s = s.slice(1);
            matched = true;
            continue;
        }
        
        for (const r of romajiSortedByLength) {
            if (s.startsWith(r)) {
                const kanaChar = map.get(r);
                if (kanaChar) {
                    out += kanaChar;
                    s = s.slice(r.length);
                    matched = true;
                    break;
                }
            }
        }

        if (!matched) {
            if (s[0] === 'n') {
                if (s.length === 1 || !'aeiouy'.includes(s[1])) {
                    out += map.get('n');
                    s = s.slice(1);
                    matched = true;
                }
            }
        }
        
        if (!matched) {
            out += s[0];
            s = s.slice(1);
        }
    }
    return out;
};


// Simplified copy for Toast component
interface ToastProps {
    message: string;
    type?: 'info' | 'warn';
    duration?: number;
    onDismiss?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 2500, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setIsVisible(true);
        timerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [message, type, duration]);

    const handleTransitionEnd = useCallback(() => {
        if (!isVisible && onDismiss) {
            onDismiss();
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 bottom-5 px-4 py-2 rounded-lg shadow-lg z-[1090] transition-opacity duration-300
                         ${type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'}
                         ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onTransitionEnd={handleTransitionEnd}
            role="status"
            aria-live="polite"
        >
            {message}
        </div>
    );
};


// Component for Custom Set Modal
interface CustomSetModalProps {
    onClose: () => void;
    onSave: (selectedKeys: string[]) => void;
    initialSet: TestScript;
    initialCustomSet: { hiragana: string[]; katakana: string[] };
}

const CustomSetModal: React.FC<CustomSetModalProps> = ({ onClose, onSave, initialSet, initialCustomSet }) => {
    const [currentSet, setCurrentSet] = useState<TestScript>(initialSet);
    const [selectedKeys, setSelectedKeys] = useState<string[]>(initialCustomSet[currentSet] || []);
    const [filterText, setFilterText] = useState<string>('');
    const [filterGroups, setFilterGroups] = useState({
        base: true,
        dakuten: true,
        youon: true
    });

    const filteredKana = useMemo(() => {
        const kanaMap = ROMAJI_TO_KANA_MAP[currentSet] || new Map();
        const lowerFilter = filterText.toLowerCase();

        return KANA_ORDER_FULL.filter(item => {
            const groupItem = KANA_GROUPS.find(g => g.key === item.group);
            const type = groupItem?.type || 'base';

            if (!filterGroups[type]) return false;

            const kanaChar = kanaMap.get(item.key) || '';
            const matchesFilter = !lowerFilter ||
                item.key.toLowerCase().includes(lowerFilter) ||
                kanaChar.includes(lowerFilter);

            return matchesFilter;
        });
    }, [currentSet, filterGroups, filterText]);
    
    const handleSave = useCallback(() => {
        onSave(selectedKeys);
        onClose();
    }, [onSave, onClose, selectedKeys]);

    const toggleSelection = useCallback((key: string) => {
        setSelectedKeys(prev => {
            if (prev.includes(key)) {
                return prev.filter(k => k !== key);
            } else {
                return [...prev, key];
            }
        });
    }, []);

    const handleSetChange = useCallback((set: TestScript) => {
        setCurrentSet(set);
        setSelectedKeys(initialCustomSet[set] || []);
        setFilterText('');
        setFilterGroups({ base: true, dakuten: true, youon: true });
    }, [initialCustomSet]);
    
    const toggleGroupFilter = useCallback((groupType: "base" | "dakuten" | "youon") => {
        setFilterGroups(prev => ({
            ...prev,
            [groupType]: !prev[groupType],
        }));
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[1099] overflow-y-auto p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold">Pilih Huruf Tertentu</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Pilih kana yang ingin kamu latih.</p>
                <div className="flex space-x-2 mb-4">
                    <div className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-700 p-1 flex">
                        <button onClick={() => handleSetChange("hiragana")} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${currentSet === 'hiragana' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Hiragana</button>
                        <button onClick={() => handleSetChange("katakana")} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${currentSet === 'katakana' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Katakana</button>
                    </div>
                    <div className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-700 p-1 flex">
                        <button onClick={() => toggleGroupFilter("base")} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${filterGroups.base ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Dasar</button>
                        <button onClick={() => toggleGroupFilter("dakuten")} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${filterGroups.dakuten ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Dakuon</button>
                        <button onClick={() => toggleGroupFilter("youon")} className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${filterGroups.youon ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-600'}`}>Youon</button>
                    </div>
                </div>
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        placeholder="Cari kana/romaji..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>
                <div className="flex-1 overflow-y-auto grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 pb-4">
                    {filteredKana.map(item => {
                        const isSelected = selectedKeys.includes(item.key);
                        return (
                            <button
                                key={item.key}
                                className={`
                                    flex flex-col items-center justify-center p-2 rounded-lg shadow-sm
                                    transition-all duration-200
                                    ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-200 dark:hover:bg-blue-600'}
                                `}
                                onClick={() => toggleSelection(item.key)}
                            >
                                <span className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {currentSet === 'hiragana' ? item.hira : item.kata}
                                </span>
                                <span className={`text-xs ${isSelected ? 'text-blue-200' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {item.key}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                        Dipilih: {selectedKeys.length} huruf
                    </span>
                    <div className="flex space-x-2">
                        <button onClick={onClose} className="px-4 py-2 rounded-full font-semibold bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800">Batal</button>
                        <button onClick={handleSave} className="px-4 py-2 rounded-full font-semibold bg-blue-600 text-white hover:bg-blue-700">Simpan Set</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// === TestConfigPanel (UI/UX refined) ===
const TestConfigPanel: React.FC<TestConfigPanelProps> = ({
  testConfig,
  setTestConfig,
  previewCount,
  invalidTokens,
  startTestHandler,
  startButtonDisabled,
  openCustomSetModal,
}) => {
  // helper kecil agar perubahan state rapi & tetap kompatibel
  const handleTestConfigChange = useCallback((
    field: keyof TestConfig | keyof TestConfig['challenge']
           | 'selectionKind' | 'selectionFrom' | 'selectionTo'
           | 'selectionTokens' | 'selectionPreset',
    value: any
  ) => {
    setTestConfig(prev => {
      const next = { ...prev };

      if (field === 'selectionKind') {
        next.selection.kind = value as SelectionMode;
        if (value === 'range') {
          next.selection.value = {
            from: localStorage.getItem('kanaTrainer_rangeFrom') || 'a',
            to:   localStorage.getItem('kanaTrainer_rangeTo')   || 'mo',
          };
        } else if (value === 'single') {
          const saved = localStorage.getItem('kanaTrainer_singleTokens');
          next.selection.value = { tokens: saved ? JSON.parse(saved) : ['a','i','u','e','o'] };
        } else {
          next.selection.value = { preset: (localStorage.getItem('kanaTrainer_preset') || 'all') as PresetSelectionValue };
        }
      } else if (field === 'selectionFrom') {
        next.selection.value.from = value;
        localStorage.setItem('kanaTrainer_rangeFrom', value);
      } else if (field === 'selectionTo') {
        next.selection.value.to = value;
        localStorage.setItem('kanaTrainer_rangeTo', value);
      } else if (field === 'selectionTokens') {
        // Jika input adalah string, pisahkan menjadi array token
        const tokens = Array.isArray(value) ? value : String(value).split(' ').filter(Boolean);
        next.selection.value.tokens = tokens;
        localStorage.setItem('kanaTrainer_singleTokens', JSON.stringify(tokens));
      } else if (field === 'selectionPreset') {
        next.selection.kind = 'preset';
        next.selection.value = { preset: value as PresetSelectionValue };
        localStorage.setItem('kanaTrainer_preset', value as string);

        // aturan kecil biar preset JFT nyaman dipakai
        if (value === 'jft-drill') {
          next.direction = 'kana-to-romaji';
          next.mode = 'mcq';
          next.count = Math.min(next.count, 50);
        } else if (prev.selection.value.preset === 'jft-drill') {
          next.direction = initialTestConfig.direction;
          next.mode = initialTestConfig.mode;
        }
      } else if (field === 'enabled' || field === 'durationSec') {
        next.challenge = { ...next.challenge, [field]: value };
      } else if (field === 'direction') {
        next.direction = value as QuestionDirection;
        if (String(value).includes('audio')) next.mode = 'mcq'; // listening = default MCQ
      } else {
        (next as any)[field] = value;
      }

      return next;
    });
  }, [setTestConfig]);

  const groupOptions = useMemo(
    () => KANA_GROUPS.map(g => ({ value: g.key, label: g.label })),
    []
  );

  const isKanaScript = testConfig.script === 'hiragana' || testConfig.script === 'katakana' || testConfig.script === 'both';
  const isMcqAutoSet = testConfig.direction.includes('audio');

  useEffect(() => {
    if (testConfig.selection.kind === 'range') {
      const { from, to } = testConfig.selection.value;
      const a = keyIndex.get(from || 'a');
      const b = keyIndex.get(to   || 'n');
      if (a !== undefined && b !== undefined && a > b) {
        setTestConfig(prev => ({
          ...prev,
          selection: { ...prev.selection, value: { from: to, to: from } }
        }));
      }
    }
  }, [testConfig.selection, setTestConfig]);

  const quickPresets = [
    { label: 'a i u e o → ma mi mu me mo', preset: 'aiueo-m' },
    { label: 'Dasar semua', preset: 'base-all' },
    { label: 'Dakuon', preset: 'dakuten-all' },
    { label: 'Youon', preset: 'youon-all' },
    { label: 'JFT Drill', preset: 'jft-drill' },
    { label: 'Latih Pasangan Tertukar', preset: 'confusion' }, // demo
    { label: 'Review Hari Ini', preset: 'srs-due' },           // demo
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Latihan Hiragana & Katakana
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Atur set, tipe soal, jumlah soal, dan mode tantangan.
        </p>
      </header>

      {/* Card utama */}
      <section className="relative rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-xl ring-1 ring-black/5 overflow-hidden">
        <div className="p-6 md:p-8 space-y-6">

          {/* Row 1: Set / Tipe / Mode / Jumlah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Set */}
            <div>
              <label className="block text-sm font-medium mb-1">Set</label>
              <select
                value={testConfig.script}
                onChange={e => handleTestConfigChange('script', e.target.value as TestScript)}
                className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hiragana">Hiragana</option>
                <option value="katakana">Katakana</option>
                <option value="both">Keduanya</option>
              </select>
            </div>

            {/* Tipe Soal */}
            <div>
              <label className="block text-sm font-medium mb-1">Tipe Soal</label>
              <select
                value={testConfig.direction}
                onChange={e => handleTestConfigChange('direction', e.target.value as QuestionDirection)}
                className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="kana-to-romaji">Kana → Romaji</option>
                <option value="romaji-to-kana">Romaji → Kana</option>
                <option value="audio-kana-to-romaji">Listening (Kana → Romaji)</option>
                <option value="audio-romaji-to-kana">Listening (Romaji → Kana)</option>
              </select>
              {/* hint kecil untuk audio */}
              {String(testConfig.direction).includes('audio') && (
                <p className="text-xs text-slate-500 mt-1">Listening memakai opsi Pilihan Ganda secara default.</p>
              )}
            </div>

            {/* Mode Jawaban */}
            <div>
              <label className="block text-sm font-medium mb-1">Mode Jawaban</label>
              <select
                value={testConfig.mode}
                onChange={e => handleTestConfigChange('mode', e.target.value as AnswerMode)}
                disabled={isMcqAutoSet}
                className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              >
                <option value="typing">Ketik</option>
                <option value="mcq">Pilihan Ganda</option>
              </select>
            </div>

            {/* Jumlah Soal */}
            <div>
              <label className="block text-sm font-medium mb-1">Jumlah Soal</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  value={testConfig.count}
                  onChange={e => handleTestConfigChange('count', parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[10, 25, 50, 100].map(n => (
                  <button
                    key={n}
                    onClick={() => handleTestConfigChange('count', n)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      testConfig.count === n
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick presets */}
          {isKanaScript && (
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-sm font-medium shrink-0">Pilih cepat:</span>

                <button
                  onClick={() => handleTestConfigChange('selectionPreset', 'all')}
                  className={`px-3 py-1 text-sm rounded-full shrink-0 transition-colors ${
                    testConfig.selection.kind === 'preset' && testConfig.selection.value.preset === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  Semua Kana
                </button>

                {quickPresets.map(p => (
                  <button
                    key={p.preset}
                    onClick={() => handleTestConfigChange('selectionPreset', p.preset)}
                    className={`px-3 py-1 text-sm rounded-full shrink-0 transition-colors ${
                      testConfig.selection.kind === 'preset' && testConfig.selection.value.preset === p.preset
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}

                <button
                  onClick={openCustomSetModal}
                  className={`px-3 py-1 text-sm rounded-full shrink-0 transition-colors ${
                    testConfig.selection.kind === 'preset' && testConfig.selection.value.preset === 'custom'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  Huruf Tertentu
                </button>
              </div>
            </div>
          )}

          {/* Selection mode + Range/Single field */}
          {isKanaScript && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* segmented control */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-2">Pilih mode</label>
                <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                  {(['preset','range','single'] as SelectionMode[]).map(m => (
                    <button
                      key={m}
                      onClick={() => handleTestConfigChange('selectionKind', m)}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        testConfig.selection.kind === m
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {m === 'preset' ? 'Preset' : m === 'range' ? 'Rentang' : 'Grup Tunggal'}
                    </button>
                  ))}
                </div>
              </div>

              {/* range */}
              {testConfig.selection.kind === 'range' && (
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <select
                      value={testConfig.selection.value.from}
                      onChange={e => handleTestConfigChange('selectionFrom', e.target.value)}
                      className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {groupOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <span className="font-semibold text-slate-500">→</span>
                    <select
                      value={testConfig.selection.value.to}
                      onChange={e => handleTestConfigChange('selectionTo', e.target.value)}
                      className="flex-1 rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {groupOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <p className="text-xs text-slate-500">Jika “Dari” lebih besar dari “Sampai”, sistem menukar otomatis.</p>
                </div>
              )}

              {/* single */}
              {testConfig.selection.kind === 'single' && (
                <div className="md:col-span-2">
                  <div className="mb-1">
                    <select
                      onChange={e => {
                        const selectedGroup = KANA_GROUPS.find(g => g.key === e.target.value);
                        if (selectedGroup) {
                          handleTestConfigChange('selectionTokens', selectedGroup.label.split(' '));
                        }
                      }}
                      className="w-full rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih grup...</option>
                      {groupOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Selected count pill */}
              <div className="md:col-span-1">
                <div className="h-10 px-3 inline-flex items-center rounded-full bg-slate-200 dark:bg-slate-700 text-sm font-medium">
                  Dipilih: {previewCount} huruf
                </div>
              </div>
            </div>
          )}

          {/* Challenge */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={testConfig.challenge.enabled}
                onChange={e => handleTestConfigChange('enabled', e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-medium">Challenge Mode</span>
            </label>

            {testConfig.challenge.enabled && (
              <select
                value={testConfig.challenge.durationSec / 60}
                onChange={e => handleTestConfigChange('durationSec', parseInt(e.target.value, 10) * 60)}
                className="rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value={1}>1 menit</option>
                <option value={3}>3 menit</option>
                <option value={5}>5 menit</option>
                <option value={10}>10 menit</option>
              </select>
            )}
          </div>
        </div>

        {/* Sticky action area */}
        <div className="sticky bottom-0 inset-x-0">
          <div className="pointer-events-none h-6 bg-gradient-to-t from-slate-100/80 dark:from-slate-900/80 to-transparent" />
          <div className="p-4 md:p-6">
            <button
              onClick={startTestHandler}
              id="btnStart"
              disabled={startButtonDisabled}
              title="Enter: cek • →: lewati"
              className={`w-full font-bold py-3 rounded-lg shadow-md transition-all ${
                startButtonDisabled
                  ? 'bg-slate-400 dark:bg-slate-600 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Mulai Tes
            </button>
            {startButtonDisabled && (
              <p className="text-center text-red-500 mt-2 text-sm">
                Pilih rentang/daftar yang valid atau turunkan jumlah soal.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};


// Component for Test Configuration Panel
interface TestConfigPanelProps {
    testConfig: TestConfig;
    setTestConfig: React.Dispatch<React.SetStateAction<TestConfig>>;
    previewCount: number;
    invalidTokens: string[];
    startTestHandler: () => void;
    startButtonDisabled: boolean;
    openCustomSetModal: () => void;
}

// Main App Component
const App: React.FC = () => {
    const [testConfig, setTestConfig] = useState<TestConfig>(() => {
        try {
            const storedConfig = localStorage.getItem('kanaTrainer_testConfig');
            if (storedConfig) {
                const parsed = JSON.parse(storedConfig);
                const merged = { ...initialTestConfig, ...parsed, challenge: { ...initialTestConfig.challenge, ...parsed.challenge } };
                // Also restore selection details
                if (merged.selection.kind === 'range') {
                    merged.selection.value.from = localStorage.getItem('kanaTrainer_rangeFrom') || merged.selection.value.from;
                    merged.selection.value.to = localStorage.getItem('kanaTrainer_rangeTo') || merged.selection.value.to;
                } else if (merged.selection.kind === 'single') {
                    const savedTokens = localStorage.getItem('kanaTrainer_singleTokens');
                    if (savedTokens) merged.selection.value.tokens = JSON.parse(savedTokens);
                } else if (merged.selection.kind === 'preset') {
                    merged.selection.value.preset = (localStorage.getItem('kanaTrainer_preset') || 'all') as PresetSelectionValue;
                    // Restore customSet separately
                    const savedCustomSet = JSON.parse(localStorage.getItem('kanaTrainer_customSet') || '{}');
                    merged.selection.value.customSet = savedCustomSet[merged.script];
                }
                return merged;
            }
            return initialTestConfig;
        } catch (error) {
            console.error("Failed to load test config from localStorage", error);
            return initialTestConfig;
        }
    });

    const [isTestActive, setIsTestActive] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [testItems, setTestItems] = useState<any[]>([]); // Array of { qItem: KanaItem, options?: string[] }
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
    const [showToast, setShowToast] = useState<{ message: string; type?: 'info' | 'warn' } | null>(null);
    const [toastKey, setToastKey] = useState(0);
    const [isCustomSetModalOpen, setIsCustomSetModalOpen] = useState(false);

    const isTypingMode = testConfig.mode === 'typing';
    const isListeningType = testConfig.direction.includes('audio');

    const { keys: resolvedKeys, invalidTokens, rangeLabel: currentRangeLabel } = useMemo(() => resolveSelection(testConfig.selection), [testConfig.selection]);
    const currentKanaBank = useMemo(() => buildKanaBank(testConfig), [testConfig, resolvedKeys]);
    const previewCount = currentKanaBank.length;
    
    const startButtonDisabled = useMemo(() => {
        if (testConfig.selection.value.preset === 'custom' && (!testConfig.selection.value.customSet || testConfig.selection.value.customSet.length === 0)) {
            return true;
        }
        return previewCount === 0 || testConfig.count <= 0 || testConfig.count > previewCount * 4;
    }, [previewCount, testConfig.count, testConfig.selection.value.preset, testConfig.selection.value.customSet]);


    // --- Audio Functions ---
    const playAudio = useCallback((text: string, lang = 'ja-JP') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        } else {
            console.error('Browser Anda tidak mendukung text-to-speech.');
        }
    }, []);

    const playCurrentQuestionAudio = useCallback(() => {
        const currentTestItem = testItems[currentItemIndex];
        if (!currentTestItem) return;

        let textToSpeak = (testConfig.direction.includes('romaji-to-kana') || testConfig.direction === 'romaji-to-kana') 
            ? (currentTestItem.qItem as KanaItem).romaji
            : (currentTestItem.qItem as KanaItem).char;
        
        playAudio(textToSpeak, 'ja-JP');
    }, [currentItemIndex, testConfig.direction, playAudio, testItems]);

    // --- Test Logic ---
    const normalizeRomajiForComparison = (romaji: string) => {
        let normalized = romaji.toLowerCase();
        normalized = normalized.replace(/wo/g, 'o');
        normalized = normalized.replace(/ji|di/g, 'dji');
        normalized = normalized.replace(/zu|du/g, 'dzu');
        return normalized;
    };
    
    const getDecoys = (correctAnswer: string, allPossibleAnswers: string[], count: number): string[] => {
        const decoys: string[] = [];
        const filteredAnswers = allPossibleAnswers.filter(ans => normalize(ans) !== normalize(correctAnswer));
        const shuffled = shuffleArray([...filteredAnswers]);
        for (let i = 0; i < count && i < shuffled.length; i++) {
            decoys.push(shuffled[i]);
        }
        return decoys;
    };
    
    const generateMCQOptions = useCallback((correctItem: KanaItem, config: TestConfig, bank: KanaItem[]): string[] => {
        let correctValue: string;
        let allPossibleAnswers: string[];
        
        if (config.direction === 'kana-to-romaji' || config.direction === 'audio-kana-to-romaji') {
            correctValue = (correctItem as KanaItem).romaji;
            allPossibleAnswers = bank.map(item => item.romaji);
        } else { // romaji-to-kana, audio-romaji-to-kana
            correctValue = (correctItem as KanaItem).char;
            allPossibleAnswers = bank.map(item => item.char);
        }

        const decoys = getDecoys(correctValue, allPossibleAnswers, 3);
        let options = shuffleArray([correctValue, ...decoys]);

        while (options.length < 4 && allPossibleAnswers.length > options.length) {
            const potentialPad = shuffleArray(allPossibleAnswers.filter(ans => !options.includes(ans)))[0];
            if (potentialPad) {
                options.push(potentialPad);
            } else {
                break;
            }
        }
        return shuffleArray(options.slice(0, 4));
    }, []);
    
    const finishTest = useCallback(() => {
        setIsTestActive(false);
        setIsTestFinished(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const handleAnswer = useCallback((answer: string) => {
        const currentTestItem = testItems[currentItemIndex];
        if (!currentTestItem) return;

        let isCorrect = false;
        let correctAnswer: string = '';
        let userProvided: string = normalize(answer);

        const kanaItem = currentTestItem.qItem as KanaItem;
        
        if (testConfig.direction === 'kana-to-romaji' || testConfig.direction === 'audio-kana-to-romaji') {
            correctAnswer = kanaItem.romaji;
            // Handle dji/dzu aliases like in index.html
            const canonCorrect = normalizeRomajiForComparison(correctAnswer);
            const canonUser = normalizeRomajiForComparison(userProvided);
            isCorrect = canonUser === canonCorrect;
        } else if (testConfig.direction === 'romaji-to-kana' || testConfig.direction === 'audio-romaji-to-kana') {
            correctAnswer = kanaItem.char;
            const userKana = romajiStringToKana(userProvided, testConfig.script);
            isCorrect = userKana === correctAnswer;
        }

        setIsAnswerCorrect(isCorrect);
        
        let feedbackMessage: string;
        let toastType: 'info' | 'warn';

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setStreak(prev => prev + 1);
            toastType = 'info';
            feedbackMessage = `Benar! ${kanaItem.char} = ${correctAnswer}`;
        } else {
            setIncorrectCount(prev => prev + 1);
            setStreak(0);
            setIncorrectlyAnswered(prev => {
                const itemToAdd = { char: kanaItem.char, romaji: kanaItem.romaji };
                if (!prev.some(item => (item as KanaItem).char === (itemToAdd as KanaItem).char)) {
                    return [...prev, itemToAdd];
                }
                return prev;
            });
            toastType = 'warn';
            feedbackMessage = `Salah. ${kanaItem.char} dibaca ${correctAnswer}. Jawabanmu: ${answer}.`;
        }

        setShowToast({ message: feedbackMessage, type: toastType });
        setToastKey(prev => prev + 1);

        setTimeout(() => {
            if (currentItemIndex + 1 >= testConfig.count) {
                finishTest();
            } else {
                setCurrentItemIndex(prev => prev + 1);
                setUserAnswer('');
                setIsAnswerCorrect(null);
                 if (testConfig.direction.includes('audio')) {
                    setTimeout(() => playCurrentQuestionAudio(), 100);
                }
            }
        }, 500);
    }, [testItems, currentItemIndex, testConfig, finishTest, playCurrentQuestionAudio]);

    const handleCheck = useCallback(() => {
        if (!userAnswer.trim()) return;
        handleAnswer(userAnswer);
    }, [userAnswer, handleAnswer]);

    const handleSkip = useCallback(() => {
        setIncorrectCount(prev => prev + 1);
        setStreak(0);
        const currentTestItem = testItems[currentItemIndex];
        if (currentTestItem) {
            setIncorrectlyAnswered(prev => {
                const itemToAdd = { char: (currentTestItem.qItem as KanaItem).char, romaji: (currentTestItem.qItem as KanaItem).romaji };
                if (!prev.some(item => (item as KanaItem).char === (itemToAdd as KanaItem).char)) {
                    return [...prev, itemToAdd];
                }
                return prev;
            });
        }
        setShowToast({ message: 'Oke, kita lanjut dulu.', type: 'info' });

        setTimeout(() => {
            if (currentItemIndex + 1 >= testConfig.count) {
                finishTest();
            } else {
                setCurrentItemIndex(prev => prev + 1);
                setUserAnswer('');
                setIsAnswerCorrect(null);
                 if (testConfig.direction.includes('audio')) {
                    setTimeout(() => playCurrentQuestionAudio(), 100);
                }
            }
        }, 500);
    }, [testItems, currentItemIndex, testConfig.count, finishTest, testConfig.direction, playCurrentQuestionAudio]);
    
    const handleMCQOptionClick = useCallback((option: string) => {
        handleAnswer(option);
    }, [handleAnswer]);
    
    const restartTest = useCallback(() => {
        setIsTestFinished(false);
        setIsTestActive(false);
        setTestItems([]);
        setCurrentItemIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
        setStreak(0);
        setIncorrectlyAnswered([]);
        setUserAnswer('');
        setIsAnswerCorrect(null);
    }, []);
    
    const generateTestItems = useCallback(() => {
        const items = [];
        const bank = currentKanaBank;
        if (bank.length === 0) return;

        for (let i = 0; i < testConfig.count; i++) {
            let qItem: KanaItem;
            let options: string[] | undefined;
            qItem = bank[Math.floor(Math.random() * bank.length)];

            if (testConfig.mode === 'mcq') {
                options = generateMCQOptions(qItem, testConfig, bank);
            }
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
    }, [testConfig, currentKanaBank, generateMCQOptions]);
    
    const startTestHandler = useCallback(() => {
        generateTestItems();
        setIsTestActive(true);
        setIsTestFinished(false);
        if (testConfig.challenge.enabled) {
            setTimeLeft(testConfig.challenge.durationSec);
        }
        window.dispatchEvent(new CustomEvent("test:start", { detail: testConfig }));
        // Play audio for the first question if it's a listening type
        if (testConfig.direction.includes('audio')) {
            setTimeout(() => playCurrentQuestionAudio(), 100);
        }
    }, [generateTestItems, testConfig, playCurrentQuestionAudio]);

    const handleCustomSetSave = useCallback((selectedKeys: string[]) => {
        const savedCustomSets = JSON.parse(localStorage.getItem('kanaTrainer_customSet') || '{}');
        savedCustomSets[testConfig.script] = selectedKeys;
        localStorage.setItem('kanaTrainer_customSet', JSON.stringify(savedCustomSets));
        setTestConfig(prev => ({
            ...prev,
            selection: {
                kind: 'preset',
                value: {
                    preset: 'custom',
                    customSet: selectedKeys,
                },
            },
        }));
        setShowToast({ message: `Set kustom (${selectedKeys.length} huruf) berhasil disimpan.`, type: 'info' });
    }, [testConfig.script, setTestConfig]);


    // --- Effects ---

    // Persist testConfig to localStorage
    useEffect(() => {
        localStorage.setItem('kanaTrainer_testConfig', JSON.stringify(testConfig));
    }, [testConfig]);

    // Challenge Mode Timer
    useEffect(() => {
        if (isTestActive && testConfig.challenge.enabled) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1;
                    if (newTime <= 0) {
                        clearInterval(timerRef.current as ReturnType<typeof setTimeout>);
                        finishTest();
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current as ReturnType<typeof setTimeout>);
    }, [isTestActive, testConfig.challenge.enabled, finishTest]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!isTestActive || isTestFinished) return;
            const activeElementTagName = document.activeElement?.tagName.toLowerCase();
            const isInputFocused = activeElementTagName === 'input' || activeElementTagName === 'textarea';

            if (e.key === 'Enter') {
                if (isTypingMode) {
                    e.preventDefault();
                    handleCheck();
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleSkip();
            } else if (e.key.toLowerCase() === 'r') {
                e.preventDefault();
                playCurrentQuestionAudio();
            } else if (!isTypingMode && !isInputFocused) { // MCQ hotkeys
                const keyMap: { [key: string]: number } = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, '1': 0, '2': 1, '3': 2, '4': 3 };
                const optionIndex = keyMap[e.key.toLowerCase()];
                const currentTestItem = testItems[currentItemIndex];
                if (optionIndex !== undefined && currentTestItem && currentTestItem.options?.[optionIndex]) {
                    handleMCQOptionClick(currentTestItem.options[optionIndex]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isTestActive, isTestFinished, isTypingMode, userAnswer, handleCheck, handleSkip, playCurrentQuestionAudio, testItems, currentItemIndex, handleMCQOptionClick]);

    // Auto-focus input
    useEffect(() => {
        if (isTestActive && isTypingMode && answerInputRef.current) {
            answerInputRef.current.focus();
        }
    }, [currentItemIndex, isTestActive, isTypingMode]);

    // Input Discipline for Romaji
    const handleTypingInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (testConfig.direction.includes('romaji')) {
            value = value.replace(/[ぁ-んァ-ンー゛゜]/g, '');
        }
        setUserAnswer(value);
    }, [testConfig.direction]);

    // --- Display Calculations ---
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const progressBarWidth = testConfig.count > 0 ? (currentItemIndex / testConfig.count) * 100 : 0;
    const currentTestItem = testItems[currentItemIndex];

    const currentTestInfo = useMemo(() => {
        const scriptLabel = {
            'hiragana': 'Hiragana',
            'katakana': 'Katakana',
            'both': 'Hira & Kata',
        }[testConfig.script];

        const directionLabel = {
            'kana-to-romaji': 'Kana → Romaji',
            'romaji-to-kana': 'Romaji → Kana',
            'audio-kana-to-romaji': 'Listening (K → R)',
            'audio-romaji-to-kana': 'Listening (R → K)',
        }[testConfig.direction];

        return `${scriptLabel} • ${currentRangeLabel} • ${directionLabel} • Soal ${currentItemIndex + 1}/${testConfig.count}`;
    }, [testConfig.script, testConfig.direction, currentRangeLabel, currentItemIndex, testConfig.count]);

    // Toast for streak
    useEffect(() => {
        if (streak > 0 && streak % 10 === 0) {
            setShowToast({ message: `Wii! Keren banget! ✨ — ${streak} jawaban benar berturut-turut.`, type: 'info' });
            setToastKey(prev => prev + 1);
        }
    }, [streak]);

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
                {/* Conditional Rendering */}
                {!isTestActive ? (
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
                                                <div key={(item as KanaItem).char} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm font-medium">
                                                    {(item as KanaItem).char} ({ (item as KanaItem).romaji })
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
                        <>
                            <TestConfigPanel
                                testConfig={testConfig}
                                setTestConfig={setTestConfig}
                                previewCount={previewCount}
                                invalidTokens={invalidTokens}
                                startTestHandler={startTestHandler}
                                startButtonDisabled={startButtonDisabled}
                                openCustomSetModal={() => setIsCustomSetModalOpen(true)}
                            />
                            {isCustomSetModalOpen && (
                                <CustomSetModal
                                    onClose={() => setIsCustomSetModalOpen(false)}
                                    onSave={handleCustomSetSave}
                                    initialSet={testConfig.script}
                                    initialCustomSet={{
                                        hiragana: testConfig.selection.value.customSet || [],
                                        katakana: testConfig.selection.value.customSet || [],
                                    }}
                                />
                            )}
                        </>
                    )
                ) : (
                    // In-test UI
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div id="progressbar" className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressBarWidth}%` }}></div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl text-center space-y-6">
                            {testConfig.challenge.enabled && (
                                <p id="challengeTimeLeft" aria-live="polite" className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    <Clock className="w-6 h-6" /> Sisa: {formatTime(timeLeft)}
                                </p>
                            )}

                            <div id="testInfo" className="text-sm font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
                                <span id="testInfoText">{currentTestInfo}</span>
                                <span id="streakCounter" className={`ml-4 font-semibold ${streak > 0 ? 'text-green-600' : 'text-slate-500'}`}>Streak: {streak}</span>
                            </div>

                            <div className="min-h-[10rem] flex flex-col items-center justify-center">
                                {/* Prompt Area */}
                                <div className="flex flex-col items-center gap-4">
                                    <p id="qKana" className={`text-9xl font-bold
                                        ${testConfig.direction === 'romaji-to-kana' || testConfig.direction === 'audio-romaji-to-kana' ? 'text-5xl' : ''}
                                    `}>
                                        {(currentTestItem?.qItem as KanaItem)?.char || (currentTestItem?.qItem as KanaItem)?.romaji}
                                    </p>
                                    {isListeningType && (
                                        <button onClick={playCurrentQuestionAudio} aria-label="Putar audio kembali" className="p-3 rounded-full bg-blue-100 dark:bg-blue-700 hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors">
                                            <Volume2 className="h-6 w-6 text-blue-600 dark:text-blue-200" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Jawaban */}
                            {isTypingMode ? (
                                <div className="space-y-4">
                                    <input
                                        id="ans"
                                        type="text"
                                        value={userAnswer}
                                        onChange={handleTypingInput}
                                        placeholder="Ketik jawaban di sini"
                                        ref={answerInputRef}
                                        className="w-full text-center text-2xl p-4 rounded-lg bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        spellCheck="false"
                                    />
                                    <button id="btnCheck" onClick={handleCheck} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                                        Periksa Jawaban
                                    </button>
                                </div>
                            ) : (
                                <div id="mcWrap" className="mc-grid">
                                    {currentTestItem?.options?.map((option: string, index: number) => (
                                        <button
                                            key={option}
                                            onClick={() => handleMCQOptionClick(option)}
                                            className="mc-btn">
                                            {String.fromCharCode(65 + index)}. {option}
                                        </button>
                                    ))}
                                    <p className="text-sm text-slate-500 italic md:col-span-full">Ketuk atau tekan A/B/C/D</p>
                                </div>
                            )}

                            {/* Feedback */}
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
                                )}{" "}
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
            {showToast && <Toast key={toastKey} message={showToast.message} type={showToast.type} onDismiss={() => setShowToast(null)} />}
        </div>
    );
};

export default App;
