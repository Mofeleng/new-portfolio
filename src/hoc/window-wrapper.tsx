import type { WINDOW_CONFIG } from "@constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "@store/window";
import gsap from "gsap";
import { useLayoutEffect, useRef, type ComponentType } from "react";
import { Draggable } from "gsap/all";

type WindowKey = keyof typeof WINDOW_CONFIG;

const WindowWrapper = <P extends object>(
    Component: ComponentType<P>,
    windowKey: WindowKey
) => {
    const Wrapped = (props: P) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];

        const ref:React.RefObject<HTMLElement | null> = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'}
            );
        }, [isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey)})

            return () => instance.kill();
        }, []);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className="absolute"

            >
                <Component {...props} />
            </section>
        )
    }

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`
    return Wrapped;
}

export default WindowWrapper;