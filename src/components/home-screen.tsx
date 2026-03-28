import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import React, { useRef } from "react"

const renderText = (text:string, className:string, baseWeight:number = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{
            fontVariationSettings: `'wght' ${baseWeight}`
        }}>
            { char === " " ? '\u00A0' : char}
        </span>
    ))
}

const FONT_WEIGHTS = {
    subheading: { min: 100, max: 400, default: 100 },
    heading: { min: 400, max: 900, default: 400 }
}

const textHover = (container: HTMLElement | null, type: keyof typeof FONT_WEIGHTS) => {
    if (!container) return () => {};

    const { min, max, default:base } = FONT_WEIGHTS[type];
    const letters = container.querySelectorAll("span");

    const animateLetter = (letter:HTMLSpanElement, weight:number, duration:number = 0.25) => {
        return gsap.to(letter, { duration, ease: 'power2.out', fontVariationSettings: `'wght' ${weight}`})
    }

    const handleMouseMove = (e:MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2)/20000);

            animateLetter(letter, min + (max - min) * intensity);
        })
    };

    const handleMouseLeave = () => (
        letters.forEach((letter) => animateLetter(letter, base, 0.3))
    );

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave",handleMouseLeave);
    };
}


const HomeScreen = () => {
    const headingRef:React.RefObject<HTMLHeadingElement | null> = useRef(null);
    const subHeadingRef: React.RefObject<HTMLParagraphElement | null>  = useRef(null);

    useGSAP(() => {
        const headingCleanup = textHover(headingRef.current, 'heading');
        const subHeadingCleanup = textHover(subHeadingRef.current, "subheading");

        return () => {
            headingCleanup();
            subHeadingCleanup();
        }
    })
  return (
    <section id="welcome">
        <p ref={subHeadingRef}>
            {renderText("Hi, I'm Shadow! Welcome to my", "text-3xl font-georama", 100)}</p>
        <h1 ref={headingRef}>{renderText("Website", "text-9xl italic font-georama")}</h1>

        <div className="small-screen">
            This Portfolio is designed for desktop/tablet screens only.
        </div>
    </section>
  )
}

export default HomeScreen