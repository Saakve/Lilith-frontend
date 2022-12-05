import { Popup } from "react-chat-elements"
import "./styles.css"

function Alert({header, text , show, onClick}) {

    const popup = {
        show: show,
        header: header,
        text: text,
        footerButtons: [
            {
                color: "white",
                backgroundColor: "lightcoral",
                text: "OK",
                onClick: onClick,
            },
        ]
    }

    return < Popup popup = { popup } className="alert"/>
}

export default Alert