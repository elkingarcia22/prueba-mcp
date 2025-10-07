import React from 'react';

interface CardProps {
  variant?: 'elevated' | 'outline';
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  title,
  subtitle,
  children,
  footer,
  style,
  ...props
}) => {
  const getStyles = () => {
    const baseStyles = {
      backgroundColor: 'var(--color-background-default)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-default)',
      overflow: 'hidden',
    };

    const variantStyles = {
      elevated: {
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      outline: {
        boxShadow: 'none',
        borderColor: 'var(--color-border-default)',
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...style,
    };
  };

  return (
    <div style={getStyles()} {...props}>
      {(title || subtitle) && (
        <div style={{ 
          padding: 'var(--space-6)', 
          borderBottom: '1px solid var(--color-border-default)' 
        }}>
          {title && (
            <h3 style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-default)',
              margin: 0,
              marginBottom: subtitle ? 'var(--space-2)' : 0
            }}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: 'var(--color-text-muted)',
              margin: 0
            }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {children && (
        <div style={{ padding: 'var(--space-6)' }}>
          {children}
        </div>
      )}
      
      {footer && (
        <div style={{ 
          padding: 'var(--space-6)', 
          borderTop: '1px solid var(--color-border-default)',
          backgroundColor: 'var(--color-background-muted)'
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};