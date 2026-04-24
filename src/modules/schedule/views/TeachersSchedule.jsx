import { useState, useMemo, useEffect } from "react";
import { TIME_SLOTS, DAYS } from "../data/mockData";
import LessonModal from "../components/LessonModal";
import SearchBar from "../components/SearchBar";
import { scheduleAPI } from "../../../api/scheduleAPI";

export default function TeachersSchedule() {
  const [query,    setQuery]    = useState("");
  const [modal,    setModal]    = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersData, schedulesData] = await Promise.all([
          scheduleAPI.getTeachers(),
          scheduleAPI.getSchedules()
        ]);
        setTeachers(teachersData);
        setSchedules(schedulesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTeacherColor = (teacherId) => {
    const colors = ["#4f46e5", "#0284c7", "#d97706", "#059669", "#db2777", "#7c3aed"];
    return colors[teacherId % colors.length];
  };

  const getTeacherInitials = (name) => {
    const safeName = String(name || "").trim();
    if (!safeName) return "TE";
    return safeName.split(" ").slice(0, 2).map(n => n[0]).join("");
  };

  const convertToSlot = (timeString) => {
    const slot = TIME_SLOTS.find(s => s.start === timeString);
    return slot ? slot.id : 1;
  };

  const filtered = useMemo(() => {
    const q = String(query || "").toLowerCase();
    if (!q) return teachers;
    const normalize = (value) => String(value ?? "").toLowerCase();
    return teachers.filter(t =>
      normalize(t.id).includes(q) ||
      normalize(t.name).includes(q) ||
      normalize(t.subject).includes(q)
    );
  }, [query, teachers]);

  const getLessons = id => schedules.filter(l => l.teacher_id === id).map(s => ({
    id: s.id,
    teacherId: s.teacher_id,
    day: s.day,
    subject: s.subject,
    room: s.room,
    group: s.group,
    startSlot: convertToSlot(s.start_time),
    endSlot: convertToSlot(s.end_time)
  }));
  
  const slotStart  = id => TIME_SLOTS[id - 1]?.start ?? "";
  const slotEnd    = id => TIME_SLOTS[id - 1]?.end   ?? "";
  const totalHours = id => getLessons(id).reduce((s, l) => s + (l.endSlot - l.startSlot), 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Horarios por Docente</h1>
          <p className="text-gray-500 text-sm mt-1">Expande para ver el detalle de cada profesor</p>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
          {filtered.length} docentes
        </span>
      </div>

      <div className="max-w-md mb-6">
        <SearchBar query={query} onChange={setQuery} placeholder="Buscar por ID, nombre, materia..." />
      </div>

      <div className="space-y-3">
        {filtered.map(teacher => {
          const lessons = getLessons(teacher.id);
          const isOpen  = expanded === teacher.id;
          const hours   = totalHours(teacher.id);
          const color   = getTeacherColor(teacher.id);
          const initials = getTeacherInitials(teacher.name);

          return (
            <div
              key={teacher.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
              style={{ borderLeft: `4px solid ${color}` }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : teacher.id)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-base flex-shrink-0 shadow-sm"
                  style={{ background: color }}
                >
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-800 text-sm">{teacher.name}</span>
                    <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">{teacher.id}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{teacher.subject}</p>
                </div>

                <div className="hidden sm:flex items-center gap-6 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">{lessons.length}</p>
                    <p className="text-xs text-gray-400">clases</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold" style={{ color }}>{hours}h</p>
                    <p className="text-xs text-gray-400">sem.</p>
                  </div>
                </div>

                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs ml-2 transition-transform duration-200 flex-shrink-0"
                  style={{ borderColor: color, color, transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                >
                  ▼
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4">
                  {lessons.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">Sin clases asignadas</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {lessons.map(lesson => (
                        <button
                          key={lesson.id}
                          onClick={() => setModal(lesson)}
                          className="text-left p-3.5 rounded-xl border hover:shadow-md transition-all hover:scale-[1.02] active:scale-95"
                          style={{
                            background: `${color}08`,
                            borderColor: `${color}25`,
                          }}
                        >
                          <span
                            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-md mb-2"
                            style={{ background: `${color}20`, color }}
                          >
                            {lesson.day}
                          </span>
                          <p className="text-sm font-semibold text-gray-800 leading-tight">{lesson.subject}</p>
                          <p className="text-xs text-gray-400 mt-1.5">🕐 {slotStart(lesson.startSlot)} – {slotEnd(lesson.endSlot)}</p>
                          <p className="text-xs text-gray-400 mt-0.5">📍 {lesson.room} · Grupo {lesson.group}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Semana</p>
                    <div className="flex gap-1.5">
                      {DAYS.map(day => {
                        const dl = lessons.filter(l => l.day === day);
                        return (
                          <div key={day} className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 text-center mb-1">{day.slice(0, 3)}</p>
                            {dl.length === 0 ? (
                              <div className="h-8 rounded-lg bg-gray-100" />
                            ) : dl.map(l => (
                              <div
                                key={l.id}
                                className="h-8 rounded-lg text-xs flex items-center justify-center font-medium cursor-pointer hover:opacity-70 transition-opacity"
                                style={{ background: `${color}20`, color }}
                                onClick={() => setModal(l)}
                              >
                                {slotStart(l.startSlot)}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <LessonModal lesson={modal} onClose={() => setModal(null)} />
    </div>
  );
}
