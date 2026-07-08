
import './imageSpan.css'

const ImageSpan = ({obj, descriptObj, dimension, setDimension, index, indexs}) => {


    return(
        <>
            {

                descriptObj ?

                <div className='imagediv'>
                    <img style={{margin: '20px', width: `${dimension}%`}} alt='image sélectionnée' src={descriptObj}/>
                </div> : console.log("")
            }
        
        </>
    )

}

export default ImageSpan