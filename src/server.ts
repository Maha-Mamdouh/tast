import express from 'express';
import bodyParser from 'body-parser';
import UserRoutes from './handlers/user_routes';
import MovieRoutes from './handlers/movie_routes';
import ListRoutes from './handlers/movie_routes';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('Hello World!')
});

UserRoutes(app)
MovieRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
;