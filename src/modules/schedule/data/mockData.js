export const TEACHERS = [
  { id: "DOC001", name: "Dra. María García López",       subject: "Cálculo Diferencial",         department: "Matemáticas",     avatar: "MG", color: "#4f46e5" },
  { id: "DOC002", name: "Ing. Carlos Ramírez Torres",    subject: "Programación Web",             department: "Sistemas",        avatar: "CR", color: "#0284c7" },
  { id: "DOC003", name: "Lic. Ana Flores Mendoza",       subject: "Comunicación Oral",            department: "Humanidades",     avatar: "AF", color: "#d97706" },
  { id: "DOC004", name: "Dr. Luis Pérez Castillo",       subject: "Física General",               department: "Ciencias Básicas",avatar: "LP", color: "#059669" },
  { id: "DOC005", name: "Mtra. Sofía Morales Vega",      subject: "Base de Datos",                department: "Sistemas",        avatar: "SM", color: "#db2777" },
  { id: "DOC006", name: "Ing. Roberto Silva Cruz",       subject: "Redes y Telecomunicaciones",   department: "Sistemas",        avatar: "RS", color: "#7c3aed" },
];

export const ROOMS = [
  "Aula 101", "Aula 102", "Aula 103",
  "Aula 201", "Aula 202",
  "Lab. Cómputo A", "Lab. Cómputo B", "Lab. Física",
  "Aula Magna", "Sala de Conferencias",
];

export const TIME_SLOTS = [
  { id: 1,  start: "07:00", end: "08:00" },
  { id: 2,  start: "08:00", end: "09:00" },
  { id: 3,  start: "09:00", end: "10:00" },
  { id: 4,  start: "10:00", end: "11:00" },
  { id: 5,  start: "11:00", end: "12:00" },
  { id: 6,  start: "12:00", end: "13:00" },
  { id: 7,  start: "13:00", end: "14:00" },
  { id: 8,  start: "14:00", end: "15:00" },
  { id: 9,  start: "15:00", end: "16:00" },
  { id: 10, start: "16:00", end: "17:00" },
  { id: 11, start: "17:00", end: "18:00" },
  { id: 12, start: "18:00", end: "19:00" },
];

export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export const INITIAL_SCHEDULE = [
  { id: 1,  teacherId: "DOC001", day: "Lunes",     startSlot: 1,  endSlot: 2,  room: "Aula 101",      group: "1A", subject: "Cálculo Diferencial" },
  { id: 2,  teacherId: "DOC001", day: "Miércoles", startSlot: 1,  endSlot: 2,  room: "Aula 101",      group: "1A", subject: "Cálculo Diferencial" },
  { id: 3,  teacherId: "DOC001", day: "Viernes",   startSlot: 1,  endSlot: 2,  room: "Aula 102",      group: "1B", subject: "Cálculo Diferencial" },
  { id: 4,  teacherId: "DOC002", day: "Lunes",     startSlot: 3,  endSlot: 5,  room: "Lab. Cómputo A",group: "3A", subject: "Programación Web" },
  { id: 5,  teacherId: "DOC002", day: "Miércoles", startSlot: 3,  endSlot: 5,  room: "Lab. Cómputo A",group: "3A", subject: "Programación Web" },
  { id: 6,  teacherId: "DOC002", day: "Viernes",   startSlot: 3,  endSlot: 4,  room: "Lab. Cómputo B",group: "3B", subject: "Programación Web" },
  { id: 7,  teacherId: "DOC003", day: "Martes",    startSlot: 2,  endSlot: 3,  room: "Aula 202",      group: "2A", subject: "Comunicación Oral" },
  { id: 8,  teacherId: "DOC003", day: "Jueves",    startSlot: 2,  endSlot: 3,  room: "Aula 202",      group: "2A", subject: "Comunicación Oral" },
  { id: 9,  teacherId: "DOC004", day: "Martes",    startSlot: 5,  endSlot: 7,  room: "Lab. Física",   group: "2B", subject: "Física General" },
  { id: 10, teacherId: "DOC004", day: "Jueves",    startSlot: 5,  endSlot: 7,  room: "Lab. Física",   group: "2B", subject: "Física General" },
  { id: 11, teacherId: "DOC005", day: "Lunes",     startSlot: 7,  endSlot: 9,  room: "Lab. Cómputo B",group: "4A", subject: "Base de Datos" },
  { id: 12, teacherId: "DOC005", day: "Miércoles", startSlot: 7,  endSlot: 9,  room: "Lab. Cómputo B",group: "4A", subject: "Base de Datos" },
  { id: 13, teacherId: "DOC006", day: "Martes",    startSlot: 9,  endSlot: 11, room: "Aula 201",      group: "5A", subject: "Redes y Telecomunicaciones" },
  { id: 14, teacherId: "DOC006", day: "Viernes",   startSlot: 9,  endSlot: 11, room: "Aula 201",      group: "5A", subject: "Redes y Telecomunicaciones" },
  { id: 15, teacherId: "DOC001", day: "Jueves",    startSlot: 4,  endSlot: 5,  room: "Aula 103",      group: "2C", subject: "Cálculo Diferencial" },
];

export const INITIAL_CLOSED_DAYS = [
  { id: 1,  date: "2026-01-01", reason: "Año Nuevo",                   type: "holiday" },
  { id: 10, date: "2026-03-10", reason: "Mantenimiento de instalaciones", type: "maintenance" },
  { id: 11, date: "2026-06-02", reason: "Junta docente extraordinaria",   type: "institutional" },
];
