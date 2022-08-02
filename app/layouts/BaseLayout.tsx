import { SearchIcon } from "@heroicons/react/solid";
import { Link, useLocation } from "@remix-run/react";
import React from "react";
import NewPost from "~/components/NewPost";

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full min-h-screen pb-10 bg-black lg:pb-24 lg:pt-24">
            <div
                aria-hidden="true"
                className="inset-x-0 top-0 w-full h-2 lg:absolute bg bg-brand-primary"
            />
            <div
                style={{ maxWidth: "77rem" }}
                className="w-full mx-auto md:px-10"
            >
                <header className="px-5 pt-3 space-y-4 lg:p-0">
                    <div className="flex items-center">
                        <div className="flex items-center flex-1 lg:space-x-14">
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    className="w-auto h-10 lg:h-20"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                    alt="Shard"
                                />
                            </Link>
                            <form action="" className="hidden w-full lg:block">
                                <div className="relative w-1/2">
                                    <label
                                        htmlFor="search-posts-desktop"
                                        className="sr-only"
                                    >
                                        Search Posts
                                    </label>
                                    <input
                                        type="search"
                                        id="search-posts-desktop"
                                        placeholder="Search Shards..."
                                        className="shadow-sm focus:ring-indigo-500 py-3 text-white focus:border-indigo-500 block bg-black w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-y-0 right-0 inline-flex items-center pr-4"
                                    >
                                        <SearchIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                </div>
                            </form>
                        </div>
                        <NewPost />
                    </div>
                </header>
                <div className="mt-6 lg:mt-16">{children}</div>
            </div>
        </div>
    );
}
