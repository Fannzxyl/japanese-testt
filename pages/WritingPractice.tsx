import React, { useState, useRef, useEffect } from 'react';
import { hiragana } from '../constants';
import { Undo, Trash2, Save } from 'lucide-react';

const WritingCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);

    const getContext = () => canvasRef.current?.getContext('2d');

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = getContext();
        if (canvas && ctx) {
            // Set high-DPI canvas
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#334155'; // dark:text-slate-700
            
            // Draw grid lines
            drawGrid(ctx, canvas.width / dpr, canvas.height / dpr);
        }
    }, []);
    
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.save();
        ctx.strokeStyle = '#e2e8f0'; // slate-200
        ctx.lineWidth = 1;
        
        // Dashed lines for center
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();

        ctx.restore();
    };

    const saveState = () => {
        const canvas = canvasRef.current;
        const ctx = getContext();
        if (canvas && ctx) {
            setHistory(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
        }
    };

    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = (nativeEvent as MouseEvent);
        const ctx = getContext();
        if (ctx) {
            saveState();
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        }
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = (nativeEvent as MouseEvent);
        const ctx = getContext();
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        const ctx = getContext();
        if(ctx) ctx.closePath();
        setIsDrawing(false);
    };
    
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = getContext();
        if (canvas && ctx) {
            saveState();
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGrid(ctx, canvas.width / dpr, canvas.height / dpr);
        }
    };

    const undo = () => {
        const canvas = canvasRef.current;
        const ctx = getContext();
        if (canvas && ctx && history.length > 0) {
            const lastState = history[history.length - 1];
            ctx.putImageData(lastState, 0, 0);
            setHistory(prev => prev.slice(0, -1));
        }
    };
    
     const saveImage = () => {
        const canvas = canvasRef.current;
        if(canvas) {
            const link = document.createElement('a');
            link.download = `kana-practice-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-inner w-full aspect-square cursor-crosshair"
                style={{touchAction: 'none'}}
            />
            <div className="flex space-x-2 mt-4">
                 <button onClick={undo} className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600">
                    <Undo className="w-5 h-5"/> Undo
                </button>
                <button onClick={clearCanvas} className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-800/50">
                    <Trash2 className="w-5 h-5"/> Clear
                </button>
                 <button onClick={saveImage} className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-semibold hover:bg-green-200 dark:hover:bg-green-800/50">
                    <Save className="w-5 h-5"/> Save
                </button>
            </div>
        </div>
    );
};


const WritingPractice: React.FC = () => {
    const [selectedChar, setSelectedChar] = useState(hiragana[0]);
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    
    const charList = hiragana.filter(k => k.group === 'Gojūon'); // Keep it simple for now

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">Writing Practice</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Practice Canvas</h3>
                             <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-700 w-24 h-24 rounded-lg">
                                <span className="text-6xl font-bold">{selectedChar.char}</span>
                            </div>
                        </div>
                        <WritingCanvas />
                     </div>
                </div>
                <div>
                     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Select a Character</h3>
                        <div className="max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                            <div className="grid grid-cols-5 gap-2">
                                {charList.map(char => (
                                    <button 
                                        key={char.char}
                                        onClick={() => setSelectedChar(char)}
                                        className={`aspect-square rounded-lg font-semibold text-xl transition-colors flex items-center justify-center ${selectedChar.char === char.char ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                                    >
                                        {char.char}
                                    </button>
                                ))}
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default WritingPractice;
