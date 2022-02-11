
const express = require('express'); 
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.send('Hello world');
});


const array1 = []
let counter1 = 1;
const array2 = []
let counter2 = 1;

const filePath1 = __dirname + '/output1.txt'
const filePath2 = __dirname + '/output2.txt'

// more routes for our API will happen here
app.get('/api/input1/:val', (req, res) => {
    
    if(!req.params.val) {
        return res.status(400).send({
            error: true,
            message: "Bad request"
        })
    }

    array1.push(req.params.val)

    if((counter1 % 2) === 1) {
        // read from input1
        if(array1[counter1-1]) {
            const ind = counter1-1;
            counter1 = counter1+1;
            fs.appendFile(filePath1, `${array1[ind]}\n`, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
    }
    
    if((counter2 % 2) === 0) {
        // read from input1
        if(array1[Math.ceil(counter2/2) - 1]) {
            const ind = Math.ceil(counter2/2) - 1;
            counter2 = counter2 + 1;
            fs.appendFile(filePath2, `${array1[ind]}\n`, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
    }

    return res.send("OK");
})


app.get('/api/input2/:val', (req, res) => {
    if(!req.params.val) {
        return res.status(400).send({
            error: true,
            message: "Bad request"
        })
    }

    array2.push(req.params.val)

    if(counter1 % 2 === 0) {
        // read from input2
        if(array2[counter1-1]) {
            const ind = counter1 - 1;
            counter1 = counter1 + 1;
            fs.appendFile(filePath1, `${array2[ind]}\n`, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
    }

    if(counter2 % 2 === 1) {
        // read from input2
        if(array2[Math.ceil(counter2/2) - 1]) {
            const ind = Math.ceil(counter2/2) - 1;
            counter2 = counter2 + 1;
            fs.appendFile(filePath2, `${array2[ind]}\n`, (err) => {
                if(err) {
                    console.log(err)
                }
            })
        }
    }

    return res.send("OK");

})


// START THE SERVER
app.listen(port);
console.log('listening on port ' + port);
