import AWS from 'aws-sdk'

AWS.config.update({
    region: "",
    accessKeyId: "",
    secretAccessKey: ""
})

const db = new AWS.DynamoDB.DocumentClient()

const UserTable = 'users'
const admin = 'admins'

export {
    db,
    UserTable,
    admin

}