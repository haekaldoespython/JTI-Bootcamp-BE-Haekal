const express = require('express');
const router = express.Router();
const mongo = require('mongojs');
const db = mongo('mongodb+srv://haekalghfr:NasiPadang22@cluster0.lioapft.mongodb.net/CSR', ['todos']);

router.get('/', function(req, res, next){
    let query = {};
    if (req.query.text) query.text = req.query.text;
    if (req.query.isCompleted) {
        if (req.query.isCompleted === 'true') query.isCompleted = true;
        else query.isCompleted = false;
    }
    console.log(query);

    db.todos
    .find(query, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/', function(req,res,next){
    let todo = req.body;

    if (!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

router.put('/:id', function(req, res, next){

    let todo = req.body;

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    } else {
        db.todos
        .replaceOne({
            _id: db.ObjectId(req.params.id)
        }, todo, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});


router.delete('/:id', function(req, res, next){ {
    db.todos
        .remove({
            _id: db.ObjectId(req.params.id)
        }, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        });

    }
});





//router.get('/goodbye', function(req, res, next){ //ini '/' jadi setelah docs bootcamp ada '/' lagi sebenernya tapi ga dikasih liat| address = http://localhost:3000/api/v1/bootcamp/goodbye
//    res.send('Goodbye, World! ')
//});

//router.get('/hello', function(req, res, next){ //ini '/' jadi setelah docs bootcamp ada '/' lagi sebenernya tapi ga dikasih liat| address = http://localhost:3000/api/v1/bootcamp/hello
//    res.send('Hello, World! ')
//});

module.exports = router;


//ini address local nya http://localhost:3000/api/v1/bootcamp

//restart applikasinya dengan pencet ctrl+c