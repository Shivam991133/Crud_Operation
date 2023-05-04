const model = require('../model/imageModel')

const signup = async (req, res) => {
    try {
        const { originalname, mimetype, filename, size } = req.file;
        const { name, email, password } = req.body
        const file = new model({
            name: name,
            email: email,
            password: password,
            image: [{
                filename: filename,
                originalname: originalname,
                contentType: mimetype,
                size: size
            }]
        })
        const data = await file.save();
        res.render('./user/login');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await model.findOne({ email: email });
            if (user) {
                if (user.password == password) {
                    res.render('./user/userView', { data: user })
                } else {
                    res.send({ message: "Passowrd not Match" });
                }
            } else {
                res.send({ message: "User Not Found" })
            }

        } else {
            return res.send({ message: "Both Field Are Required" })
        }

    } catch (error) {
        console.log(error.message)
    }
}

const viewProfile = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await model.findOne({ _id: req.params.id });
        res.render('./user/userViewProfile', { data: data });
    } catch (error){
        console.log(error.message)
    }
}


module.exports = {
    signup,
    login,
    viewProfile
}
