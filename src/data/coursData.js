
const data = await fetch("https://the-dashboard-o5h8.onrender.com/");
const AllData = await data.json();

export const cours = AllData.synths;

export function getByName (name){
    return cours.find((nameRef)=> nameRef.coursName===name);
}