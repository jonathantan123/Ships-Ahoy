import sum from './sum';
import axios from 'axios';

let messages = 

{
  "scoops ahoy": "Scoops ahoy!", 
  "where are you located?": "Starcourt mall, Hawkins Indiana", 
  "what do you think about kids?": "Man, kids are the worst! Who needs 'em, anyway?"
}

let locations = []
let found = []

const Carousel = require("vanilla-js-carousel");


var carousel = new Carousel({
  elem: 'carousel',    // id of the carousel container
  autoplay: true,      // starts the rotation automatically
  infinite: true,      // enables infinite mode
  interval: 3000,      // interval between slide changes
  initial: 0,          // slide to start with
  arrows: true,        // show navigation arrows
  buttons: false,      // hide <play>/<stop> buttons,
  btnStopText: 'Pause' // <stop> button text
});



carousel.show(0);


function renderChat() { 
  let chatContainer = document.getElementById("chat-container")
  
  let chatBox = document.createElement("div")
  let formContainer = document.createElement("form")
  formContainer.id = "form-container"
  let header = document.createElement("h2")
  let message = document.createElement("label")
  let messageArea = document.createElement("textarea")
  let sendButton = document.createElement("button")

  
  header.innerText = "Chat"
  message.innerText = "Message"
  messageArea.id = "messageBox"
  messageArea.name = "name"
  sendButton.innerText = "Send"

  formContainer.addEventListener("submit", chatHandler)


  
  formContainer.append(header,message,messageArea, sendButton)
  chatBox.append(formContainer)
  chatContainer.append(chatBox)


}




function botResponse(question) { 
  
  let sanitizedQ = question.toLowerCase()
  let response

    if(sanitizedQ.includes("is there ice cream in")) { 
      let zip = sanitizedQ.slice(-5)
      findIceCream(zip)


      } else if (Object.keys(messages).includes(sanitizedQ)) { 
      response = messages[sanitizedQ]
      appendChat(response, "bot")
      } else { 
        response = "Yeah, that's a no"
        appendChat(response, "bot")
      }



 
}

function fetchLocations () { 
  fetch('https://project.wnyc.org/ice-cream/data/places.json')
  .then(resp => resp.json()) 
  .then(resp => {
    locations = resp
  })
}
//// helpers 


function appendLocation(location) { 
let chatScreen = document.getElementById("chat-screen")

let container = document.createElement("div")
let address = document.createElement("p")
let name = document.createElement("p")

name.innerText = location.name
address.innerText = location.address

container.append(name, address)

chatScreen.append(container)



}



function findIceCream(zipcode) { 
   found = locations.filter((location) => location.address.includes(zipcode))

   found.forEach(location => {
     appendLocation(location, "bot") 

   })
}

function appendChat(chat, responseType) {

  let chatScreen = document.getElementById("chat-screen")
  let chatContainer = document.createElement("div")
 
  let newChatBubble = document.createElement("p")
  newChatBubble.innerText = chat

  let span = document.createElement("span")


  
  if(responseType === "bot") { 
    chatContainer.className = "chat-bubble-bot"
   
    span.innerText= "Steve says: "
 
  } else { 
    chatContainer.className = "chat-bubble"
    span.innerText= "User says: "

  }


  chatContainer.append(span,newChatBubble)

  chatScreen.appendChild(chatContainer)
  

}


/// handlers 

function chatHandler(e) {
  e.preventDefault()
  let chatScreen = document.getElementById("chat-screen")
  chatScreen.style.display = "block"

  appendChat(e.target[0].value)
  botResponse(e.target[0].value)

  
  // e.preventDefault()
  // console.log(e)


}






renderChat()
fetchLocations()
