import { useRef, useState, useEffect } from "react";

/**
 * Returns a ref to attach to the element and a boolean `isInView`
 * that becomes true once the element is at least `threshold` visible.
 * By default it only fires once (triggerOnce = true).
 */
export function useInViewAnimation(
    threshold = 0.3,
    triggerOnce = true
): { ref: React.RefObject<HTMLDivElement>; isInView: boolean } {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) observer.disconnect();
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, triggerOnce]);

    return { ref, isInView };
}
