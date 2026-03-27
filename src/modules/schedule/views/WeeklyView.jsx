import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { TIME_SLOTS, DAYS } from "../data/mockData";
import LessonModal from "../components/LessonModal";
import SearchBar from "../components/SearchBar";
import { scheduleAPI } from "../../../api/scheduleAPI";

export default function WeeklyView() {
  const [modal, setModal]           = useState(null);
  const [query, setQuery]           = useState("");
  const [teacherFilter, setTeacher] = useState("all");
  const [schedules, setSchedules]   = useState([]);
  const [teachers, setTeachers]     = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesData, teachersData] = await Promise.all([
          scheduleAPI.getSchedules(),
          scheduleAPI.getTeachers()
        ]);
        setSchedules(schedulesData);
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error loading schedules:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const convertToSlot = (timeString) => {
    const slot = TIME_SLOTS.find(s => s.start === timeString);
    return slot ? slot.id : 1;
  };

  const convertedSchedules = useMemo(() => {
    return schedules.map(s => ({
      id: s.id,
      teacherId: s.teacher_id,
      day: s.day,
      subject: s.subject,
      room: s.room,
      group: s.group,
      startSlot: convertToSlot(s.start_time),
      endSlot: convertToSlot(s.end_time),
      teacher_name: s.teacher_name
    }));
  }, [schedules]);

  const filtered = useMemo(() => {
    let r = convertedSchedules;
    if (teacherFilter !== "all") r = r.filter(l => l.teacherId === parseInt(teacherFilter));
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(l => {
        const t = teachers.find(t => t.id === l.teacherId);
        return (
          String(l.teacherId).toLowerCase().includes(q) ||
          l.subject.toLowerCase().includes(q) ||
          t?.name.toLowerCase().includes(q) ||
          l.room.toLowerCase().includes(q) ||
          l.group.toLowerCase().includes(q)
        );
      });
    }
    return r;
  }, [query, teacherFilter, convertedSchedules, teachers]);

  const isCont = (day, slotId) =>
    filtered.some(l => l.day === day && l.startSlot < slotId && l.endSlot >= slotId);

  const getTeacherColor = (teacherId) => {
    const colors = ["#4f46e5", "#0284c7", "#d97706", "#059669", "#db2777", "#7c3aed"];
    return colors[teacherId % colors.length];
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vista Semanal</h1>
          <p className="text-gray-500 text-sm mt-1">Horario general</p>
        </div>
        <Link
          to="/horarios/agregar"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow transition-colors"
        >
          + Agregar Clase
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar query={query} onChange={setQuery} placeholder="Buscar por ID, docente, materia, aula, grupo..." />
        </div>
        <select
          value={teacherFilter}
          onChange={e => setTeacher(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 shadow-sm min-w-[220px]"
        >
          <option value="all">Todos los docentes</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {query && (
        <p className="text-gray-500 text-sm mb-4">
          Mostrando <span className="text-gray-800 font-semibold">{filtered.length}</span> clases
        </p>
      )}

      <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-20">Hora</th>
                {DAYS.map(d => (
                  <th key={d} className="py-3 px-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((slot, idx) => (
                <tr key={slot.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="py-1 px-4 align-top">
                    <span className="text-xs font-mono text-gray-400">{slot.start}</span>
                  </td>
                  {DAYS.map(day => {
                    const lessons = filtered.filter(l => l.day === day && l.startSlot === slot.id);
                    if (isCont(day, slot.id) && lessons.length === 0) return <td key={day} className="p-0.5" />;
                    return (
                      <td key={day} className="p-0.5 align-top">
                        {lessons.map(lesson => {
                          const teacher = teachers.find(t => t.id === lesson.teacherId);
                          const color = getTeacherColor(lesson.teacherId);
                          const span = lesson.endSlot - lesson.startSlot;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setModal(lesson)}
                              className="w-full text-left rounded-lg p-2 transition-all hover:scale-[1.03] hover:shadow-md active:scale-95 group"
                              style={{
                                background: `${color}12`,
                                borderLeft: `3px solid ${color}`,
                                minHeight: `${span * 50 + (span - 1) * 4}px`,
                                display: "flex",
                                flexDirection: "column",
                                gap: "3px",
                              }}
                            >
                              <span className="text-xs font-semibold text-gray-700 leading-tight line-clamp-2">{lesson.subject}</span>
                              <span className="text-xs font-mono" style={{ color }}>{teacher?.avatar || "TE"}</span>
                              <span className="text-xs text-gray-400">{lesson.room}</span>
                              <span
                                className="text-xs px-1.5 py-0.5 rounded-md font-semibold self-start mt-auto"
                                style={{ background: `${color}20`, color }}
                              >
                                {lesson.group}
                              </span>
                            </button>
                          );
                        })}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {teachers.map((t, idx) => (
          <div key={t.id} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: getTeacherColor(t.id) }} />
            <span className="text-xs text-gray-500">{t.name.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        ))}
      </div>

      <LessonModal lesson={modal} onClose={() => setModal(null)} />
    </div>
  );
}
