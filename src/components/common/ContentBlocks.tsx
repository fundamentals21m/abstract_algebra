import type { ReactNode } from 'react';

interface ContentBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Definition({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div className={`border-l-4 border-primary-500 bg-dark-800 rounded-r-lg p-4 ${className}`}>
      <h4 className="font-semibold text-primary-400 mb-2">Definition: {title}</h4>
      <div className="text-dark-200">{children}</div>
    </div>
  );
}

export function Theorem({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div className={`border-l-4 border-amber-500 bg-dark-800 rounded-r-lg p-4 ${className}`}>
      <h4 className="font-semibold text-amber-400 mb-2">Theorem: {title}</h4>
      <div className="text-dark-200">{children}</div>
    </div>
  );
}

export function Example({ title, children, className = '' }: ContentBlockProps) {
  return (
    <div className={`bg-dark-800 rounded-lg p-4 ${className}`}>
      <h4 className="font-semibold text-green-400 mb-2">Example: {title}</h4>
      <div className="text-dark-300">{children}</div>
    </div>
  );
}

export function Proof({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-dark-900 rounded-lg p-4 ${className}`}>
      <p className="text-dark-400 text-sm italic mb-2">Proof:</p>
      <div className="text-dark-300">{children}</div>
      <div className="text-right text-dark-500 mt-2">QED</div>
    </div>
  );
}
