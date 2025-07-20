
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

    // Return both the short URL and additional data
    res.status(200).json({
        success: true,
        shortUrl: process.env.APP_URL + shortUrl,
        displayUrl: `short.ly/${shortUrl}`, 
        workingUrl: process.env.APP_URL + shortUrl, 
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