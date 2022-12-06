//React components
import { Button, Input } from "react-chat-elements"

//Icons from react-icons
import { BsFillTrashFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi'

import "./styles.css"

export default function SendArea({ onClean, onSubmit }) {
    return (
        <div className='sendArea'>
            <Button
                onClick={onClean}
                className="cleanButton"
                icon={{
                    size: 20,
                    component: <BsFillTrashFill />
                }}
            />
            <form onSubmit={onSubmit}>
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
    )
}