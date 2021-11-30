document.addEventListener("DOMContentLoaded", main);

function main(){
    let contentComments = document.getElementById("commentsHtml");
    
    fetch("/commentSubmited").then(response=>response.json()).then(result => {  // har hand om Texten i myfile.json - lägger in på sidan.
        console.log(result);

        result.forEach(element => {
        const nameElement = document.createElement("p");
        const emailElement = document.createElement("p");
        const commentElement = document.createElement("p");
    

        nameElement.innerText = "Namn: " + element.name;
        emailElement.innerText = "Email: " + element.email;
        commentElement.innerHTML = "Kommentar: " + element.comment;  // InnerHTML så escape sekvenser blir korrekt utskrivna.

        contentComments.append(nameElement, emailElement, commentElement, document.createElement("hr"));
            // Går bara gör en gång, ska vi skicka samma så får vi använda oss utav etc "nameElement.cloneNode(true)""
    });

    
        

    })

}

function fromOnsubmit(event){  // Har hand om submit/form för att lägga in object/text i filen.
    console.log(event.target);



    const data = new FormData(event.target); // Se om det går att göra om till Json istället.
    fetch("/commentSubmited", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(Object.fromEntries(data))})  // Går till /test, med metoden "post". Och då skickar den med json data.
    event.preventDefault();
};