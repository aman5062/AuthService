const {Sequelize,DataTypes} = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const DB_USERNAME="authdb_c7nu_user"
const DB_NAME="authdb_c7nu"
const DB_PASSWORD="FZUjppprnzlQSL8bTmI5TeByRLuluEBO"
const DB_HOST="dpg-d5u856shg0os73bs31sg-a"
const DB_DIALECT="postgres"
const DB_PORT="5432"
const sequelize = new Sequelize(
      DB_NAME,        // database name first
      DB_USERNAME,    // username second
      DB_PASSWORD,    // password third
      {
            host: DB_HOST,
            dialect: DB_DIALECT,
            port: DB_PORT
      }
)

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
      .filter(file=>{
            return file.indexOf('.') !== 0 && 
            file !== basename && 
            file.slice(-3) ==='.js';
      })
      .forEach(file=>{
            const model = require(path.join(__dirname,file))(sequelize,DataTypes)
            db[model.name] =model;
      })

      Object.keys(db).forEach(modelName=>{
            if(db[modelName].associate){
                  db[modelName].associate(db);
            }
      })


// sequelize.authenticate()
//       .then(()=>{
//             console.log("DB connected")
//             return db.sequelize.sync()
//       })
//       .catch(err=>console.log("DB connection error: ",err))

module.exports = db;