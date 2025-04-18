import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { shortLinksTable } from "../drizzle/schema.js";

export const getShortLinkByShortCode = async (shortCode) => {
    const [result] = await db
        .select()
        .from(shortLinksTable)
        .where(eq(shortLinksTable.shortCode, shortCode));
    return result;
};

export const insertShortLink = async ({ url, shortCode, userId }) => await db.insert(shortLinksTable).values({ url, shortCode, userId });

export const getAllShortLinks = async (userId) => await db.select().from(shortLinksTable).where(eq(shortLinksTable.userId, userId));