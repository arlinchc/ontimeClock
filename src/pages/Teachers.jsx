import { useEffect, useMemo, useState } from "react";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ matricula: "", nombre: "", departamento: "" });
  const [query, setQuery] = useState("");

  async function loadTeachers() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/teachers");
      if (!response.ok) {
        throw new Error("No se pudo cargar la lista de docentes");
      }
      const data = await response.json();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error al cargar docentes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return teachers;
    }
    return teachers.filter((teacher) => {
      return (
        String(teacher.matricula || "").toLowerCase().includes(search) ||
        String(teacher.nombre || "").toLowerCase().includes(search) ||
        String(teacher.departamento || "").toLowerCase().includes(search)
      );
    });
  }, [teachers, query]);

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!form.matricula.trim() || !form.nombre.trim()) {
      setError("Matricula y nombre son obligatorios.");
      return;
    }

    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula: form.matricula.trim(),
          nombre: form.nombre.trim(),
          departamento: form.departamento.trim() || null,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo crear el docente");
      }

      setForm({ matricula: "", nombre: "", departamento: "" });
      await loadTeachers();
    } catch (err) {
      setError(err.message || "No se pudo crear el docente");
    }
  };

  const handleDelete = async (matricula) => {
    const ok = window.confirm(`Eliminar docente ${matricula}?`);
    if (!ok) {
      return;
    }

    setError("");
    try {
      const response = await fetch(`http://localhost:3000/api/teachers/${matricula}`, {
        method: "DELETE",
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "No se pudo eliminar el docente");
      }
      await loadTeachers();
    } catch (err) {
      setError(err.message || "No se pudo eliminar el docente");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl space-y-5">
        <header className="rounded-xl bg-blue-900 px-6 py-5 text-white shadow">
          <h1 className="text-2xl font-bold">Docentes</h1>
          <p className="mt-1 text-sm text-blue-100">Datos conectados a PostgreSQL (tabla teachers).</p>
        </header>

        <section className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Nuevo docente</h2>
          <form className="grid gap-3 md:grid-cols-4" onSubmit={handleCreate}>
            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Matricula"
              value={form.matricula}
              onChange={(e) => setForm((prev) => ({ ...prev, matricula: e.target.value }))}
            />
            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm((prev) => ({ ...prev, nombre: e.target.value }))}
            />
            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Departamento"
              value={form.departamento}
              onChange={(e) => setForm((prev) => ({ ...prev, departamento: e.target.value }))}
            />
            <button className="rounded-md bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800" type="submit">
              Guardar
            </button>
          </form>
        </section>

        <section className="rounded-xl bg-white p-5 shadow">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-800">Listado de docentes</h2>
            <input
              className="w-full max-w-xs rounded-md border border-slate-300 px-3 py-2"
              placeholder="Buscar matricula, nombre o departamento"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {error && <div className="mb-3 rounded-md border border-red-300 bg-red-50 p-2 text-sm text-red-700">{error}</div>}

          {loading ? (
            <p className="text-slate-600">Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-slate-200 text-left text-sm text-slate-700">
                    <th className="px-3 py-2">Matricula</th>
                    <th className="px-3 py-2">Nombre</th>
                    <th className="px-3 py-2">Departamento</th>
                    <th className="px-3 py-2">Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td className="px-3 py-3 text-sm text-slate-500" colSpan={4}>
                        No hay docentes.
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <tr className="border-b border-slate-100" key={teacher.matricula}>
                        <td className="px-3 py-2 text-sm">{teacher.matricula}</td>
                        <td className="px-3 py-2 text-sm">{teacher.nombre}</td>
                        <td className="px-3 py-2 text-sm">{teacher.departamento || "-"}</td>
                        <td className="px-3 py-2 text-sm">
                          <button
                            className="rounded-md bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                            onClick={() => handleDelete(teacher.matricula)}
                            type="button"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Teachers;