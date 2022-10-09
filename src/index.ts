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
        this.app.post('/upload', (req: Request, res: Response) => {
            if (req.body.key !== process.env.KEY) return res.status(403).send({error: "Forbidden"});
            //@ts-ignore
            let file: UploadedFile = req?.files[Object.keys(req?.files)[0]];

            fs.writeFile(path.join('./public/images', file?.name), file?.data, err => {
                if(err) console.log(err);
            })
            res.send({status: 200, url: `${process.env.DOMAIN}/${file?.name}`, delete: `${process.env.DOMAIN}/delete/${file.name}/?key=${process.env.KEY}`}).status(200)
        })
        this.app.get('/delete/:name', (req: Request, res: Response) => {
            if (!fs.existsSync(path.join('./public/images', req.params.name))) return res.status(404).send(fs.readFileSync(path.join('./public/pages/404.html')).toString());
            if (req.query.key !== process.env.KEY) return res.status(403).send({error: "Forbidden"});
            fs.unlink(path.join('./public/images', req.params.name), err => {
                if(err) console.log(err);
            })
            // HTML страница о том, что файл удален
            res.send(fs.readFileSync(path.join('./public/pages/deleted.html')).toString()).status(200)
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