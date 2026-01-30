const{User,Role,Session,Log,Config} = require("../models")
const tokenGenerator = require('../utils/TokenGenerator')
const commonUtil = require("../utils/common")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class authService{
      async login(data){
      const { email, password } = data;
      if(!email || !password){
            throw new Error("All Fields required")
      }
      
      const user = await User.findOne({ where: { email } });
      // console.log(user)
      if(!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password_hash);
      // console.log(isMatch)
      if(!isMatch) throw new Error("Invalid credentials");

      const existingSession = await Session.findOne({
            where: { user_id: user.id }
      });

      if(existingSession && new Date() < existingSession.refresh_expires_at){
            await commonUtil.setLog(user.id,"login");
            return {
                  access_token: await tokenGenerator.getAccessToken(user.id),
                  refresh_token: await existingSession.refresh_token
            };
      }

      const refresh_token = await tokenGenerator.getRefreshToken(user.id);
      const refresh_expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await Session.upsert({
            user_id: user.id,
            refresh_token,
            refresh_expires_at
      });
      await commonUtil.setLog(user.id,"login");
      return {
            access_token: await tokenGenerator.getAccessToken(user.id),
            refresh_token
      };
}

      async signup(data){
            const {first_name,last_name,email,password,phone} = data
            if(!first_name || !last_name || !email || !password || !phone){
                  throw new Error("All fields required")
            }
            const role_id = 2;
            const user = await User.findOne({where:{email}})
            if(user){
                  throw new Error("User Already Exists")
            }
            const password_hash = await bcrypt.hash(password,10);
            await User.create({
                  first_name,
                  last_name,
                  email,
                  password_hash,
                  phone,
                  role_id
            })
            return true;

      }
      async refresh(refresh_token){
            const session = await Session.findOne({
                  where:{refresh_token}
            })
            if(!session){
                  throw new Error('Invalid refresh token')
            }
            if(new Date() > session.refresh_expires_at){
                  throw new Error('Refresh token expired')
            }
            const user = await User.findByPk(session.user_id,
                  {include: [{ model: Role, as: 'role' }]});
            
            if(!user){
                  throw new Error('No user Exist')
            }
            const accessToken = await tokenGenerator.getAccessToken(user.id)
            await commonUtil.setLog(user.id,"refresh-token");
            return {
                  access_token:accessToken
            }

            }

      async logout(refresh_token) {

            const session = await Session.findOne({
            where: { refresh_token }
            });

            if (!session) {
            throw new Error("No session found");
            }

            const userId = session.user_id;

            await session.destroy();

            await commonUtil.setLog(userId, "logout");

            return true;
      }

      async getMe(data){
            const session = await Session.findOne({where:{user_id:data.user_id}})
            if(!session){
                  throw new Error('Session not exist')
            }
            const user = await User.findByPk(data.user_id,{
                  include: [{ model: Role, as: 'role' }],
                  attributes: { exclude: ['password_hash'] }
            })
            if(!user){
                  throw new Error('User not found')
            }
            return {
                  id:user.id,
                  first_name:user.first_name,
                  last_name:user.last_name,
                  email:user.email,
                  role:user.role.name
            }
      }

      }
      

module.exports = new authService()