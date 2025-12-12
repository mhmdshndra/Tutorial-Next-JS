import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
} as const;

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-lg border p-4 shadow bg-white">
      <div className="flex items-center mb-2">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} text-xl font-bold text-gray-900 text-center`}
      >
        {typeof value === 'number'
          ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
          : value}
      </p>
    </div>
  );
}