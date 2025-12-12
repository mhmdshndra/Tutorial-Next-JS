import postgres from 'postgres';

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

export async function fetchRevenue() {
  return await sql<{ month: string; revenue: number }[]>`
    SELECT month, revenue::float AS revenue FROM revenue ORDER BY id ASC
  `;
}

export async function fetchLatestInvoices() {
  return await sql<{
    id: number;
    name: string;
    email: string;
    image_url: string;
    amount: number;
  }[]>`
    SELECT i.id, c.name, c.email, c.image_url, i.amount::float AS amount
    FROM invoices i
    JOIN customers c ON i.customer_id = c.id
    ORDER BY i.date DESC
    LIMIT 5
  `;
}