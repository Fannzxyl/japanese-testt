import { create } from 'zustand';
import { User, Settings, ChatMessage } from '../types';

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
    text: "こんにちは！ I'm SenseiBot. How can I help you with your JFT A2 studies today? You can ask me to explain a concept, or try one of the suggestions below."
};

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  isSidebarCollapsed: false,
  isSearchModalOpen: false,
  isAiSenseiOpen: false,
  user: mockUser,
  settings: {
    theme: 'light',
    language: 'en',
    audioAutoplay: true,
    showScrollbars: false,
    searchHistoryEnabled: false,
    aiChatHistoryEnabled: false,
  },
  aiMessages: [initialAiMessage],
  isAiLoading: false,
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    return { theme: newTheme, settings: {...state.settings, theme: newTheme} };
  }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),
  openAiSensei: () => set({ isAiSenseiOpen: true }),
  closeAiSensei: () => set({ isAiSenseiOpen: false }),
  setSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),
  addAiMessage: (message) => set((state) => ({
      aiMessages: state.settings.aiChatHistoryEnabled ? [...state.aiMessages, message] : [initialAiMessage, message]
  })),
  setAiLoading: (isLoading) => set({ isAiLoading: isLoading }),
  clearAiChat: () => set({ aiMessages: [initialAiMessage] }),
}));
