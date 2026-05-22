import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TaskFlow — Gestión de tareas',
  description: 'Aplicación de gestión de tareas construida con Next.js',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: ['/favicon.png'],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} from-surface-400 to-surface-50 min-h-screen bg-gray-100 dark:bg-gray-400 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
