module.exports = (sequelize, type) => {
      const Log = sequelize.define(
      'Log',
      {
            id: {
                  type: type.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
            },

            user_id: {
                  type: type.INTEGER,
                  allowNull: true, 
                  references: {
                  model: 'users',
                  key: 'id'
            },
                  onDelete: 'CASCADE',
                  onUpdate: 'CASCADE'
            },

            action: {
                  type: type.ENUM('login','logout','refresh-token','failed-login'),
                  allowNull: false
            },

            ip_address: {
                  type: type.STRING,
                  allowNull: true
            }
      },
      {
            tableName: 'logs',
            timestamps: true
      }
      );

      Log.associate = (models) => {
      Log.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
      });
      };

      return Log;
      };
