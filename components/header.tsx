
import Link from 'next/link'
import React from 'react'
import V0Icon from "@/components/icons/v0-icon";

export const HeroHeader = () => {
    return (
        <header>
            <nav
                className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <V0Icon size={30} className='text-foreground'/>
                                <span className="text-foreground font-mono text-lg">IRL - SD</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
