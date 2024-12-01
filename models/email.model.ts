import mongoose from 'mongoose'



const sampleEmail = new mongoose.Schema({
    body:{
        type:String,
        required:[true, "Body is required."]
    },
    title:{
        type:String,
        required:[true, "Subject is required."]
    },
})


const sampleModel  = mongoose.model("email",sampleEmail)

export default sampleModel