import {Link, NavLink} from 'react-router-dom'

function Sidebar(){
    return(
        <aside className='w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col'>
            <h2 className='text-xl font-bold mb-8'>Reloj Checador</h2>
           
            {/*Seccion publica*/}
            <div className='mb-6'>   
                <p className='text-slate-400 text-sm mb-2 uppercase tracking-wide'>Sitio</p>
                <nav className='flex flex-col gap-3'>
                    <Link to="/" className='hover:text-sky-400 transition'>Inicio</Link>
                    <Link to="/about" className='hover:text-sky-400 transition'>Acerca de</Link>
                    <Link to="/contact" className='hover:text-sky-400 transition'>Contacto</Link>
                </nav>
            </div>
           
           {/*Seccion administrativa*/}
              <div className='mt-6'>
                 <p className='text-slate-400 text-sm mb-2 uppercase tracking-wide'>Administracion</p>
                 <nav className='flex flex-col gap-3'>
                    <Link to="/admin" className='hover:text-sky-400 transition'>Dashboard</Link>
                    <Link to="/teachers" className='hover:text-sky-400 transition'>Maestros</Link>
                    <Link to="/clock" className='hover:text-sky-400 transition'>Reloj</Link>
                    <Link to="/reports" className='hover:text-sky-400 transition'>Reportes</Link>
                    <Link to="/sistemaconfig" className='hover:text-sky-400 transition'>Configuración</Link>
                 </nav>
              </div>
            
            {/*espaciador*/}
            <div className='flex-1'/>
            {/*footer*/}
            <div  className='text-slate-400 text-sm'> 
                 Universidad UNID Playa del Carmen * Admin
            </div>            
        </aside>
    )
}

export default Sidebar