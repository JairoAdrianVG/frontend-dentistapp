import React, {useState} from "react";
import img from '../Odontogram.jpeg'

const Odontogram = () => {
    return(
        <div style={{position:'static', width: '100%', height: '1200px', margin:'0',}}>
            <object data={require('../Odontogram.pdf')}
            type="application/pdf"
            width="100%"
            height="100%">
            </object>
        </div>
    )
}

export default Odontogram;