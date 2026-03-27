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
import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {

  // ===============================
  // DATOS DUMMY
  // ===============================

  const dummyData = [
    { profesor: "Irvin Ac Chan", fecha: "2026-02-01", asistencias: 1, retardos: 0, faltas: 0 },
    { profesor: "Leydi", fecha: "2026-02-02", asistencias: 1, retardos: 1, faltas: 0 },
    { profesor: "Trejo Rocha", fecha: "2026-02-03", asistencias: 0, retardos: 0, faltas: 1 },
    { profesor: "Mari Eugenia", fecha: "2026-02-04", asistencias: 1, retardos: 0, faltas: 0 },
    { profesor: "Jessica", fecha: "2026-02-05", asistencias: 1, retardos: 1, faltas: 0 },
    { profesor: "Grecia", fecha: "2026-02-06", asistencias: 0, retardos: 0, faltas: 1 },
    { profesor: "Irvin Ac Chan", fecha: "2026-02-07", asistencias: 1, retardos: 0, faltas: 0 },
    { profesor: "Jessica", fecha: "2026-02-08", asistencias: 1, retardos: 0, faltas: 0 },
  ];

  // ===============================
  // ESTADOS
  // ===============================

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("Todos");

  const teachers = ["Todos", ...new Set(dummyData.map(d => d.profesor))];

  // ===============================
  // FILTRAR
  // ===============================

  const handleSearch = () => {
    if (!startDate || !endDate) return;

    let result = dummyData.filter(item =>
      item.fecha >= startDate && item.fecha <= endDate
    );

    if (selectedTeacher !== "Todos") {
      result = result.filter(item => item.profesor === selectedTeacher);
    }

    setFilteredData(result);
  };

  // ===============================
  // EXPORTAR PDF
  // ===============================

  const exportPDF = () => {
    if (filteredData.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte de Incidencias de los Docentes", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [["Profesor", "Fecha", "Asistencias", "Retardos", "Faltas"]],
      body: filteredData.map(item => [
        item.profesor,
        item.fecha,
        item.asistencias,
        item.retardos,
        item.faltas
      ])
    });

    doc.save(`reporte_${startDate}_${endDate}.pdf`);
  };

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* HEADER */}
      <div className="bg-blue-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Reporte de Incidencias de los Docentes
          </h1>

          {filteredData.length > 0 && (
            <button
              onClick={exportPDF}
              className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              📄 Exportar PDF
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* FILTROS */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Fecha Final
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                Filtrar Profesor
              </label>
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                {teachers.map((teacher, index) => (
                  <option key={index}>{teacher}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                🔎 Generar Reporte
              </button>
            </div>

          </div>
        </div>

        {/* TABLA */}
        {filteredData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-left">Profesor</th>
                  <th className="p-4 text-left">Fecha</th>
                  <th className="p-4 text-center">Asistencias</th>
                  <th className="p-4 text-center">Retardos</th>
                  <th className="p-4 text-center">Faltas</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-slate-50 transition">
                    <td className="p-4">{item.profesor}</td>
                    <td className="p-4">{item.fecha}</td>
                    <td className="p-4 text-center text-green-600 font-semibold">
                      {item.asistencias}
                    </td>
                    <td className="p-4 text-center text-yellow-600 font-semibold">
                      {item.retardos}
                    </td>
                    <td className="p-4 text-center text-red-600 font-semibold">
                      {item.faltas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTALES */}
            <div className="bg-slate-100 p-4 flex justify-end gap-8 font-semibold">
              <span>
                Total Asistencias: {
                  filteredData.reduce((a,b)=>a+b.asistencias,0)
                }
              </span>
              <span>
                Total Retardos: {
                  filteredData.reduce((a,b)=>a+b.retardos,0)
                }
              </span>
              <span>
                Total Faltas: {
                  filteredData.reduce((a,b)=>a+b.faltas,0)
                }
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Reports;