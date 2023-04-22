const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeBtn = document.querySelector(".exchange");
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag,id)=>{
    for(const countryCode in countries)
    {
        // console.log(countries[countryCode]);
        let selected;
        if(id==0 && countryCode == "en-GB")
        {
            selected = "selected";
        }
        else if(id ==1 && countryCode == "hi-IN")
        {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`    
        tag.insertAdjacentHTML("beforeend",option);
    }
});

exchangeBtn.addEventListener("click",()=>{
    let temptext = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = temptext;
    selectTag[1].value = tempLang;
});


translateBtn.addEventListener("click",()=>{
    let text = fromText.value;
    // console.log(text);

    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;

    let apiUrl  = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`

    fetch(apiUrl).then( res => res.json()).then( data =>{
        // console.log(data);

        toText.value = data.responseData.translatedText;
    });
});


icons.forEach(icon => {
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy"))
        {
            if(target.id=="from")
            {
               navigator.clipboard.writeText(fromText.value); // function for copy word
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }
        else{
            let utterance;
            if(target.id=="from")
            {
               utterance = new SpeechSynthesisUtterance(fromText.value); // function for speaks the word
               utterance.lang = selectTag[0].value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
})