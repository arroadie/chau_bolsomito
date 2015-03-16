var options = [":ship: it", ":speedboat: it", ":boat: it", ":sailboat: it", ":rowboat: it", ":airplane: it", ":helicopter: it", ":steam_locomotive: it", ":tram: it", ":mountain_railway: it", ":bike: it", ":aerial_tramway: it", ":suspension_railway: it", ":mountain_cableway: it", ":tractor: it", ":blue_car: it", ":oncoming_automobile: it", ":car: it", ":red_car: it", ":taxi: it", ":oncoming_taxi: it", ":articulated_lorry: it", ":bus: it", ":oncoming_bus: it", ":police_car: it", ":oncoming_police_car: it", ":fire_engine: it", ":ambulance: it", ":minibus: it", ":truck: it", ":train: it", ":train2: it", ":bullettrain_front: it", ":bullettrain_side: it", ":light_rail: it", ":monorail: it", ":railway_car: it", ":trolleybus: it"];
document.getElementById('new_comment_field').value = options[Math.floor(Math.random()*options.length)];
document.querySelector("#js-new-comment-form-actions > .primary").click();
setTimeout(function(){
	document.location.reload(true);
}, 2000);