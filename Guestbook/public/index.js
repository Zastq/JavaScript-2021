document.addEventListener("DOMContentLoaded", main);

function main(){
    let contentComments = document.getElementById("commentsHtml");
    
    fetch("/commentSubmited").then(response=>response.json()).then(result => {
        console.log(result);

        result.forEach(element => {
        const nameElement = document.createElement("p");
        const emailElement = document.createElement("p");
        const commentElement = document.createElement("p");
    

        nameElement.innerText = element.name;
        emailElement.innerText = element.email;
        commentElement.innerText = element.comment;

        contentComments.append(nameElement, emailElement, commentElement, document.createElement("hr"));
            // Går bara gör en gång, ska vi skicka samma så får vi använda oss utav etc "nameElement.cloneNode(true)""
    });

    
        

    })

}

function fromOnsubmit(event){
    console.log(event);
    const data = new FormData(event.target); // Se om det går att göra om till Json istället.
    fetch("/commentSubmited)", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(Object.fromEntries(data))})  // Går till /test, med metoden "post". Och då skickar den med json data.
    event.preventDefault();
};