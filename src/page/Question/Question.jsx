
import { useParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import HeaderCard from '../HeaderCard/HearderCard'
import { useState, useEffect } from 'react'
import {getCours} from '../../data/coursData'
import './Question.css'

const Question = () => {

    const {name} = useParams()
    const [data, setData] = useState(null)

    async function getName(name) {
    
        const cours = await getCours();

        return cours.find((nameRef)=>nameRef.coursName===name)
        
    }
    useEffect(() => {

        async function LoadCours() {

            const logaTest = await getName(name);
            console.log(logaTest);
            
            setData(logaTest)
        }

        LoadCours();
    }, []);

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                setAuthor(data.oneUser.email)
            })
            .catch(err => console.error(err))
    }, [])

    if (data===null){
        return(
        <>
            <HeaderCard urlname={name} />
            <h2>Le serveur est en cours de chargement</h2>
        </>
    )
    }

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