import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("Todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [detailRows, setDetailRows] = useState([]);
  const [detailTeacher, setDetailTeacher] = useState(null);

  const teachers = useMemo(
    () => ["Todos", ...new Set(allData.map((d) => d.profesor))],
    [allData]
  );

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      setError("Por favor selecciona ambas fechas");
      return;
    }

    if (startDate > endDate) {
      setError("La fecha de inicio no puede ser mayor a la fecha final");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/api/reports?startDate=${startDate}&endDate=${endDate}`
      );

      const payload = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(payload.error || "Error al obtener reporte del servidor");
      }

      const data = Array.isArray(payload) ? payload : [];
      setAllData(data);

      let result = data;
      if (selectedTeacher !== "Todos") {
        result = result.filter((item) => item.profesor === selectedTeacher);
      }

      setFilteredData(result);
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.message ||
          "No se pudo conectar con el servidor. Verifica que esté corriendo en http://localhost:3000"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allData.length === 0) return;

    let result = allData;
    if (selectedTeacher !== "Todos") {
      result = result.filter((item) => item.profesor === selectedTeacher);
    }

    setFilteredData(result);
  }, [selectedTeacher, allData]);

  const exportPDF = () => {
    if (filteredData.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte de Asistencia de los Docentes", 14, 15);
    doc.setFontSize(10);
    doc.text(`Periodo: ${startDate} al ${endDate}`, 14, 22);
    doc.text(`Profesor: ${selectedTeacher}`, 14, 29);

    autoTable(doc, {
      startY: 35,
      head: [["Matricula", "Profesor", "Asistencias", "Faltas", "Dias Evaluados"]],
      body: filteredData.map((item) => [
        item.matricula,
        item.profesor,
        item.asistencias,
        item.faltas,
        item.totalDias,
      ]),
    });

    doc.save(`reporte_asistencia_${startDate}_${endDate}.pdf`);
  };

  const openTeacherDetail = async (teacherRow) => {
    if (!startDate || !endDate) {
      setError("Selecciona primero un rango de fechas");
      return;
    }

    setShowDetailModal(true);
    setDetailLoading(true);
    setDetailError("");
    setDetailRows([]);
    setDetailTeacher(teacherRow);

    try {
      const response = await fetch(
        `http://localhost:3000/api/reports/${teacherRow.matricula}/details?startDate=${startDate}&endDate=${endDate}`
      );
      const payload = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(payload.error || "No se pudo obtener el detalle del docente");
      }

      setDetailRows(Array.isArray(payload) ? payload : []);
    } catch (err) {
      setDetailError(err.message || "Error al cargar detalle del docente");
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-blue-900 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Reporte de Asistencia de Docentes</h1>

          {filteredData.length > 0 && (
            <button
              onClick={exportPDF}
              className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Exportar PDF
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-200">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Fecha Inicio</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Fecha Final</label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">Filtrar Profesor</label>
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
                disabled={loading}
                className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition disabled:bg-slate-400"
              >
                {loading ? "Cargando..." : "Generar Reporte"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-left">Matricula</th>
                  <th className="p-4 text-left">Profesor</th>
                  <th className="p-4 text-center">Asistencias</th>
                  <th className="p-4 text-center">Faltas</th>
                  <th className="p-4 text-center">Dias Evaluados</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => openTeacherDetail(item)}
                  >
                    <td className="p-4">{item.matricula}</td>
                    <td className="p-4 text-blue-800 font-semibold">{item.profesor}</td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-green-600">{item.asistencias}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-red-600">{item.faltas}</span>
                    </td>
                    <td className="p-4 text-center">{item.totalDias}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-slate-100 p-4 flex justify-end gap-8 font-semibold">
              <span className="text-green-600">
                Total Asistencias: {filteredData.reduce((a, b) => a + Number(b.asistencias || 0), 0)}
              </span>
              <span className="text-red-600">
                Total Faltas: {filteredData.reduce((a, b) => a + Number(b.faltas || 0), 0)}
              </span>
            </div>
          </div>
        )}

        {!filteredData.length && !loading && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center text-slate-500">
            <p className="text-lg">Selecciona un rango de fechas y haz clic en "Generar Reporte"</p>
          </div>
        )}
      </div>

      {showDetailModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Detalle de Asistencia</h3>
                <p className="text-sm text-slate-500">
                  {detailTeacher?.profesor} ({detailTeacher?.matricula})
                </p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="rounded-md border px-3 py-1 text-sm hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

            <div className="p-6">
              {detailLoading && <p className="text-slate-600">Cargando detalle...</p>}

              {detailError && (
                <div className="mb-4 p-3 rounded bg-red-100 border border-red-300 text-red-700">
                  {detailError}
                </div>
              )}

              {!detailLoading && !detailError && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-200 text-left text-sm text-slate-700">
                        <th className="p-3">Fecha</th>
                        <th className="p-3">Hora de Entrada</th>
                        <th className="p-3">Hora de Salida</th>
                        <th className="p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detailRows.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{String(row.fecha).slice(0, 10)}</td>
                          <td className="p-3">{row.hora_entrada || "-"}</td>
                          <td className="p-3">{row.hora_salida || "-"}</td>
                          <td className="p-3">
                            <span
                              className={
                                row.estado === "Asistencia"
                                  ? "font-semibold text-green-600"
                                  : "font-semibold text-red-600"
                              }
                            >
                              {row.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
