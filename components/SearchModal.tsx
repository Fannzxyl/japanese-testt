import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Search, X, Clock, Pin, Trash2 } from 'lucide-react';
import { hiragana, katakana, vocabulary, kanjiList } from '../constants';

// Debounce hook
const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

type SearchResult = 
    | { type: 'Kana', data: import('../types').Kana }
    | { type: 'Vocabulary', data: import('../types').Vocabulary }
    | { type: 'Kanji', data: import('../types').Kanji };


const SearchModal: React.FC = () => {
    const { closeSearchModal, settings, setSettings } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>(['こんにちは', 'ありがとう']);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Auto-focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Perform search
    useEffect(() => {
        if (debouncedSearchTerm) {
            const term = debouncedSearchTerm.toLowerCase();
            const allResults: SearchResult[] = [];

            const kanaResults = [...hiragana, ...katakana]
                .filter(k => k.romaji.toLowerCase().includes(term) || k.char.includes(term))
                .map(k => ({ type: 'Kana', data: k } as SearchResult));
            
            const vocabResults = vocabulary
                .filter(v => v.romaji.toLowerCase().includes(term) || v.kana.includes(term) || v.meaning.toLowerCase().includes(term) || v.kanji?.includes(term))
                .map(v => ({ type: 'Vocabulary', data: v } as SearchResult));

            const kanjiResults = kanjiList
                .filter(k => k.character.includes(term) || k.meaning.toLowerCase().includes(term) || k.onyomi.join(',').toLowerCase().includes(term) || k.kunyomi.join(',').toLowerCase().includes(term))
                .map(k => ({ type: 'Kanji', data: k } as SearchResult));

            setResults([...vocabResults, ...kanjiResults, ...kanaResults]);
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]);


    // Handle search history
    useEffect(() => {
        if (debouncedSearchTerm && settings.searchHistoryEnabled) {
            setSearchHistory(prev => {
                const newHistory = [debouncedSearchTerm, ...prev.filter(item => item !== debouncedSearchTerm)];
                return newHistory.slice(0, 10);
            });
        }
    }, [debouncedSearchTerm, settings.searchHistoryEnabled]);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeSearchModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeSearchModal]);

    // Close on outside click
    const handleOutsideClick = (event: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeSearchModal();
        }
    };
    
    const clearHistory = () => setSearchHistory([]);
    const removeHistoryItem = (itemToRemove: string) => {
        setSearchHistory(prev => prev.filter(item => item !== itemToRemove));
    };


    const renderResult = (result: SearchResult) => {
        switch (result.type) {
            case 'Kana':
                return <p><span className="font-bold text-lg">{result.data.char}</span> - {result.data.romaji} ({result.data.type})</p>;
            case 'Vocabulary':
                return <>
                    <p className="font-semibold">{result.data.kanji && `${result.data.kanji} (${result.data.kana})` || result.data.kana}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.data.meaning}</p>
                </>;
            case 'Kanji':
                return <>
                    <p className="font-semibold">{result.data.character}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{result.data.meaning}</p>
                </>;
            default:
                return null;
        }
    }


    return (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 z-50"
            onClick={handleOutsideClick}
        >
            <div 
                ref={modalRef}
                className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for kana, vocabulary, or kanji..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent text-lg ml-3 focus:outline-none"
                    />
                    <button onClick={closeSearchModal} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {searchTerm ? (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 px-2">Results for "{debouncedSearchTerm}"</h3>
                            {results.length > 0 ? (
                                <ul className="mt-2">
                                    {results.map((item, index) => (
                                        <li key={index} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md cursor-pointer">
                                            {renderResult(item)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-slate-500 p-6">No results found.</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            {settings.searchHistoryEnabled && searchHistory.length > 0 && (
                                <>
                                    <div className="flex justify-between items-center px-2">
                                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Recent Searches</h3>
                                        <button onClick={clearHistory} className="text-xs text-blue-500 hover:underline">Clear all</button>
                                    </div>
                                    <ul className="mt-2">
                                        {searchHistory.map((item, index) => (
                                            <li key={index} className="flex items-center justify-between p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md cursor-pointer group">
                                                <div className="flex items-center">
                                                    <Clock className="h-4 w-4 text-slate-400 mr-3" />
                                                    <span>{item}</span>
                                                </div>
                                                <div className="hidden group-hover:flex items-center space-x-2">
                                                    <button title="Remove" onClick={() => removeHistoryItem(item)} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600">
                                                        <Trash2 className="h-4 w-4 text-slate-500"/>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <div className="text-center text-sm text-slate-500 mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                                <p>Search history is currently {settings.searchHistoryEnabled ? 'ON' : 'OFF'}.</p>
                                <button
                                    onClick={() => setSettings({ searchHistoryEnabled: !settings.searchHistoryEnabled })}
                                    className="text-blue-500 hover:underline mt-1"
                                >
                                    Turn {settings.searchHistoryEnabled ? 'Off' : 'On'} in Settings
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;