const VOTE_FORM = document.getElementById('form');
const RESULTS_SECTION = document.getElementById('results');
const REFRESH_BTN = document.getElementById('refresh-btn');

REFRESH_BTN.addEventListener('click', getResults);
//CLEAR_BTN.addEventListener('click', clear);



async function getVariants(){
    try {
        const variants = await fetch(new Request('http://localhost:8180/variants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }));

        const data = await variants.text();
        parseVariants(data);
        getResults();
    } catch (err) {
        console.log(err);
    }    
}
getVariants();

async function parseVariants(variants){
    variants = JSON.parse(variants);
    variants.forEach(variant =>{
        console.log(variant);
        const input = document.createElement('input');
        input.type="button";
        input.value = variant;
        input.addEventListener('click', () => {
            sendVote(variant);
        });
        VOTE_FORM.appendChild(input);
    });
}

async function sendVote(variant){
    try{
        const response = await fetch(new Request(`http://localhost:8180/vote/${variant}`, {
            method: 'POST'
        }));
        getResults();
    } catch (err) {
        console.log(err);
    }
}

async function getResults() {
    const response = await fetch(new Request(`http://localhost:8180/stat`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }));
    let data = await response.text();
    data = JSON.parse(data);
    const resultDiv = document.createElement('div');
    for (const [key, value] of Object.entries(data)) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${value}`;
        resultDiv.appendChild(p);
    }
    RESULTS_SECTION.textContent = 'See the results: ';
    RESULTS_SECTION.appendChild(resultDiv);
}