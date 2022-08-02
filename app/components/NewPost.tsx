import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/solid";
import { useFetcher, useLocation, useParams } from "@remix-run/react";
import { useForm } from "react-hook-form";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import fetcher from "~/server/fetcher.server";

type FormFields = {
    title: string;
    content: string;
};

export default function NewPost() {
    const location = useLocation();
    const fetcher = useFetcher();
    const { register, handleSubmit, formState } = useForm<FormFields>();
    const onSubmit = handleSubmit(async (data) => {
        fetcher.submit({}, { method: "post", action: "/api/new-post" });
    });
    const fieldErrors = formState.errors;
    let [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (fetcher.type === "done" && fetcher.data.ok) {
            setIsOpen(false);
        }
    }, [fetcher]);

    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <button
                onClick={openModal}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <PlusIcon className="w-5 h-5" />
                <span>New Post</span>
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="flex items-center space-x-3"
                                    >
                                        <span className="transform rotate-90">
                                            <PaperAirplaneIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                                        </span>
                                        <span className="text-2xl font-medium">
                                            Create a new Post
                                        </span>
                                    </Dialog.Title>
                                    <div className="">
                                        <div className="">
                                            <h2 className=" text-white ">
                                                {location.pathname === "/"
                                                    ? "Create a Post"
                                                    : "Create a new Post"}
                                            </h2>
                                        </div>
                                        <div className="relative">
                                            <form onSubmit={onSubmit}>
                                                <div className="space-y-4">
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="post-title"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Post title
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                id="post-title"
                                                                placeholder="Post title"
                                                                {...register(
                                                                    "title"
                                                                )}
                                                                className={`shadow-sm focus:ring-brand-primary focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md ${
                                                                    fieldErrors?.title
                                                                        ? "border-red-500 border"
                                                                        : ""
                                                                } `}
                                                            />
                                                        </div>
                                                        {fieldErrors?.title ? (
                                                            <div className="mt-2 text-red-500">
                                                                {
                                                                    fieldErrors.title
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="relative">
                                                        <label
                                                            htmlFor="post-content"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Post Content
                                                        </label>
                                                        <div className="mt-1">
                                                            <textarea
                                                                id="post-content"
                                                                cols={30}
                                                                rows={5}
                                                                placeholder="Post content"
                                                                {...register(
                                                                    "content"
                                                                )}
                                                                className={`shadow-sm focus:ring-brand-primary focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md ${
                                                                    fieldErrors?.content
                                                                        ? "border-red-500 border"
                                                                        : ""
                                                                } `}
                                                            />
                                                        </div>
                                                        {fieldErrors?.content ? (
                                                            <div className="mt-2 text-red-500">
                                                                {
                                                                    fieldErrors.content
                                                                }
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex justify-end">
                                                    <button className="inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        {fetcher.state ===
                                                        "submitting"
                                                            ? "Creating Post"
                                                            : "Create Post"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
