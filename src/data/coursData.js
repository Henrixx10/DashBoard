

// https://the-dashboard-o5h8.onrender.com/

export async function getCours(){
    const data = await fetch("https://the-dashboard-o5h8.onrender.com/");
    const AllData = await data.json();

    return AllData.synths;
}

 

export async function getName(name) {
    
    const cours = await getCours();

    return cours.find((nameRef)=>nameRef.coursName===name)
        
}