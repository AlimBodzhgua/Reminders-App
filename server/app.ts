import express, { Response, Request } from 'express';
import router from './src/routes';
import errorHandler from './src/middleware/errorHandler';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const DATABASE = process.env.DATABASE!.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD!,
)

mongoose
	.connect(DATABASE)
	.then(() => console.log('DB Connection successful'))
	.catch((error) => console.log('DB Connection failed', error))


app.get('/', (req: Request, res: Response) => {
	return res.send({message: 'Hello World'})
})


app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}/`);
})