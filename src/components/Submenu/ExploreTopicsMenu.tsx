'use client';

import Link from 'next/link';
import { useState } from 'react';
import ExploreTopics from '@/components/ExploreTopics';

export default function ExploreTopicsMenu({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
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
        <div
          className="fixed left-0 z-50 mt-3 w-screen rounded-lg bg-white p-4 shadow-lg"
        >
          <ExploreTopics />
        </div>
      )}
    </div>
  );
}
