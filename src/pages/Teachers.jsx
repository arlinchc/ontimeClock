import { useState } from "react"; //modulo de teachers

const initialTeachers = [
    { id: 1, name: "Leydi Xequeb", subject: "Matemáticas", email: "l.xequeb@universidad.edu", phone: "+502 5555-0101", status: "Activo", degree: "MSc. Matemáticas Aplicadas", joined: "2019-03-15", avatar: "LX" },
    { id: 2, name: "Irvin Chan", subject: "Programación", email: "i.chan@universidad.edu", phone: "+502 5555-0202", status: "Activo", degree: "Ing. en Sistemas", joined: "2020-08-01", avatar: "IC" },
    { id: 3, name: "Marcos Rivera", subject: "Fe y Mundo", email: "m.rivera@universidad.edu", phone: "+502 5555-0303", status: "Activo", degree: "Lic. Teología", joined: "2018-01-20", avatar: "MR" },
    { id: 4, name: "Sandra López", subject: "Física", email: "s.lopez@universidad.edu", phone: "+502 5555-0404", status: "Inactivo", degree: "PhD. Física Teórica", joined: "2017-06-10", avatar: "SL" },
    { id: 5, name: "Carlos Menéndez", subject: "Química", email: "c.menendez@universidad.edu", phone: "+502 5555-0505", status: "Activo", degree: "MSc. Química Industrial", joined: "2021-02-28", avatar: "CM" },
    { id: 6, name: "Ana Fuentes", subject: "Inglés", email: "a.fuentes@universidad.edu", phone: "+502 5555-0606", status: "Licencia", degree: "BA. Lenguas Modernas", joined: "2016-09-05", avatar: "AF" },
];

const avatarColors = [
    ["#1E3A8A", "#FBBF24"],
    ["#1D4ED8", "#F59E0B"],
    ["#1E40AF", "#FCD34D"],
    ["#1a3270", "#FBBF24"],
    ["#2563EB", "#F59E0B"],
    ["#1E3A8A", "#FDE68A"],
];

const statusConfig = {
    Activo: { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
    Inactivo: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
    Licencia: { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
};

export default function Teachers() {
    const [teachers, setTeachers] = useState(initialTeachers);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // "add" | "view" | "edit"
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [form, setForm] = useState({ name: "", subject: "", email: "", phone: "", degree: "", status: "Activo" });
    const [sortField, setSortField] = useState("name");
    const [sortDir, setSortDir] = useState("asc");

    const filtered = teachers
        .filter(t => statusFilter === "Todos" || t.status === statusFilter)
        .filter(t =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.subject.toLowerCase().includes(search.toLowerCase()) ||
            t.email.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            const va = a[sortField] || ""; const vb = b[sortField] || "";
            return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
        });

    const handleSort = (field) => {
        if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDir("asc"); }
    };

    const openAdd = () => { setModalMode("add"); setForm({ name: "", subject: "", email: "", phone: "", degree: "", status: "Activo" }); setShowModal(true); };
    const openView = (t) => { setModalMode("view"); setSelectedTeacher(t); setShowModal(true); };
    const openEdit = (t) => { setModalMode("edit"); setSelectedTeacher(t); setForm({ name: t.name, subject: t.subject, email: t.email, phone: t.phone, degree: t.degree, status: t.status }); setShowModal(true); };

    const handleSave = () => {
        if (!form.name.trim()) return;
        if (modalMode === "edit") {
            // Editar docente existente
            setTeachers(prev => prev.map(t => t.id === selectedTeacher.id ? { ...selectedTeacher, ...form } : t));
        } else {
            // Agregar nuevo docente
            const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            setTeachers(prev => [...prev, { ...form, id: Date.now(), avatar: initials, joined: new Date().toISOString().split("T")[0] }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este docente?")) {
            setTeachers(prev => prev.filter(t => t.id !== id));
        }
    };

    const SortIcon = ({ field }) => (
        <span style={{ marginLeft: 4, opacity: sortField === field ? 1 : 0.3, fontSize: 11 }}>
            {sortField === field && sortDir === "desc" ? "▼" : "▲"}
        </span>
    );

    return (
        <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F0F4FF", minHeight: "100vh", padding: "32px 24px" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .th-btn:hover { background: #1E3A8A !important; color: white !important; }
        .row-hover:hover { background: #EFF6FF !important; }
        .icon-btn:hover { background: #EFF6FF !important; }
        .action-btn { transition: all 0.15s; }
        .action-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        input:focus, select:focus { outline: 2px solid #3B82F6; outline-offset: 1px; }
        .modal-overlay { animation: fadeIn 0.2s ease; }
        .modal-box { animation: slideUp 0.25s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #e5e7eb; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #93C5FD; border-radius: 10px; }
      `}</style>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #1E3A8A, #2563EB)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                        </div>
                        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: "#1E3A8A", margin: 0 }}>
                            Gestión de Docentes
                        </h1>
                    </div>
                    <p style={{ color: "#64748B", fontSize: 13.5, margin: 0, marginLeft: 50 }}>
                        Sistema Académico Universitario · {teachers.length} docentes registrados
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="action-btn"
                    style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)", color: "white", border: "none", borderRadius: 10, padding: "11px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}
                >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Agregar Docente
                </button>
            </div>

            {/* Stats bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 24 }}>
                {[
                    { label: "Total Docentes", value: teachers.length, icon: "👥", accent: "#1E3A8A" },
                    { label: "Activos", value: teachers.filter(t => t.status === "Activo").length, icon: "✅", accent: "#059669" },
                    { label: "Inactivos", value: teachers.filter(t => t.status === "Inactivo").length, icon: "⛔", accent: "#DC2626" },
                    { label: "En Licencia", value: teachers.filter(t => t.status === "Licencia").length, icon: "📋", accent: "#D97706" },
                ].map((s, i) => (
                    <div key={i} style={{ background: "white", borderRadius: 12, padding: "16px 18px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", borderLeft: `4px solid ${s.accent}` }}>
                        <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s.label}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 28, fontFamily: "'Sora', sans-serif", fontWeight: 700, color: s.accent }}>{s.value}</span>
                            <span style={{ fontSize: 20 }}>{s.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter bar */}
            <div style={{ background: "white", borderRadius: 14, padding: "16px 20px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)", marginBottom: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                {/* Search */}
                <div style={{ position: "relative", flex: "1 1 260px", minWidth: 200 }}>
                    <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre, materia o correo..."
                        style={{ width: "100%", paddingLeft: 38, paddingRight: 14, height: 40, border: "1.5px solid #E2E8F0", borderRadius: 9, fontSize: 13.5, color: "#334155", background: "#F8FAFC" }}
                    />
                </div>

                {/* Status filter */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Todos", "Activo", "Inactivo", "Licencia"].map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            style={{
                                padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                                background: statusFilter === s ? "linear-gradient(135deg, #1E3A8A, #2563EB)" : "#F1F5F9",
                                color: statusFilter === s ? "white" : "#64748B",
                                border: statusFilter === s ? "none" : "1.5px solid #E2E8F0"
                            }}
                        >{s}</button>
                    ))}
                </div>

                {/* Results count */}
                <div style={{ marginLeft: "auto", fontSize: 12.5, color: "#94A3B8", whiteSpace: "nowrap" }}>
                    {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                </div>
            </div>

            {/* Table */}
            <div style={{ background: "white", borderRadius: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.08)", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
                        <thead>
                            <tr style={{ background: "linear-gradient(90deg, #1E3A8A 0%, #1D4ED8 100%)" }}>
                                {[
                                    { label: "Docente", field: "name" },
                                    { label: "Materia", field: "subject" },
                                    { label: "Correo", field: "email" },
                                    { label: "Teléfono", field: null },
                                    { label: "Estado", field: "status" },
                                    { label: "Ingreso", field: "joined" },
                                    { label: "Acciones", field: null },
                                ].map((col, i) => (
                                    <th
                                        key={i}
                                        onClick={() => col.field && handleSort(col.field)}
                                        className={col.field ? "th-btn" : ""}
                                        style={{
                                            padding: "13px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 700,
                                            color: "#FBBF24", letterSpacing: "0.08em", textTransform: "uppercase",
                                            cursor: col.field ? "pointer" : "default", userSelect: "none",
                                            borderBottom: "2px solid rgba(251,191,36,0.3)", whiteSpace: "nowrap"
                                        }}
                                    >
                                        {col.label}{col.field && <SortIcon field={col.field} />}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center", padding: "52px 20px", color: "#94A3B8" }}>
                                        <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
                                        <div style={{ fontWeight: 600, fontSize: 15 }}>Sin resultados</div>
                                        <div style={{ fontSize: 13 }}>Intenta cambiar el filtro o la búsqueda</div>
                                    </td>
                                </tr>
                            ) : filtered.map((t, idx) => {
                                const sc = statusConfig[t.status] || statusConfig.Activo;
                                const ac = avatarColors[t.id % avatarColors.length];
                                return (
                                    <tr key={t.id} className="row-hover" style={{ borderBottom: "1px solid #F1F5F9", transition: "background 0.12s", background: idx % 2 === 0 ? "white" : "#FAFBFF" }}>
                                        {/* Docente */}
                                        <td style={{ padding: "13px 16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                                                <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${ac[0]}, ${ac[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: ac[0] === "#FBBF24" ? "#1E3A8A" : "white", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                                                    {t.avatar}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1E293B" }}>{t.name}</div>
                                                    <div style={{ fontSize: 11.5, color: "#94A3B8" }}>{t.degree}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Materia */}
                                        <td style={{ padding: "13px 16px" }}>
                                            <span style={{ background: "#EFF6FF", color: "#1D4ED8", borderRadius: 6, padding: "3px 10px", fontSize: 12.5, fontWeight: 600 }}>{t.subject}</span>
                                        </td>
                                        {/* Email */}
                                        <td style={{ padding: "13px 16px", fontSize: 13, color: "#475569" }}>{t.email}</td>
                                        {/* Phone */}
                                        <td style={{ padding: "13px 16px", fontSize: 13, color: "#475569", whiteSpace: "nowrap" }}>{t.phone}</td>
                                        {/* Status */}
                                        <td style={{ padding: "13px 16px" }}>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: sc.bg, color: sc.color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>
                                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                                                {t.status}
                                            </span>
                                        </td>
                                        {/* Joined */}
                                        <td style={{ padding: "13px 16px", fontSize: 12.5, color: "#94A3B8", whiteSpace: "nowrap" }}>{t.joined}</td>
                                        {/* Actions */}
                                        <td style={{ padding: "13px 16px" }}>
                                            <div style={{ display: "flex", gap: 6 }}>
                                                <button onClick={() => openView(t)} className="icon-btn" title="Ver perfil" style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E2E8F0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                </button>
                                                <button onClick={() => openEdit(t)} className="icon-btn" title="Editar" style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E2E8F0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                                </button>
                                                <button onClick={() => handleDelete(t.id)} className="icon-btn" title="Eliminar" style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #FEE2E2", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Table footer */}
                <div style={{ padding: "12px 20px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FAFBFF" }}>
                    <span style={{ fontSize: 12.5, color: "#94A3B8" }}>Mostrando {filtered.length} de {teachers.length} docentes</span>
                    <div style={{ display: "flex", gap: 4 }}>
                        {[1].map(p => (
                            <button key={p} style={{ width: 30, height: 30, borderRadius: 7, border: "none", background: "linear-gradient(135deg, #1E3A8A, #2563EB)", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{p}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
                    <div className="modal-box" onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 18, width: "100%", maxWidth: 520, boxShadow: "0 24px 64px rgba(0,0,0,0.22)", overflow: "hidden" }}>
                        {/* Modal header */}
                        <div style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(251,191,36,0.2)", border: "2px solid #FBBF24", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div>
                                    <h2 style={{ fontFamily: "'Sora', sans-serif", color: "white", margin: 0, fontSize: 18, fontWeight: 700 }}>
                                        {modalMode === "add" ? "Nuevo Docente" : modalMode === "edit" ? "Editar Docente" : selectedTeacher?.name}
                                    </h2>
                                    <p style={{ color: "#93C5FD", margin: 0, fontSize: 12.5 }}>
                                        {modalMode === "add" ? "Completar información del docente" : modalMode === "edit" ? "Actualizar información del docente" : selectedTeacher?.subject}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} style={{ width: 34, height: 34, borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.25)", background: "transparent", color: "white", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                        </div>

                        {/* Modal body */}
                        <div style={{ padding: "24px 28px" }}>
                            {modalMode === "view" && selectedTeacher && !form.name ? (
                                <div>
                                    {/* Avatar grande */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "16px", background: "#F8FAFC", borderRadius: 12 }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg, #1E3A8A, #FBBF24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "white", boxShadow: "0 4px 16px rgba(30,58,138,0.3)" }}>
                                            {selectedTeacher.avatar}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 18, color: "#1E293B" }}>{selectedTeacher.name}</div>
                                            <div style={{ fontSize: 13, color: "#64748B" }}>{selectedTeacher.degree}</div>
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: statusConfig[selectedTeacher.status]?.bg, color: statusConfig[selectedTeacher.status]?.color, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusConfig[selectedTeacher.status]?.dot, display: "inline-block" }} />
                                                {selectedTeacher.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                                        {[
                                            { icon: "📚", label: "Materia", val: selectedTeacher.subject },
                                            { icon: "📧", label: "Correo", val: selectedTeacher.email },
                                            { icon: "📞", label: "Teléfono", val: selectedTeacher.phone },
                                            { icon: "📅", label: "Fecha de Ingreso", val: selectedTeacher.joined },
                                        ].map((item, i) => (
                                            <div key={i} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px", border: "1px solid #E2E8F0" }}>
                                                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{item.icon} {item.label}</div>
                                                <div style={{ fontSize: 13.5, color: "#334155", fontWeight: 500 }}>{item.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {[
                                        { label: "Nombre Completo", key: "name", type: "text", placeholder: "Ej. María García López" },
                                        { label: "Materia que imparte", key: "subject", type: "text", placeholder: "Ej. Cálculo Diferencial" },
                                        { label: "Correo Institucional", key: "email", type: "email", placeholder: "docente@universidad.edu" },
                                        { label: "Teléfono", key: "phone", type: "text", placeholder: "+502 0000-0000" },
                                        { label: "Grado Académico", key: "degree", type: "text", placeholder: "Ej. MSc. Ingeniería de Software" },
                                    ].map(field => (
                                        <div key={field.key}>
                                            <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{field.label}</label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                value={form[field.key]}
                                                onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                                                style={{ width: "100%", height: 40, border: "1.5px solid #E2E8F0", borderRadius: 9, padding: "0 14px", fontSize: 13.5, color: "#334155", background: "#F8FAFC" }}
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Estado</label>
                                        <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={{ width: "100%", height: 40, border: "1.5px solid #E2E8F0", borderRadius: 9, padding: "0 14px", fontSize: 13.5, color: "#334155", background: "#F8FAFC" }}>
                                            <option>Activo</option><option>Inactivo</option><option>Licencia</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal footer */}
                        <div style={{ padding: "16px 28px 24px", display: "flex", justifyContent: "flex-end", gap: 10 }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: "10px 22px", borderRadius: 9, border: "1.5px solid #E2E8F0", background: "white", color: "#64748B", fontWeight: 600, fontSize: 13.5, cursor: "pointer" }}>
                                {modalMode === "view" ? "Cerrar" : "Cancelar"}
                            </button>
                            {(modalMode === "add" || modalMode === "edit") && (
                                <button onClick={handleSave} className="action-btn" style={{ padding: "10px 24px", borderRadius: 9, border: "none", background: "linear-gradient(135deg, #1E3A8A, #2563EB)", color: "white", fontWeight: 700, fontSize: 13.5, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.35)" }}>
                                    {modalMode === "add" ? "Guardar Docente" : "Actualizar Docente"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}