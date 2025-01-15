'use server'
import React from 'react'
import Image from 'next/image'
import logo from '../../../public/assets/fuzzieLogo.png'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

const Navbar = async () => {
    return (
        <header className="fixed right-0 left-0 top-0 py-4 px-4 
        bg-black-400 backdrop-blur-lg z-[100] flex items-center
        border-b-[1px] border-neutral-900 justify-between">
            <aside className='flex items-center gap-[2px]'>
                <p className='text-3xl font-bold'>Fu</p>
                <Image
                    src={logo}
                    alt='fuzzie logo'
                    width={20}
                    height={20}
                />
                <p className='text-3xl font-bold'>zie</p>
            </aside>
            <nav className='absolute top-[50%] left-[50%]
            transform translate-x-[-50%] translate-y-[-50%] hidden md:block'>
                <ul className='flex items-center gap-4 list-none'>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                    <li>
                        <Link href='#'>Products</Link>
                    </li>
                </ul>
            </nav>
            <aside>
                <Link href={'/dashboard'} className="inline-flex h-12 animate-shimmer
                 items-center justify-center
                 hover:border-slate-600
                 rounded-md border border-slate-800
                  bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    {true?'Dashboard':'Get Started'}
                </Link>
                <MenuIcon></MenuIcon>

            </aside>
        </header>
    )
}


export default Navbar