import { createApp } from "../server/app";
import type { VercelRequest, VercelResponse } from '@vercel/node';

let appPromise: Promise<any> | null = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (!appPromise) {
        appPromise = createApp();
    }
    const app = await appPromise;
    app(req, res);
}
