

import { useState } from "react";

// ─── Paleta de colores y estilos base (CSS-in-JS para no afectar estilos globales) ───
const styles = {
  // Layout principal
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
  moduleBadge: {
    display: "inline-block",
    background: "rgba(59,130,246,0.1)",
    border: "1px solid rgba(59,130,246,0.3)",
    color: "#1e40af",
    fontSize: "0.75rem",
    padding: "0.2rem 0.75rem",
    borderRadius: "999px",
    marginBottom: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  // Grid de secciones
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
    gap: "1.5rem",
  },
  gridFull: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1.5rem",
  },

  // Cards
  card: {
    background: "#f9fafb",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: "16px",
    padding: "1.75rem",
    backdropFilter: "blur(12px)",
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
    marginBottom: "1.25rem",
    margin: "0 0 1.25rem 0",
  },

  // Formularios
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
  fieldGroup: {
    marginBottom: "1rem",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },

  // Botones
  btnPrimary: {
    background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.55rem 1.4rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "opacity 0.2s, transform 0.1s",
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
    transition: "background 0.2s",
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

  // Slider
  sliderWrapper: {
    marginBottom: "1rem",
  },
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
  slider: {
    width: "100%",
    accentColor: "#3b82f6",
    cursor: "pointer",
  },

  // Tabla de roles
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.88rem",
  },
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

  // Badges de estado
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

  // Toggle switch
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.7rem 0",
    borderBottom: "1px solid rgba(0,0,0,0.05)",
  },
  toggleLabel: {
    fontSize: "0.88rem",
    color: "#1f2937",
  },
  toggleSub: {
    fontSize: "0.78rem",
    color: "#9ca3af",
    marginTop: "0.1rem",
  },

  // Horario
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

  // Divider
  divider: {
    borderTop: "1px solid rgba(0,0,0,0.06)",
    margin: "1.25rem 0",
  },

  // Icono decorativo en card header
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

// ─── Datos mock ─────────────────────────────────────────────────────────────────

const MOCK_ROLES = [
  { id: 1, nombre: "Administrador", permisos: "Total", usuarios: 3, estado: "activo" },
  { id: 2, nombre: "Coordinador", permisos: "Parcial", usuarios: 8, estado: "activo" },
  { id: 3, nombre: "Docente", permisos: "Lectura", usuarios: 42, estado: "activo" },
  { id: 4, nombre: "Auxiliar", permisos: "Limitado", usuarios: 12, estado: "inactivo" },
];

const DIAS_SEMANA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// ─── Subcomponente: Toggle ────────────────────────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "42px",
        height: "22px",
        borderRadius: "999px",
        background: checked ? "rgba(59,130,246,0.8)" : "rgba(209,213,219,0.8)",
        border: checked ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(0,0,0,0.12)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "21px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
}

// ─── Subcomponente: SectionCard ────────────────────────────────────────────────

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

// ─── Subcomponente: Badge de rol ───────────────────────────────────────────────

function RolBadge({ permisos }) {
  if (permisos === "Total") return <span style={styles.badgeAdmin}>{permisos}</span>;
  if (permisos === "Parcial") return <span style={{ ...styles.badgeActive }}>{permisos}</span>;
  return <span style={styles.badgeInactive}>{permisos}</span>;
}

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────

export default function SystemConfig() {

  // --- Estado: Ajustes Institucionales ---
  const [institucion, setInstitucion] = useState({
    nombre: "Instituto Tecnológico Nacional",
    codigo: "ITN-2024",
    zona: "America/Mexico_City",
    idioma: "es",
  });

  // --- Estado: Tolerancia ---
  const [tolerancia, setTolerancia] = useState({
    entrada: 10,
    salida: 5,
    inasistencias: 3,
  });

  // --- Estado: Horario base ---
  const [diasActivos, setDiasActivos] = useState([true, true, true, true, true, false, false]);
  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFin, setHoraFin] = useState("18:00");
  const [duracionBloque, setDuracionBloque] = useState("60");

  // --- Estado: Roles ---
  const [roles, setRoles] = useState(MOCK_ROLES);

  // --- Estado: Notificaciones ---
  const [notificaciones, setNotificaciones] = useState({
    emailAsistencia: true,
    emailReportes: true,
    pushAlertas: false,
    resumenDiario: true,
    alertasFaltas: true,
    notifDocentes: false,
  });

  // --- Handlers ---
  const toggleDia = (idx) => {
    const copia = [...diasActivos];
    copia[idx] = !copia[idx];
    setDiasActivos(copia);
  };

  const toggleRolEstado = (id) => {
    setRoles(roles.map((r) =>
      r.id === id ? { ...r, estado: r.estado === "activo" ? "inactivo" : "activo" } : r
    ));
  };

  const toggleNotif = (key) => {
    setNotificaciones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div style={styles.wrapper}>

      {/* ── Encabezado del módulo ── */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Configuración del Sistema</h1>
        <p style={styles.headerSubtitle}>
          Administre los parámetros globales de operación institucional.
        </p>
      </header>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 1 & 2: Ajustes Institucionales + Tolerancia
      ══════════════════════════════════════════════════════ */}
      <div style={{ ...styles.grid, marginBottom: "1.5rem" }}>

        {/* ── 1. Ajustes Institucionales ── */}
        <SectionCard
          icon="🏛️"
          title="Ajustes Institucionales"
          desc="Datos generales y configuración de la institución"
          color="#3b82f6"
        >
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nombre de la institución</label>
            <input
              style={styles.input}
              value={institucion.nombre}
              onChange={(e) => setInstitucion({ ...institucion, nombre: e.target.value })}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Código institucional</label>
              <input
                style={styles.input}
                value={institucion.codigo}
                onChange={(e) => setInstitucion({ ...institucion, codigo: e.target.value })}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Idioma</label>
              <select
                style={styles.select}
                value={institucion.idioma}
                onChange={(e) => setInstitucion({ ...institucion, idioma: e.target.value })}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Zona horaria</label>
            <select
              style={styles.select}
              value={institucion.zona}
              onChange={(e) => setInstitucion({ ...institucion, zona: e.target.value })}
            >
              <option value="America/Mexico_City">America/Mexico_City (UTC-6)</option>
              <option value="America/Bogota">America/Bogota (UTC-5)</option>
              <option value="America/Buenos_Aires">America/Buenos_Aires (UTC-3)</option>
              <option value="America/Lima">America/Lima (UTC-5)</option>
            </select>
          </div>

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary}>Cancelar</button>
            <button style={styles.btnPrimary}>Guardar cambios</button>
          </div>
        </SectionCard>

        {/* ── 2. Configuración de Tolerancia ── */}
        <SectionCard
          icon="⏱️"
          title="Configuración de Tolerancia"
          desc="Límites de tiempo y ausencias permitidas"
          color="#f59e0b"
        >
          {/* Slider: tolerancia de entrada */}
          <div style={styles.sliderWrapper}>
            <div style={styles.sliderRow}>
              <label style={{ ...styles.label, margin: 0 }}>Tolerancia de entrada</label>
              <span style={styles.sliderValue}>{tolerancia.entrada} min</span>
            </div>
            <input
              type="range" min={0} max={30} step={1}
              value={tolerancia.entrada}
              onChange={(e) => setTolerancia({ ...tolerancia, entrada: Number(e.target.value) })}
              style={styles.slider}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#475569" }}>
              <span>0 min</span><span>30 min</span>
            </div>
          </div>

          {/* Slider: tolerancia de salida */}
          <div style={styles.sliderWrapper}>
            <div style={styles.sliderRow}>
              <label style={{ ...styles.label, margin: 0 }}>Tolerancia de salida anticipada</label>
              <span style={styles.sliderValue}>{tolerancia.salida} min</span>
            </div>
            <input
              type="range" min={0} max={20} step={1}
              value={tolerancia.salida}
              onChange={(e) => setTolerancia({ ...tolerancia, salida: Number(e.target.value) })}
              style={styles.slider}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#475569" }}>
              <span>0 min</span><span>20 min</span>
            </div>
          </div>

          <div style={styles.divider} />

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Inasistencias permitidas por período</label>
            <select
              style={styles.select}
              value={tolerancia.inasistencias}
              onChange={(e) => setTolerancia({ ...tolerancia, inasistencias: Number(e.target.value) })}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} inasistencia{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          {/* Indicador visual */}
          <div style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            display: "flex",
            gap: "0.5rem",
            alignItems: "flex-start",
          }}>
            <span>⚠️</span>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#92400e", lineHeight: "1.4" }}>
              Los cambios en tolerancia afectarán los registros futuros. Los datos históricos no se modificarán.
            </p>
          </div>

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary}>Restablecer</button>
            <button style={styles.btnPrimary}>Aplicar</button>
          </div>
        </SectionCard>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 3: Horario Base
      ══════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SectionCard
          icon="📅"
          title="Horario Base"
          desc="Define los días y horas de operación del sistema"
          color="#10b981"
        >
          <p style={{ ...styles.label, marginBottom: "0.75rem" }}>Días laborables activos</p>
          <div style={styles.scheduleGrid}>
            {DIAS_SEMANA.map((dia, idx) => (
              <div
                key={dia}
                onClick={() => toggleDia(idx)}
                style={{
                  ...styles.dayCell,
                  ...(diasActivos[idx] ? styles.dayCellActive : styles.dayCellInactive),
                }}
              >
                <div>{dia}</div>
                <div style={{ fontSize: "0.65rem", marginTop: "0.2rem", opacity: 0.7 }}>
                  {diasActivos[idx] ? "✓" : "—"}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Hora de inicio</label>
              <input
                type="time"
                style={styles.input}
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Hora de cierre</label>
              <input
                type="time"
                style={styles.input}
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Duración de bloque</label>
              <select
                style={styles.select}
                value={duracionBloque}
                onChange={(e) => setDuracionBloque(e.target.value)}
              >
                <option value="45">45 minutos</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
                <option value="120">120 minutos</option>
              </select>
            </div>
          </div>

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary}>Cancelar</button>
            <button style={styles.btnPrimary}>Guardar horario</button>
          </div>
        </SectionCard>
      </div>

      {/* ══════════════════════════════════════════════════════
          SECCIÓN 4 & 5: Roles + Notificaciones
      ══════════════════════════════════════════════════════ */}
      <div style={styles.grid}>

        {/* ── 4. Gestión de Roles ── */}
        <SectionCard
          icon="🔑"
          title="Gestión de Roles"
          desc="Administre los roles y permisos del sistema"
          color="#8b5cf6"
        >
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
                  <td style={styles.td}>
                    <span style={{ fontWeight: "600", color: "#1f2937" }}>{rol.nombre}</span>
                  </td>
                  <td style={styles.td}>
                    <RolBadge permisos={rol.permisos} />
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: "#374151" }}>{rol.usuarios}</span>
                  </td>
                  <td style={styles.td}>
                    {rol.estado === "activo"
                      ? <span style={styles.badgeActive}>Activo</span>
                      : <span style={styles.badgeInactive}>Inactivo</span>
                    }
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.btnDanger}
                      onClick={() => toggleRolEstado(rol.id)}
                    >
                      {rol.estado === "activo" ? "Deshabilitar" : "Habilitar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.btnActions}>
            <button style={styles.btnPrimary}>+ Nuevo rol</button>
          </div>
        </SectionCard>

        {/* ── 5. Preferencias de Notificación ── */}
        <SectionCard
          icon="🔔"
          title="Preferencias de Notificación"
          desc="Configure qué alertas y notificaciones desea recibir"
          color="#ec4899"
        >
          {[
            { key: "emailAsistencia", label: "Notificaciones de asistencia", sub: "Email al registrar una asistencia" },
            { key: "emailReportes", label: "Reportes periódicos", sub: "Resúmenes semanales por correo" },
            { key: "pushAlertas", label: "Alertas push", sub: "Notificaciones en el navegador" },
            { key: "resumenDiario", label: "Resumen diario", sub: "Email con el resumen del día" },
            { key: "alertasFaltas", label: "Alertas por faltas excesivas", sub: "Notificar al superar el límite" },
            { key: "notifDocentes", label: "Notificar a docentes", sub: "Avisar al docente sobre ausencias" },
          ].map(({ key, label, sub }) => (
            <div key={key} style={styles.toggleRow}>
              <div>
                <div style={styles.toggleLabel}>{label}</div>
                <div style={styles.toggleSub}>{sub}</div>
              </div>
              <Toggle
                checked={notificaciones[key]}
                onChange={() => toggleNotif(key)}
              />
            </div>
          ))}

          <div style={styles.btnActions}>
            <button style={styles.btnSecondary}>Restablecer</button>
            <button style={styles.btnPrimary}>Guardar preferencias</button>
          </div>
        </SectionCard>
      </div>

     
    </div>
  );
}