import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "~/lib/trpc/client";

export type UseCourseEditorProps = {
    courseURL: string;
};

export default function useCourseEditor({ courseURL }: UseCourseEditorProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    const {
        data: { course, error: courseError },
        isLoading: isLoadingCourse
    } = useSuspenseQuery(trpc.getCourse.queryOptions({ url: courseURL }));

    const { mutate: updateCourse, isPending: isUpdatingCourse } = useMutation(
        trpc.updateCourse.mutationOptions({
            onSuccess: async (updatedCourse) => {
                queryClient.setQueryData(trpc.getCourse.queryKey({ url: updatedCourse.url }), (old) => {
                    if (!old?.course) return old;

                    return {
                        course: { ...old.course, ...updatedCourse },
                        error: null
                    };
                });

                router.push(`/course/${courseURL}/`);
            },
            onError: (error) => {
                alert(error.message);
            }
        })
    );

    return {
        course,
        courseError,
        isLoadingCourse,

        updateCourse,
        isUpdatingCourse
    };
}
