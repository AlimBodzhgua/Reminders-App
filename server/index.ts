import express, { Response, Request } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;


app.get('/', (req: Request, res: Response) => {
	res.send({'message': 'hello world'})
})


app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}/`);
})