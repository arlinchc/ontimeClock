function Reports() {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-8"> 
                    Reportes de Incidencia      
                </h1>
                <div className="grid grid-cols-2 gap-6">
                    
                    <div className="bg-white p-6 rounded-xl shadow
                        hover:shadow-lg transition"> 
                            <h3 className="text-lg font-semibold mb-2">
                                Reporte Mensual alejandro
                            </h3> 
                            <p className="text-slate-500 text-sm">
                                Asistencia general por mes.
                            </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow
                        hover:shadow-lg transition"> 
                            <h3 className="text-lg font-semibold mb-2">
                                Reporte por docente
                            </h3> 
                            <p className="text-slate-500 text-sm">
                                Historial individual por docente.
                            </p>
                        </div>
                </div>           
        </div>         
        )
    }

export default Reports;