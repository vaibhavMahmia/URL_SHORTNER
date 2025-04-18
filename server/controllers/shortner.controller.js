import crypto from "crypto";
import { shortenerSchema } from "../validators/shortner-validator.js";
import { getAllShortLinks, getShortLinkByShortCode, insertShortLink } from "../services/shortner.services.js";

export const getShortURLs = async (req, res) => {
    try {
        if(!req.user) return res.status(500).json({ success: false, error: 'unauthorised access !' });
        const links = await getAllShortLinks(req.user.id);
        return res.status(200).json({ success: true, links });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const createShortURL = async (req, res) => {
    try {
        if(!req.user) return res.status(500).json({ success: false, error: 'unauthorised access !' });
        const { data, error } = shortenerSchema.safeParse(req.body);

        if (error) return res.status(500).json({ success: false, error: error.errors[0].message });
        const { url, shortCode } = data;
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
        const link = await getShortLinkByShortCode(finalShortCode);

        if (link) return res.status(500).json({ success: false, error: 'short code already exists !' });
        await insertShortLink({ url, shortCode: finalShortCode, userId: req.user.id, });

        return res.status(201).json({ success: true, message: 'shortURL created !' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const redirectToShortLink = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const link = await getShortLinkByShortCode(shortCode);

        if (!link) return res.status(500).json({ success: false, error: 'shortCode doesent exist !' });
        return res.redirect(link.url);
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}