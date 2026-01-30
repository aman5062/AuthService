module.exports = (sequelize, type) => {
  const Session = sequelize.define(
    'Session',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      refresh_token: {
        type: type.STRING,
        allowNull: false
      },

      refresh_expires_at: {
        type: type.DATE,
        allowNull: false
      },

      ip_address: {
        type: type.STRING, 
        allowNull: true
      },

      user_agent: {
        type: type.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'sessions',
      timestamps: true
    }
  );

  Session.associate = (models) => {
    Session.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return Session;
};
