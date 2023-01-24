const { Router } = require("express") // import routes
const multer = require("multer");
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router() // inicializando routes
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController() // instanciando o metodo na memoria
const userAvatarController = new UserAvatarController() // instanciando o metodo na memoria


// params são utilizado para dados simples
// params são muito utilizado para passar id
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar',  ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes