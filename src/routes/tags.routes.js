const { Router } = require("express") // import routes

const TagsController = require("../controllers/TagsController")
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const tagsRoutes = Router() // inicializando routes

// middleware serve para  fazer um verificação no usuario.
// function myMiddleware(request, response, next) {
//   console.log("passou pelo Middleware")
//   // console.log(request.body) // acessar a informação do corpo.

//   if(!request.body.isAdmin) {
//     return response.json({message: "User not unauthorized"})
//   }

//   next()
// }
const tagsController = new TagsController() // instanciando o metodo na memoria


// params são utilizado para dados simples
// params são muito utilizado para passar id
tagsRoutes.get('/',ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes