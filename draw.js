var svg = document.getElementById("board");
var stop = document.getElementById("stop");
var gas = document.getElementById("gas");
var dvd = document.getElementById("dvd");
var id = null;
var h = svg.getAttribute("height");
var w = svg.getAttribute("width");


//delete children
var clearing = function() {
 while (board.hasChildNodes()) {
        board.removeChild(board.childNodes[0]);
    }
}

//stop frames; reset frames
var stop_it = function() {
    clearInterval(id);
}

//rand color
var values = '0123456789ABCDEF';
var rand_color = function() {
    var color = '#';
    for (var x = 0; x < 6; x++) {
	color += values[Math.floor(Math.random() * 16)];
    }
    return color;
}



var grow_n_shrink = function(e) {

    //reset radius, mode, stop ongoing animation
    stop_it();
    var radius = 1;
    var mode = 1;
    var color = rand_color();

    var draw = function() {
	clearing();
	//change direction?
	if (radius == h/2 || radius == 0) {
	    mode *= -1;
	}
	//draw circle
	var cic = document.createElementNS("http://www.w3.org/2000/svg",
					   "circle");
	cic.setAttribute("cx", w/2);
	cic.setAttribute("cy", h/2);
	cic.setAttribute("r", radius.toString());
	cic.setAttribute("fill", color);
	svg.appendChild(cic);
	//increase or decrease radius
	radius += mode;
    }

    //initiate loop
    id = setInterval( draw, 12 );
}



var dvd_mimic = function(e) {

    //stop any ongoing animations
    //reset location; direction; set height and width; 
    stop_it();
    var rect_w = 120;
    var rect_h = 75;
    var x = Math.floor(Math.random() * (w - rect_w));
    var y = Math.floor(Math.random() * (h - rect_h));
    var y_mode = -2;
    var x_mode = -2;
    var color = rand_color();
    
    var draw = function() {
	clearing();
	//draw rect
	var rect = document.createElementNS("http://www.w3.org/2000/svg",
					    "rect");
	rect.setAttribute("width", rect_w);
	rect.setAttribute("height", rect_h);
	rect.setAttribute("x", x);
	rect.setAttribute("y", y);
	rect.setAttribute("fill", color);
	svg.appendChild(rect);
	//change direction
	if (y <= 0 || y+rect_h >= h) {
	    y_mode *= -1;
	    color = rand_color();
	}
	if (x <= 0 || x+rect_w >= w) {
	    x_mode *= -1;
	    color = rand_color();
	}
	//move the rect
	x += x_mode;
	y += y_mode;
    }

    //initiate loop
    id = setInterval( draw, 15 );
}


stop.addEventListener("click", stop_it);
gas.addEventListener("click", grow_n_shrink);
dvd.addEventListener("click", dvd_mimic);
