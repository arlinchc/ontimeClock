import { Routes, Route, NavLink } from "react-router-dom";
import WeeklyView       from "./views/WeeklyView";
import CalendarView     from "./views/CalendarView";
import TeachersSchedule from "./views/TeachersSchedule";
import ClosedDays       from "./views/ClosedDays";
import AddScheduleEntry from "./views/AddScheduleEntry";

const NAV = [
  { to: "/horarios",          label: "Vista Semanal", icon: "", end: true },
  { to: "/horarios/calendario", label: "Calendario",   icon: "" },
  { to: "/horarios/docentes",   label: "Docentes",     icon: "" },
  { to: "/horarios/dias-cerrados", label: "Días Cerrados", icon: "" },
];

export default function ScheduleModule() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sub-navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6">
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
            {NAV.map(({ to, label, icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-semibold"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <span>{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <Routes>
          <Route index              element={<WeeklyView />}       />
          <Route path="calendario"  element={<CalendarView />}     />
          <Route path="docentes"    element={<TeachersSchedule />} />
          <Route path="dias-cerrados" element={<ClosedDays />}     />
          <Route path="agregar"     element={<AddScheduleEntry />} />
        </Routes>
      </div>
    </div>
  );
}
