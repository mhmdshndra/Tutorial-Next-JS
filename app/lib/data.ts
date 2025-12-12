import postgres from 'postgres';
import { Revenue, LatestInvoice, InvoicesTable } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCardData() {
  const [{ count: invoices }] = await sql`SELECT COUNT(*)::int AS count FROM invoices`;
  const [{ count: customers }] = await sql`SELECT COUNT(*)::int AS count FROM customers`;
  const [{ total: paid }] = await sql`SELECT COALESCE(SUM(amount), 0)::float AS total FROM invoices WHERE status='paid'`;
  const [{ total: pending }] = await sql`SELECT COALESCE(SUM(amount), 0)::float AS total FROM invoices WHERE status='pending'`;

  return {
    numberOfInvoices: invoices,
    numberOfCustomers: customers,
    totalPaidInvoices: paid,
    totalPendingInvoices: pending,
  };
}

export async function fetchRevenue(): Promise<Revenue[]> {
  return await sql<Revenue[]>`
    SELECT month, revenue::float AS revenue FROM revenue ORDER BY id ASC
  `;
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return await sql<LatestInvoice[]>`
    SELECT i.id, c.name, c.email, c.image_url, i.amount::float AS amount
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
    LIMIT 5
  `;
}

/**
 * Fungsi ini dipakai di app/dashboard/invoices/table.tsx
 * untuk menampilkan tabel invoice dengan filter pencarian.
 */
export async function fetchFilteredInvoices(query: string): Promise<InvoicesTable[]> {
  return await sql<InvoicesTable[]>`
    SELECT i.id, i.customer_id, c.name, c.email, c.image_url,
           i.date, i.amount::float AS amount, i.status
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    WHERE c.name ILIKE ${'%' + query + '%'}
       OR c.email ILIKE ${'%' + query + '%'}
       OR CAST(i.amount AS TEXT) ILIKE ${'%' + query + '%'}
       OR i.status ILIKE ${'%' + query + '%'}
    ORDER BY i.date DESC
  `;
}