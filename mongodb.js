const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true}, (error, client)=>{
    if(error){
        return console.log('Unable to connect to databse')
    }

    console.log('Connection successful')
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Adit',
    //     age: 21
    // }, (error,result)=>{
    //     if(error){
    //         return console.log('Could not insert the document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jay',
    //         age: 22
    //     },
    //     {
    //         name: 'Ayush',
    //         age: 21
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Could not insert into databse')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Learn mongodb',
    //         completed: true
    //     },
        
    //     {
    //         description: 'Playing CS',
    //         completed: false
    //     },
        
    //     {
    //         description: 'Working on IAP',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Could not insert into databse')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').findOne( {_id:new ObjectID("609780463f016b077c21f0b5")}, (error, task)=>{
    //     if(error){
    //         return console.log('Problem in fetching')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).count((error, tasks)=>{
    //     if(error){
    //         return console.log('Problem in fetching')
    //     }

    //     console.log(tasks)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks)=>{
    //     if(error){
    //         return console.log('Problem in fetching')
    //     }

    //     console.log(tasks)
    // })

    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID("60977c8e52b7bc2c38ba9d02")
    //     },{
    //         $set:{ 
    //             name:'Alexander'
    //         }
    //     }
    // ).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false    
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('users').deleteMany({
        age:21
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    // db.collection('tasks').deleteOne({
    //     description:"Playing CS"
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
})