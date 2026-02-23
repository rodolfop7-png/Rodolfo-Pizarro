import { Trash2, Calendar } from 'lucide-react';
import { Expense, CATEGORIES } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const getCategoryColor = (name: string) => {
    return CATEGORIES.find(c => c.name === name)?.color || '#000';
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 bg-zinc-50 rounded-3xl border-4 border-dashed border-zinc-200">
        <p className="text-zinc-400 font-bold">No hay gastos registrados aún.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Historial</h2>
      <div className="space-y-3">
        {expenses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
          <div
            key={expense.id}
            className="bg-white p-4 rounded-2xl border-4 border-black flex items-center justify-between group hover:translate-x-1 transition-transform"
            style={{ borderLeftColor: getCategoryColor(expense.category), borderLeftWidth: '12px' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-zinc-100">
                  {expense.category}
                </span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                  <Calendar size={10} /> {expense.date}
                </span>
              </div>
              <h3 className="font-bold text-lg leading-tight">{expense.description || 'Sin descripción'}</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-mono font-black text-xl">
                ${Math.round(expense.amount).toLocaleString('es-CL')}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
