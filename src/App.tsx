import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { Expense } from './types';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { Stats } from './components/Stats';
import { AIInsights } from './components/AIInsights';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('hogar_ahorro_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hogar_ahorro_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-black font-sans selection:bg-yellow-300">
      {/* Header */}
      <header className="border-b-8 border-black bg-yellow-400 p-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black p-3 rounded-2xl text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <Wallet size={32} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">HogarAhorro</h1>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-black uppercase bg-black text-white px-3 py-1 rounded-full">
              Control de Gastos v1.0
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 pb-24">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-white p-8 rounded-[40px] border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Domina tus <span className="text-pink-500">Finanzas</span>
              </h2>
              <p className="text-xl font-bold text-zinc-600 max-w-xl">
                Registra cada gasto, visualiza tu progreso y deja que la IA te ayude a encontrar esos puntos críticos donde podrías estar ahorrando una fortuna.
              </p>
            </div>
          </div>
        </section>

        {/* Stats & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <Stats expenses={expenses} />
            <AIInsights expenses={expenses} />
          </div>
          
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <ExpenseForm onAdd={addExpense} />
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="mt-24 pt-12 border-t-4 border-black text-center">
          <p className="font-black uppercase tracking-widest text-sm mb-2">HogarAhorro © 2026</p>
          <p className="text-zinc-400 font-bold text-xs italic">Hecho con ❤️ para tu bolsillo</p>
        </footer>
      </main>
    </div>
  );
}
