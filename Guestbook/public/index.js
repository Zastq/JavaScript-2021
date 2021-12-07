document.addEventListener("DOMContentLoaded", main);


function main(){
    
    let contentComments = document.getElementById("commentsHtml");
    
    fetch("/commentSubmited").then(response=>response.json()).then(result => {  // har hand om Texten i myfile.json - lägger in på sidan.
        console.log(result);

        result.forEach(element => {
            const nameElement = document.createElement("p");
            const emailElement = document.createElement("p");
            const commentElement = document.createElement("p");
            const counterElement = document.createElement("span");


            const likeButtonElement = document.createElement("button")
            likeButtonElement.innerHTML = "Like";
            likeButtonElement.addEventListener("click", function(){
                likeButton(element.id)
            })

            const dislikeButtonElement = document.createElement("button")
            dislikeButtonElement.innerHTML ="Dislike"
            dislikeButtonElement.addEventListener("click", ()=>{
                dislikeButton(element.id)
            })
        
            
            nameElement.innerText = "Namn: " + element.name;
            emailElement.innerText = "Email: " + element.email;
            commentElement.innerHTML = "Kommentar: " + element.comment;  // InnerHTML så escape sekvenser blir korrekt utskrivna.
            counterElement.innerText = "Likes: " + element.likes + " ";

            contentComments.append(nameElement, emailElement, commentElement, counterElement, likeButtonElement, dislikeButtonElement, document.createElement("hr"));
                // Går bara gör en gång, ska vi skicka samma så får vi använda oss utav etc "nameElement.cloneNode(true)""
        });
    })



}

function likeButton(id){
    //console.log("Has Been Clicked", id);
    fetch("/like/"+ id, { method: "PUT", headers:{"Content-Type":"application/json"}, body:"{}"})
}

function dislikeButton(id){
    fetch("/dislike/"+ id, { method: "PUT", headers:{"Content-Type":"application/json"}, body:"{}"})
}



function fromOnsubmit(event){  // Har hand om submit/form för att lägga in object/text i filen.
    console.log(event.target);

    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    const inputComment = document.getElementById("inputComment");
    const errorMessage = document.getElementById("errorMessage");

    let messages = [];


    if (inputName.value === '' || inputName.value == null) {
        messages.push("Name cannot be empty")
    } 


    if (inputEmail.value === '' || inputEmail.value == null) {
        messages.push("Email cannot be empty")
    } else if (!inputEmail.value.match(/^\S+@\S+/)) 
    {
        messages.push("Incorrect email input.")
    }


    if (inputComment.value === '' || inputComment.value == null) {
        messages.push("Comment cannot be empty")
    } 


    if (messages.length == 0) {
        messages.push("Sucess!")

        const data = new FormData(event.target);
        fetch("/commentSubmited", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(Object.fromEntries(data))}).then(response => response.json()).then(element => {

            // Skapar inlägget direkt temporärt utan att uppdatera sidan.

            let contentComments = document.getElementById("commentsHtml");  

            const nameElement = document.createElement("p");
            const emailElement = document.createElement("p");
            const commentElement = document.createElement("p");
            const counterElement = document.createElement("span");


            const likeButtonElement = document.createElement("button")
            likeButtonElement.innerHTML = "Like";
            likeButtonElement.addEventListener("click", function(){
                likeButton(element.id)
            })

            const dislikeButtonElement = document.createElement("button")
            dislikeButtonElement.innerHTML ="Dislike"
            dislikeButtonElement.addEventListener("click", ()=>{
                dislikeButton(element.id)
            })
        
            
            nameElement.innerText = "Namn: " + element.name;
            emailElement.innerText = "Email: " + element.email;
            commentElement.innerHTML = "Kommentar: " + element.comment; 
            counterElement.innerText = "Likes: " + element.likes + " ";

            contentComments.append(nameElement, emailElement, commentElement, counterElement, likeButtonElement, dislikeButtonElement, document.createElement("hr"));
        })  // Går till /commentSubmited, med metoden "post". Och då skickar den med json data.

    }

    errorMessage.innerText = messages.join(", \n");

    event.preventDefault();
};