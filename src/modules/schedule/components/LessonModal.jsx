import { TEACHERS, TIME_SLOTS } from "../data/mockData";

export default function LessonModal({ lesson, onClose }) {
  if (!lesson) return null;

  const teacher = TEACHERS.find(t => t.id === lesson.teacherId);
  const startSlot = TIME_SLOTS[lesson.startSlot - 1];
  const endSlot   = TIME_SLOTS[lesson.endSlot - 1];
  const duration  = lesson.endSlot - lesson.startSlot;

  const rows = [
    { emoji: "👤", label: "Docente",      value: teacher?.name,       mono: false },
    { emoji: "🪪", label: "ID Docente",   value: lesson.teacherId,    mono: true  },
    { emoji: "🕐", label: "Horario",      value: `${startSlot?.start} – ${endSlot?.end}  (${duration}h)`, mono: false },
    { emoji: "📍", label: "Aula",         value: lesson.room,         mono: false },
    { emoji: "👥", label: "Grupo",        value: lesson.group,        mono: false },
    { emoji: "🏛",  label: "Departamento",value: teacher?.department, mono: false },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ animation: "mIn .22s ease-out" }}
      >
        {/* Header */}
        <div
          className="relative px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${teacher?.color}18 0%, ${teacher?.color}30 100%)`,
            borderTop: `4px solid ${teacher?.color}`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors text-sm"
          >
            ✕
          </button>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white flex-shrink-0 shadow"
              style={{ background: teacher?.color }}
            >
              {teacher?.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Clase</p>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">{lesson.subject}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{lesson.day}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-6 py-5 space-y-2.5">
          {rows.map(({ emoji, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <span className="text-base w-6 text-center flex-shrink-0">{emoji}</span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide leading-none mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mIn {
          from { opacity: 0; transform: scale(0.93) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}
