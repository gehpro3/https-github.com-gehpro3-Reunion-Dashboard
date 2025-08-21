// File: app/ui/Sidebar.tsx

'use client'; // <-- THIS IS THE CRUCIAL LINE

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navLinks = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Guests', href: '/guests', icon: UsersIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col w-64 bg-gray-800 text-white">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Reunion</h1>
      </div>
      <nav className="flex-grow p-2">
        {navLinks.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex items-center space-x-3 rounded-md p-3 text-sm font-medium transition-colors',
                {
                  'bg-indigo-600 text-white': pathname === link.href,
                  'hover:bg-gray-700 hover:text-white': pathname !== link.href,
                }
              )}
            >
              <LinkIcon className="h-6 w-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
