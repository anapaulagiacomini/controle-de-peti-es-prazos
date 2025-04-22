import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

interface LinkButtonProps {
  to: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    case 'secondary':
      return 'bg-teal-600 hover:bg-teal-700 text-white';
    case 'danger':
      return 'bg-red-600 hover:bg-red-700 text-white';
    case 'success':
      return 'bg-green-600 hover:bg-green-700 text-white';
    case 'outline':
      return 'bg-transparent hover:bg-gray-100 text-indigo-600 border border-indigo-600';
    default:
      return 'bg-indigo-600 hover:bg-indigo-700 text-white';
  }
};

const getSizeClasses = (size: ButtonSize): string => {
  switch (size) {
    case 'sm':
      return 'text-xs py-1 px-2';
    case 'md':
      return 'text-sm py-2 px-4';
    case 'lg':
      return 'text-base py-3 px-6';
    default:
      return 'text-sm py-2 px-4';
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className} inline-flex items-center justify-center`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  children,
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} inline-flex items-center justify-center`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};