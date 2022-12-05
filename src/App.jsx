import './App.css'
import "react-chat-elements/dist/main.css"
import { Input, Button, MessageBox } from "react-chat-elements"
import { useState } from 'react'
import sendMessage from './services/sendMessage'

const MESSAGE_FROM_LILITH = 1
const MESSAGE_FROM_USER = 2
const INITIAL_MESSAGE = {
  type: MESSAGE_FROM_LILITH,
  content: "Hola"
}

function App() {

  const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const handleSubmit = (event) => {
    event.preventDefault();

    let newMessage = {
      type: MESSAGE_FROM_USER,
      content: event.target[0].value
    }

    console.log(newMessage)

    getResponseFromLilith(newMessage.content)
    setMessages(messages => messages.concat(newMessage))
    event.target[0].value = ""
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
      </div>
      <div className='sendArea'>
        <Button text='Borrar' onClick={handleCleanChat} className="cleanButton"/>
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
