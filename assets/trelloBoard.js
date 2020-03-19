const IDLIST = '5e7126bee6cda54fb9e359ad'
const APIURL = 'https://api.trello.com/1'
const TRELLOKEY = 'bd5b6cc19e3aac4bec2c37d338bd8bf2'
const TRELLOTOKEN = 'ae3b707e19c3946d81a987deb9455e21a5b87cfa3670195542627b4a85869350'


//Call_HTTP
function callingHttp(method, url){
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url);
    xhttp.send();
}


// For getting the data from Trello Board
function getCardsDataFromTrelloBoard(){
    const url =`${APIURL}/lists/${IDLIST}/cards?key=${TRELLOKEY}&token=${TRELLOTOKEN}`;
    var xHttp = new XMLHttpRequest();
    xHttp.open( "GET", url, false ); 
    xHttp.send( null );
    return xHttp.responseText;
}

// For displaying all cards from the "Test List" on Trello Board
function listAllCards(){
let listOfCardsJson=JSON.parse(getCardsDataFromTrelloBoard());
let allCardsList = '<h3>Cards List</h3>';
allCardsList ="";
listOfCardsJson.forEach(function(eachDataOfCard) {
    allCardsList += `<div class="card_group"> 
    <button class="edit_name" value="${eachDataOfCard['id']}" onclick='newNameCard(this.value)'>Edit</button>
    <label class="card_name">${eachDataOfCard['name']}</label> 
    <button class="delete" value="${eachDataOfCard['id']}" onclick='deleteCard(this.value)'>Delete</button> </div>`;
});
allCardsList += '</ul>'
document.querySelector(".all_cards").innerHTML = allCardsList;
}



// For adding cards to the Test List in Trello Board
let textCard=document.querySelector('#card_name');
textCard.addEventListener("keydown",keyPressed)

function keyPressed(actionevent){
    if (actionevent.keyCode === 13) {
        let card_name=textCard.value;
        appendCardToListOnTrello(card_name);
        textCard.value=" ";
        listAllCards();
      }
}

//For adding card to list on the Trello Board 
function appendCardToListOnTrello(card_name){
    const list_url = `${APIURL}/cards?name=${card_name}&idList=${IDLIST}&key=${TRELLOKEY}&token=${TRELLOTOKEN}`;
    callingHttp('POST',list_url);
    listAllCards();
} 


// For deleting cards from List on Trello Board
function deleteCard(id_of_card){
    let url=`${APIURL}/cards/${id_of_card}?&key=${TRELLOKEY}&token=${TRELLOTOKEN}`;
    callingHttp('DELETE',url);
    listAllCards();
    location.reload();
}

//For updating the name of card on Trello Board
function newNameCard(id_of_card){
    let  new_name_of_card = prompt("Enter new name of card");
    let url=`${APIURL}/cards/${id_of_card}?name=${new_name_of_card}&key=${TRELLOKEY}&token=${TRELLOTOKEN}`;
    callingHttp('PUT',url);
    listAllCards();
    location.reload();
}

