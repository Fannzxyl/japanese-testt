import { ReactNode } from 'react';

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
  lastTestConfig?: TestConfig;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// Types for the new Test Suite
export type TestDomain = "kana" | "vocabulary" | "kanji";
export type ScriptOption = "hiragana" | "katakana" | "both";
export type DirectionOption = "kana-to-romaji" | "romaji-to-kana";
export type ModeOption = "typing" | "mcq" | "listening";
export type PresetKey = "all" | "aiueo-m" | "base" | "dakuten" | "youon";

export type Selection =
 | { kind:"preset"; value: PresetKey }
 | { kind:"list"; value: string[] };

export interface ChallengeConfig { 
  enabled: boolean; 
  durationSec: 180 | 300 | 600; 
}

export interface TestConfig {
  domain: TestDomain;
  script: ScriptOption;
  direction: DirectionOption;
  mode: ModeOption;
  count: number;
  challenge: ChallengeConfig;
  selection: Selection;
}

export interface TestQuestion {
  prompt: string;
  promptMeta?: string; // e.g., for romaji-to-kana
  answer: string[]; // Array to support multiple correct answers (e.g., ji/zu)
  choices?: string[]; // For MCQ mode
  audioSrc?: string;
}

export interface TestAttempt {
  question: TestQuestion;
  userAnswer: string;
  isCorrect: boolean;
}
