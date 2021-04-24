import express, {Express, NextFunction, Request, Response} from "express";
import files, {UploadedFile} from 'express-fileupload';
import fs from 'fs'
import path from 'path'

class Main {
    private config: any
    private app: Express;

    constructor() {
        this.app = express()
        this.config = process.env
    }

    start() {
        this.app.use(files())
        this.app.use('/', express.static('./public/images'));
        this.app.get('/', (req: Request, res: Response) => {
            res.send(200)
        })
        this.app.post('/upload', (req: Request, res: Response) => {
            console.log(req.body)
            console.log(req.body.key !== process.env.KEY)
            if (req.body.key !== process.env.KEY) return res.status(403).send({error: "Forbidden"});
            //@ts-ignore
            let file: UploadedFile = req?.files[Object.keys(req?.files)[0]];

            fs.writeFile(path.join('./public/images', file?.name), file?.data, err => {
                console.log(err)
            })
            res.send({status: 200, url: `${process.env.DOMAIN}/${file?.name}`}).status(200)
        })
        this.app.use((req: Request, res: Response, next: NextFunction) =>
            res.status(404).send(fs.readFileSync(path.join('./public/pages/404.html')).toString())
        );
        this.app.use((err:Error,req: Request, res: Response, next: NextFunction) =>
            res.status(500).send(fs.readFileSync(path.join('./public/pages/500.html')).toString())
        );
        this.app.listen(process.env.PORT, () => console.log(`Api started on ${process.env.PORT} port....`))
    }
}

export default Main