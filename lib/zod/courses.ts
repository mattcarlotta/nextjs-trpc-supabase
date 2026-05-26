import { z } from "zod";
import { id } from "./shared";

export const title = z.string().min(5).max(50);
export const description = z.string().min(10).max(10000);
export const price = z.number().nonnegative();
export const sale_price = z.number().nonnegative().nullable();
export const url = z.string().min(1).max(256);
export const published_status = z.enum([
    "draft",
    "ready_for_review",
    "public_published",
    "private_published",
    "archived",
    "removed"
]);
export const active_published_statuses = published_status.options.filter((s) => s !== "removed");
export const first_name = z.string().min(1).max(256);
export const last_name = z.string().min(1).max(256);
export const created_at = z.coerce.date();
export const published_at = z.coerce.date().nullable();
export const updated_at = published_at;

export const courseListing = z.object({
    id,
    title,
    description,
    price,
    sale_price,
    author: z.object({ id, first_name, last_name }),
    url,
    status: published_status,
    created_at,
    updated_at
});
export type CourseListing = z.infer<typeof courseListing>;

export const courseListings = z.array(courseListing).nullable();
export type CourseListings = z.infer<typeof courseListings>;

export const updateCourseListing = courseListing.pick({
    title: true,
    url: true,
    description: true,
    price: true,
    sale_price: true
});
export type UpdateCourseListing = z.infer<typeof updateCourseListing>;
