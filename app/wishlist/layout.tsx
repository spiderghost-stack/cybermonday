import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Wishlist | Cyber Monday 2026',
  description: 'View the items you have saved for later.',
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
