import { Form, useNavigate, useTransition } from "@remix-run/react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { redirect } from "@remix-run/node";
import fetcher from "~/server/fetcher.server";

import type { ActionArgs } from "@remix-run/node";

export async function action({ request, params }: ActionArgs) {
    const id = params.postId;
    await fetcher(`/posts/${id}`, {
        method: "delete",
    });

    return redirect(`/home`);
}

export default function EditPost() {
    const transition = useTransition();
    const navigate = useNavigate();

    let [isOpen, setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false);
        setTimeout(() => {
            navigate("..", { replace: true });
        }, 150);
    }

    return (
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
                                    <span className="text-2xl font-medium">
                                        Delete Post
                                    </span>
                                </Dialog.Title>
                                <Form method="post" className="">
                                    <div className="mt-3 text-center sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-title"
                                        >
                                            Are you sure you want to delete this
                                            post
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete
                                                this post?
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                            {transition.state === "submitting"
                                                ? "Deleting"
                                                : "Delete Post"}
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
