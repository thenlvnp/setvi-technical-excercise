import { Transition } from "@headlessui/react";
import type { MetaFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useTransition,
} from "@remix-run/react";
import BaseLayout from "~/layouts/BaseLayout";
import styles from "./styles/app.css";

export function links() {
    return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Posts App",
    viewport: "width=device-width,initial-scale=1",
});

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <BaseLayout title="Hello">
                    <Outlet />
                </BaseLayout>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
