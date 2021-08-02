class Index {
    theBank() {
        this.getLoanBtn = document.getElementById("getALoanBtn")
        this.getLoanBtn.addEventListener("click", function() {
            console.log('hej');
        })
    }


    test() {
        btn = document.getElementById('getALoanBtn');   
        this.btn.addEventListener("click", getLoan, once);    
    }
 
    getLoan(e) {
        console.log('click click')
    }
}