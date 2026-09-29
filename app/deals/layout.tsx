import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Deals | Cyber Monday 2026',
  description: 'Browse all Cyber Monday deals. Filter by category, price, and rating to find the perfect tech.',
};

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
