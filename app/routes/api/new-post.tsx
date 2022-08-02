import { json } from "@remix-run/node";
import fetcher from "~/server/fetcher.server";
import type { ActionArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
    const body = await request.formData();
    await fetcher(`/posts`, { method: "post", body: body });
    return json({ ok: true });
}
