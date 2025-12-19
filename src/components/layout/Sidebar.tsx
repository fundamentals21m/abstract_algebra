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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-72 bg-dark-900 border-r border-dark-700
          overflow-y-auto scrollbar-thin z-40
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <nav className="p-4">
          {curriculum.map((part) => (
            <div key={part.id} className="mb-6">
              <NavLink
                to={`/part/${part.slug}`}
                className={({ isActive }) =>
                  `block px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    isActive
                      ? 'text-primary-400 bg-primary-900/20'
                      : 'text-dark-500 hover:text-dark-300 hover:bg-dark-800'
                  }`
                }
              >
                Part {part.id}: {part.title}
              </NavLink>

              <ul className="mt-2 space-y-1">
                {part.sections.map((section) => (
                  <li key={section.id}>
                    <NavLink
                      to={`/section/${section.id}`}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'text-primary-400 bg-primary-900/20 font-medium'
                            : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'
                        }`
                      }
                    >
                      <span className="text-dark-500 mr-2">{section.id}.</span>
                      {section.title}
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
