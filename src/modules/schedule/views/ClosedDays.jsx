import { useState } from "react";
import { INITIAL_CLOSED_DAYS } from "../data/mockData";

const TYPE = {
  holiday:      { label: "Festivo Nacional",  emoji: "", bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", dot: "#ef4444" },
  maintenance:  { label: "Mantenimiento",     emoji: "", bg: "#fffbeb", border: "#fde68a", text: "#92400e", dot: "#f59e0b" },
  institutional:{ label: "Institucional",     emoji: "", bg: "#f0f9ff", border: "#bae6fd", text: "#0369a1", dot: "#0ea5e9" },
};

export default function ClosedDays() {
  const [days,     setDays]     = useState(INITIAL_CLOSED_DAYS);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ date: "", reason: "", type: "holiday" });
  const [filter,   setFilter]   = useState("all");

  const handleAdd = () => {
    if (!form.date || !form.reason) return;
    setDays(prev => [...prev, { id: Date.now(), ...form }]);
    setForm({ date: "", reason: "", type: "holiday" });
    setShowForm(false);
  };

  const filtered = filter === "all" ? days : days.filter(d => d.type === filter);
  const sorted   = [...filtered].sort((a, b) => a.date.localeCompare(b.date));

  const stats = {
    total:        days.length,
    holiday:      days.filter(d => d.type === "holiday").length,
    maintenance:  days.filter(d => d.type === "maintenance").length,
    institutional:days.filter(d => d.type === "institutional").length,
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Días Cerrados</h1>
          <p className="text-gray-500 text-sm mt-1">Festivos, mantenimiento y días sin clases</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow transition-colors"
        >
          + Agregar día
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label:"Total",          value: stats.total,         color:"text-gray-800",  bg:"bg-gray-50 border-gray-200" },
          { label:"Festivos",       value: stats.holiday,       color:"text-red-600",   bg:"bg-red-50  border-red-200"  },
          { label:"Mantenimiento",  value: stats.maintenance,   color:"text-amber-600", bg:"bg-amber-50 border-amber-200" },
          { label:"Institucionales",value: stats.institutional, color:"text-sky-600",   bg:"bg-sky-50  border-sky-200"  },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className={`border rounded-xl p-4 ${bg}`}>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[["all","Todos"],["holiday","Festivos"],["maintenance","Mantenimiento"],["institutional","Institucionales"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === v
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {sorted.map(day => {
          const cfg = TYPE[day.type];
          return (
            <div
              key={day.id}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl border group hover:shadow-sm transition-all"
              style={{ background: cfg.bg, borderColor: cfg.border }}
            >
              <span className="text-xl flex-shrink-0">{cfg.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm" style={{ color: cfg.text }}>{day.reason}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(day.date + "T12:00").toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="hidden sm:block text-xs font-semibold" style={{ color: cfg.text }}>{cfg.label}</span>
                <button
                  onClick={() => setDays(prev => prev.filter(d => d.id !== day.id))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-100 text-red-400 hover:text-red-600 transition-all text-xs"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <span className="text-3xl block mb-2">📭</span>
            <p className="text-sm">No hay días cerrados registrados</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
            onClick={e => e.stopPropagation()}
            style={{ animation: "mIn .22s ease-out" }}
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-800">Agregar Día Cerrado</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Fecha</label>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Motivo</label>
                <input type="text" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                  placeholder="Ej: Día de la Constitución"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tipo</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(TYPE).map(([type, cfg]) => (
                    <button key={type} onClick={() => setForm(f => ({ ...f, type }))}
                      className="py-2.5 px-2 rounded-xl border text-xs font-semibold transition-all"
                      style={form.type === type
                        ? { background: cfg.bg, borderColor: cfg.border, color: cfg.text, boxShadow: `0 0 0 2px ${cfg.dot}40` }
                        : { background: "#f9fafb", borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      {cfg.emoji} {cfg.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={() => setShowForm(false)}
                className="py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm font-medium transition-colors">
                Cancelar
              </button>
              <button onClick={handleAdd} disabled={!form.date || !form.reason}
                className="py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-white shadow">
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes mIn { from { opacity:0; transform:scale(0.93) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>
    </div>
  );
}
