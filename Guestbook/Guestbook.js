const fs = require("fs");
const express = require("express");
const path = require("path");
const uuid = require("uuid");

const app = express();
const port = 3000;


app.use(express.urlencoded({
    extended: true
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
        newComment.likes = 0;

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



// ----------------- Like Button 
app.put("/like/:id", function (request, response){
    console.log(request.params.id);
    fs.readFile("./myfile.json", "utf-8",(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        const clientJson = JSON.parse(result); // Detta är myfile.json
        const updateIndex = clientJson.findIndex(i=>i.id === request.params.id)

        // const updateIndex = clientJson.findIndex(function (i) {
        //     return i.id === request.params.id
        // })
        console.log(updateIndex);

        if(updateIndex === -1){ // Om den inte hittar index, retunerar den -1.
             return response.status(400).end();
        }

        clientJson[updateIndex].likes += 1;

        fs.writeFile("./myfile.json", JSON.stringify(clientJson, replacer, 2),(error, result) =>{
            if (error) {
                console.log(error);
                return;
            }
            response.json({}).end();
        })

    })
})


// ----------------- Dislike Button
app.put("/dislike/:id", function (request, response){
    console.log(request.params.id);
    fs.readFile("./myfile.json", "utf-8",(error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        const clientJson = JSON.parse(result); 
        const updateIndex = clientJson.findIndex(i=>i.id === request.params.id)

        console.log(updateIndex);

        if(updateIndex === -1){ 
             return response.status(400).end();
        }

        clientJson[updateIndex].likes -= 1;

        fs.writeFile("./myfile.json", JSON.stringify(clientJson, replacer, 2),(error, result) =>{
            if (error) {
                console.log(error);
                return;
            }
            response.json({}).end();
        })

    })
})



app.listen(port, () => {
    console.log(`Server running at localhost: ${port}`);
    });
    