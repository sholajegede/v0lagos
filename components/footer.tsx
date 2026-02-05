import Link from 'next/link'
import V0Icon from "@/components/icons/v0-icon";
import React from "react";

const links = [
    {
        title: 'Vercel',
        href: 'https://vercel.com/',
    },
    {
        title: 'v0',
        href: 'https://v0.dev/',
    },
    {
        title: 'Meetup SDK',
        href: 'https://meetup-sdk.vercel.com/',
    },
    {
        title: 'v0 IRL',
        href: 'https://v0.app/irl',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                    <V0Icon size={30} className='text-foreground'/>
                </Link>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </Link>
                    ))}
                </div>
                <span className="text-muted-foreground block text-center text-sm font-mono">Built with v0, <Link
                    href="https://tailark.com/"
                    className="text-foreground underline">Tailark</Link> & <Link
                    href="https://reactbits.dev/"
                    className="text-foreground underline">React Bits</Link> • Powered by Vercel.</span>
            </div>
        </footer>
    )
}
