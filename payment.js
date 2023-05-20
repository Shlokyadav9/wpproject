


let arr=[];
document.getElementById("submit").addEventListener('click',(e)=>{
    e.preventDefault();
    let name1= document.getElementById("fname").value;
    let comment1= document.getElementById("email").value;
    let comment2= document.getElementById("adr").value;
    let comment3= document.getElementById("city").value;
    let comment4= document.getElementById("state").value;
    let comment5= document.getElementById("zip").value;
    let comment6= document.getElementById("cname").value;
    let comment7= document.getElementById("ccnum").value;
    let comment8= document.getElementById("expmonth").value;
    let comment9= document.getElementById("expyear").value;
    let comment10= document.getElementById("cvv").value;
    let data={
        fullname: name1,
        email: comment1,
        address: comment2,
        city: comment3,
        state: comment4,
        zip:comment5,
        cardname: comment6,
        cardnum: comment7,
        expirym: comment8,
        expiry: comment9,
        cvv: comment10
    }
    fetch("http://localhost:5001/hypestore.review",{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(json => console.log(json));
});

