import Product from "../models/productsModel"
import express, { Request, Response } from "express";

const productsRouter = express.Router()

productsRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const newProduct = new Product(req.body)
    
    const createdProduct = await newProduct.save()
    
    res.status(201)
    res.json(createdProduct)
})

productsRouter.get('/', async (req: Request, res: Response) =>{
    const products = await Product.find()
    res.status(200)
    res.json(products)

})

productsRouter.get('/:productId', async (req: Request, res: Response) =>{
    const product = await Product.findOne({productId: req.params.productId})
    res.json(product)
    
})

productsRouter.delete('/:productId', async (req: Request, res: Response) => {
    const remove_product = await Product.findOneAndDelete({productId: req.params.productId})
    res.sendStatus(204)
})

productsRouter.patch('/:productId', async(req: Request, res: Response) => {
    const updateProduct = await Product.findOne({productId: req.params.productId})
    const available = req.body.Available
    
    if (updateProduct == null) {
        return res.status(404)
    };

    if (typeof req.body.Available !== 'boolean') {
        return res.status(400).send('Invalid available value: must be true or false');
      }
    
    updateProduct.Available = available;
    await updateProduct.save()
    res.json(await Product.findOne({productId: req.params.productId}))

})


export default productsRouter;

