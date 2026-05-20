import { PostView } from "~/app/components/PostView";
import { HydrateClient, prefetch, trpc } from "~/lib/trpc/server";

export default async function PostPage({ params }: PageProps<"/post/[postId]">) {
    const { postId } = await params;

    prefetch(trpc.getPost.queryOptions({ id: postId }));

    return (
        <HydrateClient>
            <PostView postId={postId} />
        </HydrateClient>
    );
}
