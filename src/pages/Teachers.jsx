function Teachers() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Maestros</h1>
                <div className="grid grid-cols-3 gap-6">   
                    <div className="bg-white p-6 rounded-xl shadow"> 
                        <h3 className="bg-white p-6 rounded-xl shadow">Leydi Xequeb</h3> 
                        <p className="text-slate-500 text-sm">Matemáticas</p>
                        <p className="mt-2 text-slate-600">Activo</p>
                    </div>
                       <div className="bg-white p-6 rounded-xl shadow"> 
                        <h3 className="bg-white p-6 rounded-xl shadow">Irvin Chan</h3> 
                        <p className="text-slate-500 text-sm">Programacion</p>
                        <p className="mt-2 text-slate-600">Activo</p>
                    </div>
                       <div className="bg-white p-6 rounded-xl shadow"> 
                        <h3 className="bg-white p-6 rounded-xl shadow">Marcos Riviera</h3> 
                        <p className="text-slate-500 text-sm">Fe y Mundo</p>
                        <p className="mt-2 text-slate-600">Activo</p>
                    </div>                    
                </div>          
        </div>
    )
}

export default Teachers;