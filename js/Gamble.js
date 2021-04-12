const gambleButton = document.querySelector('.glow-on-hover');
const pointDisplayer = document.querySelector('.points');
const winnerText = document.querySelector('.winner');
const loserText = document.querySelector('.loser');
let percentageSlider = document.getElementById("id3");
let higherSelector = document.getElementById("higher").checked;
let lowerSelector = document.getElementById("lower").checked;
let sliderOutput = document.getElementById("slider-pointer");

percentageSlider.oninput = function(){
    sliderOutput.innerHTML = this.value;
}

function Higher(){
    percentageSlider.classList.add("higher");
}

function Lower(){
    percentageSlider.classList.remove("higher");
}

let balance = 1000;
let oldBalance = 0;
let input = 0;
let hLower = 0;
let chosenPercentage = 0;
let higherPercentage = 0;
let lowerPercentage = 0;
let profit = 0;
let winner = true;

if(higherSelector){
    console.log("higher : " + higherSelector);
}else{
    console.log("lower : " + lowerSelector);
}


const updateStorageBalance = function(){
    balanceStorage = parseInt(localStorage.getItem("storageBalance"));
    console.log("Storage : " + balanceStorage);
    if (balanceStorage != 1000){
    console.log("Balance has been updated using local storage : " + balance);
    balance = balanceStorage;
    }else{
        balane = 1000;
    }
    
}
const saveStorageBalance = function(){
    localStorage.setItem("storageBalance", 1000)  //Change 1000 to balance!!!!!!!!!!!!!!
}
const pointDisplayerUpdater = function(){
    pointDisplayer.classList.add("fade-out");
    pointDisplayer.classList.remove("fade-out");
    pointDisplayer.innerHTML = parseInt(balance);
    pointDisplayer.classList.remove("fade-in");
    pointDisplayer.classList.remove("fade-in");
}



updateStorageBalance();
pointDisplayerUpdater();

gambleButton.addEventListener('click' , function(){
    console.clear();
    console.log("Button Click-----------------")
    oldBalance = balance;
    higherSelector = document.getElementById("higher").checked;
    lowerSelector = document.getElementById("lower").checked;
    if(higherSelector){
        console.log("higher : " + higherSelector);
    }else{
        console.log("lower : " + lowerSelector);
    }
    console.log("-----------------------------")
    input = document.getElementById("coin-input").value
    chosenPercentage = percentageSlider.value;

    if(balance > 0 && input > 0 && input <= balance){
        console.log("Input log: " + input);
        console.log("Input percentage log: " + percentageSlider.value);
        console.log("-----------------------------")
        balance -= input;
        pointDisplayerUpdater(); 
        // choosePercentage();
        // 
        
        if (higherSelector){
            higherPercentage = 100 - chosenPercentage;
            console.log("You chose higher, these are your percentages : " + higherPercentage + "% - 100%");
        }else{
            console.log("You chose lower, these are your percentages : " + "0% - " + chosenPercentage + "%");
            lowerPercentage = chosenPercentage;
        }

        calculateWin();
    }else if(input > 0 && input <= balance){
        alert("You don't have enough credits. 100 credits have been added to your balance for a re-try. :)");
        balance =+ 100;
        pointDisplayerUpdater();
    }else if(input > balance){
        alert("You don't have enough coins to gamble that amount!");
    }else{
        alert("You have to put in the amount of coins that you want to gamble!");
    }
})

const calculateProfit = function(){
    console.log("calculateProfit--------------")
    let stakes = 100 / chosenPercentage;
    console.log("stakes: " + input + "(input) x " + stakes);
    profit = input * stakes;
    console.log("profit: " + profit);
    console.log("-----------------------------")
    return profit;
}

const calculateWin = function(){
    console.log("calculateWin-----------------")
    let randomNumber = Math.floor(Math.random() * 101); 

    console.log("Random number : " + randomNumber);



    if(higher){
        if (higherPercentage < randomNumber){
            winnerText.classList.add("result");
            setTimeout(() => {  winnerText.classList.remove("result"); }, 2000);
            win();
        }else{
            loserText.classList.add("result");
            setTimeout(() => {  loserText.classList.remove("result"); }, 2000);
            pointDisplayerUpdater();
            saveStorageBalance();
            console.log("You have lost!")
            console.log("This was your old balance : " + oldBalance);
            console.log("This is your new balance : " + balance);
        }
    }else{
        if (lowerPercentage < randomNumber){
            winnerText.classList.add("result");
            setTimeout(() => {  winnerText.classList.remove("result");; }, 2000);
            win();
        }else{
            loserText.classList.add("result");
            setTimeout(() => {  loserText.classList.remove("result");; }, 2000);
            pointDisplayerUpdater();
            saveStorageBalance();
            console.log("You have lost!")
            console.log("This was your old balance : " + oldBalance);
            console.log("This is your new balance : " + balance);
        }
    }
}

const win = function(){
    console.log("win--------------------------")
    balance += calculateProfit();
    console.log("Old Balance : " + oldBalance);
    console.log("Current balance : " + balance);
    pointDisplayerUpdater();
    saveStorageBalance();
}
