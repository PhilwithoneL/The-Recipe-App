'use strict';


//Selectors
(() => {

let recipeData;
let recipeInfo;
const submit = document.getElementById('submitBtn');
const inputField = document.getElementById('inputField');

//Event Listeners

submit.addEventListener('click',findRecipes);
inputField.addEventListener('keydown', findRecipesOnEnter);

//Functions

async function findRecipes() {
    //selectors

    
    const input = document.getElementById('inputField').value;

    await fetch(`/.netlify/functions/fetch-recipes?input=${input}`)
        .then(res => res.json())
            .then(data => recipeData = data)

    console.log(recipeData)

    const recipeList = document.getElementById('recipeList');
    const list = document.getElementById('list');


    //functions

    // 1) Check if the there has already been a search

    if(recipeList.contains(list)) {
        // If true, remove the list add recipes
        removeRecipes();
        addRecipes();
    } else {
        // If false, add the recipes from the API
        addRecipes();
    }

    function addRecipes() {

        // Arrays keep track of what recipe & img the API is on

            let recipeNo = [0];
            let recipeImg = [0];

        // Adds the 

            for(let {id,title,image} of recipeData) {

                async function findRecipeInfo() {
                    

                    await fetch(`/.netlify/functions/find-recipe-info?id=${id}`)
                    .then(res => res.json())
                    .then(data => recipeInfo = data)

                        let recipesHtml = 
                        
                        `<section class = "container-fluid section-${recipeNo.length}" id = "list">
                            <div class = "container-fluid recipe-container">
                                <div class = "row">
                                    <div class = "col-1">
                                        </div><div class = "col-10 recipe-title">${title}</div>
                                        <div class = "col-1"></div><div class="container-fluid">
                                        <div class = "row"><div class = "col-3"></div><div class = "col-6"><div class = "mx-auto recipe-card"><div class = "card-content"><div class = "recipe-card-front" id = "recipe-img-${recipeImg.length}"></div><div class = "recipe-card-back"><div class = "recipe-card-text"><div class = "recipe-time">Prep time:</div><div class = "recipe-mins">${recipeInfo.readyInMinutes} mins</div><div class = "recipe-line"></div><div class = "recipe-source">${recipeInfo.sourceName}</div><div class = "recipe-steps"><a href = "${recipeInfo.sourceUrl}">Get steps</a></div></div></div></div></div></div><div class = "col-3"></div></div></div> </section></div></div>`;

                        recipeList.innerHTML += recipesHtml;

                        let recipeImgNo = `recipe-img-${recipeImg.length}`;
                        
                        document.getElementById(recipeImgNo).style.backgroundImage = `url(${image})`;

                        if(recipeImg.length < 10) {
                            recipeImg.push("1");
                        } else {
                            recipeImg.splice(1,9);       
                        }

                        if(recipeNo.length < 5) {
                            recipeNo.push("1");
                        } else {
                            recipeNo.splice(0,4)
                        }
            }

            findRecipeInfo();
        }
    }

}

    function removeRecipes() {
            const recipeList = document.getElementById('recipeList');
                recipeList.innerHTML = "";
    }

function findRecipesOnEnter(e) {
    if(e.keyCode === 13) {
        event.preventDefault();
        findRecipes();
    }
}

})()