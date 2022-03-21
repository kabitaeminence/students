const validator = require('../validator/validation');

const create = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "Name": "required|string",
        "password": "required|string|min:6|confirmed",
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            // console.log("Validation true")
            res.send("Validation true")
            next()
        }
        else {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        }
    });
}
module.exports = { create }
