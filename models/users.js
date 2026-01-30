module.exports = (sequelize,type)=>{
      const User = sequelize.define(
            'User',
            {
                  id:{
                        type:type.INTEGER,
                        autoIncrement:true,
                        primaryKey:true
                  },
                  first_name:{
                        type:type.STRING,
                        allowNull:false
                  },
                  last_name:{
                        type:type.STRING,
                        allowNull:false
                  },
                  email:{
                        type:type.STRING,
                        allowNull:false,
                        unique:true,
                        validate:{
                              isEmail:true
                        }
                  },
                  password_hash:{
                        type:type.STRING,
                        allowNull:false
                  },
                  phone:{
                        type:type.STRING,
                        allowNull:false
                  },
                  role_id:{
                        type:type.INTEGER,
                        allowNull:false,
                        references:{
                              model:'roles',
                              key:'id'
                        },
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE'
        
                  },
                  is_active:{ 
                        type:type.BOOLEAN,
                        defaultValue:true
                  }
            },{
                  tableName:'users',
                  timestamps:true,
                  paranoid:true
            }
      )
      User.associate = (models) => {
      User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'role'
      });

      User.hasMany(models.Session, {
      foreignKey: 'user_id',
      as: 'sessions'
      });

      User.hasMany(models.Log, {
      foreignKey: 'user_id',
      as: 'logs'
      });
      };
      return User
}