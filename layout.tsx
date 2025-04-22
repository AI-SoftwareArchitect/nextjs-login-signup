import { ReactNode } from 'react';
import './global.css'; // Tailwind için stil dosyası

export const metadata = {
  title: 'Minimal CRM',
  description: 'A simple CRM application',
};

export default function RootLayout({ 
    children 
  }: { 
    children: ReactNode 
  }) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }