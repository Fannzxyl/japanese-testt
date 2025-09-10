import { create } from 'zustand';
import { User, Settings, ChatMessage, TestConfig } from '../types';

interface AppState {
  theme: 'light' | 'dark';
  isSidebarCollapsed: boolean;
  isSearchModalOpen: boolean;
  isAiSenseiOpen: boolean;
  user: User;
  settings: Settings;
  aiMessages: ChatMessage[];
  isAiLoading: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  openAiSensei: () => void;
  closeAiSensei: () => void;
  setSettings: (settings: Partial<Settings>) => void;
  setLastTestConfig: (config: TestConfig) => void;
  addAiMessage: (message: ChatMessage) => void;
  setAiLoading: (isLoading: boolean) => void;
  clearAiChat: () => void;
}

const mockUser: User = {
    displayName: 'Guest User',
    email: 'guest@nihongolab.com',
    streak: 5,
    exp: 1250,
    gems: 300,
};

const initialAiMessage: ChatMessage = {
    role: 'model',
    text: "こんにちは、みんなさん！ Saya AI Sensei, partner belajarmu yang paling bersemangat! 🔥 Siap untuk menaklukkan JFT A2 bersama? Tanya apa saja tentang kana, kosakata, atau minta Sensei buatkan kuis! Ayo mulai!"
};

const loadSettings = (): Settings => {
  try {
    const savedSettings = localStorage.getItem('nihongolab_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error("Failed to load settings from localStorage", error);
  }
  return {
    theme: 'light',
    language: 'en',
    audioAutoplay: true,
    showScrollbars: false,
    searchHistoryEnabled: false,
    aiChatHistoryEnabled: false,
  };
};

const saveSettings = (settings: Settings) => {
  try {
    localStorage.setItem('nihongolab_settings', JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings to localStorage", error);
  }
};


export const useAppStore = create<AppState>((set) => ({
  theme: loadSettings().theme,
  isSidebarCollapsed: false,
  isSearchModalOpen: false,
  isAiSenseiOpen: false,
  user: mockUser,
  settings: loadSettings(),
  aiMessages: [initialAiMessage],
  isAiLoading: false,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    // FIX: Explicitly type newSettings to conform to the Settings interface, resolving type inference issues.
    const newSettings: Settings = { ...state.settings, theme: newTheme };
    saveSettings(newSettings);
    return { theme: newTheme, settings: newSettings };
  }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  openAiSensei: () => set({ isAiSenseiOpen: true }),
  closeAiSensei: () => set({ isAiSenseiOpen: false }),
  setSettings: (newSettings) => set((state) => {
    const updatedSettings = { ...state.settings, ...newSettings };
    saveSettings(updatedSettings);
    return { settings: updatedSettings };
  }),
  setLastTestConfig: (config) => set((state) => {
    const newSettings = { ...state.settings, lastTestConfig: config };
    saveSettings(newSettings);
    return { settings: newSettings };
  }),
  addAiMessage: (message) => set((state) => ({
      aiMessages: state.settings.aiChatHistoryEnabled ? [...state.aiMessages, message] : [initialAiMessage, message]
  })),
  setAiLoading: (isLoading) => set({ isAiLoading: isLoading }),
  clearAiChat: () => set({ aiMessages: [initialAiMessage] }),
}));
