const fs = require("fs");
const express = require("express");
const path = require("path");
const uuid = require("uuid");


const app = express();
const port = 3000;


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

        return value.replaceAll("<","&lt;").replaceAll(">", "&gt;")
    }
    return value;
}

app.post('/commentSubmited', function (request, response) {
    fs.readFile( "./myfile.json", "utf8", (error, result)=>{
        if (error) {
            console.log(error);
            return;
        }
        let newComment = request.body;
        newComment.id = uuid.v4(); // Genererar ett slumpat ID.

        const clientJson = JSON.parse(result);
        clientJson.push(newComment) // array.

        fs.writeFile("./myfile.json", JSON.stringify(clientJson, replacer, 2),(error, result) =>{ // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
            if (error) {
                console.log(error);
                return;
            }
            response.json({}).end();
        })
    });
});


app.listen(port, () => {
    console.log(`Server running at localhost:${port}`);
    });
    