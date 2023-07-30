const favoriteNum = 34;
const multipleNums = [14, 22, 69, 91]
const API = "http://numbersapi.com";

//1:
async function numFact(){
    let res = await $.getJSON(`${API}/${favoriteNum}?json`);
    console.log(res);
}

numFact();

//2:
async function numFacts(){
    let res = await $.getJSON(`${API}/${multipleNums}?json`);
    console.log(res);
}

numFacts();

//3:
async function fourFacts(){
    let res = await Promise.all(
        Array.from({length: 4}, () => $.getJSON(`${API}/${favoriteNum}?json`))
    );

    res.forEach(data => {
        $("body").append(`<h3>${data.text}</h3>`);
    });
}

fourFacts();