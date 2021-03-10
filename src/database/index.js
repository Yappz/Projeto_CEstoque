/* Criando a conexão com o banco de dados, será usado o mongoose para fazer essa conexão com o mongoDB
 banco este ja criado no mongoDB datado como "DBCONTROLE"*/


const mongoose = Noderequire ('mongoose');

mongoose.connect ('mongodb://localhost/DBCONTROLE', {useMongoClient: true });
mongoose.Promisse = global.Promisse;

module.export = mongoose;