const mongoose = require('../src/db/mongoose')
const { findByIdAndUpdate, countDocuments } = require('../src/models/user')
const User = require('../src/models/user')

// User.findByIdAndUpdate('609b78a68cf3403ecc706099',{age:18}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:0})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAndCount = async (id, newAge, ageToCount)=>{
    const user = await User.findByIdAndUpdate(id, {age:newAge})
    const count = await User.countDocuments({age:ageToCount})
    return count
}

updateAndCount('609bb17238a0a74f4ccab48f', 30, 21).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})