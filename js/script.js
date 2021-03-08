/*Semi Functional!
  Some of the cards in the obj array from this API dont actually contain an imageUrl, so when cardUrl comes back as undefined, an error occurs and a card is not produced on the page. This obviously causes some functionality issues. sometimes requiring you to click 'Draw' multiple times to get a card, and cause 'Draw Hand' to not consistently produce a full seven card hand. */

//html variables
const drawBtn = document.querySelector('.draw');
const handBtn = document.querySelector('.hand');
const discBtn = document.querySelector('.discard')
const container = document.querySelector('main')
const p = document.querySelector('test')

//random page variable:
// randPage = Math.floor(Math.random() * 567)

//random single card generated
const createCard = () => {
  const endPoint = `https://api.magicthegathering.io/v1/cards?pageSize=7&random=true&contains=imageUrl`
fetch(endPoint)
  .then(res => {
    if(res.ok) {
      return res.json();
    }
})
  .then(cards => {
    //random card variable
    const cardArr = cards.cards;
    // console.log(cards);
    const rand = Math.floor(Math.random() * cardArr.length);
  
    //html elements created on click
    const section = document.createElement('section')
    container.appendChild(section);
    const h1 = document.createElement('h1');
    section.appendChild(h1);
    const img = document.createElement('img');
    section.appendChild(img);  
    
    //card name variable and card image URL variable
    const cardName = cardArr[rand].name;
    const cardUrl = cardArr[rand].imageUrl;
  
    // slice used to amend image URL to include https instead http. thx to **Vitaly** for the assist
    const newCardUrl = cardUrl.slice(0, 4) + 's' + cardUrl.slice(4)
    
    //name and image URL from cards array put onto page
    h1.innerHTML = cardName;
    img.src = newCardUrl;
    
    
})
  .catch(error => {
    console.log(error)
})

}
// card displayed on click
drawBtn.addEventListener('click', createCard);

//seven card hand is generated
const createHand = () => {
  const endPoint = `https://api.magicthegathering.io/v1/cards?pageSize=7&random=true&contains=imageUrl`
fetch(endPoint)
  .then(res => {
    if(res.ok) {
      return res.json();
    }
})
  .then(cards => {
    //same code as above, but put into a for loop that produces seven instances of  a random card on click, rather than one
    for (i = 1; i < 8; i++) {
      const cardArr = cards.cards;
      const rand = Math.floor(Math.random() * cardArr.length);
  
    
      const section = document.createElement('section')
      container.appendChild(section);
      const h1 = document.createElement('h1');
      section.appendChild(h1);
      const img = document.createElement('img');
      section.appendChild(img);  
      
      const cardName = cardArr[rand].name;
      const cardUrl = cardArr[rand].imageUrl;
      const newCardUrl = cardUrl.slice(0, 4) + 's' + cardUrl.slice(4)
    
      h1.innerHTML = cardName;
      img.src = newCardUrl;
      
    } 
})
  .catch(error => {
    console.log(error)
}) 
}
//hand displayed on click
handBtn.addEventListener('click', createHand)

//reload page 'discarding' the card
discBtn.addEventListener('click',  function(){
  history.go(0);
})
