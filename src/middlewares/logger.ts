import { Request, Response, NextFunction, request } from "express"


function logger(req: Request, res: Response, next: NextFunction) {
    const URL = req.url
    const time = new Date().toISOString()
    const method = req.method
    console.log( time, URL, method)
   
    next()
}

export default logger;