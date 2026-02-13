function  Dashboard() {
    return (
        <div>
           <h1 className="text-2xl font-bold mb-4">Panel de Control</h1> 
           {/* Cards */}
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500 text-sm">Maestros Activos</p>
                    <p className="text-3xl font-bold mt-2">60</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500 text-sm">Asistencias</p>
                    <p className="text-3xl font-bold mt-2">40</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500 text-sm">Retardos</p>
                    <p className="text-3xl font-bold mt-2">3</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-slate-500 text-sm">Faltas</p>
                    <p className="text-3xl font-bold mt-2">1</p>
                </div>
              </div>           
        </div>  
    )
}

export default Dashboard;