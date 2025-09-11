import React from 'react';
import { kanjiList } from '../constants';
import { Kanji as KanjiType } from '../types';

const KanjiCard: React.FC<{ item: KanjiType }> = ({ item }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 flex items-center justify-center rounded-lg mb-4">
            <p className="text-6xl font-serif">{item.character}</p>
        </div>
        <p className="text-lg font-semibold">{item.meaning}</p>
        <div className="flex space-x-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
            <span>On: {item.onyomi.join(', ')}</span>
            <span>Kun: {item.kunyomi.join(', ')}</span>
        </div>
        <div className="mt-2 text-xs">
            <span>Strokes: {item.strokes}</span> | <span>JLPT N{item.jlptLevel}</span>
        </div>
    </div>
);

const Kanji: React.FC = () => {
    // A simplified, larger list of kanji for demonstration
    const fullKanjiList = [
        // JLPT N5
        { id: 1, character: '日', meaning: 'Sun, day', onyomi: ['ニ', 'ニチ', 'ジツ'], kunyomi: ['ひ', 'び', 'か'], strokes: 4, jlptLevel: 5 },
        { id: 2, character: '一', meaning: 'One', onyomi: ['イチ', 'イツ'], kunyomi: ['ひと', 'つ'], strokes: 1, jlptLevel: 5 },
        { id: 3, character: '国', meaning: 'Country', onyomi: ['コク'], kunyomi: ['くに'], strokes: 8, jlptLevel: 5 },
        { id: 4, character: '人', meaning: 'Person', onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'], strokes: 2, jlptLevel: 5 },
        { id: 5, character: '年', meaning: 'Year', onyomi: ['ネン'], kunyomi: ['とし'], strokes: 6, jlptLevel: 5 },
        { id: 6, character: '大', meaning: 'Big', onyomi: ['タイ', 'ダイ'], kunyomi: ['おお', 'きい'], strokes: 3, jlptLevel: 5 },
        { id: 7, character: '本', meaning: 'Book, origin', onyomi: ['ホン'], kunyomi: ['もと'], strokes: 5, jlptLevel: 5 },
        { id: 8, character: '中', meaning: 'Middle, inside', onyomi: ['チュウ'], kunyomi: ['なか'], strokes: 4, jlptLevel: 5 },
        { id: 9, character: '長', meaning: 'Long, leader', onyomi: ['チョウ'], kunyomi: ['なが', 'い'], strokes: 8, jlptLevel: 5 },
        { id: 10, character: '出', meaning: 'To go out', onyomi: ['シュツ', 'スイ'], kunyomi: ['で', 'だ', 'す'], strokes: 5, jlptLevel: 5 },
        { id: 11, character: '三', meaning: 'Three', onyomi: ['サン'], kunyomi: ['み', 'つ'], strokes: 3, jlptLevel: 5 },
        { id: 12, character: '上', meaning: 'Up', onyomi: ['ジョウ', 'ショウ'], kunyomi: ['うえ', 'あ', 'がる'], strokes: 3, jlptLevel: 5 },
        { id: 13, character: '見', meaning: 'To see', onyomi: ['ケン'], kunyomi: ['み', 'る'], strokes: 7, jlptLevel: 5 },
        { id: 14, character: '行', meaning: 'To go', onyomi: ['コウ', 'ギョウ'], kunyomi: ['い', 'く', 'おこな', 'う'], strokes: 6, jlptLevel: 5 },
        { id: 15, character: '分', meaning: 'Part, minute', onyomi: ['ブン', 'フン', 'プン'], kunyomi: ['わ', 'ける'], strokes: 4, jlptLevel: 5 },
        { id: 16, character: '後', meaning: 'After', onyomi: ['ゴ', 'コウ'], kunyomi: ['うし', 'ろ', 'あと'], strokes: 9, jlptLevel: 5 },
        { id: 17, character: '前', meaning: 'Before', onyomi: ['ゼン'], kunyomi: ['まえ'], strokes: 9, jlptLevel: 5 },
        { id: 18, character: '生', meaning: 'Life', onyomi: ['セイ', 'ショウ'], kunyomi: ['い', 'きる', 'う', 'まれる'], strokes: 5, jlptLevel: 5 },
        { id: 19, character: '五', meaning: 'Five', onyomi: ['ゴ'], kunyomi: ['いつ', 'つ'], strokes: 4, jlptLevel: 5 },
        { id: 20, character: '時', meaning: 'Time', onyomi: ['ジ'], kunyomi: ['とき'], strokes: 10, jlptLevel: 5 },
        { id: 21, character: '金', meaning: 'Gold, money', onyomi: ['キン', 'コン'], kunyomi: ['かね'], strokes: 8, jlptLevel: 5 },
        { id: 22, character: '学', meaning: 'Study', onyomi: ['ガク'], kunyomi: ['まな', 'ぶ'], strokes: 8, jlptLevel: 5 },
        { id: 23, character: '外', meaning: 'Outside', onyomi: ['ガイ', 'ゲ'], kunyomi: ['そと', 'ほか'], strokes: 5, jlptLevel: 5 },
        { id: 24, character: '下', meaning: 'Down', onyomi: ['カ', 'ゲ'], kunyomi: ['した', 'くだ', 'る'], strokes: 3, jlptLevel: 5 },
        { id: 25, character: '言', meaning: 'To say', onyomi: ['ゲン', 'ゴン'], kunyomi: ['い', 'う'], strokes: 7, jlptLevel: 5 },

        // JLPT N4
        { id: 26, character: '買', meaning: 'To buy', onyomi: ['バイ'], kunyomi: ['か', 'う'], strokes: 12, jlptLevel: 4 },
        { id: 27, character: '来', meaning: 'To come', onyomi: ['ライ'], kunyomi: ['く', 'る'], strokes: 7, jlptLevel: 4 },
        { id: 28, character: '気', meaning: 'Spirit, mood', onyomi: ['キ', 'ケ'], kunyomi: ['いき'], strokes: 6, jlptLevel: 4 },
        { id: 29, character: '聞', meaning: 'To listen, to hear', onyomi: ['ブン', 'モン'], kunyomi: ['き', 'く'], strokes: 14, jlptLevel: 4 },
        { id: 30, character: '食', meaning: 'To eat', onyomi: ['ショク', 'ジキ'], kunyomi: ['た', 'べる'], strokes: 9, jlptLevel: 4 },
        { id: 31, character: '書', meaning: 'To write', onyomi: ['ショ'], kunyomi: ['か', 'く'], strokes: 10, jlptLevel: 4 },
        { id: 32, character: '高', meaning: 'High, expensive', onyomi: ['コウ'], kunyomi: ['たか', 'い'], strokes: 10, jlptLevel: 4 },
        { id: 33, character: '車', meaning: 'Car, vehicle', onyomi: ['シャ'], kunyomi: ['くるま'], strokes: 7, jlptLevel: 4 },
        { id: 34, character: '道', meaning: 'Road, path', onyomi: ['ドウ', 'トウ'], kunyomi: ['みち'], strokes: 12, jlptLevel: 4 },
        { id: 35, character: '読', meaning: 'To read', onyomi: ['ドク', 'トク'], kunyomi: ['よ', 'む'], strokes: 14, jlptLevel: 4 },
        { id: 36, character: '話', meaning: 'To talk', onyomi: ['ワ'], kunyomi: ['はな', 'す'], strokes: 13, jlptLevel: 4 },
        { id: 37, character: '出', meaning: 'To go out', onyomi: ['シュツ', 'スイ'], kunyomi: ['で', 'る', 'だ', 'す'], strokes: 5, jlptLevel: 4 },
        { id: 38, character: '会', meaning: 'To meet', onyomi: ['カイ', 'エ'], kunyomi: ['あ', 'う'], strokes: 6, jlptLevel: 4 },
        { id: 39, character: '休', meaning: 'To rest', onyomi: ['キュウ'], kunyomi: ['やす', 'む'], strokes: 6, jlptLevel: 4 },
        { id: 40, character: '入', meaning: 'To enter', onyomi: ['ニュウ'], kunyomi: ['はい', 'る', 'い', 'れる'], strokes: 2, jlptLevel: 4 },
        { id: 41, character: '円', meaning: 'Yen, circle', onyomi: ['エン'], kunyomi: ['まる', 'い'], strokes: 4, jlptLevel: 4 },
        { id: 42, character: '右', meaning: 'Right', onyomi: ['ウ', 'ユウ'], kunyomi: ['みぎ'], strokes: 5, jlptLevel: 4 },
        { id: 43, character: '左', meaning: 'Left', onyomi: ['サ'], kunyomi: ['ひだり'], strokes: 5, jlptLevel: 4 },
        { id: 44, character: '名', meaning: 'Name', onyomi: ['メイ', 'ミョウ'], kunyomi: ['な'], strokes: 6, jlptLevel: 4 },
        { id: 45, character: '父', meaning: 'Father', onyomi: ['フ'], kunyomi: ['ちち'], strokes: 4, jlptLevel: 4 },
        { id: 46, character: '母', meaning: 'Mother', onyomi: ['ボ'], kunyomi: ['はは'], strokes: 5, jlptLevel: 4 },
        { id: 47, character: '手', meaning: 'Hand', onyomi: ['シュ'], kunyomi: ['て'], strokes: 4, jlptLevel: 4 },
        { id: 48, character: '足', meaning: 'Foot, leg', onyomi: ['ソク'], kunyomi: ['あし', 'た', 'りる'], strokes: 7, jlptLevel: 4 },
        { id: 49, character: '雨', meaning: 'Rain', onyomi: ['ウ'], kunyomi: ['あめ', 'あま'], strokes: 8, jlptLevel: 4 },
        { id: 50, character: '電', meaning: 'Electricity', onyomi: ['デン'], kunyomi: [''], strokes: 13, jlptLevel: 4 },
        { id: 51, character: '気', meaning: 'Spirit, mood', onyomi: ['キ', 'ケ'], kunyomi: ['いき'], strokes: 6, jlptLevel: 4 },
        { id: 52, character: '車', meaning: 'Car, vehicle', onyomi: ['シャ'], kunyomi: ['くるま'], strokes: 7, jlptLevel: 4 },
        { id: 53, character: '学', meaning: 'Study', onyomi: ['ガク'], kunyomi: ['まな', 'ぶ'], strokes: 8, jlptLevel: 4 },
        { id: 54, character: '校', meaning: 'School', onyomi: ['コウ'], kunyomi: [''], strokes: 10, jlptLevel: 4 },
        { id: 55, character: '店', meaning: 'Shop', onyomi: ['テン'], kunyomi: ['みせ'], strokes: 8, jlptLevel: 4 },
        { id: 56, character: '家', meaning: 'House', onyomi: ['カ', 'ケ'], kunyomi: ['いえ', 'や'], strokes: 10, jlptLevel: 4 },
        { id: 57, character: '新', meaning: 'New', onyomi: ['シン'], kunyomi: ['あたら', 'しい'], strokes: 13, jlptLevel: 4 },
        { id: 58, character: '古', meaning: 'Old', onyomi: ['コ'], kunyomi: ['ふる', 'い'], strokes: 5, jlptLevel: 4 },
        { id: 59, character: '東', meaning: 'East', onyomi: ['トウ'], kunyomi: ['ひがし'], strokes: 8, jlptLevel: 4 },
        { id: 60, character: '西', meaning: 'West', onyomi: ['セイ', 'サイ'], kunyomi: ['にし'], strokes: 6, jlptLevel: 4 },
        { id: 61, character: '南', meaning: 'South', onyomi: ['ナン'], kunyomi: ['みなみ'], strokes: 9, jlptLevel: 4 },
        { id: 62, character: '北', meaning: 'North', onyomi: ['ホク'], kunyomi: ['きた'], strokes: 5, jlptLevel: 4 },
        { id: 63, character: '駅', meaning: 'Station', onyomi: ['エキ'], kunyomi: [''], strokes: 14, jlptLevel: 4 },
        { id: 64, character: '何', meaning: 'What', onyomi: ['カ'], kunyomi: ['なに', 'なん'], strokes: 7, jlptLevel: 4 },
        { id: 65, character: '目', meaning: 'Eye', onyomi: ['モク'], kunyomi: ['め'], strokes: 5, jlptLevel: 4 },
        { id: 66, character: '耳', meaning: 'Ear', onyomi: ['ジ'], kunyomi: ['みみ'], strokes: 6, jlptLevel: 4 },
        { id: 67, character: '口', meaning: 'Mouth', onyomi: ['コウ', 'ク'], kunyomi: ['くち'], strokes: 3, jlptLevel: 4 },
        { id: 68, character: '手', meaning: 'Hand', onyomi: ['シュ'], kunyomi: ['て'], strokes: 4, jlptLevel: 4 },
        { id: 69, character: '足', meaning: 'Foot, leg', onyomi: ['ソク'], kunyomi: ['あし', 'た', 'りる'], strokes: 7, jlptLevel: 4 },
        { id: 70, character: '体', meaning: 'Body', onyomi: ['タイ', 'テイ'], kunyomi: ['からだ'], strokes: 7, jlptLevel: 4 },
        { id: 71, character: '力', meaning: 'Power', onyomi: ['リョク', 'リキ'], kunyomi: ['ちから'], strokes: 2, jlptLevel: 4 },
        { id: 72, character: '男', meaning: 'Man', onyomi: ['ダン', 'ナン'], kunyomi: ['おとこ'], strokes: 7, jlptLevel: 4 },
        { id: 73, character: '女', meaning: 'Woman', onyomi: ['ジョ', 'ニョ'], kunyomi: ['おんな'], strokes: 3, jlptLevel: 4 },
        { id: 74, character: '子', meaning: 'Child', onyomi: ['シ', 'ス'], kunyomi: ['こ'], strokes: 3, jlptLevel: 4 },
        { id: 75, character: '学', meaning: 'Study', onyomi: ['ガク'], kunyomi: ['まな', 'ぶ'], strokes: 8, jlptLevel: 4 },
        { id: 76, character: '生', meaning: 'Life', onyomi: ['セイ', 'ショウ'], kunyomi: ['い', 'きる', 'う', 'まれる'], strokes: 5, jlptLevel: 4 },
        { id: 77, character: '先', meaning: 'Before, ahead', onyomi: ['セン'], kunyomi: ['さき'], strokes: 6, jlptLevel: 4 },
        { id: 78, character: '私', meaning: 'I, private', onyomi: ['シ'], kunyomi: ['わたくし', 'わたし'], strokes: 7, jlptLevel: 4 },
        { id: 79, character: '友', meaning: 'Friend', onyomi: ['ユウ'], kunyomi: ['とも'], strokes: 4, jlptLevel: 4 },
        { id: 80, character: '名', meaning: 'Name', onyomi: ['メイ', 'ミョウ'], kunyomi: ['な'], strokes: 6, jlptLevel: 4 },
        { id: 81, character: '字', meaning: 'Character', onyomi: ['ジ'], kunyomi: ['あざ', 'あざな', 'な', 'あざ'], strokes: 6, jlptLevel: 4 },
        { id: 82, character: '心', meaning: 'Heart, mind', onyomi: ['シン'], kunyomi: ['こころ'], strokes: 4, jlptLevel: 4 },
        { id: 83, character: '思', meaning: 'To think', onyomi: ['シ'], kunyomi: ['おも', 'う'], strokes: 9, jlptLevel: 4 },
        { id: 84, character: '教', meaning: 'To teach', onyomi: ['キョウ'], kunyomi: ['おし', 'える'], strokes: 11, jlptLevel: 4 },
        { id: 85, character: '室', meaning: 'Room', onyomi: ['シツ'], kunyomi: ['むろ'], strokes: 9, jlptLevel: 4 },
        { id: 86, character: '場', meaning: 'Place', onyomi: ['ジョウ', 'チョウ'], kunyomi: ['ば'], strokes: 12, jlptLevel: 4 },
        { id: 87, character: '方', meaning: 'Direction', onyomi: ['ホウ'], kunyomi: ['かた'], strokes: 4, jlptLevel: 4 },
        { id: 88, character: '明', meaning: 'Bright', onyomi: ['メイ', 'ミョウ'], kunyomi: ['あか', 'るい'], strokes: 8, jlptLevel: 4 },
        { id: 89, character: '朝', meaning: 'Morning', onyomi: ['チョウ'], kunyomi: ['あさ'], strokes: 12, jlptLevel: 4 },
        { id: 90, character: '夜', meaning: 'Night', onyomi: ['ヤ'], kunyomi: ['よ', 'よる'], strokes: 8, jlptLevel: 4 },
        { id: 91, character: '力', meaning: 'Power', onyomi: ['リョク', 'リキ'], kunyomi: ['ちから'], strokes: 2, jlptLevel: 4 },
        { id: 92, character: '時', meaning: 'Time', onyomi: ['ジ'], kunyomi: ['とき'], strokes: 10, jlptLevel: 4 },
        { id: 93, character: '週', meaning: 'Week', onyomi: ['シュウ'], kunyomi: [''], strokes: 11, jlptLevel: 4 },
        { id: 94, character: '間', meaning: 'Interval', onyomi: ['カン', 'ケン'], kunyomi: ['あいだ', 'ま'], strokes: 12, jlptLevel: 4 },
        { id: 95, character: '休', meaning: 'To rest', onyomi: ['キュウ'], kunyomi: ['やす', 'む'], strokes: 6, jlptLevel: 4 },
        { id: 96, character: '今', meaning: 'Now', onyomi: ['コン', 'キン'], kunyomi: ['いま'], strokes: 4, jlptLevel: 4 },
        { id: 97, character: '来', meaning: 'To come', onyomi: ['ライ'], kunyomi: ['く', 'る'], strokes: 7, jlptLevel: 4 },
        { id: 98, character: '行', meaning: 'To go', onyomi: ['コウ', 'ギョウ'], kunyomi: ['い', 'く', 'おこな', 'う'], strokes: 6, jlptLevel: 4 },
        { id: 99, character: '出', meaning: 'To go out', onyomi: ['シュツ', 'スイ'], kunyomi: ['で', 'る', 'だ', 'す'], strokes: 5, jlptLevel: 4 },
        { id: 100, character: '入', meaning: 'To enter', onyomi: ['ニュウ'], kunyomi: ['はい', 'る', 'い', 'れる'], strokes: 2, jlptLevel: 4 },
    ];
    
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Kanji List (N5 & N4)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {fullKanjiList.map(item => (
                    <KanjiCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Kanji;
