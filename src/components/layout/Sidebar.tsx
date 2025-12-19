import { NavLink } from 'react-router-dom';
import { curriculum } from '../../data/curriculum';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-72 bg-dark-900/95 backdrop-blur-xl border-r border-dark-700/50
          overflow-y-auto scrollbar-thin z-40
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.02] to-transparent pointer-events-none" />

        <nav className="relative p-4">
          {curriculum.map((part) => (
            <div key={part.id} className="mb-6">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500/20 to-cyan-500/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-400">{part.id}</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-dark-500">
                  {part.title}
                </span>
              </div>

              <ul className="space-y-0.5">
                {part.sections.map((section) => (
                  <li key={section.id}>
                    <NavLink
                      to={`/section/${section.id}`}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'text-primary-400 bg-primary-500/10 shadow-sm shadow-primary-500/5'
                            : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800/50'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-500/20 text-primary-400'
                              : 'bg-dark-800/50 text-dark-500 group-hover:bg-dark-700/50 group-hover:text-dark-300'
                          }`}>
                            {section.id}
                          </span>
                          <span className="truncate">{section.title}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
