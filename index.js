let url = "https://noroff-komputer-store-api.herokuapp.com/computers";
let laptops = [];
let specs = [];
let bankClicked = false;
let loanActive = false;
let purchasedLaptop = false;
let i = 0;

// fetch API
fetch(url)
.then(response => response.json())
.then(data => laptops = data)
.then(laptops => addLaptopsNew(laptops))
.catch(error => console.log(error))

laptops.push(laptops)

const addLaptopsNew = (laptops) => {
    laptops.map((laptop) => {
        addLaptopSingleNew(laptop)
    });
}

const addLaptopSingleNew = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    const selectLaptops = document.getElementById("selectLaptops");
    selectLaptops.appendChild(laptopElement);
}

const increment = () => {
    val = ++i*100;
    document.getElementById('pay').innerHTML = val;
}

/**
 * This function updates the bank balance if loan is taken.
 * It also checks if the user is allowed to take a loan or not. 
 * If the loan is more than double the user's bank balance, the user is asked to try a smaller amount.
 */
const clickGetLoan = () => {
    let balance = document.getElementById("balanceAmount").textContent;
    const loan = prompt("Please enter the amount you wish to loan");
    loanActive = true;

    if (loanActive === true) {
        document.getElementById('repayBtn').style.display = 'block';
    } else {
        document.getElementById('repayBtn').style.display = 'none';
    }
    if(loan != null) {
        document.getElementById('newBalance').value = loan;
        let doubleBalance = parseInt(balance) * 2 + 1;
        if(parseInt(loan) >= doubleBalance) {
            document.getElementById('repayBtn').style.display = 'none';
            document.getElementById('noLoan').innerHTML = "You cannot get a loan, try a smaller amount";
        } else {
            document.getElementById('outstandingLoan').style.display = 'block';
            document.getElementById('getALoanBtn').style.display = 'none';
            document.getElementById('loanBalance').innerHTML = loan;
            document.getElementById('noLoan').style.display = 'none';
            document.getElementById('balanceAmount').innerHTML = parseInt(loan) + parseInt(balance);
        } 
    }
}

/**
 * This function checks if 
 */
const clickBank = () => {
    let fromWork = document.getElementById('pay').textContent;
    let bankBalance = document.getElementById("balanceAmount").textContent;

    bankClicked = true;
    
    document.getElementById("pay").innerHTML = 0;
    
    if (bankClicked === true) {
        i = 0;
    } 

    if (loanActive === true) {
        let moneyToOutstanding = fromWork * 0.1;
        let moneyToBalance = fromWork * 0.9;
        let loan = document.getElementById('newBalance').value;
        let updatedLoan = loan - moneyToOutstanding;
    
        document.getElementById('loanBalance').innerHTML = parseInt(updatedLoan);
        document.getElementById("balanceAmount").innerHTML = parseInt(bankBalance) + parseInt(moneyToBalance);
    } else {
        bankBalance = document.getElementById("balanceAmount").innerHTML = parseInt(bankBalance) + parseInt(fromWork);
        document.getElementById('repayBtn').style.display = 'none';
    }
}

const clickRepay = () => {
    let fromWork = document.getElementById('pay').textContent;
    let loanBalance = document.getElementById('loanBalance').textContent;
    let balance = document.getElementById("balanceAmount").textContent;
    let totalLoan =  fromWork - loanBalance;
    let totalBalance = loanBalance - fromWork;
    i = 0;

    document.getElementById('pay').innerHTML = 0;
    document.getElementById('loanBalance').innerHTML = totalBalance;
    document.getElementById('balanceAmount').innerHTML = parseInt(totalLoan) + parseInt(balance);
    
    if(fromWork < loanBalance) {
        document.getElementById('balanceAmount').innerHTML = balance;
        document.getElementById('loanBalance').innerHTML = totalBalance;
    }

    if (totalBalance <= 0) {
        document.getElementById('outstandingLoan').style.display = 'none';
        document.getElementById('repayBtn').style.display = 'none';
        loanActive = false;
        if(purchasedLaptop === true) {
            document.getElementById('getALoanBtn').style.display = 'block';
        }
    } 
}

const selectedOption = () => {
    const laptopId = document.getElementById('selectLaptops').value;
    document.getElementById('imgContainer').style.display = 'block';
    document.getElementById('descriptionContainer').style.display = 'block';
    document.getElementById('buyNowTitle').style.display = 'none';
    document.getElementById('featuresText').style.display = 'block';

    laptops.forEach((laptop) => {
        if (laptop.id === parseInt(laptopId) ){
            document.getElementById('laptopDescription').innerHTML = laptop.specs;
            
            let texts = document.getElementById('laptopDescription').textContent;
            let updatedText = texts.split(",").join("<br>")
            document.getElementById('laptopDescription').innerHTML = updatedText;
            document.getElementById('description').innerHTML = laptop.description;

            let imageUrl = 'https://noroff-komputer-store-api.herokuapp.com/';

            if(laptop.id === 5) {
                let uniqueImg = 'https://www.glarestomper.com/wp-content/uploads/2017/06/LTV-main.jpg';
                document.getElementById('laptopImg').setAttribute('src', uniqueImg);
            } else {
                let specificImage = laptop.image;
                let image = imageUrl.concat(specificImage);
                document.getElementById('laptopImg').setAttribute('src', image);
            }
            document.getElementById('laptopPrice').innerHTML = laptop.price;
            document.getElementById('laptopTitle').innerHTML = laptop.title;
        }
    })
}

const buyNow = () => {
    let balance = document.getElementById("balanceAmount").textContent;
    const laptopId = document.getElementById('selectLaptops').value;

    laptops.forEach((laptop) => {
        if (laptop.id === parseInt(laptopId)) {
            if(balance >= laptop.price) {
                document.getElementById('buyNowMessage').innerHTML = "You purchased the laptop!";
                setTimeout(function(){
                    document.getElementById('buyNowMessage').innerHTML = "";
                }, 3000)
                let newBalance = balance - laptop.price;
                document.getElementById('balanceAmount').innerHTML = newBalance;
                purchasedLaptop = true;
                if (loanActive === false) {
                    document.getElementById('getALoanBtn').style.display = 'block';
                }
            } else {
                document.getElementById('buyNowMessage').innerHTML = "You cannot afford the laptop!";
                setTimeout(function() {
                    document.getElementById('buyNowMessage').innerHTML = "";
                }, 3000)
            }
        }
    })
}

