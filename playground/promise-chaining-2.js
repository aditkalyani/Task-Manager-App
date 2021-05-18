const mongoose = require('../src/db/mongoose')
const { countDocuments } = require('../src/models/task')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('609e148842a2c045fc4685b1').then((result)=>{
//     console.log(result)
//     return Task.countDocuments({completed: false})
// }).then((count)=>{
//     console.log(count)
// }).catch((e)=>{
//     console.log(e)
// })
// //609e13b672dc080c6048eee1

const deleteAndCount = async (id, completed)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:completed})
    return count
}

deleteAndCount('609e13b672dc080c6048eee1', false).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})