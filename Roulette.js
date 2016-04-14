/**
 * Created by Jay on 17/03/2016.
 */
//disabling the buttons
document.getElementById('btnFire').disabled = true;
document.getElementById('btnFireAway').disabled = true;

//Outputs values to HTML page
outputBullet = function(number){
    document.getElementById('bulletCount').innerHTML = number;
}

outputAway = function(number){
    document.getElementById('fireAwayCount').innerHTML = number;
}

//when btnSpin is clicked, it enables btnFire and btnFireAway
// gets element from HTML and passes it into variable called btnSpin
var btnSpin = document.getElementById('btnSpin');
btnSpin.onclick = function(){
    //Generates random number
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    //Disables btnSpin
    document.getElementById('btnSpin').disabled = true;
    document.getElementById('btnFireAway').disabled = false;
    document.getElementById('btnFire').disabled = false;
    outputBullet(randomNumber);
};

var btnFire = document.getElementById('btnFire');
btnFire.onclick = function(){
  var fireCountDown = document.getElementById('bulletCount').innerHTML;
    var clickedFire = false;

    if(fireCountDown > 0 ){
        fireCountDown--;
        document.getElementById('fireAt').innerHTML = 'Fired at you!';
        outputBullet(fireCountDown);
        WinOrLose(fireCountDown,clickedFire);
    }
    //Stops background flicker when count = 1
    if (fireCountDown != 0){
        ChangeBackground();
        //Plays click sound
        document.getElementById('gClick').play();
    }else{
        document.getElementById('gBang').play();
    }
};

var btnFireAway = document.getElementById('btnFireAway');
btnFireAway.onclick = function (){
    var awayCountDown = document.getElementById('fireAwayCount').innerHTML;
    var fireCountDown = document.getElementById('bulletCount').innerHTML;
    var clickedFireAway = true;

    // minus one off bullet count and fire away count
    document.getElementById('fireAt').innerHTML = 'Fired away!';
    if (awayCountDown > 0){
        awayCountDown--;
        fireCountDown--;
        outputBullet(fireCountDown);
        outputAway(awayCountDown);
        WinOrLose(fireCountDown, clickedFireAway);
    }
    //disables btnFireAway when no more fire away chances are left
    if(awayCountDown === 0 || fireCountDown === 0){
        document.getElementById('btnFireAway').disabled = true;
    }
    //Stops background flicker when count = 1
    if (fireCountDown != 0){
        ChangeBackground();
        //plays click sound
        document.getElementById('gClick').play();
    } else{
        //BANG!
        document.getElementById('gBang').play();
    }
};

//resets all values and buttons
var btnReset = document.getElementById('btnReset');
btnReset.onclick = function (){
    document.getElementById('btnSpin').disabled = false;
    document.getElementById('fireAt').innerHTML = 'Fire!';
    document.getElementById('fireAwayCount').innerHTML = '2';
    document.getElementById('bulletCount').innerHTML = '0';
    //reverts background back to grey
    $('body').animate({backgroundColor: "#898989"}, 'slow');
    //changes image opacity back to invisible
    $('img').animate({opacity: '0'}, 'slow');
    //$('.container').animate({color: "#000000"}, 'slow');
};

function WinOrLose(countDown,clicked){

    if(clicked === true && countDown === 0){
        document.getElementById('btnFire').disabled = true;
        document.getElementById('btnFireAway').disabled = true;
        var won = document.getElementById('won').innerHTML;
        won++;
        document.getElementById('bulletCount').innerHTML = 'You LIVE!';
        document.getElementById('won').innerHTML = won;
        //Fade background to light blue
        $('body').animate({backgroundColor: "#66b3ff"}, 'slow');
        //Shows angel face
        $('.angel').animate({opacity: '1.0'}, 'slow');
        //$('.container').animate({color: "#FFFFFF"}, 'slow');

    }else if(clicked === false && countDown === 0){
        document.getElementById('btnFire').disabled = true;
        document.getElementById('btnFireAway').disabled = true;
        var lost = document.getElementById('lost').innerHTML;
        lost++;
        document.getElementById('bulletCount').innerHTML = 'You DIED!';
        document.getElementById('lost').innerHTML = lost;
        //Fade background to red
        $('body').animate({backgroundColor: "#f01414"}, 'slow');
        //shows devil face
        $('.devil').animate({opacity: '1.0'}, 'slow');
        //$('.container').animate({color: "#FFFFFF"}, 'slow');
    }
}
//Yellow "bang" flicker, to animate gun being shot
function changeColor(info) {
    document.body.style.backgroundColor = info;
}
function ChangeBackground() {
    document.body.style.backgroundColor="yellow"; //Immediately change the background color to yellow.
    setTimeout("changeColor('#898989')", 50) //After 50 milliseconds change the background back to grey.
}