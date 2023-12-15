import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middleware/token.middleware.js";

const getLists = async (req, res) => {
    try {
        const {page} = req.query;
        const {mediaType, mediaCategory} = req.params;
        const response =  await tmdbApi.mediaList({mediaType, mediaCategory, page});
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getGenres = async (req, res) => {
    try {
        const {mediaType} = req.params;
        const response = await tmdbApi.mediaGenres(mediaType);
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const search = async (req, res) => {
    try {
        const {mediaType} = req.params;
        const {query, page} = req.query;
        const response = await tmdbApi.mediaSearch({
            query,
            page,
            mediaType: mediaType === "people" ? "person" : mediaType
        });
        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};

const getDetails = async (req, res) => {
    try {
        const {mediaType, mediaId} = req.params;
        const params = {mediaType, mediaId};
        const media = await tmdbApi.mediaDetails(params);
        media.credits = await tmdbApi.mediaCredits(params);
        const videos = await tmdbApi.mediaVideos(params);
        media.videos = videos
        const recommend = recommend.results
        media.images = await tmdbApi.mediaImages(params);
        const tokenDecoded =  tokenMiddleware.decodeToken(req)
        if (tokenDecoded) {
            const user = await userModel.findById(tokenDecoded.data)
            if  (user) {
                const isFavorite = await favoriteModel.findOne({userId: user.id, mediaId})
                media.isFavorite = isFavorite !== null
            }
        }

        media.reviews = await reviewModel.find({mediaId}).populate("user").sort("-createdAt");
        responseHandler.ok(res, media);
    } catch {
        responseHandler.error(res);
    }
};

export default { getLists, getGenres, search, getDetails };