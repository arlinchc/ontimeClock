import { useState, useEffect } from "react";

// ── Paleta oficial ──────────────────────────────────────────────
const C = {
  blue:       "#1a3a8f",
  blueMid:    "#2252c8",
  blueLight:  "#dde9ff",
  yellow:     "#f5c400",
  yellowSoft: "#fff8d6",
  white:      "#ffffff",
  bg:         "#f0f4ff",
  text:       "#0d1f4e",
  muted:      "#64748b",
};

// ── Mock data ───────────────────────────────────────────────────
const dailyData = [
  { hora: "7am",  asistencias: 4  },
  { hora: "8am",  asistencias: 12 },
  { hora: "9am",  asistencias: 18 },
  { hora: "10am", asistencias: 10 },
  { hora: "11am", asistencias: 7  },
  { hora: "12pm", asistencias: 5  },
  { hora: "1pm",  asistencias: 3  },
];

const monthlyData = [
  { mes: "Ene", asistencias: 92, faltas: 8  },
  { mes: "Feb", asistencias: 88, faltas: 12 },
  { mes: "Mar", asistencias: 95, faltas: 5  },
  { mes: "Abr", asistencias: 90, faltas: 10 },
  { mes: "May", asistencias: 85, faltas: 15 },
  { mes: "Jun", asistencias: 78, faltas: 22 },
];

const recentActivity = [
  { nombre: "Leydi Xequeb",   materia: "Matemáticas", hora: "08:02 AM", estado: "Entrada", tipo: "entrada" },
  { nombre: "Irvin Chan",     materia: "Programación", hora: "08:15 AM", estado: "Entrada", tipo: "entrada" },
  { nombre: "Marcos Riviera", materia: "Fe y Mundo",   hora: "09:05 AM", estado: "Retardo", tipo: "retardo" },
  { nombre: "Ana Pérez",      materia: "Inglés",       hora: "09:30 AM", estado: "Entrada", tipo: "entrada" },
  { nombre: "Luis Méndez",    materia: "Historia",     hora: "10:00 AM", estado: "Falta",   tipo: "falta"   },
];

const teachers = [
  { nombre: "Ana Pérez",      materia: "Inglés",       asistencia: 99, avatar: "AP" },
  { nombre: "Leydi Xequeb",   materia: "Matemáticas",  asistencia: 97, avatar: "LX" },
  { nombre: "Irvin Chan",     materia: "Programación", asistencia: 94, avatar: "IC" },
  { nombre: "Marcos Riviera", materia: "Fe y Mundo",   asistencia: 88, avatar: "MR" },
];

// ── Contador animado ────────────────────────────────────────────
function Counter({ target }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let v = 0;
    const step = target / 40;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(v));
    }, 28);
    return () => clearInterval(t);
  }, [target]);
  return <>{count}</>;
}

// ── Reloj digital ───────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center px-4 py-2 rounded-xl font-mono text-xl font-bold"
        style={{
          background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueMid} 100%)`,
          color: C.yellow,
          boxShadow: `0 4px 15px ${C.blue}40, inset 0 0 20px ${C.yellow}15`,
        }}
      >
        <span className="animate-pulse">{hours}</span>
        <span className="mx-1 animate-pulse">:</span>
        <span>{minutes}</span>
        <span className="mx-1 animate-pulse">:</span>
        <span className="text-sm">{seconds}</span>
      </div>
    </div>
  );
}

// ── Line chart SVG ──────────────────────────────────────────────
function LineChart({ data, valueKey, labelKey, height = 130 }) {
  const [hovered, setHovered] = useState(null);
  const W = 560, H = height - 24;
  const pad = { t: 16, r: 16, b: 8, l: 28 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d[valueKey]));
  const min = 0;

  const pts = data.map((d, i) => ({
    x: pad.l + (i / (data.length - 1)) * innerW,
    y: pad.t + (1 - (d[valueKey] - min) / (max - min)) * innerH,
    val: d[valueKey],
    label: d[labelKey],
  }));

  // Smooth polyline path
  const linePath = pts
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(" ");

  // Area fill path
  const areaPath =
    linePath +
    ` L ${pts[pts.length - 1].x},${pad.t + innerH} L ${pts[0].x},${pad.t + innerH} Z`;

  // Unique gradient id
  const gradId = "lineGrad";
  const areaId = "areaGrad";

  return (
    <div className="relative" style={{ height }}>
      <svg
        width="100%"
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={C.blueMid} />
            <stop offset="100%" stopColor={C.yellow}  />
          </linearGradient>
          <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={C.blueMid} stopOpacity="0.18" />
            <stop offset="100%" stopColor={C.blueMid} stopOpacity="0"    />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
          const y = pad.t + r * innerH;
          return (
            <line
              key={i}
              x1={pad.l} y1={y}
              x2={pad.l + innerW} y2={y}
              stroke={C.blueLight}
              strokeWidth="1"
            />
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill={`url(#${areaId})`} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points + hover */}
        {pts.map((p, i) => (
          <g key={i}>
            {/* Invisible hit area */}
            <rect
              x={p.x - 20} y={pad.t}
              width={40} height={innerH}
              fill="transparent"
              style={{ cursor: "crosshair" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />

            {/* Dot */}
            <circle
              cx={p.x} cy={p.y} r={hovered === i ? 7 : 4}
              fill={hovered === i ? C.yellow : C.white}
              stroke={hovered === i ? C.yellow : C.blueMid}
              strokeWidth={hovered === i ? 3 : 2}
              style={{ transition: "all 0.15s ease", filter: hovered === i ? `drop-shadow(0 0 6px ${C.yellow})` : "none" }}
            />

            {/* Tooltip */}
            {hovered === i && (
              <g>
                <rect
                  x={p.x - 18} y={p.y - 34}
                  width={36} height={22}
                  rx="6"
                  fill={C.yellow}
                />
                <text
                  x={p.x} y={p.y - 19}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="800"
                  fill={C.blue}
                >
                  {p.val}
                </text>
                {/* Vertical dashed line */}
                <line
                  x1={p.x} y1={p.y + 7}
                  x2={p.x} y2={pad.t + innerH}
                  stroke={C.yellow}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.6"
                />
              </g>
            )}

            {/* X label */}
            <text
              x={p.x} y={H - 2}
              textAnchor="middle"
              fontSize="10"
              fill={C.muted}
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Donut chart ─────────────────────────────────────────────────
function DonutChart({ percent, color, size = 72 }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 70 70">
      <circle cx="35" cy="35" r={r} fill="none" stroke={C.blueLight} strokeWidth="8" />
      <circle
        cx="35" cy="35" r={r}
        fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 35 35)"
        style={{ transition: "stroke-dasharray 1.2s ease" }}
      />
      <text x="35" y="39" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.text}>
        {percent}%
      </text>
    </svg>
  );
}

// ── KPI Card con hover ──────────────────────────────────────────
function KpiCard({ label, value, icon, sub, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="rounded-2xl p-5 relative overflow-hidden cursor-default"
      style={{
        background: hover
          ? `linear-gradient(135deg, ${C.blue} 0%, ${C.blueMid} 100%)`
          : C.white,
        border: `2px solid ${hover ? C.yellow : C.blueLight}`,
        boxShadow: hover
          ? `0 8px 32px ${C.blue}40`
          : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.25s ease",
      }}
    >
      <div
        className="absolute -top-5 -right-5 w-24 h-24 rounded-full"
        style={{
          background: hover ? `${C.yellow}20` : C.blueLight,
          transition: "all 0.25s",
        }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <p className="text-base font-semibold" style={{ color: hover ? C.yellow : C.muted }}>
            {label}
          </p>
          <span
            className="text-4xl p-1.5 rounded-xl"
            style={{
              background: hover ? `${C.yellow}25` : C.blueLight,
              transition: "all 0.25s",
            }}
          >
            {icon}
          </span>
        </div>
        <p className="text-5xl font-black mb-1" style={{ color: hover ? C.yellow : C.blue }}>
          <Counter target={value} />
        </p>
        <p className="text-sm font-semibold" style={{ color: hover ? `${C.yellow}cc` : accent }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── DASHBOARD ───────────────────────────────────────────────────
function Dashboard() {
  const [activeTab, setActiveTab] = useState("diario");

  const now = new Date();
  const dateStr = now.toLocaleDateString("es-MX", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div
      className="min-h-screen"
      style={{ background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes staggerFade {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes flipIn {
          from {
            opacity: 0;
            transform: rotateY(90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotateY(0deg) scale(1);
          }
        }
        @keyframes shimmer {
          0%, 100% {
            background-position: -1000px 0;
          }
          50% {
            background-position: 1000px 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(245, 196, 0, 0.4), 0 0 30px rgba(34, 82, 200, 0.1);
          }
          50% {
            box-shadow: 0 0 25px rgba(245, 196, 0, 0.8), 0 0 45px rgba(34, 82, 200, 0.2);
          }
        }
        @keyframes bounceScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.12);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-stagger-fade {
          animation: staggerFade 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-flip-in {
          animation: flipIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .animate-bounce-scale {
          animation: bounceScale 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}</style>
      {/* ── MAIN ── */}
      <main className="p-6 overflow-auto min-h-screen">

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-4xl font-black" style={{ color: C.text }}>
              Panel de Control
            </h1>
            <p className="text-base capitalize mt-0.5" style={{ color: C.muted }}>{dateStr}</p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-base font-semibold animate-pulse-glow"
              style={{ background: C.yellowSoft, color: "#007c04" }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block animate-pulse"
                style={{ background: C.yellow }}
              />
              Sistema Activo
            </div>
            <div
              className="px-4 py-2 rounded-full text-base font-bold"
              style={{ background: C.blue, color: C.white }}
            >
              UNID Playa del Carmen
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-4 gap-5 mb-6">
          <KpiCard label="Docentes Activos" value={60} icon="👨‍🏫" sub="+2 este mes"       accent={C.blueMid} />
          <KpiCard label="Asistencias Hoy"  value={52} icon="✅"  sub="86.7% del total"   accent="#15803d"   />
          <KpiCard label="Retardos"         value={5}  icon="⏰"  sub="3 menos que ayer"  accent="#b45309"   />
          <KpiCard label="Faltas"           value={3}  icon="❌"  sub="5% del total"       accent="#dc2626"   />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-3 gap-5 mb-6">

          {/* Bar chart */}
          <div
            className="col-span-2 rounded-2xl p-6"
            style={{
              background: C.white,
              border: `1.5px solid ${C.blueLight}`,
              boxShadow: "0 2px 12px rgba(26,58,143,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold" style={{ color: C.text }}>Registros del Día</h2>
                <p className="text-sm mt-0.5" style={{ color: C.muted }}>Entradas por hora — hoy</p>
              </div>
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: C.blueLight }}>
                {["diario", "mensual"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-3 py-1.5 rounded-lg text-sm font-bold capitalize"
                    style={
                      activeTab === tab
                        ? { background: C.yellow, color: C.blue }
                        : { background: "transparent", color: C.muted }
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === "diario" ? (
              <LineChart data={dailyData} valueKey="asistencias" labelKey="hora" height={130} />
            ) : (
              <LineChart data={monthlyData} valueKey="asistencias" labelKey="mes" height={130} />
            )}

            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: C.blueMid }} />
                <span className="text-sm" style={{ color: C.muted }}>Asistencias</span>
              </div>
              {activeTab === "mensual" && (
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-sm" style={{ background: "#f97316", opacity: 0.7 }} />
                  <span className="text-sm" style={{ color: C.muted }}>Faltas</span>
                </div>
              )}
            </div>
          </div>

          {/* Donuts */}
          <div
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: C.white, border: `1.5px solid ${C.blueLight}`, boxShadow: "0 2px 12px rgba(26,58,143,0.07)" }}
          >
            <h2 className="text-xl font-bold mb-1" style={{ color: C.text }}>Indicadores Clave</h2>
            <p className="text-sm mb-5" style={{ color: C.muted }}>Porcentaje del periodo actual</p>
            <div className="flex flex-col gap-5 flex-1 justify-center">
              {[
                { label: "Tasa de Asistencia", percent: 87,  color: C.blueMid  },
                { label: "Puntualidad",         percent: 94,  color: C.yellow   },
                { label: "Cobertura Docente",   percent: 100, color: "#16a34a"  },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <DonutChart percent={item.percent} color={item.color} size={68} />
                  <div>
                    <p className="text-base font-bold" style={{ color: C.text }}>{item.label}</p>
                    <p className="text-sm mt-0.5" style={{ color: C.muted }}>Ene — Jun 2025</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-6 gap-5">
          {/* Reloj */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center"
            style={{ background: C.white, border: `1.5px solid ${C.blueLight}`, boxShadow: "0 2px 12px rgba(26,58,143,0.07)", animation: "fadeInUp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both" }}
          >
            <p className="text-sm font-bold mb-4" style={{ color: C.muted }}>Hora Actual</p>
            <Clock />
            <p className="text-xs mt-4" style={{ color: C.muted }}>Tiempo real del sistema</p>
          </div>

          {/* Actividad reciente */}
          <div
            className="col-span-3 rounded-2xl p-6"
            style={{ background: C.white, border: `1.5px solid ${C.blueLight}`, boxShadow: "0 2px 12px rgba(26,58,143,0.07)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold" style={{ color: C.text }}>Actividad Reciente</h2>
                <p className="text-sm mt-0.5" style={{ color: C.muted }}>Últimos registros de asistencia</p>
              </div>
              <button
                className="text-sm font-bold px-3 py-1.5 rounded-lg"
                style={{ background: C.yellowSoft, color: C.blue }}
              >
                Ver todo →
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {recentActivity.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{
                    background: C.blueLight,
                    borderLeft: `3px solid ${
                      item.tipo === "entrada" ? "#16a34a"
                        : item.tipo === "retardo" ? C.yellow
                        : "#dc2626"
                    }`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: C.blue, color: C.yellow }}
                  >
                    {item.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold truncate" style={{ color: C.text }}>{item.nombre}</p>
                    <p className="text-sm" style={{ color: C.muted }}>{item.materia}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm mb-1" style={{ color: C.muted }}>{item.hora}</p>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-sm font-bold"
                      style={
                        item.tipo === "entrada"
                          ? { background: "#dcfce7", color: "#15803d" }
                          : item.tipo === "retardo"
                          ? { background: C.yellowSoft, color: "#7c5c00" }
                          : { background: "#fee2e2", color: "#b91c1c" }
                      }
                    >
                      {item.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking */}
          <div
            className="col-span-2 rounded-2xl p-6 flex flex-col"
            style={{ background: C.white, border: `1.5px solid ${C.blueLight}`, boxShadow: "0 2px 12px rgba(26,58,143,0.07)" }}
          >
            <h2 className="text-xl font-bold mb-1" style={{ color: C.text }}>Ranking Docentes</h2>
            <p className="text-sm mb-5" style={{ color: C.muted }}>Por tasa de asistencia</p>

            <div className="flex flex-col gap-4 flex-1">
              {teachers.map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-black w-5 text-center" style={{ color: i === 0 ? C.yellow : C.muted }}>
                    #{i + 1}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{
                      background: i === 0
                        ? `linear-gradient(135deg, ${C.yellow}, #ca8a04)`
                        : `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`,
                      color: i === 0 ? C.blue : C.white,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{t.nombre}</p>
                      <p className="text-sm font-black ml-2" style={{ color: C.blue }}>{t.asistencia}%</p>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ background: C.blueLight }}>
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${t.asistencia}%`,
                          background: i === 0
                            ? `linear-gradient(90deg, ${C.yellow}, #ca8a04)`
                            : `linear-gradient(90deg, ${C.blueMid}, ${C.blue})`,
                          transition: "width 1.2s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen cuatrimestral */}
            <div
              className="mt-5 rounded-xl p-4"
              style={{ background: `linear-gradient(135deg, ${C.blue} 0%, ${C.blueMid} 100%)` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: C.yellow }} />
                <p className="text-sm font-bold" style={{ color: C.yellow }}>Resumen Cuatrimestral</p>
              </div>
              <p className="text-sm mb-3" style={{ color: `${C.white}70` }}>Enero — Abril 2025</p>
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: C.white }}>91%</p>
                  <p className="text-sm" style={{ color: `${C.white}70` }}>Asistencia</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: C.yellow }}>4.2</p>
                  <p className="text-sm" style={{ color: `${C.white}70` }}>Promedio</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: C.white }}>6</p>
                  <p className="text-sm" style={{ color: `${C.white}70` }}>Meses</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;