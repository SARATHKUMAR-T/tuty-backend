import mongoose from "mongoose"


export function dbConnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
     
    try {
        mongoose.connect('mongodb+srv://sarath:sarath@tuty.qblwsu2.mongodb.net/?retryWrites=true&w=majority',params)
        console.log("database connected successfully");
    } catch (error) {
        console.log('error connecting database');
    }
}
