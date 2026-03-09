"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "About Us", href: "#about-us" },
    { label: "Certification", href: "#certification" },
    { label: "Contact Us", href: "#contact-us" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-northern-evergreen/95 backdrop-blur-md border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <a
                        href="#home"
                        className="text-lg font-bold tracking-wide text-northern-amber transition-colors hover:text-northern-amber/80"
                    >
                        Northern Corporation
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
                    </div>
                </div>
            )}
        </nav>
    );
}
