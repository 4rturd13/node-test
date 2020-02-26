const express = require("express");

const app = express();

const Specialties = require("../models/Specialties");

app.get("/specialties", (req, res) => {
    Specialties.find({}).exec((err, specialties) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            specialties
        });
    });
});

app.post("/specialties", (req, res) => {
    const body = req.body;

    const specialties = new Specialties({
        name: body.name,
        createdBy: body.createdBy,
        createdAt: body.createdAt,
        updatedBy: body.updatedBy,
        updatedAt: body.updatedAt
    });

    specialties.save((err, specialtiesDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!specialtiesDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            specialties: specialtiesDB
        });
    });
});

app.put("/specialties", (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, [
        "name",
        "createdBy",
        "createdAt",
        "updatedBy",
        "updatedAt"
    ]);

    Specialties.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true },
        (err, providersDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                specialties: specialtiesDB
            });
        }
    );
});

app.delete("/specialties", (req, res) => {
    const id = req.params.id;

    Specialties.findByIdAndRemove(id, (err, specialtiesDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!specialtiesDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "ID no found"
                }
            });
        }

        res.json({
            ok: true,
            message: "Deleted specialties"
        });
    });
});

module.exports = app;
