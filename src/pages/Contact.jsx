import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

const info = [
  { icon: EnvelopeIcon, label: "Correo electrónico", value: "soporte@unid.edu.mx", color: "#60a5fa" },
  { icon: PhoneIcon, label: "Teléfono", value: "+52 (984) 123-4567", color: "#34d399" },
  { icon: MapPinIcon, label: "Dirección", value: "Av. Universidad 100, Chetumal, Q. Roo", color: "#f0c02f" },
  { icon: BuildingOffice2Icon, label: "Institución", value: "Universidad UNID — Campus Chetumal", color: "#a78bfa" },
];

function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) return;
    setSent(true);
    setForm({ nombre: "", email: "", mensaje: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <EnvelopeIcon style={{ width: 32, height: 32, color: "#f0c02f" }} />
        </div>
        <div>
          <h1 style={styles.title}>Contacto</h1>
          <p style={styles.subtitle}>
            ¿Tienes dudas o necesitas soporte técnico? Contáctanos por cualquiera de los siguientes medios o envíanos un mensaje.
          </p>
        </div>
      </div>

      <div style={styles.twoCol}>
        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {info.map(({ icon: Icon, label, value, color }) => (
            <div key={label} style={styles.infoCard}>
              <div style={{ ...styles.infoIcon, background: color + "18", color }}>
                <Icon style={{ width: 20, height: 20 }} />
              </div>
              <div>
                <div style={styles.infoLabel}>{label}</div>
                <div style={styles.infoValue}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Enviar mensaje</h2>
          {sent && (
            <div style={styles.successBanner}>
              <PaperAirplaneIcon style={{ width: 16, height: 16 }} />
              Mensaje enviado correctamente
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div>
              <label style={styles.label}>Nombre</label>
              <input
                style={styles.input}
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <label style={styles.label}>Correo electrónico</label>
              <input
                style={styles.input}
                type="email"
                placeholder="tu@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label style={styles.label}>Mensaje</label>
              <textarea
                style={{ ...styles.input, resize: "vertical", minHeight: 100 }}
                placeholder="Escribe tu mensaje aquí..."
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              />
            </div>
            <button type="submit" style={styles.btn}>
              <PaperAirplaneIcon style={{ width: 16, height: 16 }} />
              Enviar mensaje
            </button>
          </form>
        </div>
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
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: "1.25rem",
    alignItems: "start",
  },
  infoCard: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 12,
    padding: "0.9rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.85rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: "0.72rem",
    color: "#9ca3af",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: "0.88rem",
    color: "#1f2937",
    fontWeight: 500,
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
  label: {
    display: "block",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: 5,
    letterSpacing: "0.03em",
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.85rem",
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    fontSize: "0.88rem",
    color: "#1f2937",
    outline: "none",
    boxSizing: "border-box",
    background: "#f9fafb",
    fontFamily: "inherit",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    background: "#1a1a32",
    color: "#f0c02f",
    fontWeight: 700,
    fontSize: "0.875rem",
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.03em",
  },
  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(52,211,153,0.12)",
    border: "1px solid rgba(52,211,153,0.4)",
    color: "#059669",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
};

export default Contact;
