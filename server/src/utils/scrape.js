(function(console){
    console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        };
        if(!filename) filename = `${data.name.replaceAll(' ', '_')}.json`
        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }
        const blob = new Blob([data], {type: 'text/json'});

        const e = new MouseEvent('click', {
            bubbles: true,
            view: window,
        });
        const a = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');

        a.dispatchEvent(e);
     }
})(console);

const decimalToFraction = (dec) => {
    if(!Number.isInteger(Number(dec))){
        if(dec === '0.25') return "1/4";
        if(dec === '0.33333333333333') return "1/3";
        if(dec === '0.5') return "1/2";
        if(dec === '0.66666666666667') return "2/3";
        if(dec === '0.75') return "3/4";
    } else return dec;
}

if(window.wprm_recipes){
    const rawData = Object.entries(window.wprm_recipes);
    const data = rawData[0][1];

    const recName = data.name;
    const recImg = data.image_url;
    const recSections = [];
    const secNums = [];
    if(document.querySelectorAll('.wprm-recipe-ingredient-group')){
        const sections = document.querySelectorAll('.wprm-recipe-ingredient-group-name');
        for(let section of sections){
            recSections.push(section.innerText);
        };
        const secIngs = document.querySelectorAll('.wprm-recipe-ingredients');
        for(let ingSection of secIngs){
            secNums.push(ingSection.children.length);
        }
        
    };
    
    if(!secNums.length)secNums.push(data.ingredients.length);

    const recIngredients = [];
    let index = 0;
    for(let s = 0; s < secNums.length; s++){
        for(let i = index; i < data.ingredients.length; i++){
            const ingNum = i + 1;
            if(ingNum <= (index + secNums[s])){
                const ingredient = data.ingredients[i];
                const recIngredient = {
                    amount: ingredient.amount,
                    unit: ingredient.unit,
                    name: ingredient.name,
                    notes: ingredient.notes,
                    section: (s+1)
                };
                if(ingredient.converted){
                    recIngredient.converted_amount = Object.entries(ingredient.converted)[0][1].amount;
                    recIngredient.converted_unit = Object.entries(ingredient.converted)[0][1].unit;
                }
                recIngredients.push(recIngredient);
            };
        };
        index += secNums[s];
    };

    for(let ing of recIngredients){
        ing.name = ing.name.replaceAll('<strong>', '');
        ing.name = ing.name.replaceAll('</strong>', '');
        ing.notes = ing.notes.replaceAll('<em>', '');
        ing.notes = ing.notes.replaceAll('</em>', '');
        ing.notes = ing.notes.replaceAll('&amp;', '&');

    }
    let recInstructions = [];
    if(document.querySelector("ul.wprm-recipe-instructions")){
        const insts = document.querySelectorAll("ul.wprm-recipe-instructions li");
        for (let inst of insts) {
            recInstructions.push(inst.innerText);
        };
    } else if(document.querySelectorAll('ul.wprm-advanced-list')){
        const insts = document.querySelectorAll('ul.wprm-advanced-list li');
        for (let inst of insts) {
            recInstructions.push(inst.innerText);
        };
        console.log(recInstructions);
    };

    let recServings = data.originalServingsParsed;
    let originalURL = window.location.href;

    let recipe = {
        name: recName,
        image: recImg,
        ingredients: recIngredients,
        instructions: recInstructions,
        servings: recServings,
        url: originalURL,
    };

    if(recSections.length) recipe.sections = recSections;

    console.log(recipe);
    console.save(recipe);
} else if(document.querySelector('.tasty-recipes-ingredients-body')) {
    const recName = document.querySelector('h1').innerText;
    const recUrl = window.location.href;
    const recImg = document.querySelector('figure').children[0].src;
    const servings = document.querySelector('.yield').children[1].innerText;
    let recServings = servings.replace('serves ', '');
    if(Number(recServings)) {
        recServings = Number(recServings);
    };
    const recInstructions = [];
    const instructionsList = document.querySelector('.tasty-recipes-instructions-body').children[0];
    for(inst of instructionsList.children){
        if(inst.localName === 'li'){
            recInstructions.push(inst.innerText);
        };
    };

    const sectionsUls = document.querySelectorAll('.tasty-recipes-ingredients-body ul');
    const numberofSections = sectionsUls.length;
    const recSections = [];
    const recIngredients = [];

    for(let i = 0; i < sectionsUls.length; i++){
        //Capture Section Title
        const ul = sectionsUls[i];
        if(ul.previousElementSibling){
            recSections.push(ul.previousElementSibling.innerText);
        } else {
            if(numberofSections > 1){
                recSections.push('');
            }
        }

        //Capture Section Ingredients
        for(let li of ul.children){
            if(li.localName === 'li'){
                const recIngredient = {section: (i + 1)};

                //Capture Amount and Unit
                const spans = li.children;
                for(let span of spans){
                    if(span.dataset.amount){
                        if(!recIngredient.amount){
                            recIngredient.amount = decimalToFraction(span.dataset.amount);
                        } else {
                            recIngredient.converted_amount = decimalToFraction(span.dataset.amount);
                        }
                    }
                    if(span.dataset.unit){
                        if(!recIngredient.unit){
                            recIngredient.unit = span.dataset.unit;
                        } else {
                            recIngredient.converted_unit = span.dataset.unit;
                        }
                    }
                }
                //Capture name and notes
                const html = li.innerHTML;
                const htmlList = html.split('</span>');
                const nameNotes = htmlList[htmlList.length - 1];

                if(!nameNotes.split('<')){
                    console.log("ERROR UNSPLITTABLE");
                }
                const split1 = nameNotes.split('<');
                recIngredient.name = split1[0];
                for(let i = 1; i < (split1.length - 1); i++){
                    recIngredient.name += split1[i].split('>')[1];
                }
                // recIngredient.name = (htmlList[htmlList.length - 1]);
                recIngredient.notes = split1[split1.length - 1].split('>')[1];

                recIngredients.push(recIngredient);
            }
        }
    }

    for(let ing of recIngredients){
        // ing.name = ing.name.replaceAll('<strong>', '');
        // ing.name = ing.name.replaceAll('</strong>', '');
        ing.name = ing.name.replaceAll('&nbsp;', ' ');
        ing.notes = ing.notes.replaceAll('<em>', '');
        ing.notes = ing.notes.replaceAll('*', '');
        ing.notes = ing.notes.replaceAll('</em>', '');
        ing.notes = ing.notes.replaceAll('&amp;', '&');
        if(ing.name.startsWith(')')) ing.name = ing.name.substring(1);;
        if(ing.notes.startsWith(',')) ing.notes = ing.notes.substring(1);;
        ing.name = ing.name.replaceAll('&amp;', '&');
        if((ing.name.includes('(') && !ing.name.includes(')')) || (ing.name.includes(')') && !ing.name.includes('('))){
            ing.name = ing.name.replaceAll('(', '');
            ing.name = ing.name.replaceAll(')', '');
        }
        if((ing.notes.includes('(') && !ing.notes.includes(')')) || (ing.notes.includes(')') && !ing.notes.includes('('))){
            ing.notes = ing.notes.replaceAll('(', '');
            ing.notes = ing.notes.replaceAll(')', '');
        }
        ing.name = ing.name.trim();
        ing.notes = ing.notes.trim();
    }

    let recipe = {
        name: recName,
        image: recImg,
        ingredients: recIngredients,
        instructions: recInstructions,
        servings: recServings,
        url: recUrl,
    };
    if(recSections.length) recipe.sections = recSections;

    console.log(recipe);
    console.save(recipe);
} else {
    console.log("CANNOT FIND RECIPE JSON");
}
