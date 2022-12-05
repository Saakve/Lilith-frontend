import './App.css'
import "react-chat-elements/dist/main.css"
import { Input, Button, MessageBox } from "react-chat-elements"
import { useState } from 'react'
import sendMessage from './services/sendMessage'
import Alert from './components/Alert'

const MESSAGE_FROM_LILITH = 1
const MESSAGE_FROM_USER = 2
const INITIAL_MESSAGE = {
  type: MESSAGE_FROM_LILITH,
  content: "Hola"
}

function App() {

  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [alertIsShow, setAlertShow] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = event.target[0].value 

    if(content.length == 0) {
      setAlertShow(true)
      return
    }

    let newMessage = {
      type: MESSAGE_FROM_USER,
      content: content
    }

    console.log(newMessage)

    getResponseFromLilith(newMessage.content)
    setMessages(messages => messages.concat(newMessage))
    content = ""
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
      <div className='lilithArea'>
        <img src="/lilith-image.png" alt="Lilith" />
        <div id='description'>
          <p>Cuentame tus emociones, deseos, angustias todo lo que sientes. <br /> Estoy aquí para tí 😊 </p>
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
          />
        })}
        < Alert header={"Cuidado"} text={"Debes ingresar algún texto"} show={alertIsShow} onClick={handleClickAlert} />
      </div>
      <div className='sendArea'>
        <Button text='Borrar' onClick={handleCleanChat} className="cleanButton" />
        <form onSubmit={handleSubmit}>
          <Input
            placeholder='Ingresa tu mensaje'
            rightButtons={<Button
              text='Enviar'
              title="Enviar"
            />}
            className="inputStyle"
          />
        </form>
      </div>
    </div>
  )
}

export default App
