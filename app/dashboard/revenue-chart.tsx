import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

export default function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="col-span-4 rounded-lg border p-4 shadow bg-white">
      <h2 className="mb-4 text-sm font-medium text-gray-600">
        Recent Revenue
      </h2>

      <div className="rounded-md bg-gray-50 p-4">
        <div className="grid grid-cols-12 items-end gap-2 md:gap-4">
          {/* Y Axis labels */}
          <div
            className="mb-6 hidden flex-col justify-between text-xs text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Bars */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-indigo-600"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-xs text-gray-500 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-xs text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}