'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AboutDropdown({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPopupOpen(true)}
      onMouseLeave={() => setIsPopupOpen(false)}
    >
      <Link
        href="/about"
        className="rounded-full p-4 text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900 sm:text-base"
        onClick={() => setIsOpen(false)}
      >
        Về Chúng Tôi
      </Link>
      {isPopupOpen && (
        <div className="absolute left-0 z-10 mt-3 w-48 rounded-lg bg-white p-2 shadow-lg">
          <ul className="grid">
            <li className="bg-gray-100 m-1 rounded-full p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400">
              <Link
                href="/combos"
                className="m-2 p-4 text-sm text-gray-600 hover:text-gray-900 sm:text-base"
              >
                Combo
              </Link>
            </li>
            <li className="bg-gray-100 m-1 rounded-full p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400">
              <Link
                href="/combos"
                className="m-2 p-4 text-sm text-gray-600 hover:text-gray-900 sm:text-base"
              >
                Combo
              </Link>
            </li>
            <li className="bg-gray-100 m-1 rounded-full p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400">
              <Link
                href="/combos"
                className="m-2 p-4 text-sm text-gray-600 hover:text-gray-900 sm:text-base"
              >
                Combo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
