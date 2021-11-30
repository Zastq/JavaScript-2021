const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { json } = require("express");

const app = express();
const port = 3000;
const file = "./posts.json";


app.use(express.urlencoded({
    extended: true,
    verify: function(request, response, buffer){
        request.rawBody=buffer.toString("utf8");
    }
}));

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')))


app.get("/commentSubmited", function(request, response){
    fs.readFile( "./myfile.json", "utf8", (error, result)=>{
     if (error) {
         console.log(error);
         return;
     }
     const clientJson = JSON.parse(result);
     response.json(clientJson).end();
     // return json(clientJson);
    }) 
 });


 function replacer(key, value){
    if (typeof value === "string"){
        // let replacerInput = value.replaceAll("<","&lt;");
        // replacerInput = replacerInput.replaceAll(">", "&gt;");
        // replacerInput = replacerInput.replaceAll...

        return value.replaceAll("<","&lt;").replaceAll(">", "&gt;")
    }
    return value;
}

app.post('/commentSubmited', function (request, response) {

    console.log(request.rawBody);
    console.log(request.body);

    // const inputObject = {
    //     name: request.body.name.replace("<","&lt;"),
    //     email: request.body.email.replace("<","&lt;"),
    //     comment: request.body.comment.replace("<","&lt;"),
    // }

    fs.readFile( "./myfile.json", "utf8", (error, result)=>{
        if (error) {
            console.log(error);
            return;
        }
        const clientJson = JSON.parse(result);
        clientJson.push(request.body) // array.

        fs.writeFile("./myfile.json", JSON.stringify(clientJson, replacer, 2),(error, result) =>{ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
            if (error) {
                console.log(error);
                return;
            }
            response.send(result);
        })
    });

   
});

app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
    });
    