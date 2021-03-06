		var ctx = null; // global variable 2d context
		var frame = 1; // 23
		var width = 0;
		var height = 0;
		var started = false;
		var images = new Array();
		var startedX = -1;
	  window.onload = function() {
		var canvas = document.getElementById("fullview_canvas");
		canvas.width = 1167;// window.innerWidth;
		canvas.height = 700;//window.innerHeight;
		width = canvas.width;
		height = canvas.height;
		var bar = document.getElementById('loadProgressBar');
		for(var i=1; i<70; i++)
		{
			bar.value = i;
			if(i<10)
			{
				images[i] = new Image();
				images[i].src = "../leo360img/0" + i + ".jpg";
			}
			else 
			{
				images[i] = new Image();
				images[i].src = "../leo360img/" + i + ".jpg";
			}
		}
		ctx = canvas.getContext("2d");
		
		// mouse event
		canvas.addEventListener("mousedown", doMouseDown, false);
		canvas.addEventListener('mousemove', doMouseMove, false);
		canvas.addEventListener('mouseup',   doMouseUp, false);
		// loaded();
		
		// frame = 1
		frame = 1;
		images[frame].onload = function() {
			redraw();
			bar.style.display = 'none';
		}
	}
	function doMouseDown(event) {
		var x = event.pageX;
		var y = event.pageY;
		var canvas = event.target;
		var loc = getPointOnCanvas(canvas, x, y);
		console.log("mouse down at point( x:" + loc.x + ", y:" + loc.y + ")");
		startedX = loc.x;
		started = true;
	}
	
	function doMouseMove(event) {
		var x = event.pageX;
		var y = event.pageY;
		var canvas = event.target;
		var loc = getPointOnCanvas(canvas, x, y);
		if (started) {
			var count = Math.floor(Math.abs((startedX - loc.x)/200));
			var frameIndex = Math.floor((startedX - loc.x)/200);
			while(count > 0)
			{				
				console.log("frameIndex = " + frameIndex);
				count--;	
				if(frameIndex > 0)
				{
					frameIndex--;
					frame++;
				} else if(frameIndex < 0)
				{
					frameIndex++;
					frame--;
				}
				else if(frameIndex == 0)
				{
					break;
				}
								
				if(frame >= 70)
				{
					frame = 1;
				}
				if(frame <= 0)
				{
					frame = 69;
				}
				redraw();
			}
		}
	}
	
	function doMouseUp(event) {
		console.log("mouse up now");
		if (started) {
			doMouseMove(event);
			startedX = -1;
			started = false;
		}
	}
 
	function getPointOnCanvas(canvas, x, y) {
		var bbox = canvas.getBoundingClientRect();
		return { x: x - bbox.left * (canvas.width  / bbox.width),
				y: y - bbox.top  * (canvas.height / bbox.height)
				};
	}
	
	function loaded() {
		setTimeout( update, 1000/8);
	}
	function redraw()
	{
		// var imageObj = document.createElement("img");
		// var imageObj = new Image();
		var imageObj = images[frame];
		ctx.clearRect(0, 0, width, height)
		ctx.drawImage(imageObj, 0, 0, width, height);
	}
	function update() {
		redraw();
		frame++;
		if (frame >= 69) frame = 1;
		setTimeout( update, 1000/8);
	}