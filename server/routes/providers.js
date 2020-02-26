const express = require("express");

const _ = require("underscore");
const Providers = require("../models/providers");

const app = express();

app.get("/providers", function(req, res) {
    /*  pagination */
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.from || 5;
    limit = Number(limit);

    Providers.find(
        {}
        // "firstName lastName middleName email"
    )
        .skip(from)
        .limit(limit)
        .exec((err, providers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            /* quantity register */
            Providers.countDocuments({}, (err, counter) => {
                res.json({
                    ok: true,
                    providers,
                    quantity: counter
                });
            });
        });
});

app.post("/providers", function(req, res) {
    const body = req.body;

    const providers = new Providers({
        firstName: body.firstName,
        lastName: body.lastName,
        middleName: body.middleName,
        email: body.email,
        specialties: body.specialties,
        projectedStartDate: body.projectedStartDate,
        employerId: body.employerId,
        providerType: body.providerType,
        staffStatus: body.staffStatus,
        assignedTo: body.assignedTo,
        status: body.status
    });

    providers.save((err, providersDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            providers: providersDB
        });
    });
});

app.put("/providers/:id", function(req, res) {
    const id = req.params.id;
    const body = _.pick(req.body, [
        "firstName",
        "lastName",
        "middleName",
        "email",
        "specialties",
        "projectedStartDate",
        "employerId",
        "providerType",
        "staffStatus",
        "assignedTo",
        "status"
    ]);

    Providers.findByIdAndUpdate(
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
                providers: providersDB
            });
        }
    );
});

app.delete("/providers/:id", function(req, res) {
    const id = req.params.id;

    let changeState = {
        state: false
    };
    /* change state to false on database */
    Providers.findByIdAndUpdate(
        id,
        changeState,
        { new: true },
        (err, providersDeleted) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!providersDeleted) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Providers no found"
                    }
                });
            }

            res.json({
                ok: true,
                providers: providersDeleted
            });
        }
    );
});

module.exports = app;
