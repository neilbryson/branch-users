import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  isPrimary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className = '', isPrimary = true, ...props }: ButtonProps) => {
  return (
    <button
      className={`p-2 border rounded disabled:bg-gray-100 disabled:text-gray-500 ${
        isPrimary ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
      } ${className}`}
      {...props}
    />
  );
};
