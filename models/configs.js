module.exports = (sequelize, type) => {
      const Config = sequelize.define(
      'Config',
      {
            id: {
                  type: type.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
            },

            access_token_expiry_minutes: {
                  type: type.INTEGER,
                  allowNull: false,
                  defaultValue: 15,
                  validate: {
                  min: 1,
                  max: 60
                  }
            },

            refresh_token_expiry_days: {
                  type: type.INTEGER,
                  allowNull: false,
                  defaultValue: 7,
                  validate: {
                  min: 1,
                  max: 30
                  }
            },

            session_timeout_minutes: {
                  type: type.INTEGER,
                  allowNull: false,
                  defaultValue: 30,
                  validate: {
                  min: 5,
                  max: 240
                  }
            }
      },
      {
            tableName: 'configs',
            timestamps: true
      }
      );

      return Config;
};
