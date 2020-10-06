const addMovie = document.querySelector(".addMovieBtn");
//const addMovie = document.querySelector("header button");
const model = document.querySelector("#add-modal")
const backDrop = document.querySelector("#backdrop")
const popUpCancel = document.querySelector("#add-modal .btn--passive")
//const addBtnInPopUp = popUpCancel.nextElementSibling;
const addBtnInPopUp = document.querySelector("#add-modal .btn--success")

const userInput = document.querySelectorAll("input");
const mainTextBoxControl = document.querySelector("#entry-text");
const deleteConfim = document.getElementById("delete-modal");

const moives = [];
const updateUi = () =>{
   // console.log(moives.length)
    if(moives.length === 0){
        mainTextBoxControl.style.display = "block";
    }else{
        mainTextBoxControl.style.display = "none";
    }
};

const deletePermanet = (movieId1) =>{
    deleteConfim.classList.add("visible");
    const deleteYesBtn = document.querySelector("#delete-modal .btn--danger")
    deleteYesBtn.addEventListener("click",deleteMovieFromArray.bind(null,movieId1));
    const deleteCancel = document.querySelector("#delete-modal .btn--passive")
    deleteCancel.addEventListener("click",()=>{
        deleteConfim.classList.remove("visible"); 
    })
}

const deleteMovieFromArray = (movieId) => {
    // event.target.parentNode.remove();
    deleteConfim.classList.remove("visible");
        let index = 0
        for (const iterator of moives) {
            if(iterator.id === movieId){
                break;
            }
            index++
        }
        moives.splice(index,1);  
        const listRoot = document.getElementById("movie-list");
        listRoot.children[index].remove(); 
        //listRoot.removeChild(listRoot.children[index].remove())         
        
        console.log(moives);
};


const addMobileItems = (id,title,imageUrl,rating) =>{
    const movieList = document.createElement("li");
    movieList.className = "movie-element";
    movieList.innerHTML = `
    <div class= "movie-element__image">
    <img src ="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;
    movieList.addEventListener("click",deletePermanet.bind(null,id));

    // movieList.addEventListener("click",(event)=>{
    //     let index = 0
    //     for (const iterator of moives) {
    //         if(iterator.id === id){
    //             break;
    //         }
    //         index++
    //     }
    //     moives.splice(index,1);
    //     event.target.parentNode.remove();

    // });
    const listRoot = document.getElementById("movie-list");
    console.log(moives)
    listRoot.append(movieList);
}


const toggleBackground = () =>{
    backDrop.classList.toggle("visible");
};
const showMoviePopUp = () => {
    model.classList.toggle("visible");
    toggleBackground();
};

const clearUnserInput = () =>{
    for (const iterator of userInput) {
        iterator.value = "";
    }
}

const returnNormal = () => {
    showMoviePopUp();
    clearUnserInput()    
};

const clearSecond = () =>{
    model.classList.toggle("visible");
}

// const collectUserInput = () => {
// const checkUserArray = [];
// for (const input of userInput) {
//     if((input.value).trim() === "" ){
//     console.log("Fields cant be left empty.\nEnter a valid input")
//     return;
// }
// else if(+(input.value) <= 0 || +(input.value) >5){
//     console.log(+input.value)
//     console.log("Enter a valid number")
//     return;
// }
// checkUserArray.push(input.value);
// }
// console.log(checkUserArray)
// const newMovie = {};
// console.log(newMovie)
// for (let i = 0; i < checkUserArray.length; ++i) {
//      newMovie[i] = checkUserArray[i];    
//      //console.log(newMovie);
// }

// moives.push(newMovie);

// //console.log(newMovie[0]);
// addMobileItems(newMovie[0], newMovie[1] , newMovie[2])
// returnNormal();
// updateUi();
// console.log(moives);
// };

const collectUserInput = () => {
    let checkUserArray = [];
    for (const input of userInput) {
        if((input.value).trim() === "" ){
        alert("Fields cant be left empty.\nEnter a valid input")
        return;
    }
    else if(+(input.value) <= 0 || +(input.value) >5){
        //console.log(+input.value)
        alert("Enter a valid number")
        return;
    }
    checkUserArray.push(input.value);
    }
    
    const newMovie = {
        id: Math.random().toString(),
        title:checkUserArray[0],
        url: checkUserArray[1],
        rating: checkUserArray[2]
    } 
    moives.push(newMovie)
    console.log(newMovie);
    addMobileItems(newMovie.id, newMovie.title,newMovie.url, newMovie.rating)
    updateUi();
    returnNormal();
    };
    

//adding eventLister to all the unserInput tabs


addMovie.addEventListener("click",showMoviePopUp);
backDrop.addEventListener("click",returnNormal);
popUpCancel.addEventListener("click",returnNormal);
addBtnInPopUp.addEventListener("click",collectUserInput);
