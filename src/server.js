require("express-async-errors")
require("dotenv/config")

// const baseRun = require("./database/sqlite")
const migrationRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError")
const express = require('express') // puxando as dependência da pasta express
const uploadConfig = require('./configs/upload')

const cors = require('cors')
const routes = require('./routes') // inicializando a aplicação 
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

// baseRun()
migrationRun()

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use((error, request, response, next) => {
    if( error instanceof AppError ) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message 
      })
    }
    
    console.error(error)

    return response.status(500).json({
      status: "error",
      message: "Internal server error"
    })
})

const PORT = process.env.SERVER_PORT || 3000// porta da aplicação
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) // ouvindo a porta


