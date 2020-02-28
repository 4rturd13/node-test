const express = require("express");
const fileUpload = require("express-fileupload");

const app = express;

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
);

app.post("/upload", function(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Please select file"
            }
        });
    }

    const file = req.files.file;

    file.mv("../../uploads/file.jpg", err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: "Image upload!"
        });
    });
});

module.exports = app;
