import { generateNanoid } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js";
import { getCustomUrl, saveShortUrl } from "../dao/short_url.js";
export const createShortUrlWithoutUser = async (url) => {
    const shortUrl =  generateNanoid(7);
    if (!shortUrl) {
        throw new Error("shortUrl generation failed");
    }
    await saveShortUrl(shortUrl, url);
    return shortUrl; 
};

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoid(7);
    const exists = await getCustomUrl(slug);
    if (exists) {
        throw new Error("Short URL already exists");
    }
    await saveShortUrl(shortUrl,url, userId);
    return shortUrl; 
};

