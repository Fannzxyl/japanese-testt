import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

// In this one-file React app, we'll put all the data, components, and logic together.

// This is the data for the vocabulary list.
// In a real application, this would likely be fetched from an API or database.
const vocabulary = [
    {
        id: 1,
        kanji: "私",
        kana: "わたし",
        romaji: "watashi",
        meaning: "saya",
        example: "私は学生です. (Watashi wa gakusei desu.)",
        topic: "Dasar"
    },
    {
        id: 2,
        kanji: "あなた",
        kana: "あなた",
        romaji: "anata",
        meaning: "Anda",
        example: "あなたは先生ですか. (Anata wa sensei desu ka.)",
        topic: "Dasar"
    },
    {
        id: 3,
        kanji: "はい",
        kana: "はい",
        romaji: "hai",
        meaning: "ya",
        example: "はい、そうです. (Hai, sō desu.)",
        topic: "Dasar"
    },
    {
        id: 4,
        kanji: "いいえ",
        kana: "いいえ",
        romaji: "iie",
        meaning: "tidak",
        example: "いいえ、違います. (Iie, chigaimasu.)",
        topic: "Dasar"
    },
    {
        id: 5,
        kanji: "ありがとう",
        kana: "ありがとう",
        romaji: "arigatou",
        meaning: "terima kasih",
        example: "ありがとうございます. (Arigatou gozaimasu.)",
        topic: "Dasar"
    },
    {
        id: 6,
        kanji: "おはよう",
        kana: "おはよう",
        romaji: "ohayou",
        meaning: "selamat pagi",
        example: "おはようございます. (Ohayou gozaimasu.)",
        topic: "Dasar"
    },
    {
        id: 7,
        kanji: "こんにちは",
        kana: "こんにちは",
        romaji: "konnichiwa",
        meaning: "selamat siang",
        example: "こんにちは、お元気ですか. (Konnichiwa, ogenki desu ka.)",
        topic: "Dasar"
    },
    {
        id: 8,
        kanji: "さようなら",
        kana: "さようなら",
        romaji: "sayounara",
        meaning: "selamat tinggal",
        example: "さようなら、また会いましょう. (Sayounara, mata aimashou.)",
        topic: "Dasar"
    },
    {
        id: 9,
        kanji: "すみません",
        kana: "すみません",
        romaji: "sumimasen",
        meaning: "maaf / permisi",
        example: "すみません、トイレはどこですか. (Sumimasen, toire wa doko desu ka.)",
        topic: "Dasar"
    },
    {
        id: 10,
        kanji: "おやすみ",
        kana: "おやすみ",
        romaji: "oyasumi",
        meaning: "selamat tidur",
        example: "おやすみなさい. (Oyasuminasai.)",
        topic: "Dasar"
    },
    {
        id: 11,
        kanji: "食べる",
        kana: "たべる",
        romaji: "taberu",
        meaning: "makan",
        example: "ごはんを食べます. (Gohan o tabemasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 12,
        kanji: "飲む",
        kana: "のむ",
        romaji: "nomu",
        meaning: "minum",
        example: "水を飲みます. (Mizu o nomimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 13,
        kanji: "行く",
        kana: "いく",
        romaji: "iku",
        meaning: "pergi",
        example: "学校に行きます. (Gakkō ni ikimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 14,
        kanji: "来る",
        kana: "くる",
        romaji: "kuru",
        meaning: "datang",
        example: "友達が来ます. (Tomodachi ga kimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 15,
        kanji: "見る",
        kana: "みる",
        romaji: "miru",
        meaning: "melihat",
        example: "映画を見ます. (Eiga o mimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 16,
        kanji: "聞く",
        kana: "きく",
        romaji: "kiku",
        meaning: "mendengar / bertanya",
        example: "音楽を聞きます. (Ongaku o kikimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 17,
        kanji: "読む",
        kana: "よむ",
        romaji: "yomu",
        meaning: "membaca",
        example: "本を読みます. (Hon o yomimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 18,
        kanji: "書く",
        kana: "かく",
        romaji: "kaku",
        meaning: "menulis",
        example: "手紙を書きます. (Tegami o kakimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 19,
        kanji: "話す",
        kana: "はなす",
        romaji: "hanasu",
        meaning: "berbicara",
        example: "日本語を話します. (Nihongo o hanashimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 20,
        kanji: "買う",
        kana: "かう",
        romaji: "kau",
        meaning: "membeli",
        example: "りんごを買います. (Ringo o kaimasu.)",
        topic: "Kata Kerja"
    },
    {
        id: 21,
        kanji: "大きい",
        kana: "おおきい",
        romaji: "ookii",
        meaning: "besar",
        example: "大きな家です. (Ookina ie desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 22,
        kanji: "小さい",
        kana: "ちいさい",
        romaji: "chiisai",
        meaning: "kecil",
        example: "小さい猫です. (Chiisai neko desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 23,
        kanji: "高い",
        kana: "たかい",
        romaji: "takai",
        meaning: "tinggi / mahal",
        example: "高い山です. (Takai yama desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 24,
        kanji: "安い",
        kana: "やすい",
        romaji: "yasui",
        meaning: "murah",
        example: "安い車です. (Yasui kuruma desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 25,
        kanji: "おいしい",
        kana: "おいしい",
        romaji: "oishii",
        meaning: "enak",
        example: "このケーキはおいしいです. (Kono kēki wa oishii desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 26,
        kanji: "まずい",
        kana: "まずい",
        romaji: "mazui",
        meaning: "tidak enak",
        example: "この料理はまずいです. (Kono ryōri wa mazui desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 27,
        kanji: "新しい",
        kana: "あたらしい",
        romaji: "atarashii",
        meaning: "baru",
        example: "新しい靴を買いました. (Atarashii kutsu o kaimashita.)",
        topic: "Kata Sifat"
    },
    {
        id: 28,
        kanji: "古い",
        kana: "ふるい",
        romaji: "furui",
        meaning: "lama / tua",
        example: "古い本です. (Furui hon desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 29,
        kanji: "良い",
        kana: "よい",
        romaji: "yoi",
        meaning: "baik",
        example: "良い天気ですね. (Yoi tenki desu ne.)",
        topic: "Kata Sifat"
    },
    {
        id: 30,
        kanji: "悪い",
        kana: "わるい",
        romaji: "warui",
        meaning: "buruk",
        example: "悪いニュースです. (Warui nyūsu desu.)",
        topic: "Kata Sifat"
    },
    {
        id: 31,
        kanji: "家",
        kana: "いえ",
        romaji: "ie",
        meaning: "rumah",
        example: "私の家は小さいです. (Watashi no ie wa chiisai desu.)",
        topic: "Benda"
    },
    {
        id: 32,
        kanji: "学校",
        kana: "がっこう",
        romaji: "gakkou",
        meaning: "sekolah",
        example: "私は学校に行きます. (Watashi wa gakkō ni ikimasu.)",
        topic: "Benda"
    },
    {
        id: 33,
        kanji: "駅",
        kana: "えき",
        romaji: "eki",
        meaning: "stasiun",
        example: "駅はどこですか. (Eki wa doko desu ka.)",
        topic: "Benda"
    },
    {
        id: 34,
        kanji: "電車",
        kana: "でんしゃ",
        romaji: "densha",
        meaning: "kereta listrik",
        example: "電車に乗ります. (Densha ni norimasu.)",
        topic: "Benda"
    },
    {
        id: 35,
        kanji: "本",
        kana: "ほん",
        romaji: "hon",
        meaning: "buku",
        example: "本を読みます. (Hon o yomimasu.)",
        topic: "Benda"
    },
    {
        id: 36,
        kanji: "ペン",
        kana: "ペン",
        romaji: "pen",
        meaning: "pulpen",
        example: "ペンをください. (Pen o kudasai.)",
        topic: "Benda"
    },
    {
        id: 37,
        kanji: "お金",
        kana: "おかね",
        romaji: "okane",
        meaning: "uang",
        example: "お金がありません. (Okane ga arimasen.)",
        topic: "Benda"
    },
    {
        id: 38,
        kanji: "電話",
        kana: "でんわ",
        romaji: "denwa",
        meaning: "telepon",
        example: "電話をかけます. (Denwa o kakemasu.)",
        topic: "Benda"
    },
    {
        id: 39,
        kanji: "パソコン",
        kana: "パソコン",
        romaji: "pasokon",
        meaning: "komputer pribadi",
        example: "パソコンを使います. (Pasokon o tsukaimasu.)",
        topic: "Benda"
    },
    {
        id: 40,
        kanji: "時計",
        kana: "とけい",
        romaji: "tokei",
        meaning: "jam / arloji",
        example: "時計を見ます. (Tokei o mimasu.)",
        topic: "Benda"
    },
    {
        id: 41,
        kanji: "月曜日",
        kana: "げつようび",
        romaji: "getsuyōbi",
        meaning: "Senin",
        example: "月曜日に会います. (Getsuyōbi ni aimasu.)",
        topic: "Waktu"
    },
    {
        id: 42,
        kanji: "火曜日",
        kana: "かようび",
        romaji: "kayōbi",
        meaning: "Selasa",
        example: "火曜日は休みです. (Kayōbi wa yasumi desu.)",
        topic: "Waktu"
    },
    {
        id: 43,
        kanji: "水曜日",
        kana: "すいようび",
        romaji: "suiyōbi",
        meaning: "Rabu",
        example: "水曜日に働きます. (Suiyōbi ni hatarakimasu.)",
        topic: "Waktu"
    },
    {
        id: 44,
        kanji: "木曜日",
        kana: "もくようび",
        romaji: "mokuyōbi",
        meaning: "Kamis",
        example: "木曜日に映画を見ます. (Mokuyōbi ni eiga o mimasu.)",
        topic: "Waktu"
    },
    {
        id: 45,
        kanji: "金曜日",
        kana: "きんようび",
        romaji: "kin'yōbi",
        meaning: "Jumat",
        example: "金曜日は忙しいです. (Kin'yōbi wa isogashii desu.)",
        topic: "Waktu"
    },
    {
        id: 46,
        kanji: "土曜日",
        kana: "どようび",
        romaji: "doyōbi",
        meaning: "Sabtu",
        example: "土曜日に買い物をします. (Doyōbi ni kaimono o shimasu.)",
        topic: "Waktu"
    },
    {
        id: 47,
        kanji: "日曜日",
        kana: "にちようび",
        romaji: "nichiyōbi",
        meaning: "Minggu",
        example: "日曜日に休みます. (Nichiyōbi ni yasumimasu.)",
        topic: "Waktu"
    },
    {
        id: 48,
        kanji: "今日",
        kana: "きょう",
        romaji: "kyō",
        meaning: "hari ini",
        example: "今日は暑いです. (Kyō wa atsui desu.)",
        topic: "Waktu"
    },
    {
        id: 49,
        kanji: "明日",
        kana: "あした",
        romaji: "ashita",
        meaning: "besok",
        example: "明日は休みです. (Ashita wa yasumi desu.)",
        topic: "Waktu"
    },
    {
        id: 50,
        kanji: "昨日",
        kana: "きのう",
        romaji: "kinō",
        meaning: "kemarin",
        example: "昨日は寒かったです. (Kinō wa samukatta desu.)",
        topic: "Waktu"
    }
];

// Component untuk satu kartu kosakata
const VocabularyCard = ({ item }) => {
    
    // Fungsi untuk memutar audio teks
    const handlePlayAudio = (text, lang = 'ja-JP') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } else {
            // Kita tidak menggunakan alert() karena ini akan mengganggu pengalaman pengguna di dalam iframe
            console.error('Browser Anda tidak mendukung text-to-speech.');
        }
    };

    return (
        <div className="relative bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md transition-transform hover:scale-105">
            {item.kanji && <p className="text-3xl font-bold">{item.kanji}</p>}
            <p className={`text-xl ${item.kanji ? 'text-slate-500 dark:text-slate-400' : 'text-3xl font-bold'}`}>{item.kana}</p>
            <p className="text-md text-slate-600 dark:text-slate-300 mt-1">{item.romaji}</p>
            <p className="text-lg font-semibold mt-3">{item.meaning}</p>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 italic">"{item.example}"</p>
            </div>
            <button onClick={() => handlePlayAudio(item.kana)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                <Volume2 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </button>
        </div>
    );
};

// Komponen utama aplikasi
const App = () => {
    // Mengambil topik unik dari data kosakata
    const topics = [...new Set(vocabulary.map(v => v.topic))];
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);

    // Memfilter kosakata berdasarkan topik yang dipilih
    const filteredVocab = vocabulary.filter(v => v.topic === selectedTopic);

    return (
        <div className="font-sans antialiased text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 min-h-screen p-6">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                    .dark {
                        background-color: #1a202c;
                        color: #e2e8f0;
                    }
                    .dark .bg-white {
                        background-color: #2d3748;
                    }
                    .dark .text-slate-500 {
                        color: #a0aec0;
                    }
                    .dark .text-slate-600 {
                        color: #cbd5e0;
                    }
                    .dark .border-slate-200 {
                        border-color: #4a5568;
                    }
                `}
            </style>
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                        Belajar Bahasa Jepang
                    </h1>
                    <button
                        onClick={() => document.documentElement.classList.toggle('dark')}
                        className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                        <svg
                            className="w-6 h-6 text-slate-600 dark:text-slate-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            ></path>
                        </svg>
                    </button>
                </header>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-4">Pilih Topik</h3>
                    <div className="flex flex-wrap gap-3">
                        {topics.map(topic => (
                            <button
                                key={topic}
                                onClick={() => setSelectedTopic(topic)}
                                className={`
                                    px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                    ${selectedTopic === topic
                                        ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-100 dark:hover:bg-slate-600'
                                    }
                                `}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredVocab.map(item => (
                        <VocabularyCard key={item.id} item={item} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default App;
