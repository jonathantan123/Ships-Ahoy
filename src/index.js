
let messages = 

{
  "scoops ahoy": "Scoops ahoy!", 
  "where are you located?": "Starcourt mall, Hawkins Indiana", 
  "what do you think about kids?": "Man, kids are the worst! Who needs 'em, anyway?"
}

let locations = []
let found = []


///// components 

// 1. Carousel 

const Carousel = require("vanilla-js-carousel");

const carousel = new Carousel({
  elem: 'carousel',    // id of the carousel container
  autoplay: true,      // starts the rotation automatically
  infinite: true,      // enables infinite mode
  interval: 3000,      // interval between slide changes
  initial: 0,          // slide to start with
  arrows: true,        // show navigation arrows
  buttons: false,      // hide <play>/<stop> buttons,
  btnStopText: 'Pause' // <stop> button text
});


// 2. ChatBox 

function renderChat() { 
  let chatScreen = document.getElementById("chat-screen")
  let chatContainer = document.getElementById("chat-container")
  let chatBox = document.createElement("div")
  let formContainer = document.createElement("form")
  formContainer.id = "form-container"
  let header = document.createElement("h2")
  let message = document.createElement("label")
  let messageArea = document.createElement("textarea")
  let sendButton = document.createElement("button")

  header.innerText = "Chat with Steve"
  message.innerText = "Message"
  messageArea.id = "messageBox"
  messageArea.name = "name"
  sendButton.innerText = "Send"
  sendButton.className = "button"

  formContainer.addEventListener("submit", chatHandler)
  formContainer.append(header,message,messageArea, sendButton)
  chatBox.append(formContainer)
  chatContainer.append(chatBox)

  // chatScreen.append(chatBox)

}

// 3. Bot Response 

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

/// 4. Locations Responses 



  function appendLocation(location, container) { 
    let chatScreen = document.getElementById("chat-screen")
    let address = document.createElement("p")
    let name = document.createElement("p")

    name.innerText = location.name
    address.innerText = location.address
    
    container.append(name, address)
    chatScreen.append(container)
    chatScreen.scrollTop = "100000000000"

    }


    // 5. Append Chats 
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
        chatScreen.scrollTop = "100000000000" 
      }

      // 6. Close button
        
    function closeButton() { 
      let screen = document.getElementById("chat-screen")
      let button = document.createElement("button")
      button.id = "close-button"
      button.innerText = "x"
      screen.append(button)

      button.addEventListener("click", closeChat)

    }
//------------------------------------------------------------///


//// helpers 

/// 1. Filter all icecream locations by zipcode 
function findIceCream(zipcode) { 
  let container = document.createElement("div")
  let span = document.createElement("span")

  span.innerText = "Yes! Here they are:"
  container.className = "chat-bubble-bot"

  container.appendChild(span)

   found = locations.filter((location) => location.address.includes(zipcode))
   found.forEach(location => {
     appendLocation(location, container) 
   })
}

/// 2. Initial Fetch

function fetchLocations () { 
  fetch('https://project.wnyc.org/ice-cream/data/places.json')
  .then(resp => resp.json()) 
  .then(resp => {
    locations = resp
  })
}

//--------------------------------------------------------------------//

/// handlers 

function chatHandler(e) {
  e.preventDefault()
  
  let chatScreen = document.getElementById("chat-screen")
  chatScreen.style.display = "block"

  appendChat(e.target[0].value)
  botResponse(e.target[0].value)

  e.target[0].value = ""


}

function closeChat() { 
  let chatScreen = document.getElementById("chat-screen")
  chatScreen.style.display = "none"
  chatScreen.innerHTML = ""

}



//// Execution 

renderChat()
closeButton()
fetchLocations()
carousel.show(0);
