const VOTE_FORM = document.getElementById('form');

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
    } catch (err) {
        console.log(err);
    }
}