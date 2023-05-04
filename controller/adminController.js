const model = require('../model/imageModel');


const adminLogin = async (req, res) => {
    try {
        const {email,password } = req.body;
        if (email && password) {
            const user = await model.findOne({ userType: "ADMIN" });
            if (user) {
                if (user.password == password) {
                    res.render('./admin/adminDashboard');
                } else {
                    res.send({ message: "Passowrd not Match" });
                }
            } else {
                res.send({ message: "admin Not Found" })
            }

        } else {
            return res.send({ message: "Both Field Are Required" })
        }
    } catch (error) {
        console.log(error.message)
    }
}


const deletedUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const deletedUser = await model.findByIdAndDelete({ _id: req.params.id });
        if (deletedUser) {
            console.log(deletedUser)
            res.redirect('http://localhost:3000/admin/view');
        } else {
            console.log('Data not deleted');
        }
    } catch (error) {
        console.log(error.message);
    }
}


const viewAllUser = async (req, res) => {
    try {
        const admin = await model.find({ userType: { $ne: "ADMIN" } });
        if (!admin) {
            return res.send({ responseCode: 404, responseMessage: "admin data not found" })
        } else {
            return res.render('./admin/view', { admin: admin });
        }

    } catch (error) {
        console.log(error.message)
    }
}

const viewUserProfile = async(req,res)=>{
    try {
        const user = await model.findById(req.params.id);
        console.log(user)
        if(user){
            res.render('./admin/viewuserData',{data:user})

        }else{
            res.send({message:"User Not Found"})
        }

        
    } catch (error) {
        console.log(error.message);
    }
}


const updateUserProfile = async(req,res)=>{
        try {
            const updatedUser = await model.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, { new: true });
            res.render('./user/updareProfile', {user: updatedUser});
        } catch (error){
            console.log(error.message);
        }
}

module.exports = {
    adminLogin,
    deletedUser,
    viewAllUser,
    updateUserProfile,
    viewUserProfile
}



