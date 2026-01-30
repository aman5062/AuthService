const {Config,Log,Session,Role,User} = require("../models")
const Pagination = require("../utils/pagination")
class adminService{
      async getConfig(){
            const configdata = await Config.findOrCreate({
                  where: { id: 1 },
                  defaults: {
                  access_token_expiry_minutes: 15,
                  refresh_token_expiry_days: 7,
                  session_timeout_minutes: 30
                  }
            });
                  return configdata;
      }
      async updateConfig(data) {
            const {
            access_token_expiry_minutes,
            refresh_token_expiry_days,
            session_timeout_minutes
            } = data;

            const config = await Config.findByPk(1);

            if (!config) {
                  throw new Error("Config not found");
            }

            if (access_token_expiry_minutes > 60) {
                  throw new Error("Access token expiry cannot exceed 60 minutes");
            }

            if (refresh_token_expiry_days > 30) {
                  throw new Error("Refresh token expiry cannot exceed 30 days");
            }

            if (session_timeout_minutes > 240) {
                  throw new Error("Session timeout cannot exceed 240 minutes");
            }

            await config.update({
                  access_token_expiry_minutes,
                  refresh_token_expiry_days,
                  session_timeout_minutes
            });

            return config;
      }

      async getLogs(query){
            const {currentPage,limit,offset} = Pagination(query.page,query.limit)
            const {rows,count} = await Log.findAndCountAll({
            include: [{
                  model: User,
                  as: 'user',
                  attributes: ['first_name','email'],
                  

        }],
        limit:limit,
        offset,
        order: [['createdAt', 'DESC']]
            });
            if(!rows){
                  throw new Error('No log found')
            }
            return {
                  totalItems:count,
                  totalPages:Math.ceil(count/limit),
                  currentPage,
                  logs:rows
            };
      }
      async getSessions(){
            const sessions = await Session.findAll({
                  include:[{
                        model:User,
                        as:'user',
                        attributes:['first_name','email']
                  }],order: [['createdAt', 'DESC']]
            });
            if(!sessions){
                  throw new Error('No session found')
            }
            return sessions;
      }
      async setRole(data){
            const role = await Role.create(data)
            if(!role){
                  throw new Error("Role not created")
            }
            return role;
      }
}
module.exports = new adminService()