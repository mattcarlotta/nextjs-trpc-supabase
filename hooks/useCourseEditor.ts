import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "~/lib/trpc/client";
import { getQueryClient } from "~/lib/trpc/queryClient";

export type UseCourseEditorProps = {
    courseURL: string;
};

export default function useCourseEditor({ courseURL }: UseCourseEditorProps) {
    const router = useRouter();
    const queryClient = getQueryClient();
    const trpc = useTRPC();

    const {
        data: { course, error: courseError },
        isLoading: isLoadingCourse
    } = useSuspenseQuery(trpc.getCourse.queryOptions({ url: courseURL }));

    const { mutate: updateCourse, isPending: isUpdatingCourse } = useMutation(
        trpc.updateCourse.mutationOptions({
            onSuccess: async (result) => {
                if (result.error) {
                    alert(result.error);
                    return;
                }

                await queryClient.invalidateQueries(trpc.getCourse.queryFilter({ url: courseURL }));

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
