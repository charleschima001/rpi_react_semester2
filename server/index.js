import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from './config/database.js'; 
import './models/user.js';
import './models/offer.js';
import './models/review.js';
import './models/associations.js';
import cors from 'cors';
import path from 'path'
import { router } from './routes/index.js';
import errorMiddleware from './middleware/ErrorHandlingMiddleware.js';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

dotenv.config();

const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename)

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router);
app.use(errorMiddleware);

app.get('/', (req,res)=>{
    res.status(200).json({message:'Ура! ВСЕ заработало'})
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();