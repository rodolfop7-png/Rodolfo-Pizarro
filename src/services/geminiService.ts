import { GoogleGenAI } from "@google/genai";
import { Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getSavingInsights(expenses: Expense[]) {
  if (expenses.length === 0) return "Agrega algunos gastos para obtener consejos de ahorro.";

  const expensesSummary = expenses.map(e => `${e.category}: $${e.amount} CLP (${e.description})`).join("\n");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analiza los siguientes gastos mensuales de un hogar en Chile (moneda: Peso Chileno - CLP) y proporciona:
1. Puntos críticos de gasto (donde se está gastando demasiado considerando el contexto chileno).
2. Consejos específicos y accionables para ahorrar en esas categorías.
3. Un tono motivador, colorido y directo.

Gastos:
${expensesSummary}

Responde en formato Markdown.`,
    });

    return response.text || "No se pudo generar el análisis en este momento.";
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return "Error al conectar con la IA. Por favor, intenta de nuevo más tarde.";
  }
}
