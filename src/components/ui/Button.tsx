import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  children,
  disabled = false,
  onClick,
  ...props
}) => {
  const getStyles = () => {
    const baseStyles = {
      border: 'none',
      borderRadius: 'var(--radius-md)',
      fontWeight: 'var(--font-weight-medium)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles = {
      sm: {
        padding: 'var(--space-2) var(--space-3)',
        fontSize: 'var(--font-size-sm)',
      },
      md: {
        padding: 'var(--space-2) var(--space-4)',
        fontSize: 'var(--font-size-md)',
      },
      lg: {
        padding: 'var(--space-3) var(--space-6)',
        fontSize: 'var(--font-size-lg)',
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: 'var(--color-brand-500)',
        color: 'white',
        '&:hover': {
          backgroundColor: 'var(--color-brand-600)',
        },
        '&:active': {
          backgroundColor: 'var(--color-brand-700)',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'var(--color-brand-500)',
        border: '1px solid var(--color-brand-500)',
        '&:hover': {
          backgroundColor: 'var(--color-brand-50)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-brand-500)',
        '&:hover': {
          backgroundColor: 'var(--color-brand-50)',
        },
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <button
      style={getStyles()}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};