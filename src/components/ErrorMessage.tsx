import { HTMLAttributes } from 'react';

export type ErrorMessageProps = {
  children: string;
} & HTMLAttributes<HTMLDivElement>;

export const ErrorMessage = ({ children, ...props }: ErrorMessageProps) => {
  return (
    <div className="mt-4 p-4 bg-red-300 text-red-600 font-bold" {...props}>
      Error: {children}
    </div>
  );
};
