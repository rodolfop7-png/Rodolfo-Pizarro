import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Expense, CATEGORIES } from '../types';

interface StatsProps {
  expenses: Expense[];
}

export function Stats({ expenses }: StatsProps) {
  const categoryTotals = CATEGORIES.map(cat => ({
    name: cat.name,
    value: expenses
      .filter(e => e.category === cat.name)
      .reduce((sum, e) => sum + e.amount, 0),
    color: cat.color
  })).filter(c => c.value > 0);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xl font-black uppercase mb-4">Distribución</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryTotals}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '2px solid black', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {categoryTotals.map(cat => (
            <div key={cat.name} className="flex items-center gap-1 px-2 py-1 rounded-lg border-2 border-black text-[10px] font-bold" style={{ backgroundColor: cat.color + '20' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black text-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,230,109,1)] flex flex-col justify-center items-center text-center">
        <p className="text-zinc-400 font-black uppercase text-sm mb-2">Gasto Total Mensual (CLP)</p>
        <h2 className="text-6xl font-black tracking-tighter mb-4 text-yellow-400">
          ${Math.round(total).toLocaleString('es-CL')}
        </h2>
        <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden border-2 border-zinc-700">
          <div 
            className="h-full bg-yellow-400 transition-all duration-1000" 
            style={{ width: '100%' }}
          />
        </div>
        <p className="mt-4 text-xs font-bold text-zinc-500 italic">
          "El ahorro es la base de la fortuna"
        </p>
      </div>
    </div>
  );
}
