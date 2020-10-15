// ##### ARRAYS INICIAIS ##### //
var firstDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var secondDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var dealerHand = [];
var playerHand = [];

var playerName = '';
var playerCoins = 500;
var thisBet = 0;

// ----- Sounds ----- //
var audioClick = new Audio('../sounds/click.mp3');
var audioDraw = new Audio('../sounds/draw.mp3');
var audioWin = new Audio('../sounds/win.mp3');
var audioLose = new Audio('../sounds/lose.mp3');

// ----- Points info ----- //
var pointsInfoContainer = document.createElement('div');
pointsInfoContainer.setAttribute('class', 'info-coins');
pointsInfoContainer.innerHTML = `<p>${playerCoins} coins</p>`;
document.body.appendChild(pointsInfoContainer);

// ----- Carregar primeiras informações ----- //
firstLoad();

// ----- Função que executa o primeiro carregamento ----- //
function firstLoad() {
    randomPick(firstDeck, playerHand);
    randomPick(secondDeck, playerHand);
    dealerHand[0] = '?';
    randomPick(secondDeck, dealerHand);
}

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

    
    dealerRender(points(dealerHand));
    compare(points(playerHand), points(dealerHand));
}

// ----- Função de comprar carta aleatóriamente ----- //
function randomPick(originDeck, finalDeck) {
    var randValue = originDeck[Math.floor(Math.random() * originDeck.length)];

    finalDeck.push(randValue);
}

// ----- Função para calcular os pontos ----- //
function points(hand) {
    let points = 0;

    for (let index = 0; index < hand.length; index++) {
        points += hand[index];
    }

    return points;
}

// ----- Função de comparação de pontos ----- //
function compare(player, dealer) {
    if (dealer == 21) {
        audioLose.play();
        divAlert('renderFinalPage(false)', 'You lose!');
        playerCoins = parseInt(playerCoins) - parseInt(thisBet);
    } else if (dealer > 21) {
        audioWin.play();
        divAlert('renderFinalPage(true)', 'You win!');
        playerCoins = parseInt(playerCoins) + parseInt(thisBet);
    } else if (player > dealer) {
        audioWin.play();
        divAlert('renderFinalPage(true)', 'You win!');
        playerCoins = parseInt(playerCoins) + parseInt(thisBet);
    } else {
        audioLose.play();
        divAlert('renderFinalPage(false)', 'You lose!');
        playerCoins = parseInt(playerCoins) - parseInt(thisBet);
    }
}

// ----- Função que checa a vitória do player para redirecionar a renderização ----- //
function playerWinChecker() {
    if (points(playerHand) > 21) {
        audioLose.play();
        divAlert('renderFinalPage(false)', 'You lose!');
        playerCoins = parseInt(playerCoins) - parseInt(thisBet);
    } else if (points(playerHand) == 21) {
        audioWin.play();
        divAlert('renderFinalPage(true)', 'You win!');
        playerCoins = parseInt(playerCoins) + parseInt(thisBet);
    }
}

// |#################################| //
// |--------- RENDERIZAÇÕES ---------| //
// |#################################| //

// -------------------- Selecionando a div app ------------------ //
// ----- (vai ser útil para várias funções de renderização) ----- //
var app = document.querySelector('#app');

// ----- Renderizar a mão do desafiante ----- //
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

// ----- Renderizar campo com informação do valor apostado ----- //
function betRender() {
    var bet = document.createElement('div');
    bet.setAttribute('id', 'bet');
    bet.innerHTML = `<p><strong>Bet:</strong> ${thisBet} coins</p>`
    app.appendChild(bet);
}

// ----- Renderizar a mão do jogador ----- //
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
    player.innerHTML += `<p>${playerName}: ${points}</p>`
    app.appendChild(player);
}

// ----- Renderizar os botões da tela do jogo ----- //
function gameButtonsRender() {
    var buttons = document.createElement('div');
    var hitButton = document.createElement('button');
    var standButton = document.createElement('button');

    hitButton.setAttribute('id', 'hit');
    hitButton.setAttribute('onclick', 'hit(playerHand), audioDraw.play()');
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

// ----- Função de caixa de alert ----- //
function divAlert(renderFunction, msg) {
    let divBlock = document.createElement('div');
    divBlock.setAttribute('id', 'divBlock');
    document.body.appendChild(divBlock);

    let divAlertBox = document.createElement('div');
    let buttonAlertBox = document.createElement('button');
    buttonAlertBox.setAttribute('onclick', `${renderFunction}`);
    buttonAlertBox.innerHTML = 'OK!';

    divAlertBox.setAttribute('id', 'divAlertBox');
    divAlertBox.innerHTML = `<p>${msg}</p>`;
    divAlertBox.appendChild(buttonAlertBox);
    document.body.appendChild(divAlertBox);
}

// ----- Função de caixa de aposta ----- //
function betAlert(renderFunction, backFunction) {
    let divBetButtons = document.createElement('div');
    divBetButtons.setAttribute('id', 'divBetButtons');

    let inputBet = document.createElement('input');
    inputBet.setAttribute('value', 100)
    inputBet.setAttribute('type', 'number');
    inputBet.setAttribute('id', 'inputBet');

    let divBetBox = document.createElement('div');
    let btnBetBoxConfirm = document.createElement('button');
    btnBetBoxConfirm.setAttribute('onclick', `${renderFunction}`);
    btnBetBoxConfirm.innerHTML = 'Confirm Bet';
    let btnBetBoxBack = document.createElement('button');
    btnBetBoxBack.setAttribute('onclick', `${backFunction}`);
    btnBetBoxBack.innerHTML = 'Back';

    divBetBox.setAttribute('id', 'betAlertBox');
    divBetBox.innerHTML = `<p>Hello, ${playerName}!<br>How much do you want to bet?<br>Available Coins: ${playerCoins}</p>`;
    divBetButtons.appendChild(btnBetBoxConfirm);
    divBetButtons.appendChild(btnBetBoxBack);
    divBetBox.appendChild(inputBet);
    divBetBox.appendChild(divBetButtons);
    document.body.appendChild(divBetBox);
}

// ----- Renderizar a página inicial ----- //
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

// ----- Renderizar o jogo, a página principal ----- //
function renderAppMain() {
    dealerRender(points(dealerHand));
    betRender();
    playerRender(points(playerHand));
    gameButtonsRender();
}

// ----- Renderizar a tela de resultados, a página final ----- //
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

    divResultBtnQuit.setAttribute('onclick', 'quitBtnFunc()')


    if (result == true) {
        divResultMsg.innerHTML = `<p>That's a Calicojack!<br>You win!</p>`;
        divResultCoins.innerHTML = `<p>Result: ${thisBet} coins</p>`;
    } else {
        divResultMsg.innerHTML = `<p>You lose!</p>`;
        divResultCoins.innerHTML = `<p>Result: -${thisBet} coins</p>`;
    }

    divResultBtn2OrN.innerHTML = 'Double or Nothing';
    divResultBtnNewGame.innerHTML = 'New Game';
    divResultBtnQuit.innerHTML = 'Quit';

    app.appendChild(divResultMsg);
    app.appendChild(divResultCoins);
    app.appendChild(divResultButtons);
    
}

function doubleOrNothing() {
    audioClick.play();
    dealerHand = [];
    playerHand = [];

    firstLoad();

    if (playerCoins > thisBet * 2) {
        thisBet *= 2;

        let appDivDel = document.querySelector('#app');
        appDivDel.parentElement.removeChild(appDivDel);

        app.innerHTML = '';
        document.body.appendChild(app);

        renderAppMain();
    } else {
        alert('You do not have the required amount to double the bet.')
    }

}

function newGame() {
    audioClick.play();
    if (playerCoins < 100) {
        alert('The minimum bet is 100 coins. You do not have that amount of coins.');
    } else {
        thisBet = 100;
        dealerHand = [];
        playerHand = [];

        let appDivDel = document.querySelector('#app');
        appDivDel.parentElement.removeChild(appDivDel);

        app.innerHTML = '';
        document.body.appendChild(app);

        firstLoad();
        renderAppMain();
    }
}

// ----- Função do botão QUIT da tela de resultados ----- //
function quitBtnFunc() {
    audioClick.play();
    dealerHand = [];
    playerHand = [];

    playerName = '';

    let appDivDel = document.querySelector('#app');
    appDivDel.parentElement.removeChild(appDivDel);

    app.innerHTML = '';
    document.body.appendChild(app);

    firstLoad();
    renderFirstPage();
}

// ----- Função do botão START da tela inicial ----- //
function startBtnFunc() {
    audioClick.play();
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
        betAlert('confirmBetBtnFunc()', 'backBetBtnFunc()');
    }
}

function backBetBtnFunc() {
    audioClick.play();
    document.body.removeChild(betAlertBox);

    let appDivDel = document.querySelector('#app');
    appDivDel.parentElement.removeChild(appDivDel);

    app.innerHTML = '';
    document.body.appendChild(app);

    renderFirstPage();
}

function confirmBetBtnFunc() {
    audioClick.play();
    if (document.querySelector('#inputBet').value > playerCoins) {
        alert('You do not have that amount of coins.');
    } else if (document.querySelector('#inputBet').value < 100) {
        alert('The minimum bet is 100 coins.');
    } else {
        thisBet = parseInt(document.querySelector('#inputBet').value);
        document.body.removeChild(betAlertBox);

        let appDivDel = document.querySelector('#app');
        appDivDel.parentElement.removeChild(appDivDel);
    
        app.innerHTML = '';
        document.body.appendChild(app);

        renderAppMain();
    }
}

// ----- Chamando primeira página ----- //
renderFirstPage();