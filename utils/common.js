const {Config,Log,Session,User} = require("../models")
class commonUtil{
      async getConfig(){
            const [configdata] = await Config.findOrCreate({
                  where: { id: 1 },
                  defaults: {
                  access_token_expiry_minutes: 15,
                  refresh_token_expiry_days: 7,
                  session_timeout_minutes: 30
                  }
            });
                  return configdata;
                  }

      async setSession(data){
            const{user_id, refresh_token,refresh_expires_at} = data;
            if(!user_id || !refresh_token || !refresh_expires_at){
                  throw new Error("invalid data")
            }
            const [session, created] = await Session.upsert({
                  user_id,
                  refresh_token,
                  refresh_expires_at
            })
            return true;
      }
      async setLog(id,action){
            const user = await User.findByPk(id)
            if(!user){
                  throw new Error('User not found')
            }
            const log = await Log.create({
                  user_id:id,
                  action:action
            })
            if(!log){
                  throw new Error("Log not created")
            }
            return true;
      }
}


module.exports = new commonUtil()