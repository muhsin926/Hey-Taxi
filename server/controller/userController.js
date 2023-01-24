import passangerModel from '../model/passenger-schema.js'
import bcrypt from 'bcrypt'

export default {
    postSingUp: async(req,res) => {
        try{
            let  userSignUpp={
                Status:false,
                message:null,
                }
                const { enteredEmail,enteredname} = req.body
                let { enteredPassword} = req.body
                let user = await passangerModel.find({ email: enteredEmail })
                if(user){
                    enteredPassword= await bcrypt.hash(enteredPassword, 10)
                    userCollection.create({
                        Name:enteredname ,
                        email:enteredEmail,
                        password:enteredPassword,
                        
                    }).then((data) => {
                        userSignUpp.Status=true
                        res.send({ userSignUpp })
                    })
                }else{
                    userSignUpp.message="email already exists try login with this email"
                    res.send({ userSignUpp })      
                  }
        }catch(err){
            console.log(err);
        }
    }
}