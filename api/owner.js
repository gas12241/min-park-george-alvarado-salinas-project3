const express = require('express');

const OwnerModel = require('../db/owner.model');

const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', function(request, response) {
    const owner = request.body;

    return OwnerModel.createOwner(owner)
        .then(function(ownerData) {
            const cookie = {
                ownerName: ownerData.name
            }

            const token = jwt.sign(cookie, "HuntersSECRET", {
                expiresIn: '14d'
            })

            return response.cookie('jwt_token', token, {httpOnly: true})
                .status(200).send({username: ownerData.name});
        })
        .catch(function(error) {
            console.log(error)
            return response.status(400).send("Error: User cannot be created")
        })

})

router.post('/authenticate', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    OwnerModel.getOwnerByName(username)
        .then((owner) => {
            if(owner.password === password) {
                const cookie = {
                    ownerName: owner.name
                }

                const token = jwt.sign(cookie, "HuntersSECRET", {
                    expiresIn: '14d'
                })

                return res.cookie('jwt_token', token, {httpOnly: true})
                    .status(200).send({username})

            }  else {
                return res.send(400).send("The password does not work");
            }

        })
})

router.get('/isLoggedIn', function(request, response) {
    const jwt_token = request.cookies.jwt_token;

    if(!jwt_token) {
        return response.status('401').send('No token present!')
    }

    return jwt.verify(jwt_token, "HuntersSECRET", function(err, decoded) {
        if (err) {
            return response.status(400).send("Invalid token")
        } else {
            const ownerName = decoded.ownerName;

            return response.status(200).send("All logged in!")

        }

    })

})

router.post('/logOut', function(request, response) {

    return response.cookie('jwt_token', {}, {
        maxAge: 0,
    }).send('Successfully logged')

})


module.exports = router;