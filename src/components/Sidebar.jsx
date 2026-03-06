import {Link, NavLink} from 'react-router-dom'

import { useState } from 'react';
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
    UserCircleIcon,
    Cog6ToothIcon // Icono de engranaje para Configuración
} from '@heroicons/react/24/outline';

function Sidebar() {
    // Estado para colapsar/expandir el sidebar
    const [isCollapsed, setIsCollapsed] = useState(false);
    const iconSize = 'h-5 w-5';

    return (
        /* CONTENEDOR PRINCIPAL 
           - bg-[#1a1a32]: Azul Marino Institucional
           - border-white/10: Borde sutil para separar del contenido
        */
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#1a1a32] text-white min-h-screen p-6 flex flex-col transition-all duration-300 border-r border-white/10`}>
            
            {/* 1. CABECERA (Logo y botón de colapsar) */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
                {!isCollapsed && (
                    <h2 className='text-xl font-bold truncate text-[#f0c02f]'>
                        Reloj Checador
                    </h2>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 transition-colors"
                    title={isCollapsed ? "Expandir" : "Colapsar"}
                >
                    <Bars3Icon className="h-8 w-8" />
                </button>
            </div>
           
           {/*Seccion administrativa*/}
              <div className='mt-6'>
                 <p className='text-slate-400 text-sm mb-2 uppercase tracking-wide'>Administracion</p>
                 <nav className='flex flex-col gap-3'>
                    <Link to="/admin" className='hover:text-sky-400 transition'>Dashboard</Link>
                    <Link to="/teachers" className='hover:text-sky-400 transition'>Maestros</Link>
                    <Link to="/clock" className='hover:text-sky-400 transition'>Reloj</Link>
                    <Link to="/reports" className='hover:text-sky-400 transition'>Reportes</Link>
                     <Link to="/horarios" className='hover:text-sky-400 transition'>Horario</Link>
                 </nav>
              </div>
            
            {/* Si está colapsado, empuja el botón de salida al final */}
            {isCollapsed && <div className='flex-1' />}

            {/* 5. FOOTER (Cerrar Sesión e Info Institucional) */}
            <div className={`mt-auto pt-6 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
                {!isCollapsed ? (
                    <>
                        <button className='flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all group hover:bg-red-500/10'>
                            <ArrowLeftOnRectangleIcon className={`${iconSize} text-red-500 group-hover:text-red-400 shrink-0`} />
                            <span className='text-sm font-bold text-red-500 group-hover:text-red-400 uppercase tracking-tight'>
                                Cerrar Sesión
                            </span>
                        </button>
                        <div className='mt-4 text-slate-500 text-[10px] px-4 leading-tight opacity-50'> 
                             Universidad UNID <br />
                             Playa del Carmen • Admin
                        </div>
                    </>
                ) : (
                    /* Icono de salida simplificado cuando está colapsado */
                    <button className='p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors'>
                        <ArrowLeftOnRectangleIcon className={iconSize} />
                    </button>
                )}
            </div>            
        </aside>
    );
}

export default Sidebar;