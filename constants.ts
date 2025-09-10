import { Kana, Vocabulary, Kanji } from './types';

export const hiragana: Kana[] = [
    // Gojuon
    { char: 'あ', romaji: 'a', type: 'hiragana', group: 'Gojūon' }, { char: 'い', romaji: 'i', type: 'hiragana', group: 'Gojūon' }, { char: 'う', romaji: 'u', type: 'hiragana', group: 'Gojūon' }, { char: 'え', romaji: 'e', type: 'hiragana', group: 'Gojūon' }, { char: 'お', romaji: 'o', type: 'hiragana', group: 'Gojūon' },
    { char: 'か', romaji: 'ka', type: 'hiragana', group: 'Gojūon' }, { char: 'き', romaji: 'ki', type: 'hiragana', group: 'Gojūon' }, { char: 'く', romaji: 'ku', type: 'hiragana', group: 'Gojūon' }, { char: 'け', romaji: 'ke', type: 'hiragana', group: 'Gojūon' }, { char: 'こ', romaji: 'ko', type: 'hiragana', group: 'Gojūon' },
    { char: 'さ', romaji: 'sa', type: 'hiragana', group: 'Gojūon' }, { char: 'し', romaji: 'shi', type: 'hiragana', group: 'Gojūon' }, { char: 'す', romaji: 'su', type: 'hiragana', group: 'Gojūon' }, { char: 'せ', romaji: 'se', type: 'hiragana', group: 'Gojūon' }, { char: 'そ', romaji: 'so', type: 'hiragana', group: 'Gojūon' },
    { char: 'た', romaji: 'ta', type: 'hiragana', group: 'Gojūon' }, { char: 'ち', romaji: 'chi', type: 'hiragana', group: 'Gojūon' }, { char: 'つ', romaji: 'tsu', type: 'hiragana', group: 'Gojūon' }, { char: 'て', romaji: 'te', type: 'hiragana', group: 'Gojūon' }, { char: 'と', romaji: 'to', type: 'hiragana', group: 'Gojūon' },
    { char: 'な', romaji: 'na', type: 'hiragana', group: 'Gojūon' }, { char: 'に', romaji: 'ni', type: 'hiragana', group: 'Gojūon' }, { char: 'ぬ', romaji: 'nu', type: 'hiragana', group: 'Gojūon' }, { char: 'ね', romaji: 'ne', type: 'hiragana', group: 'Gojūon' }, { char: 'の', romaji: 'no', type: 'hiragana', group: 'Gojūon' },
    { char: 'は', romaji: 'ha', type: 'hiragana', group: 'Gojūon' }, { char: 'ひ', romaji: 'hi', type: 'hiragana', group: 'Gojūon' }, { char: 'ふ', romaji: 'fu', type: 'hiragana', group: 'Gojūon' }, { char: 'へ', romaji: 'he', type: 'hiragana', group: 'Gojūon' }, { char: 'ほ', romaji: 'ho', type: 'hiragana', group: 'Gojūon' },
    { char: 'ま', romaji: 'ma', type: 'hiragana', group: 'Gojūon' }, { char: 'み', romaji: 'mi', type: 'hiragana', group: 'Gojūon' }, { char: 'む', romaji: 'mu', type: 'hiragana', group: 'Gojūon' }, { char: 'め', romaji: 'me', type: 'hiragana', group: 'Gojūon' }, { char: 'も', romaji: 'mo', type: 'hiragana', group: 'Gojūon' },
    { char: 'や', romaji: 'ya', type: 'hiragana', group: 'Gojūon' }, { char: 'ゆ', romaji: 'yu', type: 'hiragana', group: 'Gojūon' }, { char: 'よ', romaji: 'yo', type: 'hiragana', group: 'Gojūon' },
    { char: 'ら', romaji: 'ra', type: 'hiragana', group: 'Gojūon' }, { char: 'り', romaji: 'ri', type: 'hiragana', group: 'Gojūon' }, { char: 'る', romaji: 'ru', type: 'hiragana', group: 'Gojūon' }, { char: 'れ', romaji: 're', type: 'hiragana', group: 'Gojūon' }, { char: 'ろ', romaji: 'ro', type: 'hiragana', group: 'Gojūon' },
    { char: 'わ', romaji: 'wa', type: 'hiragana', group: 'Gojūon' }, { char: 'を', romaji: 'wo', type: 'hiragana', group: 'Gojūon' },
    { char: 'ん', romaji: 'n', type: 'hiragana', group: 'Gojūon' },
    // Dakuten
    { char: 'が', romaji: 'ga', type: 'hiragana', group: 'Dakuten' }, { char: 'ぎ', romaji: 'gi', type: 'hiragana', group: 'Dakuten' }, { char: 'ぐ', romaji: 'gu', type: 'hiragana', group: 'Dakuten' }, { char: 'げ', romaji: 'ge', type: 'hiragana', group: 'Dakuten' }, { char: 'ご', romaji: 'go', type: 'hiragana', group: 'Dakuten' },
    { char: 'ざ', romaji: 'za', type: 'hiragana', group: 'Dakuten' }, { char: 'じ', romaji: 'ji', type: 'hiragana', group: 'Dakuten' }, { char: 'ず', romaji: 'zu', type: 'hiragana', group: 'Dakuten' }, { char: 'ぜ', romaji: 'ze', type: 'hiragana', group: 'Dakuten' }, { char: 'ぞ', romaji: 'zo', type: 'hiragana', group: 'Dakuten' },
    { char: 'だ', romaji: 'da', type: 'hiragana', group: 'Dakuten' }, { char: 'ぢ', romaji: 'ji', type: 'hiragana', group: 'Dakuten' }, { char: 'づ', romaji: 'zu', type: 'hiragana', group: 'Dakuten' }, { char: 'で', romaji: 'de', type: 'hiragana', group: 'Dakuten' }, { char: 'ど', romaji: 'do', type: 'hiragana', group: 'Dakuten' },
    { char: 'ば', romaji: 'ba', type: 'hiragana', group: 'Dakuten' }, { char: 'び', romaji: 'bi', type: 'hiragana', group: 'Dakuten' }, { char: 'ぶ', romaji: 'bu', type: 'hiragana', group: 'Dakuten' }, { char: 'べ', romaji: 'be', type: 'hiragana', group: 'Dakuten' }, { char: 'ぼ', romaji: 'bo', type: 'hiragana', group: 'Dakuten' },
    // Handakuten
    { char: 'ぱ', romaji: 'pa', type: 'hiragana', group: 'Handakuten' }, { char: 'ぴ', romaji: 'pi', type: 'hiragana', group: 'Handakuten' }, { char: 'ぷ', romaji: 'pu', type: 'hiragana', group: 'Handakuten' }, { char: 'ぺ', romaji: 'pe', type: 'hiragana', group: 'Handakuten' }, { char: 'ぽ', romaji: 'po', type: 'hiragana', group: 'Handakuten' },
    // Yoon
    { char: 'きゃ', romaji: 'kya', type: 'hiragana', group: 'Yōon' }, { char: 'きゅ', romaji: 'kyu', type: 'hiragana', group: 'Yōon' }, { char: 'きょ', romaji: 'kyo', type: 'hiragana', group: 'Yōon' },
    { char: 'しゃ', romaji: 'sha', type: 'hiragana', group: 'Yōon' }, { char: 'しゅ', romaji: 'shu', type: 'hiragana', group: 'Yōon' }, { char: 'しょ', romaji: 'sho', type: 'hiragana', group: 'Yōon' },
    { char: 'ちゃ', romaji: 'cha', type: 'hiragana', group: 'Yōon' }, { char: 'ちゅ', romaji: 'chu', type: 'hiragana', group: 'Yōon' }, { char: 'ちょ', romaji: 'cho', type: 'hiragana', group: 'Yōon' },
    { char: 'にゃ', romaji: 'nya', type: 'hiragana', group: 'Yōon' }, { char: 'にゅ', romaji: 'nyu', type: 'hiragana', group: 'Yōon' }, { char: 'にょ', romaji: 'nyo', type: 'hiragana', group: 'Yōon' },
    { char: 'ひゃ', romaji: 'hya', type: 'hiragana', group: 'Yōon' }, { char: 'ひゅ', romaji: 'hyu', type: 'hiragana', group: 'Yōon' }, { char: 'ひょ', romaji: 'hyo', type: 'hiragana', group: 'Yōon' },
    { char: 'みゃ', romaji: 'mya', type: 'hiragana', group: 'Yōon' }, { char: 'みゅ', romaji: 'myu', type: 'hiragana', group: 'Yōon' }, { char: 'みょ', romaji: 'myo', type: 'hiragana', group: 'Yōon' },
    { char: 'りゃ', romaji: 'rya', type: 'hiragana', group: 'Yōon' }, { char: 'りゅ', romaji: 'ryu', type: 'hiragana', group: 'Yōon' }, { char: 'りょ', romaji: 'ryo', type: 'hiragana', group: 'Yōon' },
    // Yoon Dakuten
    { char: 'ぎゃ', romaji: 'gya', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'ぎゅ', romaji: 'gyu', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'ぎょ', romaji: 'gyo', type: 'hiragana', group: 'Yōon-Dakuten' },
    { char: 'じゃ', romaji: 'ja', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'じゅ', romaji: 'ju', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'じょ', romaji: 'jo', type: 'hiragana', group: 'Yōon-Dakuten' },
    { char: 'びゃ', romaji: 'bya', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'びゅ', romaji: 'byu', type: 'hiragana', group: 'Yōon-Dakuten' }, { char: 'びょ', romaji: 'byo', type: 'hiragana', group: 'Yōon-Dakuten' },
    // Yoon Handakuten
    { char: 'ぴゃ', romaji: 'pya', type: 'hiragana', group: 'Yōon-Handakuten' }, { char: 'ぴゅ', romaji: 'pyu', type: 'hiragana', group: 'Yōon-Handakuten' }, { char: 'ぴょ', romaji: 'pyo', type: 'hiragana', group: 'Yōon-Handakuten' },
];

export const katakana: Kana[] = [
    // Gojuon
    { char: 'ア', romaji: 'a', type: 'katakana', group: 'Gojūon' }, { char: 'イ', romaji: 'i', type: 'katakana', group: 'Gojūon' }, { char: 'ウ', romaji: 'u', type: 'katakana', group: 'Gojūon' }, { char: 'エ', romaji: 'e', type: 'katakana', group: 'Gojūon' }, { char: 'オ', romaji: 'o', type: 'katakana', group: 'Gojūon' },
    { char: 'カ', romaji: 'ka', type: 'katakana', group: 'Gojūon' }, { char: 'キ', romaji: 'ki', type: 'katakana', group: 'Gojūon' }, { char: 'ク', romaji: 'ku', type: 'katakana', group: 'Gojūon' }, { char: 'ケ', romaji: 'ke', type: 'katakana', group: 'Gojūon' }, { char: 'コ', romaji: 'ko', type: 'katakana', group: 'Gojūon' },
    { char: 'サ', romaji: 'sa', type: 'katakana', group: 'Gojūon' }, { char: 'シ', romaji: 'shi', type: 'katakana', group: 'Gojūon' }, { char: 'ス', romaji: 'su', type: 'katakana', group: 'Gojūon' }, { char: 'セ', romaji: 'se', type: 'katakana', group: 'Gojūon' }, { char: 'ソ', romaji: 'so', type: 'katakana', group: 'Gojūon' },
    { char: 'タ', romaji: 'ta', type: 'katakana', group: 'Gojūon' }, { char: 'チ', romaji: 'chi', type: 'katakana', group: 'Gojūon' }, { char: 'ツ', romaji: 'tsu', type: 'katakana', group: 'Gojūon' }, { char: 'テ', romaji: 'te', type: 'katakana', group: 'Gojūon' }, { char: 'ト', romaji: 'to', type: 'katakana', group: 'Gojūon' },
    { char: 'ナ', romaji: 'na', type: 'katakana', group: 'Gojūon' }, { char: 'ニ', romaji: 'ni', type: 'katakana', group: 'Gojūon' }, { char: 'ヌ', romaji: 'nu', type: 'katakana', group: 'Gojūon' }, { char: 'ネ', romaji: 'ne', type: 'katakana', group: 'Gojūon' }, { char: 'ノ', romaji: 'no', type: 'katakana', group: 'Gojūon' },
    { char: 'ハ', romaji: 'ha', type: 'katakana', group: 'Gojūon' }, { char: 'ヒ', romaji: 'hi', type: 'katakana', group: 'Gojūon' }, { char: 'フ', romaji: 'fu', type: 'katakana', group: 'Gojūon' }, { char: 'ヘ', romaji: 'he', type: 'katakana', group: 'Gojūon' }, { char: 'ホ', romaji: 'ho', type: 'katakana', group: 'Gojūon' },
    { char: 'マ', romaji: 'ma', type: 'katakana', group: 'Gojūon' }, { char: 'ミ', romaji: 'mi', type: 'katakana', group: 'Gojūon' }, { char: 'ム', romaji: 'mu', type: 'katakana', group: 'Gojūon' }, { char: 'メ', romaji: 'me', type: 'katakana', group: 'Gojūon' }, { char: 'モ', romaji: 'mo', type: 'katakana', group: 'Gojūon' },
    { char: 'ヤ', romaji: 'ya', type: 'katakana', group: 'Gojūon' }, { char: 'ユ', romaji: 'yu', type: 'katakana', group: 'Gojūon' }, { char: 'ヨ', romaji: 'yo', type: 'katakana', group: 'Gojūon' },
    { char: 'ラ', romaji: 'ra', type: 'katakana', group: 'Gojūon' }, { char: 'リ', romaji: 'ri', type: 'katakana', group: 'Gojūon' }, { char: 'ル', romaji: 'ru', type: 'katakana', group: 'Gojūon' }, { char: 'レ', romaji: 're', type: 'katakana', group: 'Gojūon' }, { char: 'ロ', romaji: 'ro', type: 'katakana', group: 'Gojūon' },
    { char: 'ワ', romaji: 'wa', type: 'katakana', group: 'Gojūon' }, { char: 'ヲ', romaji: 'wo', type: 'katakana', group: 'Gojūon' },
    { char: 'ン', romaji: 'n', type: 'katakana', group: 'Gojūon' },
    // Dakuten
    { char: 'ガ', romaji: 'ga', type: 'katakana', group: 'Dakuten' }, { char: 'ギ', romaji: 'gi', type: 'katakana', group: 'Dakuten' }, { char: 'グ', romaji: 'gu', type: 'katakana', group: 'Dakuten' }, { char: 'ゲ', romaji: 'ge', type: 'katakana', group: 'Dakuten' }, { char: 'ゴ', romaji: 'go', type: 'katakana', group: 'Dakuten' },
    { char: 'ザ', romaji: 'za', type: 'katakana', group: 'Dakuten' }, { char: 'ジ', romaji: 'ji', type: 'katakana', group: 'Dakuten' }, { char: 'ズ', romaji: 'zu', type: 'katakana', group: 'Dakuten' }, { char: 'ゼ', romaji: 'ze', type: 'katakana', group: 'Dakuten' }, { char: 'ゾ', romaji: 'zo', type: 'katakana', group: 'Dakuten' },
    { char: 'ダ', romaji: 'da', type: 'katakana', group: 'Dakuten' }, { char: 'ヂ', romaji: 'ji', type: 'katakana', group: 'Dakuten' }, { char: 'ヅ', romaji: 'zu', type: 'katakana', group: 'Dakuten' }, { char: 'デ', romaji: 'de', type: 'katakana', group: 'Dakuten' }, { char: 'ド', romaji: 'do', type: 'katakana', group: 'Dakuten' },
    { char: 'バ', romaji: 'ba', type: 'katakana', group: 'Dakuten' }, { char: 'ビ', romaji: 'bi', type: 'katakana', group: 'Dakuten' }, { char: 'ブ', romaji: 'bu', type: 'katakana', group: 'Dakuten' }, { char: 'ベ', romaji: 'be', type: 'katakana', group: 'Dakuten' }, { char: 'ボ', romaji: 'bo', type: 'katakana', group: 'Dakuten' },
    // Handakuten
    { char: 'パ', romaji: 'pa', type: 'katakana', group: 'Handakuten' }, { char: 'ピ', romaji: 'pi', type: 'katakana', group: 'Handakuten' }, { char: 'プ', romaji: 'pu', type: 'katakana', group: 'Handakuten' }, { char: 'ペ', romaji: 'pe', type: 'katakana', group: 'Handakuten' }, { char: 'ポ', romaji: 'po', type: 'katakana', group: 'Handakuten' },
    // Yoon
    { char: 'キャ', romaji: 'kya', type: 'katakana', group: 'Yōon' }, { char: 'キュ', romaji: 'kyu', type: 'katakana', group: 'Yōon' }, { char: 'キョ', romaji: 'kyo', type: 'katakana', group: 'Yōon' },
    { char: 'シャ', romaji: 'sha', type: 'katakana', group: 'Yōon' }, { char: 'シュ', romaji: 'shu', type: 'katakana', group: 'Yōon' }, { char: 'ショ', romaji: 'sho', type: 'katakana', group: 'Yōon' },
    { char: 'チャ', romaji: 'cha', type: 'katakana', group: 'Yōon' }, { char: 'チュ', romaji: 'chu', type: 'katakana', group: 'Yōon' }, { char: 'チョ', romaji: 'cho', type: 'katakana', group: 'Yōon' },
    { char: 'ニャ', romaji: 'nya', type: 'katakana', group: 'Yōon' }, { char: 'ニュ', romaji: 'nyu', type: 'katakana', group: 'Yōon' }, { char: 'ニョ', romaji: 'nyo', type: 'katakana', group: 'Yōon' },
    { char: 'ヒャ', romaji: 'hya', type: 'katakana', group: 'Yōon' }, { char: 'ヒュ', romaji: 'hyu', type: 'katakana', group: 'Yōon' }, { char: 'ヒョ', romaji: 'hyo', type: 'katakana', group: 'Yōon' },
    { char: 'ミャ', romaji: 'mya', type: 'katakana', group: 'Yōon' }, { char: 'ミュ', romaji: 'myu', type: 'katakana', group: 'Yōon' }, { char: 'ミョ', romaji: 'myo', type: 'katakana', group: 'Yōon' },
    { char: 'リャ', romaji: 'rya', type: 'katakana', group: 'Yōon' }, { char: 'リュ', romaji: 'ryu', type: 'katakana', group: 'Yōon' }, { char: 'リョ', romaji: 'ryo', type: 'katakana', group: 'Yōon' },
    // Yoon Dakuten
    { char: 'ギャ', romaji: 'gya', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ギュ', romaji: 'gyu', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ギョ', romaji: 'gyo', type: 'katakana', group: 'Yōon-Dakuten' },
    { char: 'ジャ', romaji: 'ja', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ジュ', romaji: 'ju', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ジョ', romaji: 'jo', type: 'katakana', group: 'Yōon-Dakuten' },
    { char: 'ビャ', romaji: 'bya', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ビュ', romaji: 'byu', type: 'katakana', group: 'Yōon-Dakuten' }, { char: 'ビョ', romaji: 'byo', type: 'katakana', group: 'Yōon-Dakuten' },
    // Yoon Handakuten
    { char: 'ピャ', romaji: 'pya', type: 'katakana', group: 'Yōon-Handakuten' }, { char: 'ピュ', romaji: 'pyu', type: 'katakana', group: 'Yōon-Handakuten' }, { char: 'ピョ', romaji: 'pyo', type: 'katakana', group: 'Yōon-Handakuten' },
];

export const vocabulary: Vocabulary[] = [
    { id: 1, kanji: '私', kana: 'わたし', romaji: 'watashi', meaning: 'I, me', topic: 'Greetings', example: '私 は 学生 です。' },
    { id: 2, kanji: '日本', kana: 'にほん', romaji: 'nihon', meaning: 'Japan', topic: 'Countries', example: '日本 に 行きたい です。' },
    { id: 3, kanji: null, kana: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello, Good afternoon', topic: 'Greetings', example: 'こんにちは、田中さん。' },
    { id: 4, kanji: null, kana: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you', topic: 'Greetings', example: '本当に ありがとう。' },
    { id: 5, kanji: '食べる', kana: 'たべる', romaji: 'taberu', meaning: 'To eat', topic: 'Food', example: '寿司 を 食べる。' },
    { id: 6, kanji: '飲む', kana: 'のむ', romaji: 'nomu', meaning: 'To drink', topic: 'Food', example: 'お茶 を 飲む。' },
    { id: 7, kanji: '駅', kana: 'えき', romaji: 'eki', meaning: 'Station', topic: 'Transportation', example: '駅 は どこ ですか。' },
    { id: 8, kanji: '学校', kana: 'がっこう', romaji: 'gakkou', meaning: 'School', topic: 'Places', example: '毎日 学校 に 行きます。' },
];

export const kanjiList: Kanji[] = [
    { id: 1, character: '日', onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'び', 'か'], meaning: 'Day, Sun, Japan', jlptLevel: 5, strokes: 4 },
    { id: 2, character: '一', onyomi: ['イチ', 'イツ'], kunyomi: ['ひと'], meaning: 'One', jlptLevel: 5, strokes: 1 },
    { id: 3, character: '国', onyomi: ['コク'], kunyomi: ['くに'], meaning: 'Country', jlptLevel: 5, strokes: 8 },
    { id: 4, character: '人', onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'], meaning: 'Person', jlptLevel: 5, strokes: 2 },
    { id: 5, character: '年', onyomi: ['ネン'], kunyomi: ['とし'], meaning: 'Year', jlptLevel: 5, strokes: 6 },
    { id: 6, character: '大', onyomi: ['ダイ', 'タイ'], kunyomi: ['おお'], meaning: 'Large, Big', jlptLevel: 5, strokes: 3 },
    { id: 7, character: '本', onyomi: ['ホン'], kunyomi: ['もと'], meaning: 'Book, Present, Main', jlptLevel: 5, strokes: 5 },
    { id: 8, character: '中', onyomi: ['チュウ'], kunyomi: ['なか'], meaning: 'In, Inside, Middle', jlptLevel: 5, strokes: 4 },
    { id: 9, character: '出', onyomi: ['シュツ'], kunyomi: ['でる', 'だす'], meaning: 'Exit, Leave', jlptLevel: 5, strokes: 5 },
    { id: 10, character: '見', onyomi: ['ケン'], kunyomi: ['みる'], meaning: 'To see', jlptLevel: 5, strokes: 7 },
];