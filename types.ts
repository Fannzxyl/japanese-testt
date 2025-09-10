export interface User {
  displayName: string;
  email: string;
  streak: number;
  exp: number;
  gems: number;
}

export interface Kana {
  char: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  group: 'Gojūon' | 'Dakuten' | 'Handakuten' | 'Yōon' | 'Yōon-Dakuten' | 'Yōon-Handakuten';
}

export interface Vocabulary {
  id: number;
  kanji: string | null;
  kana: string;
  romaji: string;
  meaning: string;
  topic: string;
  audioUrl?: string;
  example: string;
}

export interface Kanji {
  id: number;
  character: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  jlptLevel: number;
  strokes: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  language: 'id' | 'en';
  audioAutoplay: boolean;
  showScrollbars: boolean;
  searchHistoryEnabled: boolean;
  aiChatHistoryEnabled: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}