import { useState } from 'react'

//React components
import { Input, Button, MessageBox } from "react-chat-elements"
import Alert from './components/Alert'

//Services
import sendMessage from './services/sendMessage'

//Icons from react-icons
import { BsFillTrashFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi'

//Styles
import './App.css'
import "react-chat-elements/dist/main.css"

const MESSAGE_FROM_LILITH = 1
const MESSAGE_FROM_USER = 2
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

  const handleCleanChat = () => {
    setMessages([])
  }

  const handleClickAlert = () => {
    setAlertShow(false)
  }

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
      <div className='messageArea'>
        {messages.map((message, index) => {
          return <MessageBox
            key={index}
            position={message.type == MESSAGE_FROM_USER ? "right" : "left"}
            type={"text"}
            title={message.type == MESSAGE_FROM_USER ? "Yo" : "Lilith"}
            text={message.content}
            className = "message"
          />
        })}
      </div>
      <div className='sendArea'>
        <Button
          onClick={handleCleanChat}
          className="cleanButton"
          icon={{
            size: 20,
            component: <BsFillTrashFill />
          }}
        />
        <form onSubmit={handleSubmit}>
          <Input
            placeholder='Ingresa tu mensaje'
            rightButtons={<Button
              title="Enviar"
              icon={{
                size: 20,
                component: <FiSend />
              }}
            />}
            className="inputStyle"
          />
        </form>
      </div>
    </div>
  )
}

export default App
