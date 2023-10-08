const title = document.getElementById('title');
const price = document.getElementById('price');
const btn= document.getElementById('button');
const table = document.querySelector('tbody');
const date = document.querySelector('h1');
const inps = document.querySelectorAll('input');
const totalCost = document.getElementById('totalCost');
const portion = document.getElementById('portion');
const finished = document.getElementById('finished');
const innerList = document.getElementById('mylist');


let myArray ;
let myLocal = localStorage.itms
myLocal ? myArray = JSON.parse(myLocal) : myArray = [];

let lastMonth ;
let myFinished = localStorage.newMonth;
myFinished ? lastMonth = JSON.parse(myFinished) : lastMonth = [];

let countApepole ;
let aa = localStorage.pepoles;
aa ? countApepole = aa : countApepole = 1;

creatBasket();




let myData = new Date();
const day = myData.getDate();
const month = myData.getMonth('en', { month: 'short' }); // E.g., "Jul"
const year = myData.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

date.innerHTML = formattedDate;

btn.addEventListener('click' , ()=>{
    if(title.value !== '' && price.value !== ''){
        let myT = title.value
        let myP = +price.value

        let myObject = {
            title: myT,
            price:myP,
            date:formattedDate
        }

        myArray.unshift(myObject);
        localStorage.setItem('itms' , JSON.stringify(myArray));

        title.value = '' ;
        price.value = '';

        creatBasket();

        if(title.value == '' && price.value == ''){
            btn.classList.remove('activeBtn')
        }
    }
})

function creatBasket(){
    let myHTML=''
myArray.map((item , index)=>{
    myHTML += `
        <tr>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.date}</td>
            <td onclick="productDelete(${index})" class="cartDelete">X</td>
        </tr>
    `
});

showPrice();
table.innerHTML = myHTML;
portion.innerHTML = countApepole;
}


function productDelete(i){
    myArray.splice(i , 1);
    localStorage.setItem('itms' , JSON.stringify(myArray));
    creatBasket();
    showPrice();
  }


  
  inps.forEach((e)=>{
    e.addEventListener('input' , ()=>{
        if(title.value !== '' && price.value !== ''){
            btn.classList.add("activeBtn")
        }else{
            btn.classList.remove("activeBtn")
        }
    })
})



function showPrice(){
    
let aa = localStorage.pepoles;
aa ? countApepole = aa : countApepole = 1;
  
    let saleTotal =  myArray.reduce((accumulator, currentElement) => accumulator + currentElement.price, 0);
    totalCost.innerHTML= saleTotal;
    let finlyTotal = saleTotal / countApepole
    total.innerHTML = Math.floor(finlyTotal);
    }
    showPrice();

    function showPrompt() {
        var inputValue = window.prompt("الرجاء إدخال قيمة:");
        if (!isNaN(inputValue) || inputValue != null) {
            localStorage.setItem('pepoles' , inputValue)
            creatBasket();
            
        } else {
            alert("القيمة المدخلة ليست رقمًا.");
        }
}

//################################################


finished.addEventListener('click', ()=>{
    if(myArray.length > 0){
        lastMonth.unshift(myArray);
    localStorage.setItem('newMonth' , JSON.stringify(lastMonth));
    myArray = [];
    localStorage.setItem('itms' ,JSON.stringify(myArray) );
    creatBasket();

    createListTheNewMonth();
    }
    

});

function createListTheNewMonth() {
    let myList = '';

    lastMonth.forEach((innerArray , index) => {
        let total = 0;
        let rowSpan = 2
        myList += `
        <h1 style="text-align: center;"> ${formattedDate}</h1>
        <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>price</th>
                    <th>date</th>
                </tr>
            </thead>
            <tbody>
        `;

        innerArray.forEach(item => {
            myList += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td>${item.date}</td>
                </tr>
            `;
        total += parseFloat(item.price);
        rowSpan +=1;
        });


        myList += `
            </tbody>
            <tfoot>
                <tr>
                    <th>total</th>
                    <th colspan='2' id="totalCost">${total}</th>
                </tr>
                <tr>
                    <th colspan="3" style="cursor: pointer; background:#ffd4d4"
                    onclick=deleteInAray(${index}) >Del </th>
                </tr>
            </tfoot>
        </table>
        `;
    });

    innerList.innerHTML = myList;
}
createListTheNewMonth();
function deleteInAray(index){
    lastMonth.splice(index ,1);
    localStorage.setItem('newMonth' , JSON.stringify(lastMonth));
    createListTheNewMonth();
}