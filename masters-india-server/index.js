const express = require('express');
const connection = require("./connection")
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST"],
        credentials: true
    })
)

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    connection.query("SELECT id FROM users where username = ?", [username],
        (err, result) => {
            if (err) {
                console.log(err)
                res
                    .status(500)
                    .send({ status: false, message: "Internal Server Error" });
            } else {
                if (!result.length) {
                    connection.query(
                        "INSERT INTO users (username, password, name) VALUES (?, ?, ?)",
                        [username, password, name],
                        (err, result) => {
                            if (err) {
                                console.log(err)
                                res
                                    .status(500)
                                    .send({ status: false, message: "Internal Server Error" });
                            } else {
                                res.send({
                                    status: true,
                                    message: "User Registered"
                                })
                            }
                        }
                    )
                } else {
                    res.send({
                        status: false,
                        message: "User Already Exists"
                    })
                }
            }
        })


})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    connection.query(
        "SELECT id FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err)
                res
                    .status(500)
                    .send({ status: false, message: "Internal Server Error" });
            } else {
                if (result.length) {

                    const token = jwt.sign({
                        username: username
                    }, 'test123')

                    res.send({
                        status: true,
                        message: "User exists",
                        user: token,
                        user_id: result[0].id

                    })
                } else {
                    res.send({
                        status: false,
                        message: "Invalid username or Password"
                    })
                }
            }
        }
    )
})

app.get('/getSnippets', (req, res) => {

    try {        
        jwt.verify(req.headers['x-access-token'], 'test123')
        connection.query(`SELECT s.id,s.snippet,uf.id as fav FROM snippets s 
        LEFT JOIN snippet_tag_mapping stm on stm.snippet_id = s.id 
        LEFT JOIN tags t on t.id = stm.tag_id 
        LEFT JOIN user_favourites uf on uf.snippet_id = s.id AND uf.user_id = ${req.query.user_id} ` +
            (req.query?.tags?.length || (req.query?.onlyFav == "true") ? " WHERE " : "") +
            (req.query?.tags?.length ? " ( " + req.query.tags.map((tag) => { return ` t.tag LIKE '%${tag}%' ` }).join(" OR ") + " ) " : "") +
            (req.query?.onlyFav == "true" ? " uf.id IS NOT NULL " : "") + 
                ` LIMIT ${req.query.count * 10}, 10`,
            (error, result) => {
                if (error) {
                    res
                        .status(500)
                        .send({ status: false, message: "Internal Server Error" });
                    console.log(error)
                } else {
                    res.send({
                        status: true,
                        results: result
                    })
                }
            })
    } catch (error) {
        console.log(error)
        res
            .send({ status: false, message: "Invalid Token" });
    }

});

app.get('/getTags', (req, res) => {
    try {

        jwt.verify(req.headers['x-access-token'], 'test123')

        connection.query("SELECT * FROM tags", (error, result) => {
            if (error) {
                res
                    .status(500)
                    .send({ status: false, message: "Internal Server Error" });
                console.log(error)
            } else {
                res.send({
                    status: true,
                    results: result
                })
            }
        })
    } catch (error) {
        console.log(error)
        res
            .send({ status: false, message: "Invalid Token" });
    }
});

app.post('/markAsFav', (req, res) => {
    try {

        jwt.verify(req.headers['x-access-token'], 'test123')

        connection.query(" INSERT INTO user_favourites (user_id, snippet_id) VALUES (?, ?) ", [req.body.user_id, req.body.snippet_id], (error, result) => {
            if (error) {
                res
                    .status(500)
                    .send({ status: false, message: "Internal Server Error" });
                console.log(error)
            } else {
                res.send({
                    status: true,
                    message: "Added to Favourites"
                })
            }
        })
    } catch (error) {
        console.log(error)
        res
            .send({ status: false, message: "Invalid Token" });
    }
});

app.post('/removeAsFav', (req, res) => {
    try {

        jwt.verify(req.headers['x-access-token'], 'test123')

        connection.query(" DELETE FROM `user_favourites` WHERE user_id = ? AND snippet_id = ? ", [req.body.user_id, req.body.snippet_id], (error, result) => {
            if (error) {
                res
                    .status(500)
                    .send({ status: false, message: "Internal Server Error" });
                console.log(error)
            } else {
                res.send({
                    status: true,
                    message: "Added to Favourites"
                })
            }
        })
    } catch (error) {
        console.log(error)
        res
            .send({ status: false, message: "Invalid Token" });
    }
});

app.listen(PORT, (error) => {
    if (!error)
        console.log(`Server is Successfully Running, and App is listening on port ` + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);
