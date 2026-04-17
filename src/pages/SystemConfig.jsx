import { useState, useEffect } from "react";

const API = "https://ontimeclock.onrender.com/api/systemconfig";

// ─── Paleta de colores y estilos base ───────────────────────────────────────
const styles = {
  wrapper: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    background: "#ffffff",
    minHeight: "100vh",
    padding: "2rem",
    color: "#1f2937",
  },
  header: {
    marginBottom: "2.5rem",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    paddingBottom: "1.5rem",
  },
  headerTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    letterSpacing: "-0.02em",
    color: "#1f2937",
    margin: "0 0 0.25rem 0",
  },
  headerSubtitle: {
    fontSize: "0.95rem",
    color: "#6b7280",
    margin: 0,
    fontStyle: "italic",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "#f9fafb",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "16px",
    padding: "1.75rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 0.25rem 0",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  cardDesc: {
    fontSize: "0.82rem",
    color: "#6b7280",
    margin: "0 0 1.25rem 0",
  },
  label: {
    display: "block",
    fontSize: "0.8rem",
    color: "#374151",
    marginBottom: "0.35rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "8px",
    padding: "0.6rem 0.9rem",
    color: "#1f2937",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: "8px",
    padding: "0.6rem 0.9rem",
    color: "#1f2937",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
  },
  fieldGroup: { marginBottom: "1rem" },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.55rem 1.4rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
  btnSecondary: {
    background: "#ffffff",
    color: "#374151",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "8px",
    padding: "0.55rem 1.2rem",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  btnDanger: {
    background: "rgba(239,68,68,0.1)",
    color: "#dc2626",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "8px",
    padding: "0.4rem 0.9rem",
    fontSize: "0.8rem",
    cursor: "pointer",
  },
  btnActions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.25rem",
    justifyContent: "flex-end",
  },
  sliderWrapper: { marginBottom: "1rem" },
  sliderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.4rem",
  },
  sliderValue: {
    background: "rgba(59,130,246,0.1)",
    color: "#1e40af",
    padding: "0.1rem 0.6rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    fontWeight: "700",
  },
  slider: { width: "100%", accentColor: "#3b82f6", cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" },
  th: {
    textAlign: "left",
    padding: "0.6rem 0.8rem",
    color: "#374151",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  td: {
    padding: "0.75rem 0.8rem",
    borderBottom: "1px solid rgba(0,0,0,0.04)",
    color: "#374151",
    verticalAlign: "middle",
  },
  badgeActive: {
    background: "rgba(34,197,94,0.1)",
    color: "#159b2b",
    border: "1px solid rgba(34,197,94,0.2)",
    borderRadius: "999px",
    padding: "0.15rem 0.65rem",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  badgeInactive: {
    background: "rgba(0,0,0,0.05)",
    color: "#6b7280",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "999px",
    padding: "0.15rem 0.65rem",
    fontSize: "0.75rem",
  },
  badgeAdmin: {
    background: "rgba(168,85,247,0.1)",
    color: "#7e22ce",
    border: "1px solid rgba(168,85,247,0.2)",
    borderRadius: "999px",
    padding: "0.15rem 0.65rem",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.7rem 0",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },
  toggleLabel: { fontSize: "0.88rem", color: "#1f2937" },
  toggleSub: { fontSize: "0.78rem", color: "#9ca3af", marginTop: "0.1rem" },
  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.4rem",
    marginBottom: "1rem",
  },
  dayCell: {
    textAlign: "center",
    padding: "0.5rem 0.25rem",
    borderRadius: "8px",
    fontSize: "0.78rem",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all 0.2s",
    fontWeight: "600",
  },
  dayCellActive: {
    background: "rgba(59,130,246,0.1)",
    border: "1px solid rgba(59,130,246,0.3)",
    color: "#1e40af",
  },
  dayCellInactive: {
    background: "#f3f4f6",
    border: "1px solid rgba(0,0,0,0.08)",
    color: "#9ca3af",
  },
  divider: { borderTop: "1px solid rgba(0,0,0,0.06)", margin: "1.25rem 0" },
  iconBox: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
  },
};

// ─── Datos mock para Roles (no tiene tabla en BD) ─────────────────────────────
const MOCK_ROLES = [
  { id: 1, nombre: "Administrador", permisos: "Total",    usuarios: 3,  estado: "activo" },
  { id: 2, nombre: "Coordinador",   permisos: "Parcial",  usuarios: 8,  estado: "activo" },
  { id: 3, nombre: "Docente",       permisos: "Lectura",  usuarios: 42, estado: "activo" },
  { id: 4, nombre: "Auxiliar",      permisos: "Limitado", usuarios: 12, estado: "inactivo" },
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{
      position: "fixed", top: "1.5rem", right: "1.5rem",
      zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.5rem",
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === "success" ? "#166534" : t.type === "error" ? "#991b1b" : "#1e3a5f",
          color: "#fff",
          padding: "0.75rem 1.25rem",
          borderRadius: "10px",
          fontSize: "0.88rem",
          fontWeight: "500",
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          minWidth: "260px",
        }}>
          <span>{t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Modal Nuevo Rol ──────────────────────────────────────────────────────────
function ModalNuevoRol({ onClose, onGuardar }) {
  const [form, setForm] = useState({ nombre: "", permisos: "Lectura" });
  const [error, setError] = useState("");

  const handleGuardar = () => {
    if (!form.nombre.trim()) { setError("El nombre del rol es obligatorio."); return; }
    onGuardar(form);
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "2rem",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: "700", color: "#1f2937" }}>
          🔑 Nuevo Rol
        </h2>
        <p style={{ margin: "0 0 1.5rem 0", fontSize: "0.82rem", color: "#6b7280" }}>
          Define el nombre y nivel de permisos del nuevo rol.
        </p>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nombre del rol</label>
          <input
            style={{ ...styles.input, borderColor: error ? "#ef4444" : undefined }}
            placeholder="Ej: Supervisor"
            value={form.nombre}
            onChange={(e) => { setForm({ ...form, nombre: e.target.value }); setError(""); }}
            autoFocus
          />
          {error && <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem", color: "#ef4444" }}>{error}</p>}
        </div>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Nivel de permisos</label>
          <select
            style={styles.select}
            value={form.permisos}
            onChange={(e) => setForm({ ...form, permisos: e.target.value })}
          >
            <option value="Total">Total</option>
            <option value="Parcial">Parcial</option>
            <option value="Lectura">Lectura</option>
            <option value="Limitado">Limitado</option>
          </select>
        </div>
        <div style={{ ...styles.btnActions, marginTop: "1.5rem" }}>
          <button style={styles.btnSecondary} onClick={onClose}>Cancelar</button>
          <button style={styles.btnPrimary} onClick={handleGuardar}>Crear rol</button>
        </div>
      </div>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "42px", height: "22px", borderRadius: "999px",
        background: checked ? "rgba(59,130,246,0.8)" : "rgba(209,213,219,0.8)",
        border: checked ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(0,0,0,0.12)",
        position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: "2px",
        left: checked ? "21px" : "2px",
        width: "16px", height: "16px",
        borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
      }} />
    </div>
  );
}

// ─── SectionCard ──────────────────────────────────────────────────────────────
function SectionCard({ icon, title, desc, color = "#3b82f6", children }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <div style={{ ...styles.iconBox, background: `${color}22` }}>
          <span>{icon}</span>
        </div>
        <div>
          <h3 style={styles.cardTitle}>{title}</h3>
          <p style={styles.cardDesc}>{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ─── RolBadge ─────────────────────────────────────────────────────────────────
function RolBadge({ permisos }) {
  if (permisos === "Total")   return <span style={styles.badgeAdmin}>{permisos}</span>;
  if (permisos === "Parcial") return <span style={styles.badgeActive}>{permisos}</span>;
  return <span style={styles.badgeInactive}>{permisos}</span>;
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function SystemConfig() {

  // ── Toasts ──
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  // ── ID del registro en BD ──
  const [configId, setConfigId] = useState(null);

  // ── Estado: Ajustes Institucionales ──
  const INITIAL_INSTITUCION = {
    nombre: "",
    codigo: "",
    zona: "America/Mexico_City",
    idioma: "es",
  };
  const [institucion, setInstitucion] = useState(INITIAL_INSTITUCION);
  const [savedInstitucion, setSavedInstitucion] = useState(INITIAL_INSTITUCION);

  // ── Estado: Tolerancia ──
  const INITIAL_TOLERANCIA = { entrada: 10, salida: 5, inasistencias: 3 };
  const [tolerancia, setTolerancia] = useState(INITIAL_TOLERANCIA);
  const [savedTolerancia, setSavedTolerancia] = useState(INITIAL_TOLERANCIA);

  // ── Estado: Notificaciones ──
  const INITIAL_NOTIF = {
    emailAsistencia: true,
    emailReportes: true,
    pushAlertas: false,
    resumenDiario: true,
    alertasFaltas: true,
    notifDocentes: false,
  };
  const [notificaciones, setNotificaciones] = useState(INITIAL_NOTIF);
  const [savedNotificaciones, setSavedNotificaciones] = useState(INITIAL_NOTIF);

  // ── Estado: Horario base ──
  const INITIAL_HORARIO = {
    0: { activo: true,  inicio: "07:00", fin: "18:00", id: null },
    1: { activo: true,  inicio: "07:00", fin: "18:00", id: null },
    2: { activo: true,  inicio: "07:00", fin: "18:00", id: null },
    3: { activo: true,  inicio: "07:00", fin: "18:00", id: null },
    4: { activo: true,  inicio: "07:00", fin: "18:00", id: null },
    5: { activo: false, inicio: "08:00", fin: "14:00", id: null },
    6: { activo: false, inicio: "08:00", fin: "14:00", id: null },
  };
  const [horarioPorDia, setHorarioPorDia] = useState(INITIAL_HORARIO);
  const [savedHorario, setSavedHorario] = useState(INITIAL_HORARIO);
  const [diaSeleccionado, setDiaSeleccionado] = useState(0);

  // ── Estado: Roles ──
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [showModalRol, setShowModalRol] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // CARGAR DATOS DE LA BD AL INICIAR
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Cargar configuración general
    fetch(API)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          const c = data[0];
          setConfigId(c.id);

          const inst = {
            nombre: c.nombre_institucion || "",
            codigo: c.codigo_institucional || "",
            zona:   c.zona_horaria || "America/Mexico_City",
            idioma: c.idioma || "es",
          };
          setInstitucion(inst);
          setSavedInstitucion(inst);

          const tol = {
            entrada:       c.tolerancia_entrada       ?? 10,
            salida:        c.tolerancia_salida         ?? 5,
            inasistencias: c.inasistencias_permitidas  ?? 3,
          };
          setTolerancia(tol);
          setSavedTolerancia(tol);

          const notif = {
            emailAsistencia: c.email_asistencia ?? true,
            emailReportes:   c.email_reportes   ?? true,
            pushAlertas:     c.push_alertas     ?? false,
            resumenDiario:   c.resumen_diario   ?? true,
            alertasFaltas:   c.alertas_faltas   ?? true,
            notifDocentes:   c.notif_docentes   ?? false,
          };
          setNotificaciones(notif);
          setSavedNotificaciones(notif);
        }
      })
      .catch(() => addToast("No se pudo conectar con el servidor.", "error"));

    // Cargar días laborales
    fetch(`${API}/work-days`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          const nuevo = { ...INITIAL_HORARIO };
          data.forEach((d) => {
            const idx = d.dia;
            if (idx >= 0 && idx <= 6) {
              nuevo[idx] = {
                activo: d.activo,
                inicio: d.hora_inicio ? d.hora_inicio.slice(0, 5) : "07:00",
                fin:    d.hora_fin    ? d.hora_fin.slice(0, 5)    : "18:00",
                id:     d.id,
              };
            }
          });
          setHorarioPorDia(nuevo);
          setSavedHorario(JSON.parse(JSON.stringify(nuevo)));
        }
      })
      .catch(() => addToast("No se pudieron cargar los días laborales.", "error"));
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────────────────────────────
  const buildConfigBody = (instOv, tolOv, notifOv) => {
    const inst  = instOv  || institucion;
    const tol   = tolOv   || tolerancia;
    const notif = notifOv || notificaciones;
    return {
      nombre_institucion:       inst.nombre,
      codigo_institucional:     inst.codigo,
      idioma:                   inst.idioma,
      zona_horaria:             inst.zona,
      tolerancia_entrada:       tol.entrada,
      tolerancia_salida:        tol.salida,
      inasistencias_permitidas: tol.inasistencias,
      email_asistencia:         notif.emailAsistencia,
      email_reportes:           notif.emailReportes,
      push_alertas:             notif.pushAlertas,
      resumen_diario:           notif.resumenDiario,
      alertas_faltas:           notif.alertasFaltas,
      notif_docentes:           notif.notifDocentes,
    };
  };

  const saveConfig = async (body) => {
    if (configId) {
      const res = await fetch(`${API}/${configId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      return res.json();
    } else {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al crear");
      const data = await res.json();
      setConfigId(data.id);
      return data;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────────────────────────────────────────
  const toggleDia = (idx) => {
    setHorarioPorDia((prev) => ({ ...prev, [idx]: { ...prev[idx], activo: !prev[idx].activo } }));
    setDiaSeleccionado(idx);
  };
  const actualizarHorarioDia = (idx, campo, valor) => {
    setHorarioPorDia((prev) => ({ ...prev, [idx]: { ...prev[idx], [campo]: valor } }));
  };
  const toggleRolEstado = (id) => {
    setRoles(roles.map((r) =>
      r.id === id ? { ...r, estado: r.estado === "activo" ? "inactivo" : "activo" } : r
    ));
  };
  const toggleNotif = (key) => {
    setNotificaciones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGuardarCambios = async () => {
    try {
      await saveConfig(buildConfigBody(institucion, null, null));
      setSavedInstitucion({ ...institucion });
      addToast("Ajustes institucionales guardados correctamente.", "success");
    } catch {
      addToast("Error al guardar los ajustes institucionales.", "error");
    }
  };
  const handleCancelarInstitucion = () => {
    setInstitucion({ ...savedInstitucion });
    addToast("Cambios descartados.", "info");
  };

  const handleAplicarTolerancia = async () => {
    try {
      await saveConfig(buildConfigBody(null, tolerancia, null));
      setSavedTolerancia({ ...tolerancia });
      addToast(`Tolerancia aplicada: entrada ${tolerancia.entrada} min, salida ${tolerancia.salida} min.`, "success");
    } catch {
      addToast("Error al guardar la tolerancia.", "error");
    }
  };
  const handleRestablecerTolerancia = () => {
    setTolerancia({ ...savedTolerancia });
    addToast("Tolerancia restablecida a los valores guardados.", "info");
  };

  // ── GUARDAR HORARIO (work_days) ── ✅ Sin duracion_bloque
  const handleGuardarHorario = async () => {
    try {
      const updates = Object.entries(horarioPorDia).map(([idx, dia]) => {
        if (dia.id) {
          // Registro existente → PUT
          return fetch(`${API}/work-days/${dia.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre:      DIAS_SEMANA[idx],
              dia:         Number(idx),
              hora_inicio: dia.inicio,
              hora_fin:    dia.fin,
              activo:      dia.activo,
            }),
          }).then((res) => {
            if (!res.ok) throw new Error(`Error actualizando día ${idx}`);
            return res.json();
          });
        }
        // Sin id → POST
        return fetch(`${API}/work-days`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre:      DIAS_SEMANA[idx],
            dia:         Number(idx),
            hora_inicio: dia.inicio,
            hora_fin:    dia.fin,
            activo:      dia.activo,
          }),
        }).then((res) => {
          if (!res.ok) throw new Error(`Error creando día ${idx}`);
          return res.json();
        }).then((created) => {
          setHorarioPorDia((prev) => ({
            ...prev,
            [idx]: { ...prev[idx], id: created.id },
          }));
        });
      });

      await Promise.all(updates);
      setSavedHorario(JSON.parse(JSON.stringify(horarioPorDia)));
      const activos = DIAS_SEMANA.filter((_, i) => horarioPorDia[i].activo).join(", ");
      addToast(`Horario guardado. Días activos: ${activos || "ninguno"}.`, "success");
    } catch {
      addToast("Error al guardar el horario.", "error");
    }
  };
  const handleCancelarHorario = () => {
    setHorarioPorDia(JSON.parse(JSON.stringify(savedHorario)));
    addToast("Cambios de horario descartados.", "info");
  };

  const handleNuevoRol = () => setShowModalRol(true);
  const handleGuardarRol = ({ nombre, permisos }) => {
    const nuevoRol = { id: Date.now(), nombre: nombre.trim(), permisos, usuarios: 0, estado: "activo" };
    setRoles((prev) => [...prev, nuevoRol]);
    setShowModalRol(false);
    addToast(`Rol "${nombre.trim()}" creado con permisos: ${permisos}.`, "success");
  };

  const handleGuardarPreferencias = async () => {
    try {
      await saveConfig(buildConfigBody(null, null, notificaciones));
      setSavedNotificaciones({ ...notificaciones });
      const activas = Object.values(notificaciones).filter(Boolean).length;
      addToast(`Preferencias guardadas. ${activas} notificaciones activas.`, "success");
    } catch {
      addToast("Error al guardar las preferencias.", "error");
    }
  };
  const handleRestablecerPreferencias = () => {
    setNotificaciones({ ...savedNotificaciones });
    addToast("Preferencias restablecidas.", "info");
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <div style={styles.wrapper}>
      <Toast toasts={toasts} />
      {showModalRol && (
        <ModalNuevoRol
          onClose={() => setShowModalRol(false)}
          onGuardar={handleGuardarRol}
        />
      )}

      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Configuración del Sistema</h1>
        <p style={styles.headerSubtitle}>
          Administre los parámetros globales de operación institucional.
        </p>
      </header>

      {/* ══ SECCIÓN 1 & 2 ══ */}
      <div style={{ ...styles.grid, marginBottom: "1.5rem" }}>

        <SectionCard icon="🏛️" title="Ajustes Institucionales" desc="Datos generales y configuración de la institución" color="#3b82f6">
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nombre de la institución</label>
            <input style={styles.input} value={institucion.nombre}
              onChange={(e) => setInstitucion({ ...institucion, nombre: e.target.value })} />
          </div>
          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Código institucional</label>
              <input style={styles.input} value={institucion.codigo}
                onChange={(e) => setInstitucion({ ...institucion, codigo: e.target.value })} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Idioma</label>
              <select style={styles.select} value={institucion.idioma}
                onChange={(e) => setInstitucion({ ...institucion, idioma: e.target.value })}>
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Zona horaria</label>
            <select style={styles.select} value={institucion.zona}
              onChange={(e) => setInstitucion({ ...institucion, zona: e.target.value })}>
              <option value="America/Mexico_City">America/Mexico_City (UTC-6)</option>
              <option value="America/Bogota">America/Bogota (UTC-5)</option>
              <option value="America/Buenos_Aires">America/Buenos_Aires (UTC-3)</option>
              <option value="America/Lima">America/Lima (UTC-5)</option>
            </select>
          </div>
          <div style={styles.btnActions}>
            <button style={styles.btnSecondary} onClick={handleCancelarInstitucion}>Cancelar</button>
            <button style={styles.btnPrimary} onClick={handleGuardarCambios}>Guardar cambios</button>
          </div>
        </SectionCard>

        <SectionCard icon="⏱️" title="Configuración de Tolerancia" desc="Límites de tiempo y ausencias permitidas" color="#f59e0b">
          <div style={styles.sliderWrapper}>
            <div style={styles.sliderRow}>
              <label style={{ ...styles.label, margin: 0 }}>Tolerancia de entrada</label>
              <span style={styles.sliderValue}>{tolerancia.entrada} min</span>
            </div>
            <input type="range" min={0} max={30} step={1} style={styles.slider}
              value={tolerancia.entrada}
              onChange={(e) => setTolerancia({ ...tolerancia, entrada: Number(e.target.value) })} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#475569" }}>
              <span>0 min</span><span>30 min</span>
            </div>
          </div>

          <div style={styles.sliderWrapper}>
            <div style={styles.sliderRow}>
              <label style={{ ...styles.label, margin: 0 }}>Tolerancia de salida anticipada</label>
              <span style={styles.sliderValue}>{tolerancia.salida} min</span>
            </div>
            <input type="range" min={0} max={20} step={1} style={styles.slider}
              value={tolerancia.salida}
              onChange={(e) => setTolerancia({ ...tolerancia, salida: Number(e.target.value) })} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#475569" }}>
              <span>0 min</span><span>20 min</span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Inasistencias permitidas por período</label>
            <select style={styles.select} value={tolerancia.inasistencias}
              onChange={(e) => setTolerancia({ ...tolerancia, inasistencias: Number(e.target.value) })}>
              {[1,2,3,4,5,6].map((n) => (
                <option key={n} value={n}>{n} inasistencia{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <div style={{
            background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "8px", padding: "0.75rem 1rem",
            display: "flex", gap: "0.5rem", alignItems: "flex-start",
          }}>
            <span>⚠️</span>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#92400e", lineHeight: "1.4" }}>
              Los cambios en tolerancia afectarán los registros futuros. Los datos históricos no se modificarán.
            </p>
          </div>

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary} onClick={handleRestablecerTolerancia}>Restablecer</button>
            <button style={styles.btnPrimary} onClick={handleAplicarTolerancia}>Aplicar</button>
          </div>
        </SectionCard>
      </div>

      {/* ══ SECCIÓN 3: Horario Base ══ */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SectionCard icon="📅" title="Horario Base" desc="Define el horario de operación para cada día de la semana" color="#10b981">
          <p style={{ ...styles.label, marginBottom: "0.75rem" }}>Selecciona un día para configurar su horario</p>
          <div style={styles.scheduleGrid}>
            {DIAS_SEMANA.map((dia, idx) => (
              <div key={dia} onClick={() => setDiaSeleccionado(idx)}
                style={{
                  ...styles.dayCell,
                  ...(horarioPorDia[idx].activo ? styles.dayCellActive : styles.dayCellInactive),
                  outline: diaSeleccionado === idx ? "2px solid #10b981" : "none",
                  outlineOffset: "2px",
                }}>
                <div>{dia}</div>
                <div style={{ fontSize: "0.65rem", marginTop: "0.2rem", opacity: 0.7 }}>
                  {horarioPorDia[idx].activo ? "✓" : "—"}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={{
            background: horarioPorDia[diaSeleccionado].activo ? "rgba(16,185,129,0.05)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${horarioPorDia[diaSeleccionado].activo ? "rgba(16,185,129,0.2)" : "rgba(0,0,0,0.08)"}`,
            borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ margin: 0, fontWeight: "600", fontSize: "0.95rem", color: "#1f2937" }}>
                {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"][diaSeleccionado]}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                  {horarioPorDia[diaSeleccionado].activo ? "Activo" : "Inactivo"}
                </span>
                <Toggle checked={horarioPorDia[diaSeleccionado].activo} onChange={() => toggleDia(diaSeleccionado)} />
              </div>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
              opacity: horarioPorDia[diaSeleccionado].activo ? 1 : 0.4,
              pointerEvents: horarioPorDia[diaSeleccionado].activo ? "auto" : "none",
            }}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Hora de inicio</label>
                <input type="time" style={styles.input}
                  value={horarioPorDia[diaSeleccionado].inicio}
                  onChange={(e) => actualizarHorarioDia(diaSeleccionado, "inicio", e.target.value)} />
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Hora de cierre</label>
                <input type="time" style={styles.input}
                  value={horarioPorDia[diaSeleccionado].fin}
                  onChange={(e) => actualizarHorarioDia(diaSeleccionado, "fin", e.target.value)} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ ...styles.label, marginBottom: "0.5rem" }}>Resumen semanal</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {DIAS_SEMANA.map((dia, idx) => (
                horarioPorDia[idx].activo && (
                  <div key={idx} onClick={() => setDiaSeleccionado(idx)} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: "0.82rem", padding: "0.35rem 0.6rem",
                    background: diaSeleccionado === idx ? "rgba(16,185,129,0.08)" : "transparent",
                    borderRadius: "6px", cursor: "pointer",
                  }}>
                    <span style={{ color: "#374151", fontWeight: diaSeleccionado === idx ? "600" : "400" }}>
                      {["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"][idx]}
                    </span>
                    <span style={{ color: "#6b7280" }}>
                      {horarioPorDia[idx].inicio} – {horarioPorDia[idx].fin}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary} onClick={handleCancelarHorario}>Cancelar</button>
            <button style={styles.btnPrimary} onClick={handleGuardarHorario}>Guardar horario</button>
          </div>
        </SectionCard>
      </div>

      {/* ══ SECCIÓN 4 & 5 ══ */}
      <div style={styles.grid}>

        <SectionCard icon="🔑" title="Gestión de Roles" desc="Administre los roles y permisos del sistema" color="#8b5cf6">
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rol</th>
                <th style={styles.th}>Permisos</th>
                <th style={styles.th}>Usuarios</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((rol) => (
                <tr key={rol.id}>
                  <td style={styles.td}><span style={{ fontWeight: "600", color: "#1f2937" }}>{rol.nombre}</span></td>
                  <td style={styles.td}><RolBadge permisos={rol.permisos} /></td>
                  <td style={styles.td}><span style={{ color: "#374151" }}>{rol.usuarios}</span></td>
                  <td style={styles.td}>
                    {rol.estado === "activo"
                      ? <span style={styles.badgeActive}>Activo</span>
                      : <span style={styles.badgeInactive}>Inactivo</span>}
                  </td>
                  <td style={styles.td}>
                    <button style={styles.btnDanger} onClick={() => toggleRolEstado(rol.id)}>
                      {rol.estado === "activo" ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.btnActions}>
            <button style={styles.btnPrimary} onClick={handleNuevoRol}>+ Nuevo rol</button>
          </div>
        </SectionCard>

        <SectionCard icon="🔔" title="Preferencias de Notificación" desc="Configure qué alertas y notificaciones desea recibir" color="#ec4899">
          {[
            { key: "emailAsistencia", label: "Notificaciones de asistencia", sub: "Email al registrar una asistencia" },
            { key: "emailReportes",   label: "Reportes periódicos",          sub: "Resúmenes semanales por correo" },
            { key: "pushAlertas",     label: "Alertas push",                 sub: "Notificaciones en el navegador" },
            { key: "resumenDiario",   label: "Resumen diario",               sub: "Email con el resumen del día" },
            { key: "alertasFaltas",   label: "Alertas por faltas excesivas", sub: "Notificar al superar el límite" },
            { key: "notifDocentes",   label: "Notificar a docentes",         sub: "Avisar al docente sobre ausencias" },
          ].map(({ key, label, sub }) => (
            <div key={key} style={styles.toggleRow}>
              <div>
                <div style={styles.toggleLabel}>{label}</div>
                <div style={styles.toggleSub}>{sub}</div>
              </div>
              <Toggle checked={notificaciones[key]} onChange={() => toggleNotif(key)} />
            </div>
          ))}
          <div style={styles.btnActions}>
            <button style={styles.btnSecondary} onClick={handleRestablecerPreferencias}>Restablecer</button>
            <button style={styles.btnPrimary} onClick={handleGuardarPreferencias}>Guardar preferencias</button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}