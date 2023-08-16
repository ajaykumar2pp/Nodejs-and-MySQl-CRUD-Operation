const express = require('express');
const app = express();


// ************************  Database Connection  **********************************//
const connectMySQL = require('./db')

// *************************    Assets    ****************************************//
app.use(express.json())

// ***********************************  Get Data From MySQL  ******************
app.get("/", (req, resp) => {
    connectMySQL.query("select * from  test", (err, result) => {
        if (err) {
            resp.send("error")
        }
        else {
            resp.send(result)
        }
    })
})

// ***********************************  Post Data into MYSQL  ******************

app.post("/", (req, resp) => {
    const data = req.body;
    console.log(data)
    connectMySQL.query("insert into test set ?", data, (err, result, fields) => {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(result);
        }
    })
})



// ***********************************  Update Data into MYSQL  ******************

app.put("/:id", (req, resp) => {
    const id = req.params.id;
    const { personId, firstname, lastname, city, salary, pincode } = req.body;
    const updateData = {
        personId,
        firstname,
        lastname,
        city,
        salary,
        pincode
    };
    connectMySQL.query("update test set ? where id=?", [updateData, id], (err, result) => {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(result);
        }
    })
})

// *********************  Delete Data from MYSQL  ******************//
app.delete("/:id", (req, resp) => {
    console.log(req.body)
    const id = req.params.id;
    connectMySQL.query("delete from  test where id=?" , [id], (error, result) => {
        if (error) {
            resp.send(error)
        } else {
            resp.send(result)
        }
    })

})

// ************************   Port Start   ********************************//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`My server start on this port ${PORT}`)
})