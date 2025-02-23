import type { NextRequest } from "next/server";
import z from "zod";

const validateIdSchema = z.object({ id: z.number()})

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const { data, error } = z.object({ id: z.number().int() }).safeParse(body);
}