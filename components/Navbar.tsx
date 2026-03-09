"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "About Us", href: "#about-us" },
    { label: "Certification", href: "#certification" },
    { label: "Contact Us", href: "#contact-us" },
];

const variations = [
    { label: "V1: Classic", href: "/" },
    { label: "V2: Premium Motion", href: "/v2" },
    { label: "V3: Kinetic Premium", href: "/v3" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const pathname = usePathname();

    const currentVariation =
        variations.find((v) => v.href === pathname) || variations[0];

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = () => setDropdownOpen(false);
        if (dropdownOpen) {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }
    }, [dropdownOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-northern-evergreen/95 backdrop-blur-md border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <a
                        href="#home"
                        className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Northern Corporation Logo"
                            width={40}
                            height={40}
                            className="rounded-md object-contain"
                            priority
                        />
                        <span className="text-lg font-bold tracking-wide text-northern-amber hidden sm:inline">
                            Northern Corporation
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-northern-linen/80 rounded-lg transition-colors hover:text-northern-amber hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        ))}

                        {/* Version Dropdown */}
                        <div className="relative ml-2">
                            <button
                                type="button"
                                className="flex items-center gap-1.5 rounded-full border border-northern-amber/30 bg-northern-amber/10 px-3.5 py-1.5 text-xs font-semibold text-northern-amber transition-all hover:bg-northern-amber/20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDropdownOpen(!dropdownOpen);
                                }}
                            >
                                {currentVariation.label}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-northern-evergreen/95 p-1 shadow-xl backdrop-blur-md">
                                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-northern-linen/30">
                                        View Variations
                                    </p>
                                    {variations.map((v) => (
                                        <a
                                            key={v.href}
                                            href={v.href}
                                            className={`flex items-center rounded-lg px-3 py-2 text-sm transition-colors ${v.href === pathname
                                                ? "bg-northern-amber/15 font-semibold text-northern-amber"
                                                : "text-northern-linen/70 hover:bg-white/5 hover:text-northern-linen"
                                                }`}
                                        >
                                            {v.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-northern-linen hover:text-northern-amber transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/10 bg-northern-evergreen/98 backdrop-blur-md">
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-northern-linen/80 rounded-lg transition-colors hover:text-northern-amber hover:bg-white/5"
                            >
                                {link.label}
                            </a>
                        ))}
                        {/* Mobile Variation Links */}
                        <div className="mt-2 border-t border-white/10 pt-2">
                            <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-northern-linen/30">
                                Variations
                            </p>
                            {variations.map((v) => (
                                <a
                                    key={v.href}
                                    href={v.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${v.href === pathname
                                        ? "font-semibold text-northern-amber bg-northern-amber/10"
                                        : "text-northern-linen/60 hover:text-northern-amber"
                                        }`}
                                >
                                    {v.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
