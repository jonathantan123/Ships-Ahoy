import sum from './sum';
import axios from 'axios';

let messages = 

{
  "Scoops ahoy": "Scoops ahoy!", 
  "Where are you located?": "Starcourt mall, Hawkins Indiana", 
  "What do you think about kids?": "Man, kids are the worst! Who needs 'em, anyway?"
}


console.log(sum(1,2));

const main = async () => {
  const res = await axios.get('https://fizal.me/pokeapi/api/v2/name/bulbasaur.json');
  console.log(res.data);
}

main();


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
  messageArea.name = "name"
  sendButton.innerText = "Send"

  formContainer.addEventListener("submit", chatHandler)


  
  formContainer.append(header,message,messageArea, sendButton)
  chatBox.append(formContainer)
  chatContainer.append(chatBox)


}


function botResponse(question) { 
  




}


/// handlers 

function chatHandler(e) {
  e.preventDefault()


  console.log(e.target[0].value)

  let chatScreen = document.getElementById("chat-screen")
  let newChatBubble = document.createElement("p")
  newChatBubble.innerText = e.target[0].value

  chatScreen.appendChild(newChatBubble)

  
  // e.preventDefault()
  // console.log(e)


}






renderChat()