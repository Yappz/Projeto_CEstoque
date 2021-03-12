/* Sistema de verificação do Token*/

const jwt = require('jsonwebtoken');
const authconfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.header.authorization;

    if(!authHeader)
    return res.status(401).send({error: 'O token não foi informado.'});

    const parts = authHeader.split('');

    if(!parts.length === 2)
    return res.status(401).send({error: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
      return res.status(401).send({error: 'Token não formado.'})

    jwt.verify(token, authconfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token Invalido.'});

        req.userId = decoded.id;
        return next();
    });
};