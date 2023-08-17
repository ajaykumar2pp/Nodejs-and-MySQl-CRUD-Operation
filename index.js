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

app.put("/:personId", (req, resp) => {
    const id = req.params.personId;
    const { personId, firstname, lastname, city, salary, pincode } = req.body;
    const updateData = {
        personId,
        firstname,
        lastname,
        city,
        salary,
        pincode
    };
    console.log(updateData)
    connectMySQL.query("update test set ? where personId=?", [updateData, id], (err, result) => {
        if (err) {
            resp.send(err)
        }
        else {
            resp.send(result);
        }
    })
})

// *********************  Delete Data from MYSQL  ******************//
app.delete("/:personId", (req, resp) => {
    
    const personId = req.params.personId;
    console.log(personId)
    connectMySQL.query("DELETE FROM test WHERE personId = ?", [personId], (error, result) => {
        if (error) {
            console.error("Error executing query:", error);
            resp.status(500).json({ error: "An error occurred while deleting data." });
        } else {
            resp.json({ message: "Data deleted successfully.", result });
        }
    });

})

// ************************   Port Start   ********************************//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`My server start on this port ${PORT}`)
})