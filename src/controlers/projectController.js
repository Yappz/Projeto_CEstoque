/* Controller feito para necessitar que o usuário esteja autenticado para se cadastrar quando 
não estiver logado na aplicação.   */

const express = require('express');

const authMiddleware = require('../middlewares/auth'); 

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true});
});

module.exports = app => app.use('./projects', router);
