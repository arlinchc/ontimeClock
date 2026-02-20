import { useState } from 'react';
import { Link } from 'react-router-dom';
// Importamos los iconos de Heroicons
// IMPORTANTE: Este módulo usa Heroicons. 
// Si ves un error de "module not found", ejecuta en la terminal:
// npm install @heroicons/react
import { 
    HomeIcon, 
    InformationCircleIcon, 
    PhoneIcon, 
    Squares2X2Icon, 
    UserGroupIcon, 
    ClockIcon, 
    DocumentChartBarIcon,
    Bars3Icon, 
    MagnifyingGlassIcon, 
    ArrowLeftOnRectangleIcon, 
    UserCircleIcon 
} from '@heroicons/react/24/outline';

function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-white min-h-screen p-6 flex flex-col transition-all duration-300`}>
            
            {/* Cabecera y Botón Hamburguesa */}
            <div className='flex items-center justify-between mb-8'>
                {!isCollapsed && <h2 className='text-xl font-bold truncate'>Reloj Checador</h2>}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 mx-auto"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* Perfil de Usuario */}
            <div className={`flex items-center gap-3 mb-6 p-2 rounded-lg bg-slate-800/50 ${isCollapsed ? 'justify-center' : ''}`}>
                <UserCircleIcon className="h-8 w-8 text-sky-400 flex-shrink-0" />
                {!isCollapsed && <p className="text-xs font-bold truncate">Admin UNID</p>}
            </div>

            {/* Buscador */}
            <div className={`relative mb-8 ${isCollapsed ? 'hidden' : 'block'}`}>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-500">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                </span>
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="w-full bg-slate-800 text-sm text-white rounded-md py-2 pl-8 pr-2 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
            </div>
           
            {/* Seccion publica */}
            <div className='mb-6'>   
                <p className={`text-slate-400 text-[10px] mb-4 uppercase tracking-wide font-bold ${isCollapsed ? 'text-center' : ''}`}>
                    {isCollapsed ? '•' : 'Sitio'}
                </p>
                <nav className='flex flex-col gap-4'>
                    <Link to="/" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <HomeIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Inicio</span>}
                    </Link>
                    <Link to="/about" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <InformationCircleIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Acerca de</span>}
                    </Link>
                    <Link to="/contact" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <PhoneIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Contacto</span>}
                    </Link>
                </nav>
            </div>
           
            {/* Seccion administrativa */}
            <div className='mt-2'>
                <p className={`text-slate-400 text-[10px] mb-4 uppercase tracking-wide font-bold ${isCollapsed ? 'text-center' : ''}`}>
                    {isCollapsed ? '•' : 'Administracion'}
                </p>
                <nav className='flex flex-col gap-4'>
                    <Link to="/admin" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <Squares2X2Icon className="h-5 w-5" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>
                    <Link to="/teachers" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <UserGroupIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Maestros</span>}
                    </Link>
                    <Link to="/clock" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <ClockIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Reloj</span>}
                    </Link>
                    <Link to="/reports" className='flex items-center gap-3 hover:text-sky-400 transition'>
                        <DocumentChartBarIcon className="h-5 w-5" />
                        {!isCollapsed && <span>Reportes</span>}
                    </Link>
                </nav>
            </div>
            
            {/* Espaciador (Este empuja todo lo de abajo al final) */}
            <div className='flex-1'/>

            {/* Footer y Botón Cerrar Sesión (Esquina inferior izquierda) */}
            <div className='mt-auto pt-6'>
                <button className={`flex items-center gap-3 text-red-500 hover:text-red-400 transition mb-4 w-full ${isCollapsed ? 'justify-center' : ''}`}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                    {!isCollapsed && <span className='text-sm font-bold'>Cerrar Sesión</span>}
                </button>

                {!isCollapsed && (
                    <div className='text-slate-500 text-[10px] border-t border-slate-800 pt-4 leading-tight'> 
                         Universidad UNID <br />
                         Playa del Carmen * Admin
                    </div>
                )}
            </div>            
        </aside>
    )
}

export default Sidebar;