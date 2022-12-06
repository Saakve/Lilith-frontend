import { useState } from 'react'

//Services
import sendMessage from './services/sendMessage'

//Styles
import './App.css'
import "react-chat-elements/dist/main.css"

//Components
import MessagesArea from './components/MessagesArea';
import SendArea from './components/SendArea';
import Alert from './components/Alert'

//Constants from messages
import { MESSAGE_FROM_LILITH, MESSAGE_FROM_USER } from './components/MessagesArea';

const INITIAL_MESSAGE = {
  type: MESSAGE_FROM_LILITH,
  content: "Cuentame tus emociones, deseos, angustias todo lo que sientas.\nEstoy aquí para tí 😊."
}

function App() {

  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [alertIsShow, setAlertShow] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target[0]

    if (input.value == 0) {
      setAlertShow(true)
      return
    }

    let newMessage = {
      type: MESSAGE_FROM_USER,
      content: input.value
    }

    getResponseFromLilith(newMessage.content)
    setMessages(messages => messages.concat(newMessage))
    input.value = ""
  }

  const getResponseFromLilith = (message) => {
    sendMessage(message).then(messageFromLilith => {

      let newMessage = {
        type: MESSAGE_FROM_LILITH,
        content: messageFromLilith.contenido
      }

      setMessages(messages => messages.concat(newMessage))
    })
  }

  const handleCleanChat = () => { setMessages([]) }
  const handleClickAlert = () => { setAlertShow(false) }

  return (
    <div className="App">
      <Alert
          header={"Cuidado"}
          text={"Debes ingresar algún texto"}
          show={alertIsShow}
          onClick={handleClickAlert}
        />
      <div className='lilithArea'>
        <img src="/lilith-image.png" alt="Lilith" />
        <div id='description'>
          <h1>Lilith</h1>
        </div>
      </div>
      <MessagesArea content={messages} />
      <SendArea onClean={handleCleanChat} onSubmit={handleSubmit} />
    </div>
  )
}

export default App
