import { useEffect, useRef } from "react"
import { MessageBox } from "react-chat-elements"
import "./styles.css"

export const MESSAGE_FROM_LILITH = 1
export const MESSAGE_FROM_USER = 2

function MessagesArea({ content }) {

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }, [content])

    return (
        <div className="messageArea">
            {content.map((message, index) => {
                return <MessageBox
                    key={index}
                    position={message.type == MESSAGE_FROM_USER ? "right" : "left"}
                    type={"text"}
                    title={message.type == MESSAGE_FROM_USER ? "Yo" : "Lilith"}
                    text={message.content}
                    className="message"
                />
            })}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default MessagesArea