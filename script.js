const quoteContainerEl = document.getElementById("quote_container");
const quoteTextEl = document.getElementById("quote_text");
const authorTextEl = document.getElementById("author_text");
const tweetBtn = document.getElementById("tweet");
const newQuoteBtn = document.getElementById("new_quote");
const loadingEl = document.getElementById("loader");


let apiQuoteList = []




function postQuoteToTwitter(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTextEl.textContent} - ${authorTextEl.textContent}`;
    open(twitterUrl, "_blank");    

}

function showLoadingElement(){
    loadingEl.hidden =false;
    quoteContainerEl.hidden = true;
}


function removeLoadingElemnt(){
    loadingEl.hidden =true;
    quoteContainerEl.hidden = false;
    
}

function getNewQuoteAndDisplay(){
    showLoadingElement();
    let randomQuoteIndex = Math.floor(Math.random()*apiQuoteList.length);
    let randomQuote = apiQuoteList[randomQuoteIndex];
    
    if(randomQuote.text.length>100){
        quoteTextEl.classList.add("longFont");
    }
    else{
        quoteTextEl.classList.remove("longFont");
    }

    quoteTextEl.textContent = randomQuote.text;
    authorTextEl.textContent = randomQuote.author;
    removeLoadingElemnt();
}


async function getQuotesFromApi(){
    showLoadingElement();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

    try{
        const responseObj = await fetch(apiUrl);
        apiQuoteList = await responseObj.json();
        getNewQuoteAndDisplay();

    }catch(error){
        console.log(error.name)
    }
    

}

getQuotesFromApi();

newQuoteBtn.addEventListener("click",getNewQuoteAndDisplay);
tweetBtn.addEventListener("click",postQuoteToTwitter);




