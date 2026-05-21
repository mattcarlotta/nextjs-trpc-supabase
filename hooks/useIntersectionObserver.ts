import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
    breakpoint?: number;
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export function useIntersectionObserver({
    breakpoint = 9999,
    root = null,
    rootMargin = "0px",
    threshold = 0.1
}: UseIntersectionObserverOptions) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [shouldObserve, setShouldObserve] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);
    const targetRef = useRef<Element | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const setTargetEl = (element: Element | null) => {
        if (observerRef.current && targetRef.current) {
            observerRef.current.unobserve(targetRef.current);
        }

        targetRef.current = element;

        if (observerRef.current && element && shouldObserve) {
            observerRef.current.observe(element);
        }
    };

    useEffect(() => {
        const checkObserveWindow = () => {
            setShouldObserve(window.innerWidth <= breakpoint);
        };

        checkObserveWindow();

        const ab = new AbortController();

        window.addEventListener("resize", checkObserveWindow, { signal: ab.signal });

        return () => {
            ab.abort();
        };
    }, [breakpoint]);

    useEffect(() => {
        if (!shouldObserve && observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry) {
                    setIsIntersecting(entry.isIntersecting);
                    setHasInitialized(true);
                }
            },
            {
                root,
                rootMargin,
                threshold
            }
        );

        observerRef.current = observer;

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [root, rootMargin, threshold, shouldObserve]);

    return {
        isIntersecting,
        hasInitialized,
        shouldObserve,
        setTargetEl,
        targetRef
    };
}
