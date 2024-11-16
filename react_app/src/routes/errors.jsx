import {Dialog} from "primereact/dialog";
import {useState} from "react";

export function DefaultError(){
    const [visible, setVisible] = useState(false);

    return(
        <Dialog header="Error" visible={visible} style={{ width: '20vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
            <p>Something went terribly wrong! Please try again!</p>
        </Dialog>
    )
}