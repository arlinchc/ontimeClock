import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
    HomeIcon, 
    InformationCircleIcon, 
    PhoneIcon, 
    Squares2X2Icon, 
    UserGroupIcon, 
    ClockIcon, 
    DocumentChartBarIcon, 
    CalendarDaysIcon,
    Bars3Icon, 
    MagnifyingGlassIcon, 
    ArrowLeftOnRectangleIcon, 
    UserCircleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

function Sidebar() {

    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const iconSize = 'h-5 w-5';

    const linkClass = (path) => {
        const isActive = path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

        return `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            isActive
                ? 'bg-white/10 text-[#f0c02f]'
                : 'hover:bg-white/10 hover:text-[#f0c02f]'
        }`;
    };

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#1a1a32] text-white h-screen overflow-y-auto p-4 flex flex-col transition-all duration-300 border-r border-white/10`}>

            {/* CABECERA */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-6`}>
                {!isCollapsed && (
                    <h2 className='text-xl font-bold truncate text-[#f0c02f]'>
                        Reloj Checador
                    </h2>
                )}

                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 transition-colors"
                >
                    <Bars3Icon className="h-7 w-7" />
                </button>
            </div>

            {/* PERFIL */}
            {!isCollapsed && (
                <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-white/5 border border-white/10">
                    <UserCircleIcon className="h-8 w-8 text-[#f0c02f] shrink-0" />
                    <div>
                        <p className="text-xs font-bold truncate">Admin UNID</p>
                        <p className="text-[10px] text-slate-400">En línea</p>
                    </div>
                </div>
            )}

            {/* BUSCADOR */}
            {!isCollapsed && (
                <div className='relative mb-6 px-1'>
                    <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-2.5 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full bg-white/5 text-sm text-white rounded-md py-2 pl-8 pr-2 focus:outline-none border border-white/10 focus:border-[#f0c02f]/50 transition-all"
                    />
                </div>
            )}

            {/* NAV */}
            <div className='flex flex-col gap-4'>

                {/* SITIO */}
                <div>
                    {!isCollapsed && (
                        <p className='text-slate-500 text-[11px] mb-2 uppercase tracking-[2px] font-black'>Sitio</p>
                    )}

                    <nav className='flex flex-col gap-1'>
                        <Link to="/" className={linkClass("/")}>
                            <HomeIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Inicio</span>}
                        </Link>

                        <Link to="/about" className={linkClass("/about")}>
                            <InformationCircleIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Acerca de</span>}
                        </Link>

                        <Link to="/contact" className={linkClass("/contact")}>
                            <PhoneIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Contacto</span>}
                        </Link>
                    </nav>
                </div>

                {/* ADMIN */}
                <div>
                    {!isCollapsed && (
                        <p className='text-slate-500 text-[11px] mb-2 uppercase tracking-[2px] font-black'>Administración</p>
                    )}

                    <nav className='flex flex-col gap-1'>
                        <Link to="/admin" className={linkClass("/admin")}>
                            <Squares2X2Icon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Dashboard</span>}
                        </Link>

                        <Link to="/teachers" className={linkClass("/teachers")}>
                            <UserGroupIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Maestros</span>}
                        </Link>

                        <Link to="/horarios" className={linkClass("/horarios")}>
                            <CalendarDaysIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Horarios</span>}
                        </Link>

                        <Link to="/clock" className={linkClass("/clock")}>
                            <ClockIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Reloj</span>}
                        </Link>

                        <Link to="/reports" className={linkClass("/reports")}>
                            <DocumentChartBarIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Reportes</span>}
                        </Link>

                        <Link to="/config" className={linkClass("/config")}>
                            <Cog6ToothIcon className={iconSize} />
                            {!isCollapsed && <span className='text-sm'>Configuración</span>}
                        </Link>
                    </nav>
                </div>
            </div>

            {/* FOOTER */}
            <div className={`mt-auto pt-6 border-t border-white/10 ${isCollapsed ? 'flex justify-center' : ''}`}>
                {!isCollapsed ? (
                    <button className='flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all hover:bg-red-500/10'>
                        <ArrowLeftOnRectangleIcon className={`${iconSize} text-red-500`} />
                        <span className='text-sm font-bold text-red-500'>Cerrar Sesión</span>
                    </button>
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