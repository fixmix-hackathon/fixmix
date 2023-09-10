'use client';

import React, { useState, useEffect } from 'react';
import { siteTitle } from './constants/constants';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={`relative py-5 bg-white shadow-md sticky top-0 z-10`}>
      <div className="flex justify-between px-8">
        <Link
          href="/"
          className="text-md md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
        >
          {siteTitle}
        </Link>
        <Link
          href="/login"
          className="text-md md:text-1xl text-gray-600 font-semibold whitespace-pre-line"
        >
          ログイン
        </Link>
      </div>
    </header>
  );
};

export default Header;
