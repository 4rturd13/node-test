const express = require("express");

const _ = require("underscore");
const User = require("../models/user");

const app = express();

app.get("/user", function(req, res) {
    /*  pagination */
    let from = req.query.from || 0;
    from = Number(from);

    User.find(
        { state: true },
        "name email img role state google"
    ) /* exclude fields */
        .skip(from)
        .limit(5)
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            /* quantity register */
            User.countDocuments({ state: true }, (err, counter) => {
                res.json({
                    ok: true,
                    user,
                    quantity: counter
                });
            });
        });
});

app.post("/user", function(req, res) {
    const body = req.body;

    const user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.put("/user/:id", function(req, res) {
    const id = req.params.id;
    const body = _.pick(req.body, ["name", "email", "img", "role", "state"]);

    User.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true },
        (err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                user: userDB
            });
        }
    );
});

app.delete("/user/:id", function(req, res) {
    const id = req.params.id;

    const changeState = {
        state: false
    };
    /* change state to false on database */
    User.findByIdAndUpdate(
        id,
        changeState,
        { new: true },
        (err, userDeleted) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!userDeleted) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "User no found"
                    }
                });
            }

            res.json({
                ok: true,
                user: userDeleted
            });
        }
    );
});

module.exports = app;
