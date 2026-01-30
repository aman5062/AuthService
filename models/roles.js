module.exports = (sequelize,type)=>{
      const Role = sequelize.define(
            'Role',
            {
                  id:{
                        type:type.INTEGER,
                        primaryKey:true,
                        autoIncrement:true
                  },
                  name:{
                        type:type.STRING,
                        allowNull:false,
                        unique:true
                  }
            },
            {
                  tableName:'roles',
                  timestamps:true
            }
      )
      return Role;
}