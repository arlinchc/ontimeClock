import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    // Importamos los iconos de Heroicons
// IMPORTANTE: Este módulo usa Heroicons. 
// Si ves un error de "module not found", ejecuta en la terminal:
// npm install @heroicons/react
    HomeIcon, InformationCircleIcon, PhoneIcon, 
    Squares2X2Icon, UserGroupIcon, ClockIcon, 
    DocumentChartBarIcon, Bars3Icon, MagnifyingGlassIcon, 
    ArrowLeftOnRectangleIcon, UserCircleIcon 
} from '@heroicons/react/24/outline';

// Sidebar con secciones públicas y administrativas, colapsable, con perfil de usuario, buscador y botón de cerrar sesión
function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Corregido: Ahora sí crecen al colapsar (h-8) y son normales al expandir (h-5)
    const iconSize = isCollapsed ? 'h-8 w-8' : 'h-5 w-5';


    // El sidebar se colapsa a 96px (w-24) y se expande a 256px (w-64).
    return (
        <aside className={`${isCollapsed ? 'w-24' : 'w-64'} bg-slate-900 text-white min-h-screen p-6 flex flex-col transition-all duration-300 border-r border-slate-800`}>
            
            {/* Cabecera y Hamburguesa */}
            <div className='flex items-center justify-between mb-8'>
                {!isCollapsed && <h2 className='text-xl font-bold truncate'>Reloj Checador</h2>}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 mx-auto transition-colors"
                >
                    <Bars3Icon className="h-8 w-8" />
                </button>
            </div>

            {/* Perfil de Usuario */}
            <div className={`flex items-center gap-3 mb-6 p-2 rounded-lg bg-slate-800/50 ${isCollapsed ? 'justify-center' : ''}`}>
                <UserCircleIcon className={`${isCollapsed ? 'h-10 w-10' : 'h-8 w-8'} text-sky-400 shrink-0`} />
                {!isCollapsed && <p className="text-xs font-bold truncate">Admin UNID</p>}
            </div>

            {/* Buscador */}
            {!isCollapsed && (
                <div className='relative mb-8 px-1'>
                    <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full bg-slate-800 text-sm text-white rounded-md py-2 pl-8 pr-2 focus:outline-none border border-slate-700"
                    />
                </div>
            )}
           
            {/* SECCIÓN PÚBLICA */}
            <div className='mb-6'>   
                <p className={`text-slate-400 text-sm mb-4 uppercase tracking-wide font-bold ${isCollapsed ? 'text-center' : ''}`}>
                    {isCollapsed ? '•' : 'Sitio'}
                </p>
                <nav className='flex flex-col gap-5'>
                    <Link to="/" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <HomeIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Inicio</span>}
                    </Link>
                    <Link to="/about" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <InformationCircleIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Acerca de</span>}
                    </Link>
                    <Link to="/contact" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <PhoneIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Contacto</span>}
                    </Link>
                </nav>
            </div>
           
            {/* SECCIÓN ADMINISTRATIVA */}
            <div className='mt-4'>
                <p className={`text-slate-400 text-sm mb-4 uppercase tracking-wide font-bold ${isCollapsed ? 'text-center' : ''}`}>
                    {isCollapsed ? '•' : 'Administracion'}
                </p>
                <nav className='flex flex-col gap-5'>
                    <Link to="/admin" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <Squares2X2Icon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                    <Link to="/teachers" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <UserGroupIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Maestros</span>}
                    </Link>
                    <Link to="/clock" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <ClockIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Reloj</span>}
                    </Link>
                    <Link to="/reports" className={`flex items-center gap-4 hover:text-sky-400 transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                        <DocumentChartBarIcon className={`${iconSize} shrink-0`} />
                        {!isCollapsed && <span>Reportes</span>}
                    </Link>
                </nav>
            </div>
            
            <div className='flex-1'/>

            {/* Footer y Botón Cerrar Sesión CORREGIDO */}
            <div className='mt-auto pt-6 border-t border-slate-800'>
                <button 
                    className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all group
                    ${isCollapsed ? 'justify-center' : 'hover:bg-red-500/10'}`}
                >
                    <ArrowLeftOnRectangleIcon 
                        className={`${iconSize} text-red-500 group-hover:text-red-400 shrink-0`} 
                    />
                    {!isCollapsed && (
                        <span className='text-sm font-bold text-red-500 group-hover:text-red-400 uppercase tracking-tight'>
                            Cerrar Sesión
                        </span>
                    )}
                </button>

                {!isCollapsed && (
                    <div className='mt-4 text-slate-500 text-[10px] px-4 leading-tight opacity-50'> 
                         Universidad UNID <br />
                         Playa del Carmen * Admin
                    </div>
                )}
            </div>            
        </aside>
    );
}

export default Sidebar;