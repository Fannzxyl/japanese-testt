import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { X, Send, Bot, Trash2, LoaderCircle } from 'lucide-react';

const AiSenseiModal: React.FC = () => {
    const { 
        closeAiSensei,
        settings,
        setSettings,
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
        "Buat 5 soal transportasi",
        "Jelaskan partikel は vs が",
        "Rencana belajar 10 menit"
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

        // Mock Gemini API call
        setTimeout(() => {
            let responseText = "Maaf, saya tidak mengerti pertanyaan itu. Coba tanyakan tentang Hiragana, Katakana, atau kosakata JFT A2.";
            
            const lowerQuery = query.toLowerCase();
            if (lowerQuery.includes("soal transportasi")) {
                responseText = "Tentu! Ini 5 soal pilihan ganda tentang transportasi:\n\n1. 「えき」は 英語で 何ですか。\nA) School\nB) Station\nC) Airport\n\n2. 「くるま」の 漢字は どれですか。\nA) 車\nB) 電\nC) 道\n\n3. I go to school by bus. -> 日本語で...\nA) わたしはバスでがっこうにいきます。\nB) わたしはくるまでがっこうにいきます。\n\n4. Shinkansen is a... \nA) Bicycle \nB) Car \nC) Bullet Train \n\n5. 「ひこうき」は 何ですか。\nA) Airplane \nB) Ship \nC) Bicycle";
            } else if (lowerQuery.includes("は vs が")) {
                responseText = "Tentu! Partikel 「は」 (wa) digunakan untuk menandai **topik** kalimat—apa yang sedang dibicarakan. Partikel 「が」 (ga) digunakan untuk menandai **subjek** dari sebuah aksi atau deskripsi, seringkali untuk memberikan informasi baru.\n\nContoh:\n- わたし **は** がくせいです。(Topiknya adalah 'saya', dan saya jelaskan bahwa saya seorang siswa.)\n- あそこに ねこ **が** います。(Informasi barunya adalah 'kucing' yang ada di sana.)";
            } else if (lowerQuery.includes("rencana belajar")) {
                responseText = "Baik! Ini rencana belajar 10 menit untukmu:\n\n- **3 menit:** Ulas 10 kartu Hiragana yang paling sering kamu salah.\n- **5 menit:** Pelajari 5 kosakata baru dari topik 'Belanja'.\n- **2 menit:** Coba kuis singkat tentang 5 kosakata tersebut.";
            } else if (lowerQuery.includes("konnichiwa")) {
                responseText = "こんにちは！"
            }
            
            addAiMessage({ role: 'model', text: responseText });
            setAiLoading(false);
        }, 1500); // Simulate network delay
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
                            placeholder="Ask Sensei a question..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-700/80 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" disabled={isAiLoading || !inputText} className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed">
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                    <div className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-4">
                        <p>Chat history is {settings.aiChatHistoryEnabled ? 'ON' : 'OFF'}.</p>
                        {settings.aiChatHistoryEnabled && aiMessages.length > 1 && (
                            <button onClick={clearAiChat} className="flex items-center gap-1 hover:text-slate-500"><Trash2 className="h-3 w-3"/> Clear Chat</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiSenseiModal;
