var counter = 0

function setup (){
    var timer = select ('#timer');
    timer.innerHTML (counter);
    
    function timeIt() {
        counter ++;
        timer.innerHtml(counter);
        console.log (timeIt);  
    }


    setInterval(timeIt, 1000);
}