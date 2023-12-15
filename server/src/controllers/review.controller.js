import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create = async (req, res) => {
    try {
        const {movieId} = req.params;
        const review = new reviewModel({
            ...req.body,
            movie: movieId,
            user: req.user.id
        })
        await review.save()
        responseHandler.created(res, {...review._doc, user: req.user})
    } catch {
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    try{
 const { reviewId} = req.params;
 const review = await reviewModel.findOne({
    _id: reviewId,
    user: req.user.id
})
if (!review) return responseHandler.notFound(res);
await review.remove();
responseHandler.ok(res);
    }catch{
        responseHandler.error(res);
    }
};

const getReviewsOfUser = async (req, res) => {
    try{
        const reviews = await reviewModel.find({user: req.user.id}).sort("createdAt: -1");
        responseHandler.ok(res, reviews);

    } catch {
        responseHandler.error(res);
    }
};

export default { create, remove, getReviewsOfUser };
