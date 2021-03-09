/* Controler de autentificação*/

const express = require ('express');

const User = require ('../models/user');

/* Sera feito uma busca do express a classe router para definir a rota so para usuários */

const router = express.Router();

/* Assim que o usuário chamar essa rota, um usuário sera criado inserindo todos os paramentros em req.body
retornando algum erro caso haja algum erro no cadastro de novo usuário. */

router.post('/register' , async (req, res) => {
 
    try{
    const user = await User.create(req.body);
    
    return res.send ({ user });
    }catch (err) {
        return res.status(400).send({error: 'Registration failed'});
    }
} );

/* Todas as rotas definidas aki serão endereçadas ao /auth */

module.exports = app => app.use('/auth', router);
