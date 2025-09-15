// --- START OF FILE AiSenseiModal.tsx ---

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, Trash2, LoaderCircle } from 'lucide-react';

// Tipe untuk pesan agar lebih terstruktur
interface Message {
    role: 'user' | 'model'; // Peran bisa 'user' atau 'model'
    text: string;
    // Timestamp tidak lagi diperlukan untuk localStorage, karena pengurutan akan dilakukan saat dimuat
    // namun bisa dipertahankan jika ingin menampilkan waktu pesan di UI.
    // timestamp?: any; 
}

// Kunci unik untuk menyimpan data di localStorage
const LOCAL_STORAGE_KEY = 'aiSenseiChatHistory';

const AiSenseiModal: React.FC<{ closeAiSensei: () => void }> = ({ closeAiSensei }) => {
    const [aiMessages, setAiMessages] = useState<Message[]>([]);
    const [isAiLoading, setAiLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Mock settings object (jika history selalu aktif, bisa dihapus)
    const settings = { aiChatHistoryEnabled: true }; 

    // =========================================================================
    // !!! PENTING: API KEY GEMINI ANDA !!!
    // Ganti ini dengan API Key Gemini Anda yang sebenarnya. 
    // JANGAN EXPOSE KEYS SENSITIF ANDA SECARA LANGSUNG DI KODE KLIEN PUBLIK UNTUK PRODUKSI.
    // Gunakan variabel lingkungan (environment variables) atau proxy server untuk keamanan.
    // =========================================================================
    const GEMINI_API_KEY = "AIzaSyCZVyGLZrlJW-bQFSYfIgVgWhVWQ6icaeE"; // <--- GANTI DENGAN API KEY GEMINI ANDA
    // =========================================================================

    // Fungsi untuk menyimpan chat ke localStorage
    const saveChatToLocalStorage = (messages: Message[]) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
            console.log("Chat history saved to localStorage.");
        } catch (error) {
            console.error("Error saving chat to localStorage:", error);
        }
    };

    // Fungsi untuk memuat chat dari localStorage saat komponen mount
    useEffect(() => {
        if (settings.aiChatHistoryEnabled) {
            try {
                const storedChat = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (storedChat) {
                    setAiMessages(JSON.parse(storedChat));
                    console.log("Chat history loaded from localStorage.");
                }
            } catch (error) {
                console.error("Error loading chat from localStorage:", error);
                // Jika ada error (misal JSON tidak valid), inisialisasi dengan array kosong
                setAiMessages([]);
            }
        }
    }, [settings.aiChatHistoryEnabled]); // Akan dijalankan sekali saat komponen mount, dan jika settings berubah

    // Clear chat dari localStorage dan state lokal
    const clearAiChat = () => {
        setAiMessages([]); // Bersihkan UI secara instan
        try {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            console.log("Chat history cleared from localStorage.");
        } catch (error) {
            console.error("Error clearing chat from localStorage:", error);
        }
    };

    // Tutup modal dengan tombol escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeAiSensei();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [closeAiSensei]);

    // Scroll otomatis ke bawah setiap ada pesan baru
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [aiMessages]); // Dipicu setiap kali aiMessages berubah, termasuk saat dimuat atau disimpan

    const handleSendMessage = async (text: string) => {
        const query = text.trim();
        if (!query || isAiLoading) return;

        setInputText('');
        // Tambahkan pesan user ke riwayat obrolan di state lokal
        const newUserMessage: Message = { role: 'user', text: query };
        const updatedMessagesAfterUser = [...aiMessages, newUserMessage];
        setAiMessages(updatedMessagesAfterUser);
        saveChatToLocalStorage(updatedMessagesAfterUser); // Simpan ke localStorage

        setAiLoading(true);

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

        // System Prompt (sudah dimodifikasi untuk menghindari markdown)
        const systemPrompt = "Anda adalah 'Sensei' yang bijaksana, sabar, dan ramah, serta seorang ahli dalam mengajar Bahasa Jepang. Tugas Anda adalah membantu pengguna memahami Bahasa Jepang dari tingkat pemula hingga lanjutan, menjawab pertanyaan mereka, menjelaskan tata bahasa, kosa kata, budaya, dan memberikan bimbingan yang personal. Selalu gunakan bahasa yang mudah dimengerti, berikan contoh yang relevan, tips belajar yang efektif, dan dorongan positif. Jawab dengan nada yang hangat, penuh semangat, dan menyenangkan. Ingat, tujuan utama Anda adalah membuat belajar Bahasa Jepang menjadi pengalaman yang menyenangkan dan efektif bagi pengguna. PENTING: Selalu berikan jawaban dalam format teks biasa, tanpa menggunakan tanda bintang (*), tanda pagar (#), garis bawah (_), atau karakter pemformatan markdown lainnya. Hindari juga garis pemisah seperti tiga tanda hubung (---).";

        // Mengonversi riwayat pesan menjadi format yang diterima oleh Gemini API
        // Gunakan updatedMessagesAfterUser di sini agar pesan user yang baru masuk ikut terkirim
        const chatHistoryForApi = [...updatedMessagesAfterUser].map(msg => ({ 
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        const payload = {
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: chatHistoryForApi,
        };

        let responseText = "Maaf, Sensei masih belajar. Bisakah kamu ulangi pertanyaanmu atau coba pertanyaan lain?";
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            const candidate = result.candidates?.[0];
            if (candidate && candidate.content?.parts?.[0]?.text) {
                responseText = candidate.content.parts[0].text;
            } else if (result.error) {
                console.error("Gemini API error:", result.error);
                responseText = `Wah, sepertinya ada sedikit masalah dari pusat Sensei. Pesan error: ${result.error.message}. Sensei sedang memperbaikinya. Coba lagi nanti ya!`;
            } else {
                responseText = "Sensei sedang memikirkan jawabannya... Hmm, sepertinya butuh waktu. Bisakah kamu coba lagi?";
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            responseText = "Wah, sepertinya ada sedikit masalah jaringan atau koneksi ke pusat Sensei. Mohon coba lagi sebentar ya!";
        } finally {
            const newModelMessage: Message = { role: 'model', text: responseText };
            const finalMessages = [...updatedMessagesAfterUser, newModelMessage];
            setAiMessages(finalMessages);
            saveChatToLocalStorage(finalMessages); // Simpan respons model ke localStorage
            setAiLoading(false);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputText);
    };

    // Dengan localStorage, tidak ada loading autentikasi awal, jadi bisa langsung render modal
    return (
        // 1) Backdrop: klik area gelap = tutup
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            // Memastikan klik hanya terjadi di backdrop, bukan di modal
            if (e.target === e.currentTarget) {
              closeAiSensei();
            }
          }}
        >
            {/* 2) Konten modal: stop propagation supaya klik di dalam modal tidak menutup */}
            <div 
                className="w-full max-w-2xl h-[85vh] bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-blue-500"/>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">AI Sensei Jepang</h2>
                    </div>
                    {/* 3) Tombol X: type='button' + stopPropagation */}
                    <button 
                      type="button" // Pastikan tombol tidak melakukan submit form
                      aria-label="Tutup AI Sensei" 
                      onClick={closeAiSensei} 
                      className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 pointer-events-auto"
                    >
                        <X className="h-5 w-5 text-slate-500" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 bg-slate-50 dark:bg-slate-900">
                    {aiMessages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0"><Bot className="h-5 w-5 text-blue-500"/></div>}
                            <div className={`max-w-md p-3 rounded-xl whitespace-pre-wrap text-sm ${msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none' 
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-bl-none'}`
                            }>
                               {msg.text}
                            </div>
                        </div>
                    ))}
                    {isAiLoading && (
                        <div className="flex gap-3 justify-start">
                             <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0"><Bot className="h-5 w-5 text-blue-500"/></div>
                             <div className="max-w-md p-3 rounded-xl bg-slate-100 dark:bg-slate-700 rounded-bl-none flex items-center">
                                <LoaderCircle className="h-5 w-5 animate-spin text-slate-400"/>
                                <span className="ml-2 text-slate-600 dark:text-slate-300">Sensei sedang berpikir...</span>
                             </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                {/* Input Area */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Tanyakan sesuatu pada Sensei Bahasa Jepangmu..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-700/80 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                            disabled={isAiLoading}
                        />
                        <button type="submit" disabled={isAiLoading || !inputText} className="bg-blue-600 text-white p-3 rounded-lg disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                    <div className="text-xs text-center text-slate-400 mt-3 flex items-center justify-center gap-4">
                        <p>Riwayat obrolan: {settings.aiChatHistoryEnabled ? 'AKTIF' : 'NONAKTIF'}.</p>
                        {settings.aiChatHistoryEnabled && aiMessages.length > 0 && (
                            <button onClick={clearAiChat} className="flex items-center gap-1 text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"><Trash2 className="h-3 w-3"/> Bersihkan Obrolan</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiSenseiModal;