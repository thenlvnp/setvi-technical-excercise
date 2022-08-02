import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import fetcher from "~/server/fetcher.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { deserializePost } from "~/deserializer";

export async function loader({ params }: LoaderArgs) {
    const response = await fetcher(
        `/posts/${params.postId}?_embed=comments&_expand=user`
    ).then((r) => r.json());

    return json(deserializePost(response));
}
export default function PostDetails() {
    const post = useLoaderData<typeof loader>();

    return (
        <>
            <Outlet />
            <main className="rounded bg-brand-secondary">
                <div className="relative p-6 border-b border-gray-600 rounded cursor-pointer pt-7 ">
                    <div className="space-y-2">
                        <div className="text-lg font-medium text-white lg:text-2xl ">
                            {post.title}
                        </div>
                        <p className="text-base font-normal leading-6 text-gray-400">
                            {post.body}
                        </p>
                        <ul
                            aria-label="Post information"
                            className="flex items-center space-x-1 text-xs text-gray-400"
                        >
                            <li>{post.comments.length} Comments</li>
                            <li>
                                &middot;
                                <span className="ml-1">
                                    Posted by {post.user?.username}
                                </span>
                            </li>
                            <li>
                                &middot;
                                <span className="ml-1">May 4, 2021</span>
                            </li>
                        </ul>
                    </div>
                    <Link
                        to="edit"
                        className="inline-flex items-center mt-4 space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Edit Post
                    </Link>
                    <Link
                        to="delete"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                        Delete Post
                    </Link>
                </div>

                <section className="relative px-6 pt-8 pb-6">
                    <h3 className="sr-only">Comments</h3>

                    <div className="">
                        <ul className="space-y-6">
                            {post.comments.map((comment) => (
                                <li key={comment.id}>
                                    <article>
                                        <header className="inline-flex items-center text-base text-white">
                                            <span>user2</span>{" "}
                                            <span className="mx-1">
                                                &middot;
                                            </span>
                                            <span>{comment.email}</span>
                                        </header>
                                        <p className="mt-4 text-base text-gray-400">
                                            {comment.body}
                                        </p>
                                        <div className="mt-2 text-xs text-gray-400">
                                            May 12, 2021
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    );
}
