/* Controller de autentificação*/

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authconfig = require('../config/auth');

const User = require('../models/user');

/* Sera feito uma busca do express a classe router para definir a rota so para usuários */

const router = express.Router();

function generationToken(params = {}){
    return jwt.sign(params, authconfig.secret, {
        expiresIn: 86400, 
    });
}

/* Assim que o usuário chamar essa rota, um usuário sera criado inserindo todos os paramentros em req.body
retornando algum erro caso haja algum erro no cadastro de novo usuário. */

router.post('/register', async (req, res) => {

    try {
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: generationToken({id:user.id})})
  
    } catch (err) {
        return res.status(400).send({ error: 'Falha no registro.'});
    }
});

/* Rota para autentificação de usuários */

router.post('/authenticate' ,  async (req,res) => {
    const {email, password } = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user)
        return res.status(400).send({error: 'Usuário não encontrado'});

/* Função para validar caso as senhas que foram cadastradas no banco não batem com as que o 
   usuário inseriu. Validação essa feita pelo bcrypt que foi utilizado para criptografar as
   senhas inseridas.  */

    if(!await bcrypt.compare(password, user.password))
      return res.status(400).send({error: 'Senha Inválida.'});    

      user.password = undefined;


      

res.send({user, token: generationToken({id: user.id})});


});

/* Todas as rotas definidas aki serão endereçadas ao /auth */

module.exports = app => app.use('/auth', router);