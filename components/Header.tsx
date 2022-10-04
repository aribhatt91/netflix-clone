import { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if(window.scrollY > 0) {
            setIsScrolled(true);
        }
        const handleScroll = () => {
            if(window.scrollY > 0) {
                setIsScrolled(true);
            }else {
                setIsScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
  return (
    <header className={isScrolled ? 'bg-[#141414]' : `bg-gradient-to-b from-[rgba(0,0,0,.7)] to-transparent`}>
        <div className='flex items-center space-x-2 md:space-x-10'>
            <img src="https://rb.gy/ulxxee" className='cursor-pointer object-contain' width={100} height={100} alt="" />
            <ul className='hidden space-x-4 md:flex'>
                <li className='header__link'>Home</li>
                <li className='header__link'>TV Shows</li>
                <li className='header__link'>Movies</li>
                <li className='header__link'>New & Popular</li>
                <li className='header__link'>My lists</li>
            </ul>
        </div>
        <div className="flex items-center space-x-4 text-small font-light">
            <SearchIcon className="hidden sm:inline w-6 h-6" />
            <p className="hidden lg:inline">Kids</p>
            <BellIcon className="w-6 h-6" />
            <Link href="/account">
                <img src="https://rb.gy/g1pwyx" className="cursor-pointer rounded" />
            </Link>
        </div>
    </header>
  )
}

export default Header