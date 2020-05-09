const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { mongoose } = require('./database')

// configuraciones
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

// Rutas
app.use('/users', require('./rutas/users'))

// Inicializaciones
app.listen(app.get('port'), () => {
  console.log(`Servidor conectado en el puerto ${app.get('port')}`)
});