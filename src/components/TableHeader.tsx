import type { HTMLAttributes } from 'react';

export const TableHeader = (props: HTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className="text-left font-bold border p-0.5" {...props} />
);
