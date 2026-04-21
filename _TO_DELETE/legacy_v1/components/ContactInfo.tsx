"use client";

import { MapPin, Clock, Phone, Mail, Globe } from "lucide-react";
import FadeInScroll from "@/components/animations/FadeInScroll";

const contactDetails = [
    {
        icon: MapPin,
        title: "Location",
        lines: ["Northern Corporation Ltd.", "Dhaka, Bangladesh"],
    },
    {
        icon: Clock,
        title: "Work Hours",
        lines: ["Monday – Friday", "9:00 AM – 6:00 PM (BST)"],
    },
    {
        icon: Phone,
        title: "Phone",
        lines: ["+880-2-XXXX-XXXX", "+880-1XXX-XXXXXX"],
    },
    {
        icon: Mail,
        title: "Email",
        lines: ["info@northerncorp.com", "sales@northerncorp.com"],
    },
    {
        icon: Globe,
        title: "Web",
        lines: ["www.northerncorp.com"],
    },
];

export default function ContactInfo() {
    return (
        <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="text-center">
                <FadeInScroll>
                    <span className="mb-4 inline-block rounded-full border border-northern-amber/30 bg-northern-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-northern-amber">
                        Let&apos;s Connect
                    </span>
                </FadeInScroll>
                <FadeInScroll delay={0.15}>
                    <h2 className="text-3xl font-bold text-northern-linen sm:text-4xl md:text-5xl">
                        Contact Us
                    </h2>
                </FadeInScroll>
                <FadeInScroll delay={0.3}>
                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-northern-linen/60 sm:text-lg">
                        Ready to partner with us? Reach out to discuss your next project —
                        we&apos;d love to hear from you.
                    </p>
                </FadeInScroll>
            </div>

            {/* Contact Cards */}
            <FadeInScroll delay={0.15}>
                <div className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {contactDetails.map((item) => (
                        <div
                            key={item.title}
                            className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-northern-amber/20"
                        >
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-northern-amber/10 text-northern-amber transition-colors group-hover:bg-northern-amber/20">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-northern-linen">
                                    {item.title}
                                </h4>
                                {item.lines.map((line) => (
                                    <p
                                        key={line}
                                        className="mt-0.5 text-sm text-northern-linen/55"
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </FadeInScroll>

            {/* CTA */}
            <FadeInScroll delay={0.25}>
                <div className="mt-12 text-center">
                    <a
                        href="mailto:info@northerncorp.com"
                        className="inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:scale-105 hover:shadow-northern-amber/30"
                    >
                        <Mail size={16} />
                        Send Us an Email
                    </a>
                </div>
            </FadeInScroll>
        </div>
    );
}
