const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createConnection({
	host: 'localhost',
	user:    'root',
	password:   'password',
	database:   'CRUDDataBase',
	port: 3306
})

 /* db.connect(err => {
	if (!err) {
	  console.log("DB Connection Succeeded");
	} else {
	  console.log("DB Connection Failed");
	}
}); */

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/get", (req,res) => {
    const sqlSelect = "SELECT * FROM workerss;"
    db.query(sqlSelect,(err,result) => {
        res.send(result)
    })
})

app.post("/insert", (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const contact = req.body.contact;

    const sqlInsert = "INSERT INTO workerss (firstname, lastname, email, contact ) VALUES (?,?,?,?);"
    db.query(sqlInsert,[firstname,lastname,email,contact], (err, result) => {
        console.log(result)
    })
})

app.delete("/delete/:id", (req,res) => {
    const id = req.params.id
    const sqlDelate = "DELETE FROM workerss WHERE id = ?";
    db.query(sqlDelate, id, (err, result) => {
        if (err) console.log(err)
    })
})

app.listen(4000, () => {
    console.log("app run on 4000")
})


