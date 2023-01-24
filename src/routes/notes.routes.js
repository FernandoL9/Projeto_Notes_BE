const { Router } = require("express") // import routes

const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const notesRoutes = Router() // inicializando routes

// middleware serve para  fazer um verificação no usuario.
// function myMiddleware(request, response, next) {
//   console.log("passou pelo Middleware")
//   // console.log(request.body) // acessar a informação do corpo.

//   if(!request.body.isAdmin) {
//     return response.json({message: "User not unauthorized"})
//   }

//   next()
// }
const notesController = new NotesController() // instanciando o metodo na memoria

notesRoutes.use(ensureAuthenticated)

// params são utilizado para dados simples
// params são muito utilizado para passar id
notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes