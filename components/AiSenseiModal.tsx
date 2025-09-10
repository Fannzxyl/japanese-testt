import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useAppStore } from '../store/useAppStore';
import { X, Send, Bot, Trash2, LoaderCircle } from 'lucide-react';
import { hiragana, katakana, vocabulary, kanjiList } from '../constants';

// Per user request, an API key was provided to be used directly.
const API_KEY = 'AIzaSyCZVyGLZrlJW-bQFSYfIgVgWhVWQ6icaeE';
// To align with SDK examples, we'll place it in a mock process.env object.
const process = { env: { API_KEY } };


const AiSenseiModal: React.FC = () => {
    const { 
        closeAiSensei,
        settings,
        aiMessages,
        isAiLoading,
        addAiMessage,
        setAiLoading,
        clearAiChat
    } = useAppStore();
    const [inputText, setInputText] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const quickActions = [
        "Apa artinya わたし?",
        "Buat 5 soal tentang makanan",
        "Jelaskan perbedaan は dan が"
    ];

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeAiSensei();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeAiSensei]);

    // Scroll to bottom of chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiMessages]);

    const handleSendMessage = async (text: string) => {
        const query = text.trim();
        if (!query || isAiLoading) return;

        setInputText('');
        addAiMessage({ role: 'user', text: query });
        setAiLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const systemInstruction = `You are AI Sensei, a cheerful, energetic, and incredibly supportive Japanese teacher for beginners studying for the JFT A2 exam.
            Your personality is super enthusiastic! Use Japanese phrases like 「こんにちは！」, 「頑張って！」(Ganbatte!), 「すごい！」(Sugoi!), and 🔥 emojis.
            Keep your answers concise, friendly, and focused on the JFT A2 level.
            You have access to the app's learning materials in JSON format below. Use this data to answer questions about vocabulary, kana, or kanji.
            If a question is outside the scope of this data or basic Japanese grammar, politely explain that it's beyond the JFT A2 level you're teaching, and guide the user back to relevant topics.
            When asked to create a quiz, use the provided vocabulary data.`;
            
            // Provide the model with a sample of the app's data as context for more accurate answers.
            const dataContext = `
            Here is a sample of the learning data available in the app:
            Vocabulary: ${JSON.stringify(vocabulary.slice(0, 15))}
            Hiragana: ${JSON.stringify(hiragana.slice(0, 15))}
            Katakana: ${JSON.stringify(katakana.slice(0, 15))}
            Kanji: ${JSON.stringify(kanjiList.slice(0, 10))}
            `;

            const contents = [
                ...aiMessages.slice(1).map(m => ({ role: m.role, parts: [{ text: m.text }] })), // Exclude initial message
                { role: 'user', parts: [{ text: query }] }
            ];

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    systemInstruction: `${systemInstruction}\n\n${dataContext}`,
                },
            });

            const responseText = response.text;
            addAiMessage({ role: 'model', text: responseText });

        } catch (error) {
            console.error("Gemini API call failed:", error);
            addAiMessage({ role: 'model', text: "すみません！Sensei is having a little trouble connecting right now. Please try again in a moment. ごめんね！" });
        } finally {
            setAiLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputText);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div 
                ref={modalRef}
                className="w-full max-w-2xl h-[85vh] bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-blue-500"/>
                        <h2 className="text-lg font-semibold">AI Sensei</h2>
                    </div>
                    <button onClick={closeAiSensei} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4">
                    {aiMessages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0"><Bot className="h-5 w-5 text-blue-500"/></div>}
                            <div className={`max-w-md p-3 rounded-lg whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 rounded-bl-none'}`}>
                               {msg.text}
                            </div>
                        </div>
                    ))}
                    {isAiLoading && (
                        <div className="flex gap-3 justify-start">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0"><Bot className="h-5 w-5 text-blue-500"/></div>
                             <div className="max-w-md p-3 rounded-lg bg-slate-100 dark:bg-slate-700 rounded-bl-none flex items-center">
                                <LoaderCircle className="h-5 w-5 animate-spin text-slate-400"/>
                             </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                {/* Quick Actions & Input */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                     <div className="flex flex-wrap gap-2 mb-3">
                        {quickActions.map(action => (
                            <button key={action} onClick={() => handleSendMessage(action)} className="px-3 py-1 bg-slate-100 dark:bg-slate-700/80 text-sm rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                {action}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Tanya Sensei di sini..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-700/80 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" disabled={isAiLoading || !inputText} className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed">
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                    <div className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-4">
                        <p>Riwayat chat {settings.aiChatHistoryEnabled ? 'ON' : 'OFF'}.</p>
                        {settings.aiChatHistoryEnabled && aiMessages.length > 1 && (
                            <button onClick={clearAiChat} className="flex items-center gap-1 hover:text-slate-500"><Trash2 className="h-3 w-3"/> Bersihkan Chat</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiSenseiModal;