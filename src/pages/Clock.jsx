function Clock() {
        return (
            <div className="flex items-center justify-center">
                {/*contenedor principal*/}
                <div className="bg-white rounded-2xl shadow-xl
                  p-10 w-full max-w-lg text-center">
                    <h1 className="text-3xl font-bold mb-8">
                        Reloj Checador
                    </h1>
                    <p className="text-slate-500 mb-8">
                        Sistema de Registro de Asistencia Docente
                    </p>

                    {/*Horario Actual*/}
                    <div className="mb-8">
                       <p className="text-5xl font-bold tracking-wider"> 
                           08:45:23 AM
                       </p> 
                       <p className="text-slate-500 mt-2">
                          Hora Actual
                       </p>
                    </div>

                    {/*Estado*/}
                    <div className="mb-8">
                        <span className="inline-block px-4 py-2 rounded-full
                        bg-green-100 text-green-700 text-sm font-medium">
                            Sistema Activo
                        </span>
                    </div>

                    {/*Acciones*/}
                    <div className="flex justify-center gap-6"> 
                        <button className="flex-1 bg-sky-600 text-white py-4 
                        rounded-xl text-lg font-semibold hover:bg-sky-700 transition">
                            Registrar Entrada
                        </button>
                        <button className="flex-1 bg-sky-700 text-white py-4 
                        rounded-xl text-lg font-semibold hover:bg-sky-800 transition">
                            Registrar Salida
                        </button>
                    </div>

                    {/*Info adicional*/}
                    <div className="text-slate-400 text-sm mt-8">
                        Universidad UNID Playa del Carmen * Admin
                    </div>
                </div>
            </div>
        )
    }

export default Clock;