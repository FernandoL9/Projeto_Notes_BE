const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite");

class UserController {
  /**
   * Index - GET para listar vários registros.
   * show - GET para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * delete - Delete para remover um registro.
   */
  async create (request, response) {
    const {name, email, password} = request.body

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, hashedPassword])

    return response.status(201).json()
    //verificar se o nome existe.
    // if(!name){
    //   throw new AppError("Erro nome é obrigatório")
    // }

    // response.send(`Usuario: ${name} - Email: ${email} - senha: ${password}`) // padrão de resposta do tipo requisição
    //  response.status(201).json({ name, email, password}) // padrão de resposta do tipo json com as informações envidas
   
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id
    
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso")
    }

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(password, 8)
    }

    user.name = name ?? user.name; // se existe name, sera usado o name, se não existe será user.name 
    user.email = email ?? user.email; // se existe email, se não existe, se não existe será user.email

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`, [user.name, user.email, user.password, user_id]
      )
    
      return response.json()
  }
}

module.exports = UserController;