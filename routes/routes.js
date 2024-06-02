import express from 'express'
import { createOrUpdate, deleteUserById, getUserById, readAllUsers, generateOTP, getUserByEmail } from '../userControllers/userController.js'


const router = express.Router()

// READ ALL Users
router.get('/users', async (req, res) => {
    const { success, data } = await readAllUsers()

    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, messsage: "Error" })
})

// Get User by ID
router.get('/user/:email', async (req, res) => {
    const { email } = req.params
    const { success, data } = await getUserById(email)
    console.log(data)
    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Create User
router.post('/user', async (req, res) => {
    const { success, data } = await createOrUpdate(req.body)
    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
})
router.post('/generateotp', async (req, res) => {
    const { email } = req.body;
    const userobj= await getUserById(email)
    if (Object.keys(userobj.data).length == 0) {
        console.log("hi");
        return res.json({ success: false, isUser: false })
    }
    else {
        console.log("hello");
        const { success, otp } = await generateOTP(req.body)
        if (success) {
            let tempObj=userobj.data 
            tempObj.otp= otp
            const userObjCreated = await createOrUpdate(tempObj)
            return res.json({ success, message:"OTP sent "})
        }
    }
    return res.status(500).json({ success: false, message: 'Error' })
})
router.post('/verifyotp', async (req, res) => {
    const { email,otp } = req.body;
    const { success, data } = await getUserById(email)
    if (data.otp == otp) {
        let tempObj=data
            tempObj.otp= ''     
        const userObjCreated = await createOrUpdate(tempObj)
        return res.json({ success, message:"OTP Verified ", userObjCreated})
    }
    else{
        return res.json({ success, message:"OTP Not Verified "})
    }
    return res.status(500).json({ success: false, message: 'Error' })

})

// Update User by ID
router.put('/user/:email', async (req, res) => {
    const user = req.body
    const { email } = req.params
    user.email = email

    const { success, data } = await createOrUpdate(user)

    if (success) {
        return res.json({ success, data })
    }

    return res.status(500).json({ success: false, message: "Error" })
})


// Delete User by Id
router.delete('/user/:email', async (req, res) => {
    const { email } = req.params
    const { success, data } = await deleteUserById(email)
    if (success) {
        return res.json({ success, data })
    }
    return res.status(500).json({ success: false, message: 'Error' })
})


export default router