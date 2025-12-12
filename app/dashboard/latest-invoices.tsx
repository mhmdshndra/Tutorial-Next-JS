import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';

function formatCurrency(value: unknown) {
  const n = typeof value === 'number' ? value : Number(value ?? 0);
  if (!Number.isFinite(n)) return '$0.00';
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

export default function LatestInvoices({
  latestInvoices,
}: {
  latestInvoices: LatestInvoice[];
}) {
  return (
    <div className="col-span-4 rounded-lg border p-4 shadow bg-white flex flex-col">
      <h2 className="mb-4 text-sm font-medium text-gray-600">Latest Invoices</h2>

      <div className="flex grow flex-col justify-between rounded-md bg-gray-50 p-4">
        <div className="bg-white px-4">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                { 'border-t': i !== 0 },
              )}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {invoice.name}
                  </p>
                  <p className="hidden text-xs text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-bold text-gray-900`}
              >
                {formatCurrency(invoice.amount)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-xs text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}