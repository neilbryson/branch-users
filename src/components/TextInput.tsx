import { InputHTMLAttributes } from 'react';

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <input className="border border-gray-800 p-1.5 rounded mb-3 last:mb-0" {...props} />
);
