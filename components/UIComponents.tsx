import React from 'react';
import { Info } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'outline' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ status: string; type?: 'success' | 'warning' | 'error' | 'neutral' }> = ({ status, type = 'neutral' }) => {
  const styles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    neutral: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
      {status}
    </span>
  );
};

export const PrdInfo: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg overflow-hidden">
      <div 
        className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-blue-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 text-blue-800">
          <Info className="h-5 w-5" />
          <span className="font-semibold text-sm">PRD 页面说明: {title}</span>
        </div>
        <span className="text-blue-600 text-xs">{isOpen ? '收起' : '展开'}</span>
      </div>
      {isOpen && (
        <div className="px-4 py-3 text-sm text-blue-900 border-t border-blue-100 bg-blue-50/50">
          {content}
        </div>
      )}
    </div>
  );
};

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode; 
  footer?: React.ReactNode 
}> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
