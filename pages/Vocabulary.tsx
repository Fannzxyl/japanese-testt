import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

// This is the data for the vocabulary list.
// In a real application, this would likely be fetched from an API or database.
const vocabulary = [
    // --- Topik: Dasar ---
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
    
    // --- Topik: Kata Kerja ---
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

    // --- Topik: Kata Sifat ---
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
    
    // --- Topik: Benda ---
    {
        id: 26,
        kanji: "家",
        kana: "いえ",
        romaji: "ie",
        meaning: "rumah",
        example: "私の家は小さいです. (Watashi no ie wa chiisai desu.)",
        topic: "Benda"
    },
    {
        id: 27,
        kanji: "学校",
        kana: "がっこう",
        romaji: "gakkou",
        meaning: "sekolah",
        example: "私は学校に行きます. (Watashi wa gakkō ni ikimasu.)",
        topic: "Benda"
    },
    {
        id: 28,
        kanji: "駅",
        kana: "えき",
        romaji: "eki",
        meaning: "stasiun",
        example: "駅はどこですか. (Eki wa doko desu ka.)",
        topic: "Benda"
    },
    {
        id: 29,
        kanji: "電車",
        kana: "でんしゃ",
        romaji: "densha",
        meaning: "kereta listrik",
        example: "電車に乗ります. (Densha ni norimasu.)",
        topic: "Benda"
    },
    {
        id: 30,
        kanji: "本",
        kana: "ほん",
        romaji: "hon",
        meaning: "buku",
        example: "本を読みます. (Hon o yomimasu.)",
        topic: "Benda"
    },
    
    // --- Topik: Waktu ---
    {
        id: 31,
        kanji: "今日",
        kana: "きょう",
        romaji: "kyō",
        meaning: "hari ini",
        example: "今日は暑いです. (Kyō wa atsui desu.)",
        topic: "Waktu"
    },
    {
        id: 32,
        kanji: "明日",
        kana: "あした",
        romaji: "ashita",
        meaning: "besok",
        example: "明日は休みです. (Ashita wa yasumi desu.)",
        topic: "Waktu"
    },
    {
        id: 33,
        kanji: "昨日",
        kana: "きのう",
        romaji: "kinō",
        meaning: "kemarin",
        example: "昨日は寒かったです. (Kinō wa samukatta desu.)",
        topic: "Waktu"
    },
    
    // --- Tambahan: Angka & Penghitungan ---
    { id: 34, kanji: "一", kana: "いち", romaji: "ichi", meaning: "satu", example: "リンゴを一つください. (Ringo o hitotsu kudasai.)", topic: "Angka" },
    { id: 35, kanji: "二", kana: "に", romaji: "ni", meaning: "dua", example: "私は二匹の猫を飼っています. (Watashi wa nihiki no neko o katteimasu.)", topic: "Angka" },
    { id: 36, kanji: "三", kana: "さん", romaji: "san", meaning: "tiga", example: "三階です. (Sangai desu.)", topic: "Angka" },
    { id: 37, kanji: "四", kana: "よん", romaji: "yon", meaning: "empat", example: "四時です. (Yoji desu.)", topic: "Angka" },
    { id: 38, kanji: "五", kana: "ご", romaji: "go", meaning: "lima", example: "五分待ってください. (Gofun matte kudasai.)", topic: "Angka" },
    
    // --- Tambahan: Makanan & Minuman ---
    { id: 39, kanji: "ご飯", kana: "ごはん", romaji: "gohan", meaning: "nasi, makanan", example: "朝ごはんは食べましたか. (Asagohan wa tabemashita ka.)", topic: "Makanan & Minuman" },
    { id: 40, kanji: "水", kana: "みず", romaji: "mizu", meaning: "air", example: "水をください. (Mizu o kudasai.)", topic: "Makanan & Minuman" },
    { id: 41, kanji: "お茶", kana: "おちゃ", romaji: "ocha", meaning: "teh hijau", example: "お茶を飲みます. (Ocha o nomimasu.)", topic: "Makanan & Minuman" },
    { id: 42, kanji: "肉", kana: "にく", romaji: "niku", meaning: "daging", example: "この肉は美味しいです. (Kono niku wa oishii desu.)", topic: "Makanan & Minuman" },
    { id: 43, kanji: "魚", kana: "さかな", romaji: "sakana", meaning: "ikan", example: "魚が好きです. (Sakana ga suki desu.)", topic: "Makanan & Minuman" },
    { id: 44, kanji: "パン", kana: "パン", romaji: "pan", meaning: "roti", example: "パンを食べました. (Pan o tabemashita.)", topic: "Makanan & Minuman" },
    
    // --- Tambahan: Keluarga ---
    { id: 45, kanji: "家族", kana: "かぞく", romaji: "kazoku", meaning: "keluarga", example: "私の家族は五人です. (Watashi no kazoku wa gonin desu.)", topic: "Keluarga" },
    { id: 46, kanji: "父", kana: "ちち", romaji: "chichi", meaning: "ayah", example: "私の父は医者です. (Watashi no chichi wa isha desu.)", topic: "Keluarga" },
    { id: 47, kanji: "母", kana: "はは", romaji: "haha", meaning: "ibu", example: "母は料理が上手です. (Haha wa ryōri ga jōzu desu.)", topic: "Keluarga" },
    { id: 48, kanji: "兄", kana: "あに", romaji: "ani", meaning: "kakak laki-laki (sendiri)", example: "兄が一人います. (Ani ga hitori imasu.)", topic: "Keluarga" },
    { id: 49, kanji: "弟", kana: "おとうと", romaji: "otouto", meaning: "adik laki-laki", example: "弟は学生です. (Otouto wa gakusei desu.)", topic: "Keluarga" },
    { id: 50, kanji: "姉", kana: "あね", romaji: "ane", meaning: "kakak perempuan (sendiri)", example: "私の姉は優しいです. (Watashi no ane wa yasashii desu.)", topic: "Keluarga" },
    { id: 51, kanji: "妹", kana: "いもうと", romaji: "imouto", meaning: "adik perempuan", example: "妹はとてもかわいいです. (Imouto wa totemo kawaii desu.)", topic: "Keluarga" },
    
    // --- Tambahan: Tempat & Lokasi ---
    { id: 52, kanji: "店", kana: "みせ", romaji: "mise", meaning: "toko", example: "あの店は人気があります. (Ano mise wa ninki ga arimasu.)", topic: "Tempat" },
    { id: 53, kanji: "病院", kana: "びょういん", romaji: "byouin", meaning: "rumah sakit", example: "病院に行きます. (Byouin ni ikimasu.)", topic: "Tempat" },
    { id: 54, kanji: "銀行", kana: "ぎんこう", romaji: "ginkou", meaning: "bank", example: "銀行はどこですか. (Ginkou wa doko desu ka.)", topic: "Tempat" },
    { id: 55, kanji: "郵便局", kana: "ゆうびんきょく", romaji: "yuubinkyoku", meaning: "kantor pos", example: "郵便局は遠いです. (Yuubinkyoku wa tooi desu.)", topic: "Tempat" },
    { id: 56, kanji: "公園", kana: "こうえん", romaji: "kouen", meaning: "taman", example: "公園で遊びます. (Kouen de asobimasu.)", topic: "Tempat" },
    
    // --- Tambahan: Kata Benda ---
    { id: 57, kanji: "電話", kana: "でんわ", romaji: "denwa", meaning: "telepon", example: "電話をかけます. (Denwa o kakemasu.)", topic: "Benda" },
    { id: 58, kanji: "鍵", kana: "かぎ", romaji: "kagi", meaning: "kunci", example: "鍵をなくしました. (Kagi o nakushimashita.)", topic: "Benda" },
    { id: 59, kanji: "財布", kana: "さいふ", romaji: "saifu", meaning: "dompet", example: "財布を忘れました. (Saifu o wasuremashita.)", topic: "Benda" },
    { id: 60, kanji: "傘", kana: "かさ", romaji: "kasa", meaning: "payung", example: "傘を持っていますか. (Kasa o motteimasu ka.)", topic: "Benda" },
    { id: 61, kanji: "椅子", kana: "いす", romaji: "isu", meaning: "kursi", example: "この椅子に座ってください. (Kono isu ni suwatte kudasai.)", topic: "Benda" },
    { id: 62, kanji: "机", kana: "つくえ", romaji: "tsukue", meaning: "meja", example: "机の上です. (Tsukue no ue desu.)", topic: "Benda" },
    
    // --- Tambahan: Hobi & Kegiatan ---
    { id: 63, kanji: "音楽", kana: "おんがく", romaji: "ongaku", meaning: "musik", example: "音楽を聴くのが好きです. (Ongaku o kiku no ga suki desu.)", topic: "Hobi" },
    { id: 64, kanji: "映画", kana: "えいが", romaji: "eiga", meaning: "film", example: "映画を見に行きましょう. (Eiga o mi ni ikimashou.)", topic: "Hobi" },
    { id: 65, kanji: "旅行", kana: "りょこう", romaji: "ryokou", meaning: "perjalanan", example: "旅行が好きです. (Ryokou ga suki desu.)", topic: "Hobi" },
    { id: 66, kanji: "スポーツ", kana: "スポーツ", romaji: "supōtsu", meaning: "olahraga", example: "スポーツをします. (Supōtsu o shimasu.)", topic: "Hobi" },
    { id: 67, kanji: "料理", kana: "りょうり", romaji: "ryouri", meaning: "masakan", example: "料理を習いたいです. (Ryouri o naraitai desu.)", topic: "Hobi" },
];

const VocabularyCard = ({ item }) => {
    const handlePlayAudio = (text, lang = 'ja-JP') => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } else {
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

const Vocabulary = () => {
    const topics = [...new Set(vocabulary.map(v => v.topic))];
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);

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

export default Vocabulary;
