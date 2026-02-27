 /*function Reports() {   
    return (    
        <div>
            <h1 className="text-2xl font-bold mb-4">reportes de incidentes</h1>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow
                hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">
                        Reporte mensual</h3>
                    <p className="text-slate-500 text-sm">
                        asistencia general del mes
                        </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow
                hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">
                        Reporte por Docente</h3>
                    <p className="text-slate-500 text-sm">
                        historial individual por docente 
                        </p>
                </div>
            </div>
        </div>
    ); 
}
export default Reports; */
import { useState, useEffect } from "react";

function Reports() {
  const [institution, setInstitution] = useState("Instituto Central");
  const [timezone, setTimezone] = useState("America/Mexico_City");
  const [format24, setFormat24] = useState(true);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("es-MX", {
    timeZone: timezone,
    hour12: !format24,
  });

  // TOLERANCIA

  const [tolerance, setTolerance] = useState(10);
  // HORARIOS

  const [schedule, setSchedule] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [newExit, setNewExit] = useState("");

  const addSchedule = () => {
    if (newEntry && newExit) {
      setSchedule([
        ...schedule,
        { id: Date.now(), entry: newEntry, exit: newExit }
      ]);
      setNewEntry("");
      setNewExit("");
    }
  };

  const removeSchedule = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  // ROLES

  const [roles, setRoles] = useState(["Administrador", "Docente"]);
  const [newRole, setNewRole] = useState("");

  const addRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, newRole]);
      setNewRole("");
    }
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  // NOTIFICACIONES

  const [notifications, setNotifications] = useState({
    retardos: true,
    faltas: true,
    reportes: false
  });

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">
        Panel de Configuración
      </h1>

      {/* Reloj */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold">
          {institution}
        </h2>
        <p className="text-3xl mt-2">
          {formattedTime}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ajustes Institucionales */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">
            Ajustes Institucionales
          </h3>

          <label className="text-sm">Nombre Institución</label>
          <input
            className="w-full p-2 rounded text-black mb-3"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />

          <label className="text-sm">Zona Horaria</label>
          <select
            className="w-full p-2 rounded text-black mb-3"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="America/Mexico_City">México</option>
            <option value="America/New_York">New York</option>
            <option value="Europe/Madrid">Madrid</option>
          </select>

          <button
            onClick={() => setFormat24(!format24)}
            className="bg-blue-700 px-4 py-2 rounded"
          >
            Formato: {format24 ? "24h" : "12h"}
          </button>
        </div>

        {/* Tolerancia */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">
            Configuración de Tolerancia
          </h3>

          <input
            type="number"
            className="w-full p-2 rounded text-black"
            value={tolerance}
            onChange={(e) => setTolerance(Number(e.target.value))}
          />

          <p className="mt-2 text-sm text-slate-300">
            Minutos permitidos antes de marcar retardo: {tolerance}
          </p>
        </div>

        {/* Horario Base */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">
            Horario Base
          </h3>

          <div className="flex gap-2 mb-3">
            <input
              type="time"
              className="p-2 rounded text-black"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
            <input
              type="time"
              className="p-2 rounded text-black"
              value={newExit}
              onChange={(e) => setNewExit(e.target.value)}
            />
            <button
              onClick={addSchedule}
              className="bg-blue-700 px-4 rounded"
            >
              +
            </button>
          </div>

          {schedule.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.entry} - {item.exit}</span>
              <button
                onClick={() => removeSchedule(item.id)}
                className="text-red-400"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Gestión de Roles */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">
            Gestión de Roles
          </h3>

          <div className="flex gap-2 mb-3">
            <input
              className="p-2 rounded text-black w-full"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            />
            <button
              onClick={addRole}
              className="bg-blue-700 px-4 rounded"
            >
              +
            </button>
          </div>

          {roles.map((role, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{role}</span>
              <button
                onClick={() => removeRole(index)}
                className="text-red-400"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        {/* Notificaciones */}
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow md:col-span-2">
          <h3 className="text-lg font-semibold mb-3">
            Preferencias de Notificaciones
          </h3>

          {Object.keys(notifications).map(key => (
            <div key={key} className="flex justify-between mb-2">
              <span className="capitalize">{key}</span>
              <button
                onClick={() => toggleNotification(key)}
                className={`px-4 py-1 rounded ${
                  notifications[key]
                    ? "bg-blue-600"
                    : "bg-gray-500"
                }`}
              >
                {notifications[key] ? "Activo" : "Inactivo"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Reports;
