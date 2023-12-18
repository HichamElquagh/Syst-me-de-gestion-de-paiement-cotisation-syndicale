const express = require('express');
const usersRouter = require('./routes/api');
const syndicRoute = require('./routes/syndic')
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const cors = require('cors')




app.use(cookieParser( process.env.ACCESS_TOKEN_SECRET));

const connectDatabase = require('./config/db'); // Correct function name

app.use(express.json());
app.use(bodyParser.json());


connectDatabase(); // Call the correct function here

const PORT = 3001;
app.use(cors({
  credentials: true,
  origin:"http://localhost:5173"
}))

app.use('/api', usersRouter);
app.use('/syndic',syndicRoute)
// app.use('/api/user', clientRouter )
// app.use('/api/user', livreurRouter )
// app.use('/api/user', managerRouter )
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for the API endpoints',
      },
      servers:[
        {
            url: 'http://localhost:3001/'
        }
      ]
    },
    apis: ['docs/swagger.js'],
  };
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
});
