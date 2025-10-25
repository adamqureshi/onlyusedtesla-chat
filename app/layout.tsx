export const metadata = {
  title: 'Only Used Tesla — Support Chat (Demo)',
  description: 'Ask about listings, dealer imports, or cash offers.'
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}