import express, { Response, Request } from 'express';
import mongoose from 'mongoose';
import userRoutes from './src/routes/users';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 4000;
const password = process.env.DB_PASSWORD;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

mongoose
	.connect(`mongodb+srv://alimbodzhgua:${password}@cluster0.2hhx3cm.mongodb.net/reminder-app?retryWrites=true&w=majority&appName=Cluster0`)
	.then(() => console.log('DB connected'))
	.catch((error) => console.log('DB failed', error))


app.get('/', (req: Request, res: Response) => {
	return res.send({'message': 'hello world'})
})


app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}/`);
})