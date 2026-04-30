import {
  ClockIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const cards = [
  {
    icon: ClockIcon,
    title: "Reloj Checador",
    desc: "Registra entradas y salidas de docentes en tiempo real.",
    to: "/clock",
    color: "#f0c02f",
  },
  {
    icon: UserGroupIcon,
    title: "Gestión de Maestros",
    desc: "Administra el catálogo de docentes y su información.",
    to: "/teachers",
    color: "#60a5fa",
  },
  {
    icon: CalendarDaysIcon,
    title: "Horarios",
    desc: "Configura y consulta los horarios de clases por semana.",
    to: "/horarios",
    color: "#34d399",
  },
  {
    icon: DocumentChartBarIcon,
    title: "Reportes",
    desc: "Visualiza reportes de asistencia y estadísticas del sistema.",
    to: "/reports",
    color: "#a78bfa",
  },
];

function Home() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroBadge}>
          <CheckCircleIcon style={{ width: 14, height: 14 }} />
          Sistema activo
        </div>
        <h1 style={styles.heroTitle}>Sistema de Asistencia Docente</h1>
        <p style={styles.heroSub}>
          Controla, registra y analiza la asistencia de los docentes de forma rápida y confiable.
        </p>
        <Link to="/clock" style={styles.heroBtn}>
          Ir al Reloj Checador
          <ArrowRightIcon style={{ width: 16, height: 16 }} />
        </Link>
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        {cards.map(({ icon: Icon, title, desc, to, color }) => (
          <Link key={to} to={to} style={styles.card}>
            <div style={{ ...styles.cardIcon, background: color + "18", color }}>
              <Icon style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <div style={styles.cardTitle}>{title}</div>
              <div style={styles.cardDesc}>{desc}</div>
            </div>
            <ArrowRightIcon style={{ width: 16, height: 16, color: "#9ca3af", marginLeft: "auto", flexShrink: 0 }} />
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <p style={styles.footnote}>Universidad UNID · © {new Date().getFullYear()}</p>
    </div>
  );
}

const styles = {
  hero: {
    background: "#1a1a32",
    borderRadius: 16,
    padding: "2.5rem 2rem",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(240,192,47,0.15)",
    color: "#f0c02f",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "4px 12px",
    borderRadius: 999,
    width: "fit-content",
  },
  heroTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  heroSub: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.55)",
    margin: 0,
    lineHeight: 1.6,
    maxWidth: 480,
  },
  heroBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#f0c02f",
    color: "#1a1a32",
    fontWeight: 700,
    fontSize: "0.875rem",
    padding: "10px 20px",
    borderRadius: 10,
    textDecoration: "none",
    width: "fit-content",
    letterSpacing: "0.03em",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  card: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 14,
    padding: "1.25rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    textDecoration: "none",
    color: "#1f2937",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    transition: "box-shadow 0.2s, transform 0.2s",
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: "0.95rem",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: "0.82rem",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  footnote: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "#9ca3af",
    margin: 0,
  },
};

export default Home;
