//create sample express app
var express = require('express');
const axios = require("axios").default;
var mysql = require('mysql');
var app = express();
var dayjs = require('dayjs')
const path = require('path');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'samprama'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/home.html'));
});

app.get('/getdata', (req, res) => { //request and response
    // getData()
    axios.get("https://myfirstiiotapp.herokuapp.com/api/metrics?api_key=5QXTnPPVh62U3x8bRM5K")
    .then(result => {
        var data = result.data.data
        console.log(data)
        data.forEach(element => {
            let datetime = dayjs(element.time).format('YYYY-MM-DD  HH:mm:ss.000')

            console.log(dayjs(element.time).format('YYYY-MM-DD  HH:mm:ss.000'))
            var sql = `INSERT INTO reports (machine_name, temperature, pressure, machined_parts, time) VALUES ('${element.machine}', '${element.data[0].value}', '${element.data[1].value}', '${element.data[2].value}', '${datetime}')`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
            });
        });
            
        res.send(data);
    })
    .catch(err => {
        console.log(err)
    })
});


app.get('/getJson', (req,res) => {
    
        mysqlConnection.query()`SELECT * FROM reports WHERE machine_name = ?`, [machine_name, temperature, pressure, machined_parts, time] 
            con.query(sql, function (err, result) {
                if (!err)
                res.send(machine_name);
                else
                console.log(err);
              });
         
});


async function getData() {
    const data = await axios.get("https://myfirstiiotapp.herokuapp.com/api/metrics?api_key=5QXTnPPVh62U3x8bRM5K")
    return data
}



app.listen(3000, () => console.log('Listening on port 3000'));