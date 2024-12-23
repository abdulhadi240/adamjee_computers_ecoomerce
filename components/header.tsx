"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon, SearchIcon } from "@sanity/icons";
import Link from "next/link";
import React from "react";
import useBasketStore from "@/store/store";

const Header = () => {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 shadow-lg">
      {/* Upper section: Navigation links & Account section */}
      <div className="container mx-auto flex justify-between items-center text-sm font-medium flex-wrap">
        <div className="flex space-x-4 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
          <Link href="/about" className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
            About Shopr
          </Link>
          <Link href="/feedbacks" className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
            Feedback & Suggestions
          </Link>
          <Link href="/contact" className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
  Contact Us
</Link>

          <Link href="/faqs" className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
            FAQs
          </Link>
          <Link href="/Policies" className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
            Policies
          </Link>
        </div>

        {/* Account section */}
        <div className="flex space-x-4 items-center flex-wrap justify-center sm:justify-end w-full sm:w-auto mt-3 sm:mt-0">
          {user ? (
            <div className="flex items-center space-x-3">
              <UserButton />
              <div className="hidden sm:block text-xs">
                <p className="text-gray-200">Welcome Back</p>
                <p className="font-bold">{user.fullName}</p>
              </div>
            </div>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
                  Log in
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="hover:text-gray-300 transition-colors ease-in-out duration-300 text-sm">
                  Create Account
                </button>
              </SignInButton>
            </>
          )}
        </div>
      </div>

      {/* Gradient line below navigation links */}
      <div className="border-t-2 border-gradient-to-r from-indigo-600 to-purple-700 my-2"></div>

      {/* Main section: Logo, Search bar, Basket, and Orders */}
      <div className="container mx-auto flex justify-between items-center mt-4 space-x-4 flex-wrap">
        <Link href="/" className="text-3xl font-semibold text-white hover:text-gray-200 transition-colors ease-in-out duration-300 shadow-md">
          Shopr
        </Link>

        {/* Search bar with button */}
        <form
          action="/search"
          method="GET"
          className="flex items-center space-x-3 w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-white text-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-xl transition-all ease-in-out duration-300 shadow-md hover:shadow-lg"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-3 rounded-full hover:from-blue-700 hover:to-teal-600 transition-all ease-in-out duration-300"
          >
            <SearchIcon className="w-5 h-5" />
          </button>
        </form>

        {/* Basket and Orders */}
        <div className="flex items-center space-x-4 mt-3 sm:mt-0 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
          <Link
            href="/basket"
            className="flex relative items-center space-x-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-full transition-all ease-in-out duration-300"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>My Basket</span>
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-2 px-4 rounded-full transition-all ease-in-out duration-300"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
