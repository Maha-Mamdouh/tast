import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user_routes';
import movieRoutes from './handlers/movie_routes';
import listRoutes from './handlers/watchList_routes';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
});

userRoutes(app)
movieRoutes(app)
listRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
;