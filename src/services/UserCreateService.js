const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserCreateService {
  // maneira correta é criar um constructor
  constructor(userRepository){
    //disponibilizando o userRepositories para toda a classe
    this.userRepository = userRepository;
  }

  async execute({name, email, password}) {
    //não pode depender da de um repositorie de maneira explicita
    // const userRepositories = new UserRepositories() 
    
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists){
      throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    const userCreated =  await this.userRepository.create({name, email, password : hashedPassword})

    // console.log(userCreated)

    return userCreated;
  }
}

module.exports = UserCreateService;