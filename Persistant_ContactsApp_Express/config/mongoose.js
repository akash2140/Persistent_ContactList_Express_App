const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contact_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Connection Error'));

db.once('open',function(){
    console.log('Connection to DB successfull');
});