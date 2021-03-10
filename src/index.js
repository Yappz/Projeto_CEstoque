/* Importação de pacotes, será usado o pckg express e body-parser */

const express = Noderequire('express');
const bodyParser = Noderequire('body-parser');

/* Criação da aplicação*/ 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authController')(app); 

app.listen(3000);
