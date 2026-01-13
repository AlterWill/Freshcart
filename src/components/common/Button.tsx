import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-white shadow-lg shadow-[var(--brand-primary)]/30 border border-transparent focus:ring-[var(--brand-primary)]",
    secondary: "bg-[var(--text-primary)] text-[var(--bg-surface)] hover:opacity-90 shadow-md border border-transparent focus:ring-[var(--text-secondary)]",
    outline: "bg-transparent border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-light)]/10 focus:ring-[var(--brand-primary)]",
    ghost: "bg-transparent text-theme-secondary hover:bg-theme-surface-2 hover:text-theme-primary focus:ring-theme-secondary",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/30 focus:ring-red-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
