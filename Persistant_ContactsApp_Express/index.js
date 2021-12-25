const express=require('express');
const port=8000;

const app=express();
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const path=require('path');

//using template engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//Accessing the static files
app.use(express.static('Assests'));
//Using the parser as middleware
app.use(express.urlencoded());
//EJS variables
const title ="Contacts' App";

// app.get('/home',function(req,res){
//     res.render('home');
// });

app.get('/',function(req,res){
        Contact.find({},function(err,contacts){
            if(err){
                console.log('Unable to fetch the contacts');
                return;
            }
            return res.render('home',{
                title:title,
                contact_list:contacts
            });
        })
  
});


app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the selected element'+err);
            return;
        }

        res.redirect('/');
    });
}); 


//Button Action of create contact through form elements added
app.post('/create-contact',function(req,res){
    console.log(req.body.name);
    console.log(req.body.phone);

    Contact.create(req.body,function(err,newContact){
        if(err){
            console.log('Error in adding the contact');
            return;
        }
        console.log(newContact);
        return res.redirect('/');
    });
});


app.listen(port,function(err){
    if(err){
        console.log('error in firing up the server');
        return;
    }

    console.log('Successfully fired up the Server');
});
