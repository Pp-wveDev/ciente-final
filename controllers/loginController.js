const express = require('express');

var router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.session.email) {
            res.render('main', {
                email: req.session.email,
                token: req.session.token
            });
        } else {
            res.render('login',
                {
                    layout: 'oauthLayout',
                    message: ''
                }
            );
        }
    } catch (err) {
        res.json({ message: "fallo" });
    }
});

router.post('/userAuth', async (req, res) => {
    const email = req.body.email;
    const token = req.body.idtoken;
    
    req.session.email = email;
    req.session.token = token;
    req.session.save();

    return res.json({ hola: "hola" });
});

router.post('/logout', async (req, res) => {
    req.session.destroy();
    res.json({ hola: "hola" });
});

// Login alternativo
router.post('/loginAlt', async (req, res) => {
    const email = req.body.usuario;

    req.session.email = email;
    req.session.save();

    return res.redirect('/principal');
});


module.exports = router;