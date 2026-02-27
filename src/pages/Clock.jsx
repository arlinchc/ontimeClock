import { useState, useEffect } from "react";

const IMPORTANT_MESSAGES = [
  "📢 Reunión de facultad: Lunes 10:00 AM — Sala de Juntas",
  "⚠️ Mantenimiento del sistema: Viernes 11 PM - 1 AM",
  "📅 Período de evaluaciones: 26 - 30 de Mayo",
  "🎓 Ceremonia de graduación: 15 de Junio, 11:00 AM",
];

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [lastAction, setLastAction] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [showAllMsgs, setShowAllMsgs] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotateMsg = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % IMPORTANT_MESSAGES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(rotateMsg);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getHourDegrees = () => (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const getMinuteDegrees = () => time.getMinutes() * 6 + time.getSeconds() * 0.1;
  const getSecondDegrees = () => time.getSeconds() * 6;

  const handleAction = (type) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setLastAction(type);
    setActionMessage(
      type === "entrada"
        ? `✅ Entrada registrada — ${timeStr}`
        : `🔴 Salida aplicada — ${timeStr}`
    );
    setShowMessage(true);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    setTimeout(() => setShowMessage(false), 4000);
  };

  const dateStr = formatDate(time);
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <div style={styles.root}>
      {/* Background grid pattern */}
      <div style={styles.gridPattern} />

      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>🎓</div>
          <div>
            <div style={styles.logoTitle}>Sistema de Control</div>
            <div style={styles.logoSub}>Universidad — Asistencia Docente</div>
          </div>
        </div>

        {/* Important messages box */}
        <div style={{ ...styles.msgBox, cursor: "pointer" }} onClick={() => setShowAllMsgs(true)}>
          <div style={styles.msgHeader}>
            <span style={styles.msgDot} />
            <span style={styles.msgLabel}>AVISOS IMPORTANTES</span>
            <span style={styles.msgViewAll}>Ver todos →</span>
          </div>
          <div
            style={{
              ...styles.msgText,
              opacity: fade ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {IMPORTANT_MESSAGES[msgIndex]}
          </div>
          <div style={styles.msgDots}>
            {IMPORTANT_MESSAGES.map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.dotIndicator,
                  background: i === msgIndex ? "#f0c02f" : "rgba(240,192,47,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main clock area */}
      <div style={styles.centerArea}>
        {/* Analog clock */}
        <div style={{ ...styles.clockRing, ...(pulse ? styles.clockRingPulse : {}) }}>
          <div style={styles.clockFace}>
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                style={{
                  ...styles.hourMarker,
                  transform: `rotate(${i * 30}deg)`,
                }}
              >
                <div
                  style={{
                    ...styles.markerTick,
                    height: i % 3 === 0 ? "14px" : "7px",
                    background: i % 3 === 0 ? "#f0c02f" : "rgba(240,192,47,0.4)",
                  }}
                />
              </div>
            ))}

            {/* Hour numbers */}
            {[12, 3, 6, 9].map((num, i) => {
              const angle = i * 90 - 90;
              const rad = (angle * Math.PI) / 180;
              const r = 53;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              return (
                <div
                  key={num}
                  style={{
                    ...styles.hourNum,
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {num}
                </div>
              );
            })}

            {/* Hour hand */}
            <div
              style={{
                ...styles.hand,
                ...styles.hourHand,
                transform: `translateX(-50%) rotate(${getHourDegrees()}deg)`,
              }}
            />
            {/* Minute hand */}
            <div
              style={{
                ...styles.hand,
                ...styles.minuteHand,
                transform: `translateX(-50%) rotate(${getMinuteDegrees()}deg)`,
              }}
            />
            {/* Second hand */}
            <div
              style={{
                ...styles.hand,
                ...styles.secondHand,
                transform: `translateX(-50%) rotate(${getSecondDegrees()}deg)`,
              }}
            />
            {/* Center dot */}
            <div style={styles.centerDot} />
          </div>
        </div>

        {/* Digital time */}
        <div style={styles.digitalTime}>{formatTime(time)}</div>
        <div style={styles.dateText}>{capitalizedDate}</div>

        {/* Action feedback */}
        <div
          style={{
            ...styles.feedbackBanner,
            opacity: showMessage ? 1 : 0,
            transform: showMessage ? "translateY(0) scale(1)" : "translateY(10px) scale(0.97)",
            pointerEvents: showMessage ? "auto" : "none",
          }}
        >
          <span style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.03em" }}>
            {actionMessage}
          </span>
        </div>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button
            style={styles.btnEntrada}
            onClick={() => handleAction("entrada")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(240,192,47,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(240,192,47,0.25)";
            }}
          >
            <span style={styles.btnIcon}>▶</span>
            ENTRADA
          </button>

          <button
            style={styles.btnSalida}
            onClick={() => handleAction("salida")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,80,80,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,80,80,0.2)";
            }}
          >
            <span style={styles.btnIcon}>■</span>
            SALIDA
          </button>
        </div>

        {lastAction && (
          <div style={styles.lastActionInfo}>
            Último registro:{" "}
            <span style={{ color: "#f0c02f", fontWeight: 600 }}>
              {lastAction === "entrada" ? "Entrada" : "Salida"}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>
          © {time.getFullYear()} — Sistema de Asistencia Universitaria
        </span>
      </div>

      {/* All messages modal */}
      {showAllMsgs && (
        <div style={styles.modalOverlay} onClick={() => setShowAllMsgs(false)}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitleRow}>
                <span style={styles.msgDot} />
                <span style={styles.modalTitle}>TABLERO DE AVISOS</span>
              </div>
              <button style={styles.modalClose} onClick={() => setShowAllMsgs(false)}>✕</button>
            </div>
            <div style={styles.modalList}>
              {IMPORTANT_MESSAGES.map((msg, i) => (
                <div key={i} style={styles.modalItem}>
                  <div style={styles.modalItemNum}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={styles.modalItemText}>{msg}</div>
                </div>
              ))}
            </div>
            <div style={styles.modalFooter}>
              {IMPORTANT_MESSAGES.length} avisos activos
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#1a1a32",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Segoe UI', 'Trebuchet MS', sans-serif",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  },
  gridPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(240,192,47,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240,192,47,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  topBar: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "24px 32px 0",
    boxSizing: "border-box",
    zIndex: 1,
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIcon: {
    fontSize: "2rem",
    lineHeight: 1,
  },
  logoTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#f0c02f",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  logoSub: {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.05em",
    marginTop: "2px",
  },
  msgBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(240,192,47,0.25)",
    borderRadius: "12px",
    padding: "14px 18px",
    maxWidth: "360px",
    minWidth: "280px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  },
  msgHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  msgDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#f0c02f",
    boxShadow: "0 0 8px #f0c02f",
    animation: "none",
    display: "inline-block",
  },
  msgLabel: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#f0c02f",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  msgText: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.5,
    minHeight: "38px",
  },
  msgDots: {
    display: "flex",
    gap: "5px",
    marginTop: "10px",
  },
  dotIndicator: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    transition: "background 0.3s",
  },
  centerArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    paddingBottom: "20px",
    gap: "0px",
  },
  clockRing: {
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(240,192,47,0.12), rgba(26,26,50,0.8))",
    border: "3px solid rgba(240,192,47,0.35)",
    boxShadow: `
      0 0 0 1px rgba(240,192,47,0.1),
      0 0 40px rgba(240,192,47,0.1),
      inset 0 0 60px rgba(26,26,50,0.6)
    `,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "box-shadow 0.3s ease",
    marginBottom: "24px",
  },
  clockRingPulse: {
    boxShadow: `
      0 0 0 4px rgba(240,192,47,0.3),
      0 0 60px rgba(240,192,47,0.3),
      inset 0 0 60px rgba(26,26,50,0.6)
    `,
  },
  clockFace: {
    width: "230px",
    height: "230px",
    borderRadius: "50%",
    background: "radial-gradient(circle at 40% 35%, #23234a, #1a1a32 70%)",
    position: "relative",
    border: "1px solid rgba(240,192,47,0.15)",
  },
  hourMarker: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "2px",
    height: "115px",
    marginLeft: "-1px",
    transformOrigin: "top center",
    display: "flex",
    justifyContent: "center",
  },
  markerTick: {
    width: "2px",
    borderRadius: "1px",
    position: "absolute",
    top: "6px",
  },
  hourNum: {
    position: "absolute",
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "rgba(240,192,47,0.7)",
    letterSpacing: "0.02em",
  },
  hand: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    transformOrigin: "bottom center",
    borderRadius: "4px",
  },
  hourHand: {
    width: "5px",
    height: "62px",
    background: "linear-gradient(to top, #f0c02f, rgba(240,192,47,0.6))",
    marginLeft: "-2.5px",
    boxShadow: "0 0 6px rgba(240,192,47,0.5)",
  },
  minuteHand: {
    width: "3px",
    height: "85px",
    background: "linear-gradient(to top, #fff, rgba(255,255,255,0.5))",
    marginLeft: "-1.5px",
    boxShadow: "0 0 4px rgba(255,255,255,0.3)",
  },
  secondHand: {
    width: "1.5px",
    height: "95px",
    background: "linear-gradient(to top, #f0c02f, #ff6060)",
    marginLeft: "-0.75px",
    boxShadow: "0 0 4px rgba(255,96,96,0.6)",
  },
  centerDot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#f0c02f",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 0 10px rgba(240,192,47,0.8)",
    zIndex: 10,
  },
  digitalTime: {
    fontSize: "3.8rem",
    fontWeight: 300,
    letterSpacing: "0.06em",
    color: "#ffffff",
    fontVariantNumeric: "tabular-nums",
    textShadow: "0 0 30px rgba(240,192,47,0.3)",
    lineHeight: 1,
    marginBottom: "8px",
  },
  dateText: {
    fontSize: "0.9rem",
    color: "rgba(240,192,47,0.75)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "28px",
  },
  feedbackBanner: {
    background: "rgba(240,192,47,0.12)",
    border: "1px solid rgba(240,192,47,0.4)",
    borderRadius: "10px",
    padding: "12px 28px",
    color: "#fff",
    marginBottom: "20px",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    backdropFilter: "blur(8px)",
    minHeight: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "320px",
  },
  buttonRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "16px",
  },
  btnEntrada: {
    padding: "16px 44px",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    background: "#f0c02f",
    color: "#1a1a32",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(240,192,47,0.25)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textTransform: "uppercase",
  },
  btnSalida: {
    padding: "16px 44px",
    fontSize: "0.9rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    background: "transparent",
    color: "#fff",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(255,80,80,0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textTransform: "uppercase",
  },
  btnIcon: {
    fontSize: "0.75rem",
  },
  lastActionInfo: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.05em",
  },
  footer: {
    padding: "16px",
    zIndex: 1,
  },
  footerText: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  msgViewAll: {
    marginLeft: "auto",
    fontSize: "0.62rem",
    color: "rgba(240,192,47,0.55)",
    letterSpacing: "0.06em",
    fontWeight: 600,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(10,10,25,0.75)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalBox: {
    background: "#1e1e3a",
    border: "1px solid rgba(240,192,47,0.3)",
    borderRadius: "16px",
    width: "480px",
    maxWidth: "90vw",
    boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(240,192,47,0.1)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 22px",
    borderBottom: "1px solid rgba(240,192,47,0.15)",
    background: "rgba(240,192,47,0.05)",
  },
  modalTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  modalTitle: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#f0c02f",
    letterSpacing: "0.14em",
  },
  modalClose: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "6px",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontSize: "0.85rem",
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  modalList: {
    padding: "12px 0",
  },
  modalItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "14px",
    padding: "14px 22px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.2s",
  },
  modalItemNum: {
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "rgba(240,192,47,0.45)",
    letterSpacing: "0.08em",
    paddingTop: "2px",
    minWidth: "22px",
  },
  modalItemText: {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.55,
  },
  modalFooter: {
    padding: "12px 22px",
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.25)",
    letterSpacing: "0.06em",
    borderTop: "1px solid rgba(240,192,47,0.1)",
    textAlign: "right",
  },
};
