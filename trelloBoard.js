const IDLIST = '5e7126bee6cda54fb9e359ad'
const APIURL = 'https://api.trello.com/1'
const trelloKey = 'bd5b6cc19e3aac4bec2c37d338bd8bf2'
const trelloToken = 'ae3b707e19c3946d81a987deb9455e21a5b87cfa3670195542627b4a85869350'


//Call_HTTP
function calling_http(method, url){
    let xhttp = new XMLHttpRequest();
    xhttp.open(method, url);
    xhttp.send();
}


// For getting the data from Trello Board
function get_cards_data_from_trello_board(){
    const url =`${APIURL}/lists/${IDLIST}/cards?key=${trelloKey}&token=${trelloToken}`;
    var xHttp = new XMLHttpRequest();
    xHttp.open( "GET", url, false ); 
    xHttp.send( null );
    return xHttp.responseText;
}

// For displaying all cards from the "Test List" on Trello Board
function list_all_cards(){
let list_of_cards_json=JSON.parse(get_cards_data_from_trello_board());
let all_cards_list = '<h3>Cards List</h3>';
all_cards_list ="";
list_of_cards_json.forEach(function(each_data_of_card) {
    all_cards_list += `<div class="card_group"> <input type="checkbox" id="card_check_box" value="${each_data_of_card['id']}">
    <label class="card_name">${each_data_of_card['name']}</label> <button class="destroy" value="${each_data_of_card['id']}" onclick='delete_card()'>Delete</button> </div>`;
});
all_cards_list += '</ul>'
document.querySelector(".all_cards").innerHTML = all_cards_list;
}



// For adding cards to the Test List in Trello Board
let text_card=document.querySelector('#card_name');
text_card.addEventListener("keydown",key_pressed)

function key_pressed(actionevent){
    if (actionevent.keyCode === 13) {
        let card_name=text_card.value;
        if(text_card.value.replace(/\s/g, "").length>0)
        append_card_to_list_on_trello(card_name);
        text_card.value=" ";
        list_all_cards();
      }
}

//For adding card to list on the Trello Board 
function append_card_to_list_on_trello(card_name){
    const list_url = `${APIURL}/cards?name=${card_name}&idList=${IDLIST}&key=${trelloKey}&token=${trelloToken}`;
    calling_http('POST',list_url);
    list_all_cards();
} 


// For deleting cards from List on Trello Board
function delete_card(){
    let id_of_card=document.querySelector('.destroy').value;
    let url=`${APIURL}/cards/${id_of_card}?&key=${trelloKey}&token=${trelloToken}`;
    calling_http('DELETE',url);
    list_all_cards();
}
