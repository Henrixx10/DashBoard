
import { useParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard/QuestionCard'
import HeaderCard from '../HeaderCard/HearderCard'
import { useState, useEffect } from 'react'
import {getCours} from '../../data/coursData'
import important_img from '../../assets/important.png'
import encours_img from '../../assets/en cours.png'
import terminer_img from '../../assets/terminer.png'
import './Question.css'

const Question = () => {

    const {name} = useParams()
    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)
    const [class_name, setClass_name] = useState("normal")
    const [to_do, setToDo] = useState(null)
    const [author, setAuthor] = useState(null)

    async function getName(name) {
    
        const cours = await getCours();

        return cours.find((nameRef)=>nameRef.coursName===name)
        
    }
    useEffect(() => {

        const timer = setTimeout(()=>setShow(true), 200)

        async function LoadCours() {

            const logaTest = await getName(name);
            setData(logaTest)
            setLoading(false)
            clearTimeout(timer)
        }
        LoadCours();
        return()=>clearTimeout(timer)
    }, [name]);

    useEffect(() => {
        fetch(`https://the-dashboard-o5h8.onrender.com/user/${localStorage.getItem('userId')}`)
            .then(res => res.json())
            .then(data => {
                setAuthor(data.oneUser.email)
            })
            .catch(err => console.error(err))
    }, [])

    if (loading ){
        if (!show){
            return (<HeaderCard urlname={name} />)
        }
        return (<>
            <HeaderCard urlname={name} />
            <h2>En cours de chargement</h2>
        </>)
    }


    return(

        <>

            <HeaderCard urlname={name} />
        
            <div className="title-box-quest">
                <section className="title-section-quest">
                    <h1 className="quest-title">ToDo & Fiches : </h1>
                </section>
            </div>


            <div className="ToDo_box">

                <section className="input-toDo">

                    <input type="text" className='input_value_td' onChange={(e)=>{setToDo(e.target.value)}}/>
                    <button className="submit_td" onClick={()=>{

                        
                        const copyToDo = [
                            ...data.coursToDo,
                            {
                                to_do: to_do,
                                tag: 'cours'
                            }
                        ]
                        

                        fetch(`http://localhost:3000/add/${data._id}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                coursToDo: copyToDo
                            })
                        })

                        .then(()=>{window.location.reload()})

                    }}>envoyer</button>
                </section>

                <section className="ToDo_section">
                    {
                        data.coursToDo.map((ToDo, index)=>(

                            <>
                                <section className="spawn_todo">
                                    <section className="tag_p">
                                        <p className='to_do_p'>{ToDo.to_do}</p>
                                        {
                                            window.innerWidth > 600 ? ToDo.tag==='important' ? <img src={important_img} alt="tag important" className='important' /> : ToDo.tag==='cours' ? <img src={encours_img} alt="tag important" className='important' /> : ToDo.tag==='terminer' ? <img src={terminer_img} alt="tag terminer" className='important' /> : '' : ''
                                        }
                                    </section>
                                    
                                    <section className="btns">
                                        <select name="tag" className='select_tag' defaultValue={ToDo.tag} onChange={(e)=>{

                                            const copy = [...data.coursToDo]

                                            copy[index] = {
                                                ...copy[index], 
                                                tag: e.target.value
                                            }
                                            
                                            fetch(`http://localhost:3000/add/${data._id}`, {
                                                method: "PUT",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    coursToDo: copy
                                                })
                                            })

                                            .then(()=>{window.location.reload()})
                                        }}>
                                            <option value="important">Important</option>
                                            <option value="cours">En cours</option>
                                            <option value="terminer">Terminer</option>
                                        </select>
                                        <button className='select_tag' onClick={()=>{

                                            const copyToDo = [
                                                ...data.coursToDo,
                                            ]

                                            copyToDo.splice(index, 1)
                                            

                                            fetch(`http://localhost:3000/add/${data._id}`, {
                                                method: "PUT",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    coursToDo: copyToDo
                                                })
                                            })

                                            .then(()=>{window.location.reload()})
                                        }} >❌</button>
                                    </section>
                                </section>

                            </>

                        ))
                    }
                </section>

            </div>
{/* 
            <div className="Question-box">

                <section className="Question-section">


                    {
                        data.coursFlash.map((element, index)=>(
                            <QuestionCard question={element.quest} reponse={element.rep}/>
                        ))
                    }


                </section>

            </div> */}

        
        </>

    )

}

export default Question