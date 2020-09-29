// ##### ARRAYS INICIAIS ##### //
var firstDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var secondDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var dealerHand = [];
var playerHand = [];

var playerName = ''

firstLoad();

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
        divAlert('renderFinalPage(true)', 'Você venceu!');
    } else {
        divAlert('renderFinalPage(false)', 'Você perdeu!');
    }

    //chamar render para Página de vítória ou derrota!
}

// ----- Função que checa a vitória do player para redirecionar a renderização ----- //
function playerWinChecker() {
    if (points(playerHand) > 21) {
        divAlert('renderFinalPage(false)', 'Você perdeu!')
    } else if (points(playerHand) == 21) {
        divAlert('renderFinalPage(true)', 'Você ganhou!')
    }
}

// |#################################| //
// |--------- RENDERIZAÇÕES ---------| //
// |#################################| //

// ----- Game Page ----- //

var app = document.querySelector('#app');

function firstLoad() {
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

// Função de caixa de alert //
function divAlert(renderFunction, msg) {
    let divBlock = document.createElement('div');
    divBlock.setAttribute('id', 'divBlock');
    document.body.appendChild(divBlock);

    let divAlertBox = document.createElement('div');
    let buttonAlertBox = document.createElement('button')
    buttonAlertBox.setAttribute('onclick', `${renderFunction}`)
    buttonAlertBox.innerHTML = 'OK!'

    divAlertBox.setAttribute('id', 'divAlertBox');
    divAlertBox.innerHTML = `<p>${msg}</p>`;
    divAlertBox.appendChild(buttonAlertBox)
    document.body.appendChild(divAlertBox);
}

function renderFirstPage() {
    let boxName = document.createElement('div');
    boxName.setAttribute('id', 'blackBox');
    app.appendChild(boxName);
    boxName.innerHTML = `<p>Calicojack<br><small>from Stardew Valley</small></p> `;

    let inputName = document.createElement('input');
    inputName.setAttribute('id', 'inputName')
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('placeholder', 'Enter your name here');
    boxName.appendChild(inputName);

    let coinsInfo = document.createElement('p');
    coinsInfo.innerHTML = 'New players start with 500 coins.';
    coinsInfo.setAttribute('id', 'coinsInfo')
    boxName.appendChild(coinsInfo);

    let startButton = document.createElement('button');
    startButton.setAttribute('id', 'startButton');
    startButton.setAttribute('onclick', 'startBtnFunc()')
    startButton.innerHTML = 'Start!'
    boxName.appendChild(startButton);

}

function renderAppMain() {
    dealerRender(points(dealerHand));
    betRender();
    playerRender(points(playerHand));
    gameButtonsRender();
}

function renderFinalPage(result) {
    // Limpeza do App //
    document.body.removeChild(divAlertBox);
    document.body.removeChild(divBlock);
    let appDivDel = document.querySelector('#app');
        appDivDel.parentElement.removeChild(appDivDel);

        app.innerHTML = ''
        document.body.appendChild(app)

    // Preenchimento do App
    let divResultMsg = document.createElement('div');
    divResultMsg.setAttribute('id', 'divResultMsg');

    let divResultCoins = document.createElement('div');
    divResultCoins.setAttribute('id', 'divResultCoins');

    let divResultButtons = document.createElement('div');
    divResultButtons.setAttribute('id', 'divResultButtons');
    let divResultBtn2OrN = document.createElement('button');
    let divResultBtnNewGame = document.createElement('button');
    let divResultBtnQuit = document.createElement('button');
    divResultBtn2OrN.setAttribute('onclick', 'doubleOrNothing()');
    divResultBtnNewGame.setAttribute('onclick', 'newGame()');
    divResultBtnQuit.setAttribute('onclick', 'quit()');
    divResultBtn2OrN.setAttribute('id', 'btn2OrN');
    divResultBtnNewGame.setAttribute('id', 'btnNewGame');
    divResultBtnQuit.setAttribute('id', 'btnQuit');
    divResultButtons.appendChild(divResultBtn2OrN);
    divResultButtons.appendChild(divResultBtnNewGame);
    divResultButtons.appendChild(divResultBtnQuit);


    if (result == true) {
        divResultMsg.innerHTML = `<p>That's a Calicojack!<br>You win!</p>`;
        divResultCoins.innerHTML = `<p>Result: 100 coins</p>`;
    } else {
        divResultMsg.innerHTML = `<p>You lose!</p>`;
        divResultCoins.innerHTML = `<p>Result: -100 coins</p>`;
    }

    divResultBtn2OrN.innerHTML = 'Double or Nothing';
    divResultBtnNewGame.innerHTML = 'New Game';
    divResultBtnQuit.innerHTML = 'Quit';

    app.appendChild(divResultMsg);
    app.appendChild(divResultCoins);
    app.appendChild(divResultButtons);
    
}


function startBtnFunc() {
    // Salvar nome
    playerName = document.querySelector('#blackBox input').value;

    // Verificar preenchimento do campo Nome
    if (playerName == "") {
        alert('Please enter your name before starting.')
    } else {
        // Limpeza do App
        let appDivDel = document.querySelector('#app');
        appDivDel.parentElement.removeChild(appDivDel);

        app.innerHTML = ''
        document.body.appendChild(app);

        // Preenchimento do App
        renderAppMain();
    }
}

renderFirstPage();