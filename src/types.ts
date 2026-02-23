export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export const CATEGORIES = [
  { name: 'Vivienda', color: '#FF6B6B', icon: 'Home' },
  { name: 'Alimentación', color: '#4ECDC4', icon: 'Utensils' },
  { name: 'Transporte', color: '#FFE66D', icon: 'Car' },
  { name: 'Servicios', color: '#1A535C', icon: 'Zap' },
  { name: 'Ocio', color: '#FF9F1C', icon: 'Gamepad2' },
  { name: 'Salud', color: '#2EC4B6', icon: 'HeartPulse' },
  { name: 'Educación', color: '#E71D36', icon: 'GraduationCap' },
  { name: 'Otros', color: '#95A5A6', icon: 'MoreHorizontal' },
];
