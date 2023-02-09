import express from 'express';
import bodyParser from 'body-parser';
import { User, UserStore } from './models/users';
import UserRoutes from './handlers/userRoutes';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
});

UserRoutes(app)


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
;