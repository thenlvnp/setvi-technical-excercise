import { json } from "@remix-run/node";
import fetcher from "~/server/fetcher.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { deserializePost } from "~/deserializer";
import type { Post } from "~/types";

export async function loader({ request }: LoaderArgs) {
    return json(
        (await fetcher(`/posts?_embed=comments&_expand=user`)
            .then((r) => r.json())
            .then((res) =>
                res.map((item: any) => deserializePost(item))
            )) as Post[]
    );
}

export default function Home() {
    const posts = useLoaderData<typeof loader>();

    return (
        <>
            <main className="w-full mt-8 lg:mt-0">
                <ul className="space-y-6 ">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div className="relative flex items-start space-x-5 cursor-pointer lg:rounded bg-brand-secondary">
                                <Link to={`${post.id}`}>
                                    <article className="p-6 group">
                                        <div className="space-y-2">
                                            <div className="text-lg font-medium text-white lg:text-2xl group-hover:text-brand-primary">
                                                {post.title}
                                            </div>
                                            <p className="text-base text-gray-400">
                                                {post.body}
                                            </p>
                                            <ol
                                                aria-label="Post information"
                                                className="flex flex-wrap items-center space-x-1 text-xs text-gray-400"
                                            >
                                                <li>
                                                    {post.comments.length}{" "}
                                                    Comments
                                                </li>
                                                <li>
                                                    &middot;
                                                    <span className="ml-1">
                                                        Posted by{" "}
                                                        {post.user?.username}
                                                    </span>
                                                </li>
                                                <li>
                                                    &middot;
                                                    <span className="ml-1">
                                                        May 4, 2021
                                                    </span>
                                                </li>
                                            </ol>
                                        </div>
                                    </article>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
}
