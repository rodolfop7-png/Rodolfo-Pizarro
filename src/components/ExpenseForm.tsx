import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { CATEGORIES, Expense } from '../types';
import { cn } from '../lib/utils';

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onAdd({
      category,
      amount: Number(amount),
      description,
      date,
    });

    setAmount('');
    setDescription('');
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-xl active:scale-95"
        >
          <Plus size={24} /> Agregar Gasto
        </button>
      ) : (
        <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-black animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Nuevo Gasto</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Categoría</label>
              <div className="grid grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={cn(
                      "p-2 rounded-xl border-2 transition-all text-[10px] font-bold text-center",
                      category === cat.name 
                        ? "border-black bg-black text-white scale-105" 
                        : "border-zinc-200 hover:border-black"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1">Monto (CLP $)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full p-3 rounded-xl border-4 border-black font-mono text-xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-1">Fecha</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 rounded-xl border-4 border-black font-bold focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-1">Descripción</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Supermercado, Alquiler..."
                className="w-full p-3 rounded-xl border-4 border-black font-bold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black text-xl border-4 border-black hover:bg-yellow-300 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              ¡GUARDAR!
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
