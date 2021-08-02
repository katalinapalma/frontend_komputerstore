// window.onload = function () {
//         this.getLoanBtn = document.getElementById("getALoanBtn")
//         this.getLoanBtn.addEventListener("click", function() {
//             console.log('click click click');
//         })


// }

function clickGetLoan() {
    console.log('click click click');
}

function clickBank() {
    console.log('bank bank bank')
}

function clickWork() {
    console.log('work work work')
}

function getData() {
    fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(function(response) {
        return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function() {
            console.log("Booo");
        });
}
