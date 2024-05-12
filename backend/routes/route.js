import express from 'express';

const appRouter = express.Router()

appRouter.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).json({ msg: 'post req' })
})

export { appRouter }