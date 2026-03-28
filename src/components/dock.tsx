import { dockApps, WINDOW_CONFIG } from "@constants";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react"
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "@store/window";
const Dock = () => {

    const { windows, openWindow, closeWindow, focusWindow } = useWindowStore();
    const dockRef: React.RefObject<HTMLDivElement | null> = useRef(null);
    
    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll(".dock-icon");
        
        const animateIcons = (mouseX: number) => {
            const { left } = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const { left: iLeft, width } = icon.getBoundingClientRect();
                const center = iLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: 'power1.out'
                })
            })
        }

        const handleMouseMove = (e: MouseEvent) => {
            const { left } = dock.getBoundingClientRect();

            animateIcons(e.clientX - left);
        }

        const restIcons = () => (
            icons.forEach((icon) => gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            }))
        );

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", restIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", restIcons);
        }
    }, []);

    const toggleApp = (app:typeof dockApps[0]) => {
        if (!app.canOpen) return;
        const windowKey = app.id as keyof typeof WINDOW_CONFIG;
        const window = windows[windowKey];

        if (window.isOpen) {
            closeWindow(windowKey);
        } else {
            openWindow(windowKey);
        }

        console.log(windows);
    }
    return (
    <section id="dock">
        <div ref={dockRef} className="dock-container">
            { dockApps.map((app) => {
                const { id, name, icon, canOpen } = app;
                return (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp(app) }
                        >
                            <img 
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? '' : 'opacity-60'}    
                            />
                        </button>

                        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default Dock