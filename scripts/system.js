// ##### ARRAYS INICIAIS ##### //
var firstDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var secondDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var dealerHand = [];
var playerHand = [];

firstRender();

// ----- Função do botão HIT ----- //
function hit(hand) {
    if (playerHand.length < 1) {
        randomPick(firstDeck, hand);
    } else {
        randomPick(secondDeck, hand);
    }
    
    var playerDivDel = document.querySelector('#player');
    playerDivDel.parentElement.removeChild(playerDivDel);
    playerRender(points(playerHand));
    
    playerWinChecker();
}

// ----- Função do botão STAND ----- //
function stand() {
    let loadIndex0 = [];
    randomPick(firstDeck, loadIndex0);
    dealerHand[0] = loadIndex0[0];

    do {
        hit(dealerHand);
    } while (points(dealerHand) < 18)

    compare(playerHand, dealerHand);
    dealerRender(points(dealerHand));
}

// ----- Função de comprar carta aleatóriamente ----- //
function randomPick(originDeck, finalDeck) {
    var randValue = originDeck[Math.floor(Math.random() * originDeck.length)];

    finalDeck.push(randValue);
}

function points(hand) {
    let points = 0;

    for (let index = 0; index < hand.length; index++) {
        points += hand[index];
    }

    return points;
}

// ----- Função de comparação de pontos ----- //
function compare(player, dealer) {
    if (player > dealer) {
        alert(`Player venceu!
        (${points(playerHand)} PLAYER x DEALER ${points(dealerHand)})`)
        console.log("Player é o vencedor")
    } else {
        //dealer vence
        console.log("Player é o perdedor")
    }

    //chamar render para Página de vítória ou derrota!
}

// ----- Função que checa a vitória do player para redirecionar a renderização ----- //
function playerWinChecker() {
    if (points(playerHand) > 21) {
        alert('Você perdeu!')
    } else if (points(playerHand) == 21) {
        alert('Você venceu!')
    }
}

// |#################################| //
// |--------- RENDERIZAÇÕES ---------| //
// |#################################| //

// ----- Game Page ----- //

var app = document.querySelector('#app');

function firstRender() {
    randomPick(firstDeck, playerHand);
    randomPick(secondDeck, playerHand);
    dealerHand[0] = '?';
    randomPick(secondDeck, dealerHand);
}

function dealerRender(points) {
    if (typeof points == "string") {
        points = '?'
    }

    var dealer = document.createElement('div');
    var dealerCards = document.createElement('div');
    dealer.setAttribute('id', 'dealer');
    dealerCards.setAttribute('id', 'dealerCards')
    dealer.innerHTML = `<p>Dealer: ${points}</p>`
    dealer.appendChild(dealerCards);

    for (card in dealerHand) {
        let dealerCardDiv = document.createElement('div');
        dealerCardDiv.innerHTML = `${dealerHand[card]}`
        dealerCards.appendChild(dealerCardDiv);
    }

    app.appendChild(dealer);
}

function betRender() {
    var bet = document.createElement('div');
    bet.setAttribute('id', 'bet');
    bet.innerHTML = `<p><strong>Bet:</strong> 1000 coins</p>`
    app.appendChild(bet);
}

function playerRender(points) {
    var player = document.createElement('div');
    var playerCards = document.createElement('div');

    player.setAttribute('id', 'player');
    playerCards.setAttribute('id', 'playerCards')

    for (card in playerHand) {
        let dealerCardDiv = document.createElement('div');
        dealerCardDiv.innerHTML = `${playerHand[card]}`
        playerCards.appendChild(dealerCardDiv);
    }

    
    player.appendChild(playerCards);
    player.innerHTML += `<p>Player: ${points}</p>`
    app.appendChild(player);
}

function gameButtonsRender() {
    var buttons = document.createElement('div');
    var hitButton = document.createElement('button');
    var standButton = document.createElement('button');

    hitButton.setAttribute('id', 'hit');
    hitButton.setAttribute('onclick', 'hit(playerHand)');
    hitButton.innerHTML = 'Hit';

    standButton.setAttribute('id', 'stand');
    standButton.setAttribute('onclick', 'stand(firstDeck, secondDeck)');
    standButton.innerHTML = 'Stand'

    buttons.setAttribute('id', 'buttons');
    buttons.setAttribute('class', 'buttons')

    buttons.appendChild(hitButton);
    buttons.appendChild(standButton);
    app.appendChild(buttons);

}

function renderAppMain() {
    dealerRender(points(dealerHand));
    betRender();
    playerRender(points(playerHand));
    gameButtonsRender();
}

renderAppMain();