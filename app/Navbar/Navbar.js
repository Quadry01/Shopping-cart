import Link from "next/link";
import React from "react";
import { BsShop } from "react-icons/bs";

function Navbar() {
  return (
    <div className="bg-cyan-900 h-12 ">
      <ul className=" w-auto hidden sm:flex space-x-24  px-2 py-4 text-white ml-64">
        <Link href={"/"}>
          <BsShop className="mr-4 sm:mr-2" />
        </Link>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="#">
          <li>Store</li>{" "}
        </Link>
        <Link href="#">
          <li>Advertise with us</li>
        </Link>
        <Link href="#">
          <li>About us</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
