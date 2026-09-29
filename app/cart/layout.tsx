import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart | Cyber Monday 2026',
  description: 'Review your items and proceed to secure checkout.',
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
