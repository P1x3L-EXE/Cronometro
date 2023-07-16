var start_time;
var loop;

jQuery(document).ready(function(){
	jQuery(document).bind('keyup', 'space', start);

	jQuery(document).bind('keyup', 'esc', clear);
	
	setUpMessageText();

	jQuery('#info').hover(
		function(){ jQuery('#info-box').fadeIn(100); },
		function(){ jQuery('#info-box').stop(true, true).fadeOut(100); }
	);
});

function setUpMessageText(){
	jQuery('#message_text').bind('keyup', function(){
		charsLeft = 99 - (jQuery('#message_text').val().length); 
		jQuery('#chars_left').text(charsLeft);
		updateTweetButtonText(jQuery('#message_text').val());
	});
}

// Testing
function startCounting(startTime) {
	start_time = typeof(startTime) == 'undefined' ? new Date() : startTime;
	
	jQuery('#start_button').hide();
	jQuery('#stop_button').show();

	loop = window.setInterval("update()", 1);
	
	jQuery('body').removeClass().addClass('started');
}

// Unavaiable to be tested
function update() {
	printTime(format_seconds(getTime()));
}

// Tested
function printTime(time){
	jQuery('#difference').text(time);
}

// Tested
function getTime(){
	return (new Date() - start_time);
}

// Tested
function format_seconds(seconds) {
	if(isNaN(seconds))
		seconds = 0;

	var diff = new Date(seconds);
	var minutes = diff.getMinutes();
	var seconds = diff.getSeconds();
	var milliseconds = diff.getMilliseconds();

	if (minutes < 10)
		minutes = "0" + minutes;
	if (seconds < 10)
		seconds = "0" + seconds;

	if (milliseconds < 10)
		milliseconds = "00" + milliseconds;
	else if (milliseconds < 100)
		milliseconds = "0" + milliseconds;

	// document.title = minutes + ":" + seconds + ":" + milliseconds + " - Cronômetro Online";
	return minutes + ":" + seconds + ":" + milliseconds;
}

function start() {
	if (start_time)
		unstart();
	else
		startCounting();
	return false;
}

// Tested
function unstart() {
	clearInterval(loop);

    start_time = 0;
	
	jQuery('#start_button').show();
	jQuery('#stop_button').hide();
	
	jQuery('body').removeClass().addClass('paused');
	fillText();
}

// Tested
function clear() {
	unstart();
	jQuery('#difference').text(format_seconds(0));
}

// Tested
function updateTweetButtonText(message) {
  var tweetButton = jQuery('#tweet_button');
  tweetButton.attr('href', tweetButton.attr('href').replace(/&text=[^&]+/, "&text=" + encodeURIComponent(message)));
}

//Testing
function fillText(){
	difference = jQuery('#difference').text();
	if(jQuery('#flag a').hasClass('flag-english'))
		jQuery('#message_text').val('Eu gastei '+difference+' para ');
	else
		jQuery('#message_text').val('I took '+difference+' to ');

	setCaret();
}

function setCaret() {  
	ctrl = document.getElementById('message_text');  
	pos = ctrl.value.length;  //value
	if(ctrl.setSelectionRange) {  // setSelectionRange
		ctrl.focus();  
		ctrl.setSelectionRange(pos,pos);   
	} else if (ctrl.createTextRange) {  
		var range = ctrl.createTextRange();  
		range.collapse(true);  
		range.moveEnd('character', pos);  
		range.moveStart('character', pos);  
		range.select();  
	}  
}

function twitterModal(element){
	largura = 500;
	altura = 400;
	var esquerda = ((screen.width - largura) / 2);
	var topo = ((screen.height - altura) / 2);
	window.open(element.href,element.name,"channelmode=0,directories=0,fullscreen=no,location=0,menubar=0,resizable=0,scrollbars=yes,status=0,titlebar=0,toolbar=0,top="+topo+"px,left="+esquerda+"px,width="+largura+"px,height="+altura+"px");
	return false;
}
