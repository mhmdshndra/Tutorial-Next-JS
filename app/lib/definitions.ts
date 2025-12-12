// Type definitions untuk data dashboard

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: number;            // integer di database
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: number;
  customer_id: number;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: number;            // ubah ke number
  name: string;
  image_url: string;
  email: string;
  amount: number;        // ubah ke number
};

export type InvoicesTable = {
  id: number;
  customer_id: number;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: number;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: number;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: number;
  name: string;
};

export type InvoiceForm = {
  id: number;
  customer_id: number;
  amount: number;
  status: 'pending' | 'paid';
};