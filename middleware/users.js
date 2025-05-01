import jwt from 'jsonwebtoken';

export default {
    validateRegister: (req, res, next) => {
        //username min length < 3
        if(!req.body.username || req.body.username.length < 3) {
            return res.status(400).send({
                message : 'Enter username with min. 3 chars'
            });
        }
    
        //password min 6 chars
        if(!req.body.password || req.body.password.length < 6){
            return res.status(400).send({
                message : 'Password too short min. 6 chars'
            });
        }
        // password(repeat) must match
        if(!req.body.password_repeat || req.body.password !== req.body.password_repeat){
            return res.status(400).send({
                message : 'passwords dont match'
            });
        }
        next();
    }

}

// export default validateRegister;