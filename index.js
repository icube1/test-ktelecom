const express = require('express');
const mysql = require('mysql');

// const conditionString = "?condition=located+high+temperature&desc=Sensor+1%2CSensor+4%3A+high+temperature&sensor1=30&sensor2=15%2E5&sensor3=14&sensor4=31&sensor5=16&sensor6=15&sensor7=14%2E5";


// const data = conditionString.split('&');
// // console.log(data)

// function parsedData (conditionString) {
//     const cond = data.match(/'?condition'/g)
// }
// console.log(parsedData(conditionString));


// const sourceData = `{
//     "cond": "located high temperature",
//     "desc": "Sensor 1, Sensor 4: high temperature",
//     "sensors": {
//         "sensor1": 30,
//         "sensor2": 15.5,
//         "sensor3": 14,
//         "sensor4": 31,
//         "sensor5": 16,
//         "sensor6": 15,
//         "sensor7": 14.5
//     }
// }`


//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

//connect to myssql
db.connect(err => {
    if(err){
        throw err
    }
    console.log('mysql connected')
});

const app = express();

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.status(200).send('database created');
    });
});

//create tabble
app.get('/create-notification', (req, res) => {
    let sql = 'CREATE TABLE notification(id INT AUTO_INCREMENT, date DATETIME(6), cond VARCHAR(255), description VARCHAR(255), sensors VARCHAR(255), PRIMARY KEY(id))'
    //let sql = CREATE TABLE `nodemysql`.`notification2` ( `id` INT NOT NULL , `date` DATETIME(6) NOT NULL , `cond` INT(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `sensors` JSON NOT NULL )
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.status(200).send('notification created')
    });
});

//insert data
app.get('/notification1', (req, res) => {
    const data = JSON.parse(req.body);
    const sensors = JSON.stringify(data.sensors);

    let post = { date: new Date(), cond: data.cond, description: data.desc, sensors: sensors }
    let sql = 'INSERT INTO notification SET ?'
    let query = db.query(sql, post, err => {
        if(err){
            throw err
        }
        return res.status(200).send('data added into notification table');
    })
})

app.listen('3000', () => console.log('server started on port 3000'));