"use client";

import Link from "next/link";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { toUSDCurrency } from "~/lib/currency";
import { cn } from "~/lib/tw";

type CourseCTAButtonProps = {
    courseId: string;
    coursePrice: number;
    courseSalePrice: number | null;
};

type EnrollButtonProps = {
    ariaHidden?: boolean;
    className?: string;
    courseId: string;
    courseListPrice: number;
    courseSalePrice: number | null;
    tabIndex?: number;
};
const defaultClasses =
    "flex mt-8 w-full py-2.5 px-5 max-w-max cursor-pointer items-center justify-center rounded-lg text-center text-xl font-bold bg-amber-600 border border-transparent transition-colors shadow-md text-white hover:bg-amber-700 dark:bg-amber-700 dark:border-amber-500 dark:hover:bg-amber-600 dark:hover:border-amber-500 md:text-2xl";

function EnrollButton({
    ariaHidden,
    className,
    courseId,
    courseListPrice,
    courseSalePrice,
    tabIndex
}: EnrollButtonProps) {
    const courseOnSale = courseSalePrice !== null;
    const salePrice = (courseSalePrice || 0) / 100;

    const coursePriceIsFree = courseListPrice === 0;
    const coursePrice = (courseListPrice || 0) / 100;
    const freeCourse = (courseOnSale && salePrice === 0) || coursePriceIsFree;
    const coursePriceWithCurrency = toUSDCurrency(coursePrice);
    const courseSalePriceWithCurrency = toUSDCurrency(salePrice || 0);

    if (!freeCourse) {
        return (
            <Link
                aria-hidden={ariaHidden}
                data-testid="buy-course-link"
                className={cn(defaultClasses, className)}
                href={`/checkout/${courseId}/`}
                prefetch={false}
                tabIndex={tabIndex}
            >
                <p className="flex items-center">
                    <span>Enroll Now For&nbsp;</span>
                    {courseOnSale && <span>{salePrice === 0 ? "Free!" : courseSalePriceWithCurrency}&nbsp;</span>}
                    <span className={cn(courseOnSale && "text-sm text-white/90 line-through")}>
                        {coursePriceWithCurrency}
                    </span>
                </p>
            </Link>
        );
    }

    return (
        <button
            aria-hidden={ariaHidden}
            data-testid="enroll-now-button"
            className={cn(defaultClasses, className)}
            tabIndex={tabIndex}
            type="button"
            onClick={() => alert("Enrolled!")}
        >
            <p className="flex items-center">
                <span>Enroll Now For Free!</span>
                {!coursePriceIsFree && (
                    <span className="text-sm text-white/90 line-through">&nbsp;{coursePriceWithCurrency}</span>
                )}
            </p>
        </button>
    );
}

export default function CourseCTAButton({ coursePrice, courseSalePrice, courseId }: CourseCTAButtonProps) {
    const { hasInitialized, isIntersecting, setTargetEl } = useIntersectionObserver({
        breakpoint: 768,
        rootMargin: "-68px 0px 0px 0px",
        threshold: 1
    });

    const showMobileCTA = !isIntersecting;

    return (
        <>
            <span ref={(e) => setTargetEl(e)}>
                <EnrollButton courseId={courseId} courseListPrice={coursePrice} courseSalePrice={courseSalePrice} />
            </span>
            <div
                className={cn(
                    "bg-background border-border-light dark:border-dark-border-light fixed -bottom-px left-0 z-10 w-full border-t drop-shadow-[0_-4px_3px_rgba(0,0,0,0.20)] transition-transform duration-200 ease-in-out md:hidden",
                    hasInitialized && showMobileCTA
                        ? "pointer-events-auto translate-y-0"
                        : "pointer-events-none translate-y-full"
                )}
                inert={!showMobileCTA ? true : undefined}
            >
                <div className="p-3">
                    <EnrollButton
                        ariaHidden={!showMobileCTA}
                        courseId={courseId}
                        courseListPrice={coursePrice}
                        courseSalePrice={courseSalePrice}
                        tabIndex={showMobileCTA ? undefined : -1}
                    />
                </div>
            </div>
        </>
    );
}
