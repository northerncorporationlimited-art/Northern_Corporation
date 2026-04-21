"use client";

const buyers = [
    "H&M",
    "ZARA",
    "C&A",
    "PRIMARK",
    "NEXT",
    "S.OLIVER",
];

function MarqueeTrack() {
    return (
        <div className="flex shrink-0 items-center gap-8 animate-marquee">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-northern-amber/70">
                Our Long-Standing Buyers
            </span>
            {buyers.map((name) => (
                <span key={name} className="flex shrink-0 items-center gap-8">
                    <span className="text-[10px] text-white/25">◆</span>
                    <span className="shrink-0 text-sm font-semibold tracking-wide text-white/70">
                        {name}
                    </span>
                </span>
            ))}
            <span className="text-[10px] text-white/25">◆</span>
        </div>
    );
}

export default function InfiniteMarquee() {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/[0.08] bg-gradient-to-r from-northern-evergreen via-[#03402a] to-northern-evergreen">
            <div className="flex py-3.5">
                {/* Two identical tracks for seamless loop */}
                <MarqueeTrack />
                <MarqueeTrack />
            </div>
        </div>
    );
}
