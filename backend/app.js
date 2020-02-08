const express = require('express');
const bodyParser = require("body-parser");
const app = express();

// parses all the incoming request into valid json data.
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
});


app.get('/api/v1/festivals',(req,res,next) =>{   
    let results = [
        {name : 'Omega Fest',
         bands:[
          {
            name : 'P',
            recordLabel : 'Label 1'
          },
           {
             name : 'Z',
             recordLabel : 'Label 1'
           },
           {
            name : 'K',
            recordLabel : 'Label 2'
          }      
         ]
        },{
          name : '',
          bands:[
            {
              name : 'Y',
              recordLabel : 'Label 1'
            }]
        },
        {
          name : 'Beta Fest',
         bands:[      
           {
            name : 'K',
            recordLabel : 'Label 2'
          },
          {
            name : 'A',
            recordLabel : 'Label 2'
          }
         ]
        }];
   
        res.status(200).json({
                   message:'Festival List fetched successfully',
                   data : results
       });
 });



    module.exports = app;