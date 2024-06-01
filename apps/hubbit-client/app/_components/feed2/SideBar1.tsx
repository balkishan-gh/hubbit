import Link from "next/link";
import React from "react";
import { Home, HomeIcon, Search, PlusSquare } from "lucide-react";
import Image from "next/image";

const imgUrl =
  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

function SideBar1() {
  return (
    <div className="h-full flex flex-col p-10 pl-4 pr-20 gap-10">
      <div className="text-2xl text-indigo-600 font-bold">Hubbit.</div>
      <Link href="/feed" className="flex gap-2">
        <Home />
        Home
      </Link>
      <Link href="#" className="flex gap-2">
        <Search />
        Search
      </Link>
      <Link href="#" className="flex gap-2">
        <PlusSquare />
        Create
      </Link>
      <Link href="/my-account" className="flex gap-2">
        <Image
          width={30}
          height={30}
          alt="Profile Pic"
          src={imgUrl}
          className="rounded-full border-[2px] border-indigo-600"
        />
        Profile
      </Link>
    </div>
  );
}

export default SideBar1;
