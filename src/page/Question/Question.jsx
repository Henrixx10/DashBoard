
import { useParams } from 'react-router-dom'
import { getByName } from '../../data/coursData'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import HeaderCard from '../HeaderCard/HearderCard'
import './Question.css'

const Question = () => {

    const {name} = useParams()
    const data = getByName(name)

    return(

        <>

            <HeaderCard urlname={name} />
        
            <div className="title-box-quest">
                <section className="title-section-quest">
                    <h1 className="quest-title">Vos questions : </h1>
                </section>
            </div>


            <div className="Question-box">

                <section className="Question-section">


                    {
                        data.coursFlash.map((element, index)=>(
                            <QuestionCard question={element.quest} reponse={element.rep}/>
                        ))
                    }


                </section>

            </div>

        
        </>

    )

}

export default Question