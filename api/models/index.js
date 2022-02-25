const mongoose=require('mongoose');
module.exports= async function(){
    try{
        const db=await mongoose.connect('mongodb://localhost/nodejs');
        console.log('Ket noi den database thanh cong');
    }
    catch(error){
        console.log('Ket noi den database that bai');
    }
}