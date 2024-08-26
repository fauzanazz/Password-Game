import React from 'react';
import Link from "next/link"
import {Button} from '@/components/ui/button';

const Navbar = () => {
    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link href="#" className="flex items-center" prefetch={false}>
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <Link
                            href="/"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Home
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="font-medium flex items-center text-sm transition-colors hover:underline"
                            prefetch={false}
                        >
                            Leaderboard
                        </Link>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;