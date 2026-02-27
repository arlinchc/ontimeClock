import { useState, useMemo } from "react";
import { INITIAL_CLOSED_DAYS, INITIAL_SCHEDULE, TEACHERS } from "../data/mockData";
import LessonModal from "../components/LessonModal";

const MONTH_NAMES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DOW_NAMES   = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
const DOW_TO_DAY  = { 1:"Lunes",2:"Martes",3:"Miércoles",4:"Jueves",5:"Viernes",6:"Sábado" };

const TYPE = {
  holiday:      { label:"Festivo",        dot:"#ef4444", bg:"#fef2f2", border:"#fecaca", text:"#b91c1c" },
  maintenance:  { label:"Mantenimiento",  dot:"#f59e0b", bg:"#fffbeb", border:"#fde68a", text:"#92400e" },
  institutional:{ label:"Institucional",  dot:"#0ea5e9", bg:"#f0f9ff", border:"#bae6fd", text:"#0369a1" },
};

export default function CalendarView() {
  const now   = new Date();
  const [year, setYear]   = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selDate, setSel] = useState(null);
  const [modal, setModal] = useState(null);

  const closedMap = useMemo(() => {
    const m = {};
    INITIAL_CLOSED_DAYS.forEach(d => { m[d.date] = d; });
    return m;
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow    = new Date(year, month, 1).getDay();
  const cells       = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const fmt         = d => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const todayStr    = fmt.call(null, null) && `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;

  const prev = () => month === 0  ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const next = () => month === 11 ? (setMonth(0),  setYear(y => y + 1)) : setMonth(m => m + 1);

  const selLessons = useMemo(() => {
    if (!selDate) return [];
    const dow     = new Date(selDate + "T12:00").getDay();
    const dayName = DOW_TO_DAY[dow];
    return dayName ? INITIAL_SCHEDULE.filter(l => l.day === dayName) : [];
  }, [selDate]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Calendario Académico</h1>
      <p className="text-gray-500 text-sm mb-5">Festivos, días cerrados y clases por día</p>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(TYPE).map(([k, v]) => (
          <div key={k} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: v.dot }} />
            <span className="text-xs text-gray-500 font-medium">{v.label}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar widget */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          {/* Nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prev} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-sm">‹</button>
            <h2 className="text-base font-bold text-gray-800">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={next} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors text-sm">›</button>
          </div>
          {/* DOW header */}
          <div className="grid grid-cols-7 mb-2">
            {DOW_NAMES.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 uppercase py-1">{d}</div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((day, i) => {
              if (!day) return <div key={`e${i}`} />;
              const ds     = fmt(day);
              const closed = closedMap[ds];
              const isToday = ds === todayStr;
              const isSel  = selDate === ds;
              const isWeek = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;
              const cfg    = closed ? TYPE[closed.type] : null;

              let cls = "aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-medium cursor-pointer transition-all hover:scale-105 relative select-none border ";
              let style = {};

              if (isSel) {
                cls  += "bg-indigo-600 text-white border-indigo-600 shadow-md";
              } else if (isToday) {
                cls  += "bg-indigo-50 text-indigo-700 border-indigo-200 ring-2 ring-indigo-400";
              } else if (closed) {
                style = { background: cfg.bg, borderColor: cfg.border, color: cfg.text };
              } else if (isWeek) {
                cls  += "text-gray-300 border-transparent";
              } else {
                cls  += "text-gray-600 border-transparent hover:bg-gray-50 hover:border-gray-200";
              }

              return (
                <button key={day} onClick={() => setSel(isSel ? null : ds)} className={cls} style={style}>
                  {day}
                  {closed && !isSel && (
                    <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4">
          {selDate ? (
            <>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                <h3 className="font-semibold text-gray-800 text-sm capitalize">
                  {new Date(selDate + "T12:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
                </h3>
                {closedMap[selDate] ? (
                  <div className="mt-3 p-3 rounded-xl border" style={{ background: TYPE[closedMap[selDate].type].bg, borderColor: TYPE[closedMap[selDate].type].border }}>
                    <p className="text-sm font-semibold" style={{ color: TYPE[closedMap[selDate].type].text }}>
                      {closedMap[selDate].reason}
                    </p>
                    <p className="text-xs opacity-70 mt-0.5">{TYPE[closedMap[selDate].type].label}</p>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-600 font-medium mt-2">✓ Día hábil</p>
                )}
              </div>

              {!closedMap[selDate] && selLessons.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Clases del día</p>
                  <div className="space-y-2">
                    {selLessons.map(l => {
                      const t = TEACHERS.find(x => x.id === l.teacherId);
                      return (
                        <button key={l.id} onClick={() => setModal(l)}
                          className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all"
                          style={{ borderLeft: `3px solid ${t?.color}` }}
                        >
                          <p className="text-sm font-medium text-gray-800">{l.subject}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{l.room} · Grupo {l.group}</p>
                          <p className="text-xs mt-0.5 font-medium" style={{ color: t?.color }}>{t?.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {closedMap[selDate] && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                  <span className="text-3xl">🚫</span>
                  <p className="text-gray-400 text-sm mt-2">Sin clases este día</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
              <span className="text-2xl mb-2 block">📅</span>
              <p className="text-gray-400 text-sm">Selecciona un día para ver detalles</p>
            </div>
          )}

          {/* Upcoming closed days */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Días cerrados</p>
            {INITIAL_CLOSED_DAYS.slice(0, 6).map(d => {
              const cfg = TYPE[d.type];
              return (
                <div key={d.id} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 truncate">{d.reason}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(d.date + "T12:00").toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LessonModal lesson={modal} onClose={() => setModal(null)} />
    </div>
  );
}
