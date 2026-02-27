import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEACHERS, ROOMS, TIME_SLOTS, DAYS } from "../data/mockData";

export default function AddScheduleEntry() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teacherId: "", subject: "", day: "", startSlot: "", endSlot: "", room: "", group: "",
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const isValid = form.teacherId && form.day && form.startSlot && form.endSlot && form.room && form.group
    && parseInt(form.endSlot) > parseInt(form.startSlot);

  const handleSave = () => {
    if (!isValid) return;
    setSaved(true);
    setTimeout(() => navigate("/horarios"), 1200);
  };

  const selT = TEACHERS.find(t => t.id === form.teacherId);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate("/horarios")}
        className="text-gray-400 hover:text-gray-600 text-sm mb-4 flex items-center gap-1 transition-colors"
      >
        ← Volver al horario
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Agregar Clase</h1>
      <p className="text-gray-500 text-sm mb-6">Registra una nueva sesión en el horario semanal</p>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Teacher */}
        <div className="p-6 border-b border-gray-100">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Seleccionar Docente
          </label>
          <div className="grid sm:grid-cols-2 gap-2">
            {TEACHERS.map(t => (
              <button key={t.id} onClick={() => { set("teacherId", t.id); set("subject", t.subject); }}
                className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm"
                style={form.teacherId === t.id
                  ? { borderColor: t.color, background: `${t.color}10`, boxShadow: `0 0 0 2px ${t.color}30` }
                  : { borderColor: "#e5e7eb", background: "#fafafa" }
                }
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white flex-shrink-0 shadow-sm"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-800 truncate">{t.name}</p>
                  <p className="text-xs text-gray-400 truncate">{t.subject}</p>
                </div>
                {form.teacherId === t.id && <span className="text-sm flex-shrink-0" style={{ color: t.color }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Materia</label>
            <input type="text" value={form.subject} onChange={e => set("subject", e.target.value)} placeholder="Nombre de la materia"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400
                         focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {/* Day & Group */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Día</label>
              <div className="flex flex-wrap gap-1.5">
                {DAYS.map(day => (
                  <button key={day} onClick={() => set("day", day)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={form.day === day
                      ? { background: "#4f46e5", color: "white" }
                      : { background: "#f3f4f6", color: "#6b7280" }
                    }
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Grupo</label>
              <input type="text" value={form.group} onChange={e => set("group", e.target.value)} placeholder="Ej: 3A"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400
                           focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Horario</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Inicio</p>
                <select value={form.startSlot} onChange={e => set("startSlot", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Seleccionar</option>
                  {TIME_SLOTS.map(s => <option key={s.id} value={s.id}>{s.start}</option>)}
                </select>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Fin</p>
                <select value={form.endSlot} onChange={e => set("endSlot", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Seleccionar</option>
                  {TIME_SLOTS.filter(s => s.id > parseInt(form.startSlot || 0)).map(s => <option key={s.id} value={s.id}>{s.end}</option>)}
                </select>
              </div>
            </div>
            {form.startSlot && form.endSlot && parseInt(form.endSlot) > parseInt(form.startSlot) && (
              <p className="text-xs text-indigo-500 font-medium mt-2">
                Duración: {parseInt(form.endSlot) - parseInt(form.startSlot)} hora(s)
              </p>
            )}
          </div>

          {/* Room */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Aula</label>
            <div className="flex flex-wrap gap-1.5">
              {ROOMS.map(room => (
                <button key={room} onClick={() => set("room", room)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={form.room === room
                    ? { background: "#059669", color: "white" }
                    : { background: "#f3f4f6", color: "#6b7280" }
                  }
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-sm ${
              saved
                ? "bg-emerald-500 text-white"
                : isValid
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {saved ? "✓ Guardado — regresando..." : "Guardar clase"}
          </button>
        </div>
      </div>
    </div>
  );
}
