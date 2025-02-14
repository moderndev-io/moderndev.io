"use client";
import Image from "next/image";
import Logo from "@/public/moderndev-logo.png";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserNav } from "@/components/layouts/main/items";
import { signOut } from "next-auth/react";
import { UpgradeBanner } from "@/components/layouts/main/items/upgradeBanner";
import { usePathname } from "next/navigation";


type Session = {
  user?: {
    image?: string;
    email?: string;
    name?: string;
  };
};

type NavbarProps = {
  session: Session | null;
};

export const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };

    handleRouteChange();
  }, [pathname]);

  return (
    <div className="navbar bg-transparent pr-8 absolute z-10 w-full">
      <div className="flex-1 z-30">
        <Link href={"/"}>
          <Image onClick={closeMenu} className="w-12 lg:w-16 m-5 cursor-pointer" src={Logo} alt="logo" />
        </Link>
      </div>

      <label htmlFor="menu-toggle" className="z-30 btn btn-circle swap swap-rotate lg:hidden">
        <input
          type="checkbox"
          id="menu-toggle"
          className="hidden"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>

      {/* Full-Screen Overlay Navigation */}
      <div className={`w-screen fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center ${isOpen ? "flex" : "hidden"} lg:hidden`}>
        <nav className="flex flex-col text-white text-xl space-y-4 justify-center">
          <Link href={"/courses"}>
            <div onClick={closeMenu} className="cursor-pointer menu-title text-white text-center text-xl">Courses</div>
          </Link>
          <Link href={"/lab"}>
            <div onClick={closeMenu} className="cursor-pointer menu-title text-white text-center text-xl">Lab</div>
          </Link>
          <Link href={"/offer"}>
            <div onClick={closeMenu} className="cursor-pointer menu-title text-white text-center text-xl">Offer</div>
          </Link>
          <Link target={"_blank"} href={"https://newsletter.moderndev.info/"}>
            <div onClick={closeMenu} className="cursor-pointer menu-title text-white text-center text-xl">Newsletter</div>
          </Link>
          <Link href={"/profile"}>
            <div onClick={closeMenu} className="cursor-pointer menu-title text-white text-center text-xl">Profile</div>
          </Link>
          {/*@ts-ignore*/}
          <UserNav session={session} />
          {session ?
            <button onClick={() => signOut()} className="btn btn-secondary btn-md text-xl text-white max-w-md mx-auto">Log
              Out
            </button>
            :
            null
          }
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex flex-none gap-2">
        {/*<UpgradeBanner />*/}
        <Link href={"/courses"} className="cursor-pointer text-xl menu-title text-white">Courses</Link>
        <Link href={"/lab"} className="cursor-pointer text-xl menu-title text-white">Lab</Link>
        <Link href={"/offer"} className="cursor-pointer text-xl menu-title text-white">Offer</Link>
        <Link target={"_blank"} href={"https://newsletter.moderndev.info/"} className="cursor-pointer text-xl menu-title text-white">Newsletter</Link>

        <UserNav session={session} closeMenu={closeMenu}/>
      </div>
    </div>
  );
};
