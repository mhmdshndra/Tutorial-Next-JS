// app/dashboard/page.tsx
import { Card } from '@/app/dashboard/cards';
import RevenueChart from '@/app/dashboard/revenue-chart';
import LatestInvoices from '@/app/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from '@/app/lib/data'; // pastikan path ini benar dan file-nya ada

export const dynamic = 'force-dynamic';

export default async function Page() {
  // Pastikan semua fungsi benar-benar mengembalikan data sesuai tipe
  const revenue = await fetchRevenue(); // Array<{ month: string; revenue: number }>
  const latestInvoices = await fetchLatestInvoices(); // Array<{ id; name; email; image_url; amount }>
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // numbers

  // Guard sederhana: jika data kosong/null, tetap render aman
  const safeRevenue = Array.isArray(revenue) ? revenue : [];
  const safeLatest = Array.isArray(latestInvoices) ? latestInvoices : [];

  return (
    <main className="p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices ?? 0} type="collected" />
        <Card title="Pending" value={totalPendingInvoices ?? 0} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices ?? 0} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers ?? 0} type="customers" />
      </div>

      {/* Chart + Latest Invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={safeRevenue} />
        <LatestInvoices latestInvoices={safeLatest} />
      </div>
    </main>
  );
}