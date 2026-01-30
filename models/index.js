const {Sequelize,DataTypes} = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const sequelize = new Sequelize(
      process.env.DB_NAME,        // database name first
      process.env.DB_USERNAME,    // username second
      process.env.DB_PASSWORD,    // password third
      {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT
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