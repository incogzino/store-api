import Review from "../models/reviewModel";
import express, { Request, Response } from "express";

const reviewsRouter = express.Router()

reviewsRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const newReview = new Review(req.body)
    
    const createdReview = await newReview.save()
    
    res.status(201)
    res.json(createdReview)
})

reviewsRouter.get('/', async (req: Request, res: Response) =>{
    const reviews = await Review.find()
    res.status(200)
    res.json(reviews)

})

reviewsRouter.get('/:reviewId', async (req: Request, res: Response) =>{
    const review = await Review.findOne({reviewId: req.params.reviewId})
    res.json(review)
    
})

reviewsRouter.delete('/:reviewId', async (req: Request, res: Response) => {
    const remove_review = await Review.findOneAndDelete({reviewId: req.params.reviewId})
    res.sendStatus(204)
})

reviewsRouter.patch('/:reviewId', async(req: Request, res: Response) => {
    const updateReview = await Review.findOne({reviewId: req.params.reviewId})
    const newComment = req.body.comment;
    
      if (updateReview !== null) {
        updateReview.comment = newComment;
        await updateReview.save()
        res.json(await Review.findOne({reviewId: req.params.reviewId})
)} 
      else {
        res.status(404)
        res.send('Review not found');
      }
    });
    



export default reviewsRouter;