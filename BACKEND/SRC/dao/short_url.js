import urlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorhandler.js";
export const saveShortUrl = async (shortUrl, longurl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longurl, 
            short_url: shortUrl, 
        });
        if (userId) {
            newUrl. user = userId; 
        }
        await newUrl.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError("Short URL already exists");
        }
        throw new Error(error);
    }
};
export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate(
        { short_url: shortUrl },
        { $inc: { clicks: 1 } },
        { new: true } 
    );
};
export const getCustomUrl = async (slug) => {
    return await urlSchema.findOne({ short_url: slug });
};