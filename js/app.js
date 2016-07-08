$(document).ready(function() {
var users = ["freecodecamp", "venicraft", "cretetion", "ESL_SC2", "brunofin", "goodgirlmiwa",  "syndicate", "Walshy", "storbeck", "comster404", "terakilobyte","ajoute_moi_pas", "totalbiscuit", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "OgamingSC2"],
apiTU = "https://api.twitch.tv/kraken/users/",
apiTS = "https://api.twitch.tv/kraken/streams/",
apiCH = "https://api.twitch.tv/kraken/channels/",
cb = "?callback=?",
twitch = {};

function getUser(name, info){
$.getJSON(apiTU+name+cb, function(user) {
$.getJSON(apiTS+name+cb, function(stream) {
$.getJSON(apiCH+name+cb, function(channel) {
var data = {};
data.name = user.display_name,
data.logo = user.logo,
data.url = "https://twitch.tv/"+user.name,
data.live = !stream.stream ? "offline" : "live",
data.stream = stream.stream ? stream.stream.channel.status : null;
data.error = channel.error ? "(Account Closed)" : "";
data.noLogo = "noacct.jpg",

info(data);

});    
});
});
}

function filterUsers(filter){
var filtered = {}, i=0;

if(filter == 'live'){
for(var key in twitch){
if(twitch[key].live == "live"){
filtered[i] = twitch[key];
i++
}
}
}else if(filter == 'offline'){
for(var key in twitch){
if(twitch[key].live == "offline"){
filtered[i] = twitch[key];
i++
}
}
}else {
filtered = twitch;
}
displayUsers(filtered);
}

function displayUsers(users){
console.log(users);
$(".results").html('');
$.each(users, function(idx, user){
$(".results").append(
'<div class="row user vertical '+user.live+'">'+
'<div class="col-xs-2">'+
'<img src="'+(user.logo ? user.logo : 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Twitch_BlackLogo.svg')+'" alt="" class="img-responsive" />'+
'</div>'+
'<div class="col-xs-8">'+
'<a href="'+user.url+'" target="_blank">'+user.name+'</a><br />'+user.error+
'<span class="desc">'+(user.stream ? user.stream : "")+'</span>'+
'</div>'+
'<div class="col-xs-2 status"></div>'+
'<br><br><br><br><br><br><br>'+
'</div>'
);      
});
}

$.each(users, function(idx, user){
getUser(user, function(data) {
twitch[idx] = data;
if(idx===users.length-1){
filterUsers('all');
} else {
	
	
	$('.control .all').click(function() {
	$(this).addClass('selected');
	var filter = $(this).attr('name');
	filterUsers('all');
	})
	
	$('.control .live').click(function() {
	$(this).addClass('selected');
	var filter = $(this).attr('name');
	filterUsers('live');
	})
	
	$('.control .offline').click(function() {
	$(this).addClass('selected');
	var filter = $(this).attr('name');
	filterUsers('offline');
	})
	
}
});
});

$('.control div div').click(function() {
$('.selected').removeClass('selected');
$(this).addClass('selected');
var filter = $(this).attr('name');
filterUsers(filter);
})

});
