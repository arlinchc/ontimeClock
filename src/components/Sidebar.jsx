// archivo: src/components/Sidebar.jsx

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
    CalendarDaysIcon,   // NUEVO ICONO
    Bars3Icon, 
    MagnifyingGlassIcon, 
    ArrowLeftOnRectangleIcon, 
    UserCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const iconSize = 'h-5 w-5';

    return (

        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#1a1a32] text-white min-h-screen p-6 flex flex-col transition-all duration-300 border-r border-white/10`}>

            {/* CABECERA */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
                {!isCollapsed && (
                    <h2 className='text-xl font-bold truncate text-[#f0c02f]'>
                        Reloj Checador
                    </h2>
                )}

                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 transition-colors"
                >
                    <Bars3Icon className="h-8 w-8" />
                </button>
            </div>

            {!isCollapsed && (
                <>
                    {/* PERFIL */}
                    <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-white/5 border border-white/10">
                        <UserCircleIcon className="h-8 w-8 text-[#f0c02f] shrink-0" />
                        <div>
                            <p className="text-xs font-bold truncate">Admin UNID</p>
                            <p className="text-[10px] text-slate-400">En línea</p>
                        </div>
                    </div>

                    {/* BUSCADOR */}
                    <div className='relative mb-8 px-1'>
                        <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Buscar..." 
                            className="w-full bg-white/5 text-sm text-white rounded-md py-2 pl-8 pr-2 focus:outline-none border border-white/10 focus:border-[#f0c02f]/50 transition-all"
                        />
                    </div>

                    {/* SECCIÓN SITIO */}
                    <div className='mb-6'>   
                        <p className='text-slate-500 text-[11px] mb-4 uppercase tracking-[2px] font-black'>Sitio</p>

                        <nav className='flex flex-col gap-5'>

                            <Link to="/" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <HomeIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Inicio</span>
                            </Link>

                            <Link to="/about" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <InformationCircleIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Acerca de</span>
                            </Link>

                            <Link to="/contact" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <PhoneIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Contacto</span>
                            </Link>

                        </nav>
                    </div>

                    <div className='flex-1' />

                    {/* ADMINISTRACIÓN */}
                    <div className='mt-4 mb-8'>

                        <p className='text-slate-500 text-[11px] mb-4 uppercase tracking-[2px] font-black'>Administración</p>

                        <nav className='flex flex-col gap-5'>

                            <Link to="/admin" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <Squares2X2Icon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Dashboard</span>
                            </Link>

                            <Link to="/teachers" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <UserGroupIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Maestros</span>
                            </Link>

                            {/* NUEVO MENU HORARIOS */}
                            <Link to="/horarios" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <CalendarDaysIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Horarios</span>
                            </Link>

                            <Link to="/clock" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <ClockIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Reloj</span>
                            </Link>

                            <Link to="/reports" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <DocumentChartBarIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Reportes</span>
                            </Link>

                            <Link to="/config" className="flex items-center gap-4 hover:text-[#f0c02f] transition-all group">
                                <Cog6ToothIcon className={`${iconSize} text-[#f0c02f]`} />
                                <span className='text-sm font-medium'>Configuración</span>
                            </Link>

                        </nav>

                    </div>

                </>
            )}

            {isCollapsed && <div className='flex-1' />}

            {/* FOOTER */}
            <div className={`mt-auto pt-6 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>

                {!isCollapsed ? (
                    <>
                        <button className='flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all group hover:bg-red-500/10'>
                            <ArrowLeftOnRectangleIcon className={`${iconSize} text-red-500`} />
                            <span className='text-sm font-bold text-red-500 uppercase tracking-tight'>
                                Cerrar Sesión
                            </span>
                        </button>

                        <div className='mt-4 text-slate-500 text-[10px] px-4 leading-tight opacity-50'> 
                             Universidad UNID <br />
                             Playa del Carmen • Admin
                        </div>
                    </>
                ) : (
                    <button className='p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors'>
                        <ArrowLeftOnRectangleIcon className={iconSize} />
                    </button>
                )}

            </div>

        </aside>
    );
}

export default Sidebar;