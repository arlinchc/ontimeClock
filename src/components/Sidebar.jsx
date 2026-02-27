/**
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Instalar Heroicons: npm install @heroicons/react
 * 2. Instalar React Router: npm install react-router-dom
 * 3. Tener configurado Tailwind CSS en el proyecto.
 * * EXTENSIONES RECOMENDADAS EN VS CODE:
 * - Tailwind CSS IntelliSense (para autocompletado de clases)
 * - ES7+ React/Redux/React-Native snippets
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
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

            {!isCollapsed && (
                <>
                    {/* 2. PERFIL DE USUARIO Y BUSCADOR */}
                    <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-white/5 border border-white/10">
                        <UserCircleIcon className="h-8 w-8 text-[#f0c02f] shrink-0" />
                        <div>
                            <p className="text-xs font-bold truncate">Admin UNID</p>
                            <p className="text-[10px] text-slate-400">En línea</p>
                        </div>
                    </div>

                    <div className='relative mb-8 px-1'>
                        <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            className="w-full bg-white/5 text-sm text-white rounded-md py-2 pl-8 pr-2 focus:outline-none border border-white/10 focus:border-[#f0c02f]/50 transition-all"
                        />
                    </div>

                    {/* 3. SECCIÓN SITIO (Navegación Pública) */}
                    <div className='mb-6'>   
                        <p className='text-slate-500 text-[11px] mb-4 uppercase tracking-[2px] font-black'>Sitio</p>
                        <nav className='flex flex-col gap-5'>
                            <Link to="/" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <HomeIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Inicio</span>
                            </Link>
                            <Link to="/about" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <InformationCircleIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Acerca de</span>
                            </Link>
                            <Link to="/contact" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <PhoneIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Contacto</span>
                            </Link>
                        </nav>
                    </div>

                    {/* ESPACIADOR FLEXIBLE */}
                    <div className='flex-1' />
                    
                    {/* 4. SECCIÓN ADMINISTRATIVA (Gestión y Configuración) */}
                    <div className='mt-4 mb-8'>
                        <p className='text-slate-500 text-[11px] mb-4 uppercase tracking-[2px] font-black'>Administración</p>
                        <nav className='flex flex-col gap-5'>
                            <Link to="/admin" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <Squares2X2Icon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Dashboard</span>
                            </Link>
                            <Link to="/teachers" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <UserGroupIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Maestros</span>
                            </Link>
                            <Link to="/clock" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <ClockIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Reloj</span>
                            </Link>
                            <Link to="/reports" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <DocumentChartBarIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Reportes</span>
                            </Link>
                            {/* NUEVO: Enlace a la página de Configuración */}
                            <Link to="/sistemaconfig" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <Cog6ToothIcon className={`${iconSize} text-[#f0c02f] group-hover:scale-110 transition-transform`} />
                                <span className='text-sm font-medium'>Configuración</span>
                            </Link>
                        </nav>
                    </div>
                </>
            )}
            
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