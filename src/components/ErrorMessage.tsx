export type ErrorMessageProps = {
  children: string;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <div className="mt-4 p-4 bg-red-300 text-red-600 font-bold">Error: {children}</div>;
};
