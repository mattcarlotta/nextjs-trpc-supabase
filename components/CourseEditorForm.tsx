"use client";

import type { CourseListing, UpdateCourseListing } from "~/lib/zod/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm, useWatch } from "react-hook-form";
import useCourseEditor from "~/hooks/useCourseEditor";
import { cn } from "~/lib/tw";
import { updateCourseListing } from "~/lib/zod/courses";
import CourseEditorSkeleton from "./CourseEditorSkeleton";
import { CourseNotFound } from "./CourseNotFound";
import Main from "./Main";
import Input from "./forms/Input";
import { SwitchToggle } from "./forms/SwitchToggle";
import { TextAreaInput } from "./forms/TextAreaInput";

function CourseEditor({ course }: { course: CourseListing }) {
    const [showSalePriceField, setShowSalePriceField] = useState(typeof course.sale_price === "number");
    const { updateCourse, isUpdatingCourse } = useCourseEditor({ courseURL: course.url });

    const methods = useForm<UpdateCourseListing>({
        resolver: zodResolver(updateCourseListing),
        defaultValues: {
            title: course.title,
            url: course.url,
            description: course.description,
            price: course.price / 100,
            sale_price: typeof course.sale_price === "number" ? course.sale_price / 100 : null
        }
    });
    const coursePrice =
        useWatch({
            control: methods.control,
            name: "price"
        }) || 0;

    const handleToggleShowSalePrice = () => {
        setShowSalePriceField((p) => !p);
        methods.setValue("sale_price", null);
    };

    const onSubmit: SubmitHandler<UpdateCourseListing> = async (data) => {
        updateCourse({
            ...data,
            sale_price: showSalePriceField && data.price > 0 ? data.sale_price : null
        });
    };

    return (
        <div className="space-y-4 p-5 pb-10 tracking-wider">
            <Link
                href={`/course/${course.url}/`}
                className={cn(
                    "group inline-flex max-w-max items-center gap-1 self-start text-sm text-neutral-500 transition-colors",
                    "hover:text-blue-600",
                    "focus-visible:text-blue-600 focus-visible:outline-none",
                    "dark:text-neutral-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400"
                )}
            >
                <p className="transition-transform group-hover:-translate-x-1" aria-hidden>
                    ←
                </p>
                <p>Go back to course</p>
            </Link>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-y-4 md:px-4">
                    <div className="space-y-1">
                        <h1 data-testid="page-title" className="text-2xl font-bold lg:text-4xl">
                            Course Editor
                        </h1>
                        <div className="flex items-center space-x-1 text-xs">
                            <sub className="flex w-3 shrink-0 items-center justify-center text-[1.25rem]">*</sub>
                            <p>Field is required</p>
                        </div>
                    </div>
                    <Input
                        label="Course Title*"
                        name="title"
                        type="text"
                        disabled={isUpdatingCourse}
                        placeholder="Enter an eye catching title..."
                        min={5}
                        max={256}
                        showCharactersLeft
                    />
                    <TextAreaInput
                        label="Course Description*"
                        name="description"
                        disabled={isUpdatingCourse}
                        placeholder="Write a brief, yet capturing, summary about the course..."
                        rows={8}
                        maxLength={1000}
                        showCharactersLeft
                    />
                    <Input
                        label="Course Price*"
                        name="price"
                        disabled={isUpdatingCourse}
                        type="number"
                        step="0.01"
                        min={0}
                        placeholder="Enter a course price (9.99) or use 0.00 to make it free..."
                    />
                    <SwitchToggle
                        className={cn(!coursePrice && "hidden")}
                        name="price_field"
                        disabled={isUpdatingCourse}
                        label={<p className="sr-only">{showSalePriceField ? "Remove" : "Add a"} course sale price</p>}
                        labelDescription={<p>{showSalePriceField ? "Remove" : "Add a"} course sale price</p>}
                        checked={showSalePriceField}
                        onToggleChange={handleToggleShowSalePrice}
                    />
                    <Input
                        containerClassName={cn(Boolean(!coursePrice || !showSalePriceField) && "hidden")}
                        label="Course on Sale Price"
                        name="sale_price"
                        type="number"
                        disabled={isUpdatingCourse}
                        min={0}
                        max={coursePrice ?? undefined}
                        step="0.01"
                        required={false}
                        placeholder="Enter a course on sale price (must be less than original)..."
                    />
                    <button
                        type="submit"
                        className={cn(
                            "mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg p-3 text-xl font-bold text-white transition-colors",
                            "border border-blue-700 bg-blue-500 hover:bg-blue-600",
                            "dark:border-blue-500 dark:bg-blue-600 dark:hover:border-blue-500 dark:hover:bg-blue-700",
                            "disabled:pointer-events-none disabled:border-transparent disabled:bg-neutral-500 disabled:text-neutral-200",
                            "dark:border-transparent dark:disabled:bg-neutral-800 dark:disabled:text-neutral-500"
                        )}
                        disabled={isUpdatingCourse}
                    >
                        {isUpdatingCourse ? "Saving..." : "Update Course"}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
}

export default function CourseEditorForm({ courseURL }: { courseURL: string }) {
    const { course, isLoadingCourse, courseError } = useCourseEditor({ courseURL });

    if (isLoadingCourse) {
        return <CourseEditorSkeleton />;
    }

    if (!course || courseError) {
        return <CourseNotFound error={courseError || "Course not found"} />;
    }

    return (
        <Main>
            <div
                className={cn(
                    "w-full max-w-6xl rounded-lg border border-neutral-300 bg-white shadow-lg",
                    "dark:border-neutral-600 dark:bg-neutral-900"
                )}
            >
                <CourseEditor course={course} />
            </div>
        </Main>
    );
}
