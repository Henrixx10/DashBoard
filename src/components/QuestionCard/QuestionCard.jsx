
import { useEffect, useState } from 'react'
import './QuestionCard.css'

const QuestionCard = ({question, reponse}) => {

    const [color, setColor] = useState("QuestionCard-box")

    return(
        <div className={color}>

            <div className="titleH2">
                <h2 className="Quest-h3">{question} ?</h2>
            </div>


            <div className="repP">
                <p className='Rep-P'>
                    {reponse}
                </p>
            </div>

            <section className="btnMod">
                <button className="verify" onClick={()=>setColor('QuestionCard-box-green')} onDoubleClick={()=>setColor('QuestionCard-box')}>✅</button>
                <button className="NoTconnus" onClick={()=>setColor('QuestionCard-box-red')}>❌</button>
            </section>
        </div>
    )

}

export default QuestionCard