import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "./lib/utils";
import { Link, useLocation } from "react-router-dom";
// import HeaderLogo from '../assets/header_logo.png';

type HeaderProps = {
  children?: ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const location = useLocation(); // Get the current location
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  // Function to check if the link is the current active route
  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "w-full fixed top-0 z-50 backdrop-blur-3xl border-1 py-1 shadow-md"
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo or text */}
        <Link to="/">
          <img src="/main_logo.svg" alt="logo" className="h-10" />
        </Link>

        {/* Middle: Empty */}
        <div className="flex-1"></div>

        {/* Right: Navigation links (Desktop and Tablet View) */}
        <nav className="hidden md:flex items-center gap-6 mr-6">
          <Link to="/">
            <Button
              variant={isActive("/") ? "active" : "elegant"}
              className={cn(
                "text-sm border-1 border-slate-400",
                isActive("/") ? "bg-blue-500 text-white" : "text-black"
              )}
            >
              Home
            </Button>
          </Link>
          
          
          
          <Link to="/chat">
            <Button
              variant={isActive("/chat") ? "active" : "elegant"}
              className={cn(
                "text-sm border-slate-400 ",
                isActive("/chat") ? "bg-blue-500 text-white " : "text-black"
              )}
            >
              LinkSage
            </Button>
          </Link>
          <Link to="/doc">
            <Button
              variant={isActive("/doc") ? "active" : "elegant"}
              className={cn(
                "text-sm border-slate-400",
                isActive("/doc") ? "bg-blue-500 text-white" : "text-black"
              )}
            >
              DocScanner
            </Button>
          </Link>
          <Link to="/culprit">
            <Button
              variant={isActive("/culprit") ? "active" : "elegant"}
              className={cn(
                "text-sm border-slate-400",
                isActive("/culprit") ? "bg-blue-500 text-white" : "text-black"
              )}
            >
              Culprit
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant={isActive("/about") ? "active" : "elegant"}
              className={cn(
                "text-sm border-slate-400",
                isActive("/about") ? "bg-blue-500 text-white" : "text-black"
              )}
            >
              About
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white text-black px-6 py-3`}
      >
        <Link to="/" className="block py-2">
          <Button
            variant={isActive("/") ? "active" : "elegant"}
            className={cn(
              "text-sm",
              isActive("/") ? "bg-blue-500 text-white" : "text-black"
            )}
          >
            Home
          </Button>
        </Link>
        
        <Link to="/culprit" className="block py-2">
          <Button
            variant={isActive("/culprit") ? "active" : "elegant"}
            className={cn(
              "text-sm",
              isActive("/culprit") ? "bg-blue-500 text-white" : "text-black"
            )}
          >
            Culprit
          </Button>
        </Link>
        <Link to="/doc" className="block py-2">
          <Button
            variant={isActive("/doc") ? "active" : "elegant"}
            className={cn(
              "text-sm",
              isActive("/doc") ? "bg-blue-500 text-white" : "text-black"
            )}
          >
            DocScanner
          </Button>
        </Link>
        <Link to="/chat" className="block py-2">
          <Button
            variant={isActive("/chat") ? "active" : "elegant"}
            className={cn(
              "text-sm",
              isActive("/chat") ? "bg-blue-500 text-white" : "text-black"
            )}
          >
            LinkSage
          </Button>
        </Link>
        <Link to="/about" className="block py-2">
          <Button
            variant={isActive("/about") ? "active" : "elegant"}
            className={cn(
              "text-sm",
              isActive("/about") ? "bg-blue-500 text-white" : "text-black"
            )}
          >
            About
          </Button>
        </Link>
      
      </div>

    </header>
  );
};

export default Header;
