
import { getShortUrl } from "../dao/short_url.js";
import warpAsync from "../utils/tryCatchWrapper.js";
import { createShortUrlWithoutUser, createShortUrlWithUser  } from "../services/short_url.service.js";

export const createShortUrl = warpAsync(async (req, res) => {
    let shortUrl
    const data = req.body; // calling the URL from the user from frontend(the url given by the user in the frontend)
    if (req.user){
         shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
    }
    else{
         shortUrl = await createShortUrlWithoutUser(data.url);
    }

    // Debug: Log the APP_URL being used
    console.log('APP_URL from env:', process.env.APP_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    // Ensure APP_URL is set correctly
    const baseUrl = process.env.APP_URL || 'https://linkshort-tudg.onrender.com/';

    // Return both the short URL and additional data
    res.status(200).json({
        success: true,
        shortUrl: baseUrl + shortUrl,
        displayUrl: `short.ly/${shortUrl}`,
        workingUrl: baseUrl + shortUrl,
        originalUrl: data.url,
        slug: shortUrl,
        message: "URL shortened successfully"
    });

});


export const redirectFromShortUrl = warpAsync(async (req, res) => {

    const { id } = req.params; 
    const url = await getShortUrl(id); 
    if (!url) throw new Error("URL not found");
    res.redirect(url.full_url);

});
export const createCustomShortUrl = warpAsync(async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createCustomShortUrl(url, slug);
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const getUserUrls = warpAsync(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    // TODO: Implement getUserUrls service function
    // const urls = await getUserUrlsService(req.user._id);

    // For now, return empty array
    res.status(200).json({
        urls: [],
        stats: {
            totalUrls: 0,
            totalClicks: 0,
            thisMonth: 0
        }
    });
});

export const deleteUserUrl = warpAsync(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const { id } = req.params;

    // TODO: Implement deleteUserUrl service function
    // await deleteUserUrlService(id, req.user._id);

    res.status(200).json({ message: "URL deleted successfully" });
});