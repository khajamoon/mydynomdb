import {db, UserTable} from '../config/db.config.js'
import  nodemailer from "nodemailer";


// Create or Update users
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: UserTable,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read all users
const readAllUsers = async()=>{
    const params = {
        TableName: UserTable
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        return { success: false, data: null }
    }

}

// Read Users by ID
const getUserById = async (value, key = 'email') => {
    const params = {
        TableName: UserTable,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

const getUserByEmail = async (value, key = 'email') => {
    const params = {
        TableName: users,
        Key: {
            [key]: value
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete User by ID
const deleteUserById = async(value, key = 'email' ) => { 
    const params = {
        TableName: UserTable,
        Key: {
            [key]: value
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}
const generateOTP = async (value, res) => {
    const { email } = value;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: "khajashai21206@gmail.com",
          pass: "",
        },
      });
      var mailOptions = {
        from: "khajashai21206@gmail.com",
        to: email,
        subject: "OTP to Login into your Account",
        text: `hi user your OTP is ${otp} do not share it `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw err;
        } else {
            return { success: true }
        }
      });
      return { success: true, otp : otp }
 
  
};


export {
    createOrUpdate,
    readAllUsers,
    getUserById,
    deleteUserById,
    generateOTP,
    getUserByEmail
}