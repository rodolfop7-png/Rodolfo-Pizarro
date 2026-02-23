import { useState } from 'react';
import Markdown from 'react-markdown';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Expense } from '../types';
import { getSavingInsights } from '../services/geminiService';

interface AIInsightsProps {
  expenses: Expense[];
}

export function AIInsights({ expenses }: AIInsightsProps) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    setLoading(true);
    const result = await getSavingInsights(expenses);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-600 text-white p-8 rounded-[40px] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-3 rounded-2xl border-2 border-black text-black">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Análisis IA</h2>
          </div>
          
          <button
            onClick={generateInsights}
            disabled={loading || expenses.length === 0}
            className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-sm border-4 border-black hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95"
          >
            {loading ? <RefreshCw className="animate-spin" size={18} /> : 'Analizar Gastos'}
          </button>
        </div>

        {!insights && !loading && (
          <p className="text-indigo-100 font-bold text-lg">
            ¿Quieres saber dónde puedes ahorrar? Pulsa el botón para que nuestra IA analice tus puntos críticos de gasto.
          </p>
        )}

        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-indigo-500 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-500 rounded w-1/2"></div>
            <div className="h-4 bg-indigo-500 rounded w-5/6"></div>
          </div>
        )}

        {insights && !loading && (
          <div className="prose prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:font-bold prose-li:font-bold">
            <Markdown>{insights}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
