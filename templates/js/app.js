// Variable
let divWelcome = document.querySelector(".class--welcome");
let myBtnStart = document.getElementById("startButton");
let fieldGame = document.getElementById("fieldGame");
let orderStatus = 0;
let countForLogic = 0;
let listX = [];
let listO = [];
let listFinalCombo = [
    "123",
    "456",
    "789",
    "147",
    "258",
    "369",
    "321",
    "654",
    "987",
    "963",
    "852",
    "741",
    "159",
    "357",
    "951",
    "753"
];
let messageResult = document.getElementById("messageResult");
let orderValue = 0;
let tryAgainButton = document.getElementById("tryAgainButton");

// Functions
// Add costume class in div for off show div
function addNoneInDiv(nameDiv) {
    nameDiv.classList.add("display--none")

    checkCostumeClass(divWelcome, fieldGame, "display--none");
    runTheGame();
};

// Create smallField for big div
function smallField(name) {
    for(let _ of Array(3)) {
        let newEl = document.createElement("div");

        newEl.innerHTML = (countForLogic += 1);
        newEl.style.color = "white";
        newEl.style.width = "100px";
        newEl.style.height = "100px";
        newEl.style.border = "1px solid black";        

        name.append(newEl);
    };
}

// Function create field
// Hand over name element (div) for create fild
function createFieldGame(nameField) {
    for(let _ of Array(3)) {
        let newEl = document.createElement("div");

        newEl.style.display = "flex";

        smallField(newEl)

        nameField.append(newEl);
    };
};

// In div welcom add class "display--none"
// Hand over div for search, div for creat field and name class for search
function checkCostumeClass(inDiv, forDiv, name="display--none") {
    if(inDiv.classList[1] === name) {
        createFieldGame(forDiv);
    };
};

function checkCombo(listCombo, listUser, nameUser) {
    let count = 0;
    
    for (let items of listCombo) {
        for(let item of items) {
            for(_ of listUser) {
                if(_ === item) {
                    count += 1;
                };
            };
        };

        if(count === 3) {
            return addNoneInDiv(fieldGame), viewMessage(messageResult, "Win user \"" + nameUser + "\"!"), orderValue = 1;
        } else {
            count = 0;
        };
    };
};

// Logic hand over result
function runTheGame() {
    for(let divList of fieldGame.children) {
        for(let item of divList.children) {
            item.addEventListener("click", function() {
                if(orderStatus == 0) {
                    item.classList.add("use--x");

                    orderStatus = 1;

                    listX.push(item.innerHTML);

                    checkCombo(listFinalCombo, listX, "X");

                    if((listX.length + listO.length) === 9) {
                        if(orderValue === 0) {
                            checkCombo(listFinalCombo, listX, "X");

                            orderValue = 3;
                        };
                
                        if(orderValue === 3) {
                            addNoneInDiv(fieldGame), viewMessage(messageResult, "Draw(");
                        };
                    };
                } else {
                    item.classList.add("use--o");

                    orderStatus = 0;

                    listO.push(item.innerHTML);

                    checkCombo(listFinalCombo, listO, "O");

                    if((listX.length + listO.length) === 9) {
                        if(orderValue === 0) {
                            checkCombo(listFinalCombo, listO, "O");

                            orderValue = 3;
                        };
                
                        if(orderValue === 3) {
                            addNoneInDiv(fieldGame), viewMessage(messageResult, "Draw(");
                        };
                    };
                };
            });
        };
    };
};

// View message
function viewMessage(nameDivForMessage, getMessage) {
    nameDivForMessage.classList.add("message--result");

    let createMessage = document.createElement("div");

    createMessage.innerText = getMessage;
    createMessage.style.textAlign = "center";
    createMessage.style.margin = "20px";
    createMessage.style.fontWeight = "bold";

    tryAgainButton.style.display = "block";

    nameDivForMessage.append(createMessage, tryAgainButton);
};

// Code
// Event for button add class for off show div welcome
myBtnStart.addEventListener("click", function() {
    addNoneInDiv(divWelcome);
});

tryAgainButton.addEventListener("click", function() {
    location.reload();
});