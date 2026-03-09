"use client";

import {
    Award,
    Factory,
    Users,
    TrendingUp,
    Baby,
    Scale,
    GraduationCap,
    Heart,
    Stethoscope,
    UtensilsCrossed,
} from "lucide-react";
import FadeInScroll from "@/components/animations/FadeInScroll";

const pillars = [
    {
        icon: Award,
        title: "Decades of Expertise",
        description:
            "Since 1987, we have refined our craft through decades of hands-on experience, building deep institutional knowledge in garment manufacturing.",
    },
    {
        icon: TrendingUp,
        title: "Uncompromising Quality",
        description:
            "Every garment passes through rigorous quality checkpoints — from raw fiber inspection to final finishing — ensuring consistency that global brands trust.",
    },
    {
        icon: Factory,
        title: "Future-Focused Innovation",
        description:
            "We continuously invest in cutting-edge machinery, sustainable practices, and process optimization to stay ahead in a rapidly evolving industry.",
    },
];

const capacityStats = [
    { value: "1,300+", label: "Machines", icon: Factory },
    { value: "3,000+", label: "Employees", icon: Users },
    { value: "$30M", label: "Annual Revenue", icon: TrendingUp },
];

const workLifeItems = [
    {
        icon: Baby,
        title: "Daycare Center",
        description:
            "On-site childcare services so parents can work with peace of mind, knowing their children are safe and cared for.",
    },
    {
        icon: Scale,
        title: "Equality",
        description:
            "We foster a culture of equal opportunity, ensuring fair treatment and advancement for all employees regardless of background.",
    },
    {
        icon: GraduationCap,
        title: "Professional Development",
        description:
            "Continuous training programs and skill-building workshops empower our team to grow and advance in their careers.",
    },
    {
        icon: Heart,
        title: "Prayer Rooms",
        description:
            "Separate prayer rooms for male and female employees, equipped with essentials for spiritual practice and led by an Imam.",
    },
    {
        icon: Stethoscope,
        title: "Medical Service",
        description:
            "Comprehensive on-site medical facilities with doctors, nurses, and a psychology center — all free of charge for employees.",
    },
    {
        icon: UtensilsCrossed,
        title: "Dining",
        description:
            "Spacious dining areas with free, healthy meals and snacks prepared in separate kitchens to the highest standards.",
    },
];

export default function AboutUsContent() {
    return (
        <div className="mx-auto max-w-6xl">
            {/* History Blurb */}
            <div className="text-center">
                <FadeInScroll>
                    <span className="mb-4 inline-block rounded-full border border-northern-evergreen/20 bg-northern-evergreen/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-northern-evergreen">
                        Our Story
                    </span>
                </FadeInScroll>
                <FadeInScroll delay={0.15}>
                    <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl md:text-5xl">
                        About Us
                    </h2>
                </FadeInScroll>
                <FadeInScroll delay={0.3}>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-northern-evergreen/60 sm:text-lg">
                        Established in 1987, Northern Corporation Ltd. has spent nearly four
                        decades mastering the art of garment manufacturing. From a modest
                        beginning in Dhaka, Bangladesh, we have grown into a trusted
                        partner for the world&apos;s leading fashion and retail brands —
                        producing millions of premium garments every year.
                    </p>
                </FadeInScroll>
            </div>

            {/* 3 Core Pillars */}
            <div className="mt-16 sm:mt-20">
                <FadeInScroll>
                    <h3 className="mb-8 text-center text-xl font-bold text-northern-evergreen sm:text-2xl">
                        Our Core Pillars
                    </h3>
                </FadeInScroll>
                <div className="grid gap-6 sm:grid-cols-3">
                    {pillars.map((pillar, i) => (
                        <FadeInScroll key={pillar.title} delay={0.1 * (i + 1)}>
                            <div className="group flex flex-col items-center rounded-2xl border border-northern-evergreen/10 bg-northern-linen p-6 text-center shadow-sm transition-all hover:shadow-md hover:border-northern-evergreen/20 sm:p-8">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-northern-evergreen text-northern-amber transition-transform group-hover:scale-110">
                                    <pillar.icon size={28} />
                                </div>
                                <h4 className="mb-2 text-lg font-bold text-northern-evergreen">
                                    {pillar.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-northern-evergreen/60">
                                    {pillar.description}
                                </p>
                            </div>
                        </FadeInScroll>
                    ))}
                </div>
            </div>

            {/* Production Capacity */}
            <div className="mt-16 sm:mt-20">
                <FadeInScroll>
                    <h3 className="mb-8 text-center text-xl font-bold text-northern-evergreen sm:text-2xl">
                        Production Capacity
                    </h3>
                </FadeInScroll>
                <div className="grid gap-6 sm:grid-cols-3">
                    {capacityStats.map((stat, i) => (
                        <FadeInScroll key={stat.label} delay={0.1 * (i + 1)}>
                            <div className="flex flex-col items-center rounded-2xl border border-northern-amber/20 bg-northern-evergreen p-8 text-center shadow-lg">
                                <stat.icon
                                    size={24}
                                    className="mb-3 text-northern-amber/60"
                                />
                                <span className="text-3xl font-extrabold text-northern-amber sm:text-4xl">
                                    {stat.value}
                                </span>
                                <span className="mt-1 text-sm font-medium text-northern-linen/60">
                                    {stat.label}
                                </span>
                            </div>
                        </FadeInScroll>
                    ))}
                </div>
            </div>

            {/* Work Life */}
            <div className="mt-16 sm:mt-20">
                <FadeInScroll>
                    <h3 className="mb-2 text-center text-xl font-bold text-northern-evergreen sm:text-2xl">
                        Work Life at Northern
                    </h3>
                    <p className="mx-auto mb-8 max-w-lg text-center text-sm text-northern-evergreen/50">
                        We invest in our people — because great garments start with a
                        happy, healthy, and empowered workforce.
                    </p>
                </FadeInScroll>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {workLifeItems.map((item, i) => (
                        <FadeInScroll key={item.title} delay={0.08 * (i + 1)}>
                            <div className="group flex gap-4 rounded-xl border border-northern-evergreen/10 bg-northern-linen p-5 transition-all hover:shadow-md hover:border-northern-evergreen/20">
                                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-northern-evergreen/10 text-northern-evergreen transition-colors group-hover:bg-northern-evergreen group-hover:text-northern-amber">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-northern-evergreen">
                                        {item.title}
                                    </h4>
                                    <p className="mt-1 text-xs leading-relaxed text-northern-evergreen/55">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </FadeInScroll>
                    ))}
                </div>
            </div>
        </div>
    );
}
