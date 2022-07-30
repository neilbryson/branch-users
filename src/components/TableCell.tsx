import type { HTMLAttributes } from 'react';

export const TableCell = (props: HTMLAttributes<HTMLTableDataCellElement>) => (
  <td className="text-left border p-0.5" {...props} />
);
