import {
  ClockIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  CodeBracketIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";

const tech = [
  { icon: CodeBracketIcon, name: "React", desc: "Interfaz de usuario", color: "#60a5fa" },
  { icon: ServerStackIcon, name: "Node.js + Express", desc: "Backend REST API", color: "#34d399" },
  { icon: ShieldCheckIcon, name: "PostgreSQL", desc: "Base de datos relacional", color: "#a78bfa" },
  { icon: ChartBarIcon, name: "Tailwind CSS", desc: "Estilos utilitarios", color: "#f0c02f" },
];

const features = [
  { icon: ClockIcon, text: "Registro de entradas y salidas en tiempo real" },
  { icon: UserGroupIcon, text: "Gestión completa del catálogo de docentes" },
  { icon: ChartBarIcon, text: "Reportes de asistencia con filtros avanzados" },
  { icon: ShieldCheckIcon, text: "Configuración institucional y tolerancias" },
];

function About() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <ClockIcon style={{ width: 32, height: 32, color: "#f0c02f" }} />
        </div>
        <div>
          <h1 style={styles.title}>Acerca del Sistema</h1>
          <p style={styles.subtitle}>
            Reloj Checador es un sistema de control de asistencia docente desarrollado para la
            Universidad UNID. Permite registrar, consultar y analizar la asistencia del personal
            académico de forma simple y eficiente.
          </p>
        </div>
      </div>

      {/* Features */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Funcionalidades principales</h2>
        <div style={styles.featureGrid}>
          {features.map(({ icon: Icon, text }) => (
            <div key={text} style={styles.featureItem}>
              <Icon style={{ width: 20, height: 20, color: "#f0c02f", flexShrink: 0 }} />
              <span style={styles.featureText}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Tecnologías utilizadas</h2>
        <div style={styles.techGrid}>
          {tech.map(({ icon: Icon, name, desc, color }) => (
            <div key={name} style={styles.techCard}>
              <div style={{ ...styles.techIcon, background: color + "18", color }}>
                <Icon style={{ width: 22, height: 22 }} />
              </div>
              <div style={styles.techName}>{name}</div>
              <div style={styles.techDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Version */}
      <div style={styles.versionRow}>
        <span style={styles.versionText}>Versión 1.0.0</span>
        <span style={styles.versionDot} />
        <span style={styles.versionText}>Universidad UNID</span>
        <span style={styles.versionDot} />
        <span style={styles.versionText}>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "#1a1a32",
    borderRadius: 16,
    padding: "2rem",
    display: "flex",
    gap: "1.25rem",
    alignItems: "flex-start",
  },
  headerIcon: {
    background: "rgba(240,192,47,0.12)",
    borderRadius: 12,
    width: 60,
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: "#ffffff",
    margin: "0 0 0.5rem 0",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.55)",
    margin: 0,
    lineHeight: 1.7,
  },
  card: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 14,
    padding: "1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  sectionTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: "0 0 1rem 0",
  },
  featureGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.6rem 0.75rem",
    background: "#f9fafb",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.05)",
  },
  featureText: {
    fontSize: "0.88rem",
    color: "#374151",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "1rem",
  },
  techCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1.25rem 1rem",
    background: "#f9fafb",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  techIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  techName: {
    fontWeight: 700,
    fontSize: "0.88rem",
    color: "#1f2937",
  },
  techDesc: {
    fontSize: "0.78rem",
    color: "#6b7280",
  },
  versionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    paddingBottom: "0.5rem",
  },
  versionText: {
    fontSize: "0.78rem",
    color: "#9ca3af",
  },
  versionDot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#d1d5db",
  },
};

export default About;
