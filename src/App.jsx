import ScheduleModule from "./modules/schedule/index.jsx";

{/* Maquetar sidebar siempre visible con todas rutas - publicas y administrativas*/}
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import Teachers from "./pages/Teachers"
import Clock from "./pages/Clock"
import Reports from "./pages/Reports"
import SystemConfig from "./pages/sistemaconfig"


function App() {
  return(
    <BrowserRouter>
     {/*Layout Principal side bar siempre visible a pantalla completa*/}
     <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-10 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/clock" element={<Clock />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/horarios/*" element={<ScheduleModule  />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
