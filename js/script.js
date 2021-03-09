//html elements created on click
const insertCard = (card) => {
  const container = document.querySelector('main')
  const section = document.createElement('section')
  container.appendChild(section);
  const h2 = document.createElement('h2');
  section.appendChild(h2);
  const img = document.createElement('img');
  section.appendChild(img);  
  
  //name and image URL from cards array put onto page
  h2.innerText = card.name;
  // s added to http to fix broken img links
  img.src = card.imageUrl.slice(0, 4) + 's' + card.imageUrl.slice(4);
};

//random card(s) generated
const createCards = (quantity) => {
  const apiURL = `https://api.magicthegathering.io/v1/cards?pageSize=${quantity}&random=true`;
  fetch (apiURL)
  .then(response => {
    if(!response.ok){
      throw new Error('No network response from the API');
    } else {
      return response.json();
    }    
  })
  .then((responseJson) => {    
    const cardsArr = responseJson.cards;
    cardsArr.forEach(card => {
      if(!card.imageUrl){
        createCards(1);
      }else{
        insertCard(card);
      }
    });
  })
  .catch(error => {
    console.log(error)
  });
};

//card displayed on click
const drawBtn = document.querySelector('.draw');
drawBtn.addEventListener('click', function() {
  createCards(1)
});

//hand displayed on click
const handBtn = document.querySelector('.hand');
handBtn.addEventListener('click', function() {
  createCards(7)
});

//reload page 'discarding' the card(s)
const discBtn = document.querySelector('.discard')
discBtn.addEventListener('click',  function(){
  history.go(0);
});
