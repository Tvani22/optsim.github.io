function startup()
{ // onload help function
     
        var docHeight = $(document).height(); 
        var scrollTop = $(window).scrollTop(); 
        $('.overlay-bg').show().css({'height' : docHeight}); 
        $('.popup'+1).show().css({'top': scrollTop+20+'px'}); 
    }

$(function()
	{
		var $stageContainer = $("#container");
		var stageOffset = $stageContainer.offset();
		var offsetX = stageOffset.left;
		var offsetY = stageOffset.top;
		var object_name;
		var object_position_x;
		var imageCount = -1;
		var imageSrc = [
			"convex.png","concave.png","mirror1.png"];
			// add new 
		var imageSrc1 = [
			"convex1.png","concave1.png","planoconvex1.png","planoconcave1.png","negative1.png"];
			
		$('#help1').click(function(event)
		{
        event.preventDefault(); 
		startup();
		});
  
		// hide popup when user clicks on close button or if user clicks anywhere outside the container
		$('.close-btn, .overlay-bg').click(function()
		{
        $('.overlay-bg, .overlay-content').hide(); // hide the overlay
		});
    
		// hide the popup when user presses the esc key
		$(document).keyup(function(e) 
		{
        if (e.keyCode == 27) { // if user presses esc key
            $('.overlay-bg, .overlay-content').hide(); //hide the overlay
        }
		});
			
			for (var i = 0; i  < imageSrc.length; i++) 
			{
				(function()
				{
				var $mirror, image;
				var $mirror = $("#mirror"+i);
				$mirror.hide();
				image = new Image();
				image.onload = function () {
					$mirror.show();
				}
				image.src = imageSrc[i];
				$mirror.draggable({helper: 'clone'});
				$mirror.data("url", "");
				$mirror.data("image", image); 
				})();
			}
// add new
			for (var i = 0; i  < imageSrc1.length; i++) 
			{
				(function()
				{
				var $lense, image;
				var $lense = $("#lense"+i);
				$lense.hide();
				image = new Image();
				image.onload = function () {
					$lense.show();
				}
				image.src = imageSrc1[i];
				$lense.draggable({helper: 'clone'});
				$lense.data("url", "");
				$lense.data("image", image); 
				})();
			}			
					
			
			
		
		
		
		
		var stage =new Kinetic.Stage({
        container: 'container',
        width: $("#container").width(),
        height: window.innerHeight * 0.95,
        listening: true
		});
	
	var layer = new Kinetic.Layer();
	 stage.add(layer);
		//draw a vertical line
		var principal_axis = new Kinetic.Line({
				points: [$("#container").width()*0,$("#container").height()*0.5,$("#container").width()*1,$("#container").height()*0.5],
				stroke: 'black',
				strokeWidth: 2,
				lineCap: 'butt',
				lineJoin: 'bevel'
				});
			layer.add(principal_axis);
			
		//implement  place of  mouseover statement	
		var mouseToText = new Kinetic.Text({
			x: $("#container").width()*0.015,
			y: $("#container").height()*0.9,
			fontFamily: "Calibri",
			fontSize: $("#container").height()*0.06,
			fill: "red",
			stroke: null,
			text: ""
			});
		layer.add(mouseToText);


		//implement mouseover funtion 	
		$("#mirrorgroup").on("mouseover", function(){
			mouseToText.setText("Drag and Drop mirrors or lense to the experimental area");
			layer.drawScene();
		});
		
		//add new
		$("#lensgroup").on("mouseover", function(){
			mouseToText.setText("Drag and Drop lense to the experimental area");
			layer.drawScene();
		});
		$("#objectgroup").on("mouseover", function(){
			mouseToText.setText("Click one of these objects");
			layer.drawScene();
		});
		$("#reset").on("mouseover", function(){
			mouseToText.setText("Click on reset to reset this experiment");
			layer.drawScene();
		});
		$("#help1").on("mouseover", function(){
			mouseToText.setText("Click on help to get help");
			layer.drawScene();
		});
		
			function deleteray()
			{
			stage.get('#reflected_ray1_mirror').remove();	
			stage.get('#reflected_ray2_mirror').remove();
			stage.get('#refracted_ray_convex').remove();	
			}
			// add new
	function deleteray1()
	{
		stage.get('#reflected_ray1_lense1').remove();	
		stage.get('#reflected_ray2_lense1').remove();
		stage.get('#refracted_ray_convex1').remove();	
	}
			function deleteray2()
			{	
		stage.get('#central_ray').remove();
		stage.get('#incident_ray').remove();
		stage.get('#incident1_ray').remove();
		stage.get('#incident2_ray').remove();
		stage.get('#central1_ray').remove();
		stage.get('#central2_ray').remove();
		stage.get('#image_1').remove();
		stage.get('#image_2').remove();
		stage.get('#image_3').remove();
		stage.get('#image_4').remove();
		stage.get('#image_5').remove();
		stage.get('#image_6').remove();
		stage.get('#image_7').remove();
			}	
	
		// add new
		function deleteray21()
	{	
		stage.get('#central_ray1').remove();
		stage.get('#incident_ray1').remove();
		stage.get('#refracted_ray_concave').remove();
		stage.get('#reflected_ray_concave').remove();
		stage.get('#reflected_ray_lense2_1').remove();
		stage.get('#reflected_ray_lense2_2').remove();
		stage.get('#reflected_ray_lense2_3').remove();
		stage.get('#reflected_ray_lense2_4').remove();
		stage.get('#image_11').remove();
		stage.get('#image_21').remove();
		stage.get('#image_31').remove();
		stage.get('#arr4').remove();
		stage.get('#arr5').remove();
		stage.get('#arr6').remove();
	}	
		
		//draw Arrow after click toolbar Arrow
		var arrow_object = new Kinetic.Line
		({
				points: [15,$("#container").height()*0.5,15,$("#container").height()*0.3,10,$("#container").height()*0.35,15,$("#container").height()*0.3,20,$("#container").height()*0.35],
				id:"arrow",
				stroke: 'blue',
				strokeWidth: 4,
				lineCap: 'butt',
				lineJoin: 'bevel',
				draggable:true,
				dragBoundFunc: function(pos) {
						return {
						  x: pos.x,
						  y: this.getAbsolutePosition().y
						}
				} 	
		});
		//draw triangle after click toolbar triangle
		var triangle_object = new Kinetic.Polygon({ 
		x:10,
		id:"triangle",
		y: stage.getHeight()*0.46,
		stroke : "blue", 
		strokeWidth : 2, 
		points : [ 0,0, 30,0, 30,-$("#container").height()*0.19],
		fill: "blue",
		draggable : true,
		dragBoundFunc: function(pos) {
			return {
				x: pos.x,
				y: this.getAbsolutePosition().y,
			};
		  }
		});
		//draw square after click toolbar square

		var square_object = new Kinetic.Polygon({
		x:10,
		y: stage.getHeight()*0.46,
		points: [0,0,0,-$("#container").height()*0.198,30,-$("#container").height()*0.198,30,0,0,0],
		id:"square",		
		fill:'blue',
		stroke: 'blue',
		strokeWidth: 2,
		draggable:true,
        closed: true,
		dragBoundFunc: function(pos) {
			return {
			  x: pos.x,
			  y: this.getAbsolutePosition().y
			}
		} 	
	});	
		//when click object_arrow then call arrow_object
		document.getElementById('object_arrow').addEventListener('click', function() 
		{
			stage.get('#arrow').remove();
			stage.get('#triangle').remove();
			stage.get('#square').remove();
			layer.add(arrow_object);
			stage.find("#arrow")[0].setX(20);		
			object_name="arrow";
			deleteray();
			deleteray1();
			deleteray2(); 
			deleteray21();     						
			layer.draw();
		});
		//when click object_triangle then call arrow_triangle
		document.getElementById('object_triangle').addEventListener('click', function() 
		{
			stage.get('#arrow').remove();
			stage.get('#triangle').remove();
			stage.get('#square').remove();		
			layer.add(triangle_object);
			stage.find("#triangle")[0].setX(20);
			object_name="triangle";
			deleteray();
			deleteray1();
			deleteray2();
			deleteray21();			
			layer.draw();
		});
		//when click object_square then call arrow_square
		document.getElementById('object_square').addEventListener('click', function()
		{
			stage.get('#arrow').remove();
			stage.get('#triangle').remove();	
			stage.get('#square').remove();
			layer.add(square_object);
			stage.find("#square")[0].setX(20);
			object_name="square";
			deleteray();
			deleteray1();
			deleteray2();	
			deleteray21();
			layer.draw();
		});
		layer.draw();
		
			
		$stageContainer.droppable
		({
			drop: dragDrop,
		});
		
		// add new 
		var lense_id;
	var lense_1_name=null;
	var lense_2_name=null;
	var mirror_id;var ids;
	var mirror_1_name=null;
	var obs,obs1,image1posi,xx,yy;
	
		//find the intersected point of two lines
		function intersect(x1,y1,x2,y2,x3,y3,x4,y4)
		{
		var d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
		if (d == 0) return null;
		
		var xi = ((x3-x4)*(x1*y2-y1*x2)-(x1-x2)*(x3*y4-y3*x4))/d;
		var yi = ((y3-y4)*(x1*y2-y1*x2)-(y1-y2)*(x3*y4-y3*x4))/d;
		
		return {x:xi,y:yi};
	
		}
			
	function dragDrop(e, ui)
	{			
					var xxx = parseInt(ui.offset.left - offsetX);
					var yyy = parseInt(ui.offset.top - offsetY);
					var element = ui.draggable;
					var data = element.data("url");
					var theImage = element.data("image");
			
			if($(ui.helper).hasClass("mirrors"))
			{
					ids=$(ui.draggable).attr("id");
					console.log();					
					mirror_id=document.getElementById(ids);
		
					if (mirror_1_name==null )
					{				
						var image = new Kinetic.Image({
							name: data,
							id: "mirror_1",
							x: $("#container").width()*0.5-155,
							y: $("#container").height()*0.18,
							width:285,
							height:stage.getHeight()*0.7,
							image: theImage,
							draggable: false,
							dragBoundFunc: function(pos)
							{
								return {
								  x: pos.x,
								  y: this.getAbsolutePosition().y
								}
							} 
						});
							mirror_1_name=mirror_id.name;
					}
						if(mirror_1_name=="concave_mirror" ||mirror_1_name=="convex_mirror")
						{
							//draw left 2f of the first mirror
							var twof_1 = new Kinetic.Rect({
							x: $("#container").width()*0.2-2,
							y: ($("#container").height()*0.5)-4,
							width: 4,
							height: 20,
							fill: "blue",
							id:"2f_1",
							text:'the testing text'
							});
							//draw right 2f of the first mirror
							var twof_2 = new Kinetic.Rect({
							x: $("#container").width()*0.8-2,
							y: ($("#container").height()*0.5)-4,
							width: 4,
							height: 20,
							fill: "blue",
							id:"2f_2"
							});
							//draw left f of the first mirror
							var focal_1 = new Kinetic.Rect({
							x: $("#container").width()*0.345-2,
							y: ($("#container").height()*0.5)-4,
							width: 4,
							height: 20,
							fill: "blue",
							id:"f_1"        
							});	
							//draw right f of the first mirror
							var focal_2= new Kinetic.Rect({
							x: $("#container").width()*0.65-2,
							y: ($("#container").height()*0.5)-4,
							width: 4,
							height: 20,
							fill: "blue",
							id:"f_2"        
							});	
							var text_2 = new Kinetic.Text({
							x: $("#container").width()*0.65-10,
							y: ($("#container").height()*0.5)+10,
							text: 'f',
							fontSize: 32,
							fontFamily: 'Calibri',
							fill: 'red',
							padding: 5,
							});
							var text_1 = new Kinetic.Text({
							x: $("#container").width()*0.2-10,
							y: ($("#container").height()*0.5)+10,
							text: '2f',
							fontSize: 32,
							fontFamily: 'Calibri',
							fill: 'red',
							padding: 5,
							});
							var text_3 = new Kinetic.Text({
							x: $("#container").width()*0.8-10,
							y: ($("#container").height()*0.5)+10,
							text: '2f',
							fontSize: 32,
							fontFamily: 'Calibri',
							fill: 'red',
							padding: 5,
							});
							var text_4 = new Kinetic.Text({
							x:  $("#container").width()*0.345-10,
							y: ($("#container").height()*0.5)+10,
							text: 'f',
							fontSize: 32,
							fontFamily: 'Calibri',
							fill: 'red',
							padding: 5,
							});
							layer.add(text_2);
							layer.add(text_1);
							layer.add(text_3);
							layer.add(text_4);
							layer.add(twof_1);
							layer.add(focal_1);
							layer.add(twof_2);
							layer.add(focal_2);
						}
					
				
				 if(mirror_1_name!=null )
				{
					//when a mirrors already dropped into container, if we drop extra mirror it will replace the mirrors in the container 
					if (xxx<$("#container").width()*0.5)
					{
						stage.get('#mirror_1').remove();
						 var image = new Kinetic.Image({
							name: data,
							id: "mirror_1",
							x: $("#container").width()*0.5-145,
							y: $("#container").height()*0.18,
							width:285,
							height:$("#container").height()*0.7,
							image: theImage,
							draggable: false,
							dragBoundFunc: function(pos)
							{
								return {
								  x: pos.x,
								  y: this.getAbsolutePosition().y
								}
							} 
						});	
						mirror_1_name=mirror_id.name;
					}	
				}
			}
			
			// add new
			if($(ui.helper).hasClass("lenses"))
			{
				ids=$(ui.draggable).attr("id");
				console.log();					
				lense_id=document.getElementById(ids);
				if (lense_1_name==null )
				{				
					 var image = new Kinetic.Image({
						name: data,
						id: "lense_1",
						x: $("#container").width()*0.5-15,
						y: $("#container").height()*0.15,
						width:30,
						height:stage.getHeight()*0.7,
						image: theImage,
						draggable: false,
						dragBoundFunc: function(pos) {
								return {
								  x: pos.x,
								  y: this.getAbsolutePosition().y
								}
						} 
					});	
					//Draw vertical_axis for lense_1
					var vertical_axis = new Kinetic.Rect({
							x: $("#container").width()*0.5,
							y: ($("#container").height()*0),
							width: 1.5,
							height: $("#container").height(),
							fill: "blue",
							id:"vertical_axis1",
							text:'the testing text'
					});
					layer.add(vertical_axis);
					
					
					//draw left 2f of the first lense
						var twof_1 = new Kinetic.Rect({
							x: $("#container").width()*0.2-2,
							y: ($("#container").height()*0.5)-10,
							width: 4,
							height: 20,
							fill: "blue",
							id:"2f_1",
							text:'the testing text'
						});
						
						//draw right 2f of the first lense
						var twof_2 = new Kinetic.Rect({
							x: $("#container").width()*0.8-2,
							y: ($("#container").height()*0.5)-10,
							width: 4,
							height: 20,
							fill: "blue",
							id:"2f_2"
						});
						//draw left f of the first lense
						var focal_1 = new Kinetic.Rect({
							x: $("#container").width()*0.35-2,
							y: ($("#container").height()*0.5)-10,
							width: 4,
							height: 20,
							fill: "blue",
							id:"f_1"        
						});	
						
						//draw right f of the first lense
						var focal_2= new Kinetic.Rect({
							x: $("#container").width()*0.65-2,
							y: ($("#container").height()*0.5)-10,
							width: 4,
							height: 20,
							fill: "blue",
							id:"f_2"        
						});	
						
					layer.add(twof_1);layer.add(focal_1);layer.add(twof_2);layer.add(focal_2);
					lense_1_name=lense_id.name;
				}
				
				else if(lense_1_name!=null && lense_2_name!=null){//when two lenses already dropped into container, if we drop extra lense it will replace one of the lenses in the container 
					if (xxx<$("#container").width()*0.5){//if dropped position of thired lense is less than half of window it will replace first lense
						stage.get('#lense_1').remove();
						 var image = new Kinetic.Image({
							name: data,
							id: "lense_1",
							x: $("#container").width()*0.5-200,
							y: $("#container").height()*0.15,
							width:30,
							height:$("#container").height()*0.7,
							image: theImage,
							draggable: false,
							dragBoundFunc: function(pos) {
								return {
								  x: pos.x,
								  y: this.getAbsolutePosition().y
								}
							} 
						});	
						lense_1_name=lense_id.name;
						//Draw vertical_axis for lense_1
						stage.get('#vertical_axis1').remove();						
						var vertical_axis = new Kinetic.Rect({
								x: $("#container").width()*0.5-200+15,
								y: ($("#container").height()*0),
								width: 1.5,
								height: $("#container").height(),
								fill: "blue",
								id:"vertical_axis1",
								text:'the testing text'
						});
						layer.add(vertical_axis);
					}else{//if dropped position of thired lense is greater than half of window it will replace second lense
						stage.get('#lense_2').remove();
						var image = new Kinetic.Image({
							name: data,
							id: "lense_2",
							x: $("#container").width()*0.5+200,
							y: $("#container").height()*0.15,
							width:30,
							height:$("#container").height()*0.7,
							image: theImage,
							draggable: false,
							dragBoundFunc: function(pos) {
								return {
								  x: pos.x,
								  y: this.getAbsolutePosition().y
								}
							} 
						});	
						lense_2_name=lense_id.name;
						//Draw vertical_axis for lense_2
						stage.get('#vertical_axis2').remove();						
						var vertical_axis = new Kinetic.Rect({
								x: $("#container").width()*0.5+200+15,
								y: ($("#container").height()*0),
								width: 1.5,
								height: $("#container").height(),
								fill: "blue",
								id:"vertical_axis2",
								text:'the testing text'
						});
						layer.add(vertical_axis);
					}					
					image.setDraggable(true);//After dropped second lense enabble already exist lense to be draggable
				}				
			}
		
			
			var obj;
			var mirror_instance,value,lense_instance;
			var mirror_1_position,mirror_2_position,lense_1_position,lense_2_position;
			var focal_point_lense_2,x1,x2,height1,x3,y3,height3,x4,focal_point_lense_1,slope_1,slope_2,slope_3,slope_4,slope_5;
			var mirror1_ray1_end_point_x,mirror1_ray1_end_point_y,mirror1_ray2_end_point_x,mirror1_ray2_end_point_y,intersect_point_1,intersect_point_2,intersect_point_3,idd,intersect_point_1_tri_squ;
			var lense1_ray1_end_point_x,lense1_ray1_end_point_y,lense1_ray2_end_point_x,lense1_ray2_end_point_y;
			
			function drawImage()
			{
				if((mirror_1_name!=null ) && (object_name=="arrow" || object_name=="triangle" || object_name=="square"))
				{
					if(object_name=="arrow")
					{
					object_position_x=stage.find("#arrow")[0].getPosition().x+13;
					}
					else if(object_name=="triangle")
					{
					object_position_x=stage.find("#triangle")[0].getPosition().x+30;
					}
					else if(object_name=="square")
					{
					object_position_x=stage.find("#square")[0].getPosition().x+30;
					}
					mirror_1_position=stage.find("#mirror_1")[0].getPosition();//get the position of the  mirror
	
					deleteray();
					deleteray2();
				if(mirror_1_name=="mirror1_mirror")
					{
					slope_1=($("#container").height()*0.2)/(($("#container").width()*0.55)-object_position_x);
					mirror1_ray1_end_point_y=-($("#container").width()*0.5)*slope_1;
					var central_ray = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.5,$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5)],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'central_ray',
					lineJoin: 'bevel'
					});
					
					slope_2=($("#container").height()*0.2)/(($("#container").width()*0.35-2)-object_position_x);
					mirror1_ray2_end_point_y=-($("#container").width()*0.5)*slope_2;
					var incident_ray = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2)],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident_ray',
					lineJoin: 'bevel'
					});
					
					var central1_ray = new Kinetic.Line({
					points: [$("#container").width()-object_position_x,$("#container").height()*0.5,$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5)],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					dashArray: [29, 1, 0.001, 1],
					id:'central1_ray',
					lineJoin: 'bevel'
					});
					var incident1_ray = new Kinetic.Line({
					points: [$("#container").width()-object_position_x,$("#container").height()*0.3,$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2)],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					dashArray: [29, 1, 0.001, 1],
					id:'incident1_ray',
					lineJoin: 'bevel'
					});
					slope3=(mirror1_ray1_end_point_y/($("#container").width()-object_position_x-$("#container").width()*0.5-12));
					val1=slope3*($("#container").width()*0.5-12)+(mirror1_ray1_end_point_y+$("#container").height()*0.5);
					
					var central2_ray = new Kinetic.Line({
					points: [$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5),0,val1],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'central2_ray',
					lineJoin: 'bevel'
					});
					val=slope3*($("#container").width()*0.5-12)+(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2);
					var incident2_ray = new Kinetic.Line({
					points: [$("#container").width()*0.5-12,(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2),0,val],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident2_ray',
					lineJoin: 'bevel'
					});
					X3=(object_position_x+$("#container").width()*0.5-12)/2;
					Y3=($("#container").height()*0.5+(mirror1_ray1_end_point_y+$("#container").height()*0.5))/2;
					X4=(object_position_x+$("#container").width()*0.5-12)/2;
					Y4=($("#container").height()*0.3+(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2))/2;
					X5=($("#container").width()*0.5-12)/2;
					Y5=(val+(mirror1_ray1_end_point_y+$("#container").height()*0.5-$("#container").height()*0.2))/2;
					X6=($("#container").width()*0.5-12)/2;
					Y6=((mirror1_ray1_end_point_y+$("#container").height()*0.5)+val1)/2;
					var image_3= new Kinetic.Line({
					points: [(X3-10),(Y3-10),X3,Y3,(X3-10),(Y3+10)],
					id:"image_3",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_4= new Kinetic.Line({
					points: [(X4-10),(Y4-10),X4,Y4,(X4-10),(Y4+10)],
					id:"image_4",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_5= new Kinetic.Line({
					points: [(X5+10),(Y5-10),X5,Y5,(X5+10),(Y5+10)],
					id:"image_5",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_6= new Kinetic.Line({
					points: [(X6+10),(Y6-10),X6,Y6,(X6+10),(Y6+10)],
					id:"image_6",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					layer.add(central_ray);
					layer.add(central1_ray);
					layer.add(central2_ray);
					layer.add(incident_ray);
					layer.add(incident1_ray);
					layer.add(incident2_ray);
					layer.add(image_3);
					layer.add(image_4);
					layer.add(image_5);
					layer.add(image_6);
					x1=$("#container").height()*0.3+20;
					value=26;
					if(object_name=="arrow")
					{
						var image_1= new Kinetic.Line({
								points: [$("#container").width()-object_position_x,$("#container").height()*0.5,$("#container").width()-object_position_x,$("#container").height()*0.3,$("#container").width()-object_position_x-5,x1,$("#container").width()-object_position_x,$("#container").height()*0.3,$("#container").width()-object_position_x+5,x1],
								id:"image_1",
								stroke: 'blue',
								strokeWidth: 4,
								lineCap: 'butt',
								lineJoin: 'bevel',
								draggable:false
						});
						
						
					}
					else if(object_name=="triangle"){
						var image_1 = new Kinetic.Polygon({ 							
							id:"image_1",
							stroke : "blue", 
							strokeWidth : 2, 
							points : [ $("#container").width()-object_position_x,$("#container").height()*0.3+5, $("#container").width()-object_position_x,$("#container").height()*0.5,$("#container").width()-object_position_x+value,$("#container").height()*0.5],
							fill: "blue"					 
						});						
					}
					else if(object_name=="square")
					{
						var image_1 = new Kinetic.Polygon({							
							points: [$("#container").width()-object_position_x,$("#container").height()*0.3,$("#container").width()-object_position_x,$("#container").height()*0.5,$("#container").width()-object_position_x+value,$("#container").height()*0.5,$("#container").width()-object_position_x+value,$("#container").height()*0.3],
							id:"image_1",
							stroke: 'blue',
							strokeWidth: 2,
							fill:"blue",
							lineCap: 'butt',
							closed: true,							
							lineJoin: 'bevel'
						});	
					}
					layer.add(image_1);
				}
				else 
				{
				if(mirror_1_name=="concave_mirror")
				{
					//find slope between principal axis and the ray go through the optical center
					slope_1=($("#container").height()*0.2)/(($("#container").width()*0.35-2)-object_position_x);
					slope_2=($("#container").height()*0.6)/($("#container").width()*0.2-3);
					mirror1_ray1_end_point_y=($("#container").width()*0.5-($("#container").width()*0.35-2))*slope_1+$("#container").height()*0.5;
					slope3=($("#container").height()*0.3-$("#container").height()*0.5)/($("#container").width()*0.345-2-object_position_x);
					mirror1_ray1_end_point_x=$("#container").width()*0.5;
					mirror1_ray2_end_point_y=($("#container").width()*0.5-($("#container").width()*0.35-2))*slope_2+$("#container").height()*0.5;
					
					//draw ray from object to mirror(half of principal ray)				
					var incident_ray = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,mirror_1_position.x+145,$("#container").height()*0.3],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident_ray',
					lineJoin: 'bevel'
					});	
					
					var incident1_ray = new Kinetic.Line({
					points:[ mirror_1_position.x+145,$("#container").height()*0.3,0,mirror1_ray2_end_point_y],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident1_ray',
					lineJoin: 'bevel'
					});
					X3=(object_position_x+$("#container").width()*0.5)/2;
					Y3=(($("#container").height()*0.3)+$("#container").height()*0.3)/2;
					X4=(mirror_1_position.x+145)/2;
					Y4=($("#container").height()*0.3+mirror1_ray2_end_point_y)/2;
					var image_3= new Kinetic.Line({
					points: [(X3-10),(Y3-10),X3,Y3,(X3-10),(Y3+10)],
					id:"image_3",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_4= new Kinetic.Line({
					points: [(X4+5),(Y4-15),X4,Y4,(X4+10),(Y4+10)],
					id:"image_4",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					
					if(object_position_x<=$("#container").width()*0.22)
					{
					//draw central ray 
							var central_ray = new Kinetic.Line({
							points: [object_position_x,$("#container").height()*0.3,mirror1_ray1_end_point_x,mirror1_ray1_end_point_y],
							stroke: 'blue',
							strokeWidth: 2,
							lineCap: 'butt',
							id:'central_ray',
							lineJoin: 'bevel'
							});

					
						var central1_ray = new Kinetic.Line({
							points: [mirror1_ray1_end_point_x,mirror1_ray1_end_point_y,0,mirror1_ray1_end_point_y],
							stroke: 'blue',
							strokeWidth: 2,
							lineCap: 'butt',
							id:'central1_ray',
							lineJoin: 'bevel'
						});
					X5=(object_position_x+mirror1_ray1_end_point_x)/2;
					Y5=($("#container").height()*0.3+mirror1_ray1_end_point_y)/2;
					X6=(mirror1_ray1_end_point_x/2);
					Y6=(mirror1_ray1_end_point_y+mirror1_ray1_end_point_y)/2;
					var image_5= new Kinetic.Line({
					points: [(X5-10),(Y5-10),X5,Y5,(X5-10),(Y5+10)],
					id:"image_5",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_6= new Kinetic.Line({
					points: [(X6+5),(Y6-15),X6,Y6,(X6+10),(Y6+10)],
					id:"image_6",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					
					//find intesection point of  mirror
						intersect_point_1=intersect(mirror1_ray1_end_point_x,mirror1_ray1_end_point_y,0,mirror1_ray1_end_point_y,mirror_1_position.x+145,$("#container").height()*0.3,0,mirror1_ray2_end_point_y);
							layer.add(incident_ray);
							layer.add(incident1_ray);
							layer.add(central_ray);
							layer.add(central1_ray);
							layer.add(image_3);
							layer.add(image_4);
							layer.add(image_5);
							layer.add(image_6);

					}
					else if(object_position_x>$("#container").width()*0.22 && object_position_x<= $("#container").width()*0.35)
					{
						slope4=($("#container").height()*0.5-$("#container").height()*0.22)/(object_position_x-$("#container").width()*0.2);
						y1=(($("#container").height()*0.4+$("#container").width()*0.2)*slope4);
						y2=$("#container").height()*0.5-($("#container").width()*0.2)*slope4;
						
							//draw central ray 
							var central_ray = new Kinetic.Line({
							points: [0,y1,$("#container").width()*0.2-2,$("#container").height()*0.5,object_position_x,$("#container").height()*0.3, mirror_1_position.x+120,y2],
							stroke: 'blue',
							strokeWidth: 2,
							lineCap: 'butt',
							id:'central_ray',
							lineJoin: 'bevel'
							});
					X7=($("#container").width()*0.2-2+object_position_x)/2;
					Y7=($("#container").height()*0.5+$("#container").height()*0.3)/2;
					var image_7= new Kinetic.Line({
					points: [(X7-10),(Y7-10),X7,Y7,(X7-2),(Y7+15)],
					id:"image_7",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
							layer.add(incident_ray);
							layer.add(incident1_ray);
							layer.add(central_ray);
							layer.add(image_3);
							layer.add(image_4);
							layer.add(image_7);
							//find intesection point of  mirror
							intersect_point_1=intersect(mirror_1_position.x+145,$("#container").height()*0.3,0,mirror1_ray2_end_point_y,0,y1,$("#container").width()*0.2-2,$("#container").height()*0.5);
							
							
					}
							else if( object_position_x >$("#container").width()*0.35)
							{
								slope4=($("#container").height()*0.5-$("#container").height()*0.22)/(object_position_x-$("#container").width()*0.2);
								y1=(($("#container").height()*0.6+$("#container").width()*0.25)*slope4);
								y2=$("#container").height()*0.5-($("#container").width()*0.2)*slope4;
								y3=$("#container").width()*0.5+$("#container").height()*0.3/slope4;
								//draw central ray 
								var central_ray = new Kinetic.Line({
								points: [0,y1,$("#container").width()*0.2-2,$("#container").height()*0.5,object_position_x,$("#container").height()*0.3, mirror_1_position.x+140,y2],
								stroke: 'blue',
								strokeWidth: 2,
								lineCap: 'butt',
								id:'central_ray',
								lineJoin: 'bevel'
								});
								var central2_ray = new Kinetic.Line({
								points: [mirror_1_position.x+140,y2,y3,0],
								stroke: 'blue',
								strokeWidth: 2,
								lineCap: 'butt',
								dashArray: [29, 1, 0.001, 1],
								id:'central2_ray',
								lineJoin: 'bevel'
								});
								X3=$("#container").width()*0.5+$("#container").height()*0.6/slope_2;
								var central1_ray = new Kinetic.Line({
								points: [mirror_1_position.x+145,$("#container").height()*0.3,X3,0],
								stroke: 'blue',
								strokeWidth: 2,
								lineCap: 'butt',
								dashArray: [29, 1, 0.001, 1],
								id:'central1_ray',
								lineJoin: 'bevel'
								});
					X7=($("#container").width()*0.2-2+object_position_x)/2;
					Y7=($("#container").height()*0.5+$("#container").height()*0.3)/2;
					var image_7= new Kinetic.Line({
					points: [(X7-10),(Y7-10),X7,Y7,(X7-2),(Y7+15)],
					id:"image_7",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
							layer.add(incident_ray);
							layer.add(incident1_ray);
							layer.add(central_ray);
							layer.add(central1_ray);
							layer.add(central2_ray);
							layer.add(image_3);
							layer.add(image_4);
							layer.add(image_7);
							//find intesection point of  mirror
							intersect_point_1=intersect(mirror_1_position.x+140,y2,y3,0,mirror_1_position.x+145,$("#container").height()*0.3,X3,0);
							
							}
				}
else if(mirror_1_name=="convex_mirror")
				{
					//find slope between principal axis and the ray go through the optical center
					slope_1=($("#container").height()*0.2)/(($("#container").width()*0.35-2)-object_position_x);
					mirror1_ray1_end_point_y=($("#container").width()*0.5-($("#container").width()*0.35-2))*slope_1+$("#container").height()*0.5;
					mirror1_ray1_end_point_x=$("#container").width()*0.5;
					//draw central ray 
					var central_ray = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,$("#container").width()*0.8-2,$("#container").height()*0.5],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'central_ray',
					lineJoin: 'bevel'
					});
					var incident_ray = new Kinetic.Line({
					points: [$("#container").width()*0.65-2,$("#container").height()*0.5,$("#container").width()*0.5-12,$("#container").height()*0.3],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident_ray',
					dashArray: [29, 1, 0.001, 1],
					lineJoin: 'bevel'
					});	
					slope_1=(1/$("#container").width());
					mirror1_ray1_end_point_y=-($("#container").width()*0.5)*slope_1;
					
					var incident1_ray = new Kinetic.Line({
					points: [$("#container").width()*0.5-12,$("#container").height()*0.3,mirror_1_position.x+10,mirror1_ray1_end_point_y],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident1_ray',
					lineJoin: 'bevel'
					});	
					var central1_ray = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,$("#container").width()*0.5-12,$("#container").height()*0.3],
					stroke: 'blue',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'central1_ray',
					lineJoin: 'bevel'
					});	
					
					X3=(object_position_x+$("#container").width()*0.8-2)/2;
					Y3=($("#container").height()*0.3+$("#container").height()*0.5)/2;
					X5=($("#container").width()*0.5-12+mirror_1_position.x+10)/2;
					Y5=($("#container").height()*0.3+mirror1_ray1_end_point_y)/2;
					X6=(object_position_x+$("#container").width()*0.5-12)/2;
					Y6=($("#container").height()*0.3+$("#container").height()*0.3)/2;
					var image_3= new Kinetic.Line({
					points: [(X3-10),(Y3-10),X3,Y3,(X3-10),(Y3+10)],
					id:"image_3",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					
					var image_5= new Kinetic.Line({
					points: [(X5+10),(Y5-10),X5,Y5,(X5+5),(Y5+20)],
					id:"image_5",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					var image_6= new Kinetic.Line({
					points: [(X6-10),(Y6-10),X6,Y6,(X6-10),(Y6+10)],
					id:"image_6",
					stroke: 'red',
					strokeWidth: 4,
					lineCap: 'butt',
					lineJoin: 'bevel',
					});
					
					layer.add(central_ray);
					layer.add(central1_ray);
					layer.add(incident_ray);
					layer.add(incident1_ray);
					layer.add(image_3);
					
					layer.add(image_5);
					layer.add(image_6);
					//find intesection point of  convex_mirror
					intersect_point_1=intersect($("#container").width()*0.65-2,$("#container").height()*0.5,$("#container").width()*0.5-12,$("#container").height()*0.3,object_position_x,$("#container").height()*0.3,$("#container").width()*0.8-2,$("#container").height()*0.5);
				}
			
				
				
					if((object_name=="arrow" || object_name=="triangle")&&(mirror_1_name=="concave_mirror" || mirror_1_name=="convex_mirror"))
					{
						if(intersect_point_1.y>$("#container").height()*0.5)
						{	
							x1=intersect_point_1.y-5;
							y1=intersect_point_1.y-3;
						}
						else
						{
							x1=intersect_point_1.y+5;
							y1=intersect_point_1.y+3;							
						}
					}
				focal_point_mirror_1=(Math.abs(intersect_point_1.y-$("#container").height()*0.5))/Math.abs($("#container").height()*0.5-$("#container").height()*0.3);
				
				if(object_name=="triangle")
				{
					value=(26*focal_point_mirror_1);	
				}
				if(object_name=="square")
				{
					value=(26*focal_point_mirror_1);
				}
				//draw the image of object if it is one mirror experiment
				
					if(object_name=="arrow")
					{
						var image_1 = new Kinetic.Line({
								points: [intersect_point_1.x,$("#container").height()*0.5,intersect_point_1.x,intersect_point_1.y,intersect_point_1.x-5,x1,intersect_point_1.x,intersect_point_1.y,intersect_point_1.x+5,x1],
								id:"image_1",
								stroke: 'blue',
								strokeWidth: 3,
								lineCap: 'butt',
								lineJoin: 'bevel',
								draggable:false
						});
						
						layer.add(image_1);
					} 
					else if(object_name=="triangle"){
						var image_1 = new Kinetic.Polygon({ 							
							id:"image_1",
							stroke : "blue", 
							strokeWidth : 2, 
							points : [ intersect_point_1.x, y1, intersect_point_1.x,$("#container").height()*0.5,intersect_point_1.x+value,$("#container").height()*0.5],
							fill: "blue"					 
						});						
					}
					else if(object_name=="square"){
						var image_1 = new Kinetic.Polygon({							
							points: [intersect_point_1.x,intersect_point_1.y,intersect_point_1.x,$("#container").height()*0.5,intersect_point_1.x+value,$("#container").height()*0.5,intersect_point_1.x+value,intersect_point_1.y],
							id:"image_1",
							stroke: 'blue',
							strokeWidth: 2,
							fill:"blue",
							lineCap: 'butt',
							closed: true,							
							lineJoin: 'bevel'
						});						
					}


				if((object_name=="square" || object_name=="triangle") && !((intersect_point_1.x<0 || intersect_point_1.x>$("#container").width())))
				{
					layer.add(image_1);
				}
				}		
				
		}
		
		// add new
		if((lense_1_name!=null || lense_2_name!=null) && (object_name=="arrow" || object_name=="triangle" || object_name=="square")){
					if(object_name=="arrow"){
						object_position_x=stage.find("#arrow")[0].getPosition().x+13;
					}else if(object_name=="triangle"){
						object_position_x=stage.find("#triangle")[0].getPosition().x+30;
					}
					else if(object_name=="square"){
						object_position_x=stage.find("#square")[0].getPosition().x+30;
					}
					lense_1_position=stage.find("#lense_1")[0].getPosition();//get the position of the first lense
					if(lense_2_name!=null){
						lense_2_position=stage.find("#lense_2")[0].getPosition();//get the position of the second lense
					}
					deleteray1();
					deleteray21();
				//find slope between principal axis and the ray go through the optical center
				slope_1=($("#container").height()*0.2)/(lense_1_position.x+15-object_position_x);
				
				if(lense_2_name==null){
					lense1_ray1_end_point_y=($("#container").width()-(lense_1_position.x+15))*slope_1+$("#container").height()*0.5;
					lense1_ray1_end_point_x=$("#container").width();
				}else{
					lense1_ray1_end_point_y=(lense_2_position.x-lense_1_position.x)*slope_1+$("#container").height()*0.5;
					lense1_ray1_end_point_x=lense_2_position.x+15;
				}
				//find slope between principal axis and the ray go through the focal point
				slope_2=($("#container").height()*0.2)/($("#container").width()*0.15);
				
				if(lense_2_name==null){
					lense1_ray2_end_point_y=($("#container").width()*0.85-(lense_1_position.x+15))*slope_2+$("#container").height()*0.5;
					lense1_ray2_end_point_x=$("#container").width();
				}else{
					lense1_ray2_end_point_y=(lense_2_position.x-(lense_1_position.x+$("#container").width()*0.15))*slope_2+$("#container").height()*0.5;
					lense1_ray2_end_point_x=lense_2_position.x+15;
				}
				//draw central ray 
				var central_ray1 = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,lense_1_position.x+15,$("#container").height()*0.5,lense1_ray1_end_point_x,lense1_ray1_end_point_y],
					stroke: 'black',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'central_ray1',
					lineJoin: 'bevel'
				});
				//draw ray from object to lense(half of principal ray)				
				var incident_ray1 = new Kinetic.Line({
					points: [object_position_x,$("#container").height()*0.3,lense_1_position.x+15,$("#container").height()*0.3],
					stroke: 'black',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'incident_ray1',
					lineJoin: 'bevel'
				});													
				layer.add(central_ray1);
				layer.add(incident_ray1);
				
				if(lense_1_name=="convex_lense"  || lense_1_name=="plano_convex_lense" || lense_1_name=="meniscus_lense"){
					focal_point_lense_1=lense_1_position.x+15+$("#container").width()*0.15;
				}else if(lense_1_name=="concave_lense" || lense_1_name=="plano_concave_lense"){
					focal_point_lense_1=lense_1_position.x+15-$("#container").width()*0.15;
				}
				//find intesection point of principal ray and central ray in first lense
				intersect_point_1=intersect(object_position_x,$("#container").height()*0.3,lense_1_position.x+15,$("#container").height()*0.5,lense_1_position.x+15,$("#container").height()*0.3,focal_point_lense_1,$("#container").height()*0.5);
				if(object_name=="triangle" || object_name=="square"){
					intersect_point_1_tri_squ=intersect(object_position_x-30,$("#container").height()*0.3,lense_1_position.x+15,$("#container").height()*0.5,lense_1_position.x+15,$("#container").height()*0.3,focal_point_lense_1,$("#container").height()*0.5);
				}
				if(object_name=="arrow"){
					if(intersect_point_1.y>$("#container").height()*0.5){	
							x1=intersect_point_1.y-5;
					}else{
							x1=intersect_point_1.y+5;							
					}
				}
				//draw the image of object if it is one lense experiment
				if(lense_2_name==null){
					if(object_name=="arrow"){
						var image_11 = new Kinetic.Line({
								points: [intersect_point_1.x,$("#container").height()*0.5,intersect_point_1.x,intersect_point_1.y,intersect_point_1.x-5,x1,intersect_point_1.x,intersect_point_1.y,intersect_point_1.x+5,x1],
								id:"image_11",
								stroke: 'black',
								strokeWidth: 3,
								lineCap: 'butt',
								lineJoin: 'bevel',
								draggable:false
						});
						
						layer.add(image_11);
					} 
					else if(object_name=="triangle"){
						var image_11 = new Kinetic.Polygon({ 							
							id:"image_11",
							stroke : "red", 
							strokeWidth : 2, 
							points : [ intersect_point_1.x, intersect_point_1.y, intersect_point_1.x,$("#container").height()*0.5,intersect_point_1_tri_squ.x,$("#container").height()*0.5],
							fill: "blue"					 
						});						
					}
					else if(object_name=="square"){
						var image_11 = new Kinetic.Polygon({							
							points: [intersect_point_1.x,intersect_point_1.y,intersect_point_1_tri_squ.x,intersect_point_1_tri_squ.y,intersect_point_1_tri_squ.x,$("#container").height()*0.5,intersect_point_1.x,$("#container").height()*0.5,intersect_point_1.x,intersect_point_1.y],
							id:"image_11",
							stroke: 'black',
							strokeWidth: 2,
							fill:"green",
							lineCap: 'butt',
							closed: true,							
							lineJoin: 'bevel'
						});						
					}


				if((object_name=="square" || object_name=="triangle") && !((intersect_point_1.x<0 || intersect_point_1.x>$("#container").width()) && (intersect_point_1_tri_squ.x<0 || intersect_point_1_tri_squ.x>$("#container").width())))
				{
					layer.add(image_11);
				}			
			}
			if(lense_1_name=="convex_lense" || lense_1_name=="plano_convex_lense" || lense_1_name=="meniscus_lense"){	//do if the dropped lense is Convex Lense					
					//draw ray from lense - focal point to border of box (half of principal ray)	
					var refracted_ray_convex1 = new Kinetic.Line({
							points: [lense_1_position.x+15,$("#container").height()*0.3,lense1_ray2_end_point_x,lense1_ray2_end_point_y],
							stroke: 'black',
							strokeWidth: 2,
							lineCap: 'butt',
							id:'refracted_ray_convex1',
							lineJoin: 'bevel'
						});						
					layer.add(refracted_ray_convex1);
				if(intersect_point_1!=null){//if there is an intesection point
				
							if(lense_2_name!=null){//do if there is second Lense		
								//find the focal point
								if((lense_2_name=="convex_lense" && intersect_point_1.x>lense_2_position.x+15) || (lense_2_name=="convex_lense" && intersect_point_1.x<lense_2_position.x+15) || (lense_2_name=="plano_convex_lense" && intersect_point_1.x>lense_2_position.x+15) || (lense_2_name=="plano_convex_lense" && intersect_point_1.x<lense_2_position.x+15) || (lense_2_name=="meniscus_lense" && intersect_point_1.x>lense_2_position.x+15) || (lense_2_name=="meniscus_lense" && intersect_point_1.x<lense_2_position.x+15)){
									focal_point_lense_2=lense_2_position.x+15+$("#container").width()*0.15;
								}else if((lense_2_name=="concave_lense" && intersect_point_1.x>lense_2_position.x+15) || (lense_2_name=="concave_lense" && intersect_point_1.x<lense_2_position.x+15) || (lense_2_name=="plano_concave_lense" && intersect_point_1.x>lense_2_position.x+15) || (lense_2_name=="plano_concave_lense" && intersect_point_1.x<lense_2_position.x+15)){
									focal_point_lense_2=lense_2_position.x+15-$("#container").width()*0.15;
								}
								// find intesection point of the principal ray and central ray in second lense if the first lense is Convex
								intersect_point_2=intersect(lense_2_position.x+15,intersect_point_1.y,focal_point_lense_2,$("#container").height()*0.5,intersect_point_1.x,intersect_point_1.y,lense_2_position.x+15,$("#container").height()*0.5);		  
								if(object_name=="triangle" || object_name=="square"){
									intersect_point_2_tri_squ=intersect(lense_2_position.x+15,intersect_point_1_tri_squ.y,focal_point_lense_2,$("#container").height()*0.5,intersect_point_1_tri_squ.x,intersect_point_1_tri_squ.y,lense_2_position.x+15,$("#container").height()*0.5);
								}
								if(object_name=="arrow"){
									if(intersect_point_2.y>$("#container").height()*0.5){	
											x1=intersect_point_2.y-5;
									}else{
											x1=intersect_point_2.y+5;							
									}
								}
								//draw the image of second lense
								if(object_name=="arrow"){
									var image_21 = new Kinetic.Line({
											points: [intersect_point_2.x,$("#container").height()*0.5,intersect_point_2.x,intersect_point_2.y,intersect_point_2.x-5,x1,intersect_point_2.x,intersect_point_2.y,intersect_point_2.x+5,x1],
											id:"image_21",
											stroke: 'black',
											strokeWidth: 4,
											lineCap: 'butt',
											lineJoin: 'bevel',
											draggable:false
									});
									layer.add(image_21);
								}
								else if(object_name=="triangle"){
									var image_21= new Kinetic.Polygon({ 							
										id:"image_21",
										stroke : "red", 
										strokeWidth : 2, 
										points : [ intersect_point_2.x, intersect_point_2.y, intersect_point_2.x,$("#container").height()*0.5,intersect_point_2_tri_squ.x,$("#container").height()*0.5],
										fill: "blue"					 
									});									
								}
								else if(object_name=="square"){
									var image_21 = new Kinetic.Polygon({							
										points: [intersect_point_2.x,intersect_point_2.y,intersect_point_2_tri_squ.x,intersect_point_2_tri_squ.y,intersect_point_2_tri_squ.x,$("#container").height()*0.5,intersect_point_2.x,$("#container").height()*0.5,intersect_point_2.x,intersect_point_2.y],
										id:"image_21",
										stroke: 'black',
										strokeWidth: 2,
										fill:"green",
										lineCap: 'butt',
										closed: true,
										lineJoin: 'bevel'
									});									
								}								
								if((object_name=="square" || object_name=="triangle") && !((intersect_point_2.x<0 || intersect_point_2.x>$("#container").width()) && (intersect_point_2_tri_squ.x<0 || intersect_point_2_tri_squ.x>$("#container").width())))
								{
									layer.add(image_21);
								}
							} 						
						//draw infinite rays if object is within F
						if(object_position_x>lense_1_position.x+15-$("#container").width()*0.15){
							if(lense_2_name==null){
							for(var i=1;i<3;i++){
								if(i==1){x4=object_position_x;idd="reflected_ray1_lense1";}
								else if(i==2){x4=lense_1_position.x+15;idd="reflected_ray2_lense1";}
									var reflected_ray = new Kinetic.Line({
										points: [intersect_point_1.x,intersect_point_1.y,x4,$("#container").height()*0.3],
										stroke: 'black',
										strokeWidth: 2,
										lineCap: 'butt',
										dashArray: [29, 1, 0.001, 1],
										id:idd,
										lineJoin: 'bevel'
									});								
									layer.add(reflected_ray);
							}
							}
						}										    
				}
			}else{ //do if the dropped lense is Concave Lense		
				deleteray();
				// Find slope between principal axis and principal ray of Concave lense
				slope_3=Math.abs($("#container").height()*0.2/($("#container").width()*0.15));
				if(lense_2_name==null){
					lense1_ray2_end_point_y=0;
					lense1_ray2_end_point_x=($("#container").height()*0.5/slope_3)+lense_1_position.x+15-$("#container").width()*0.15;
				}
				else{
					lense1_ray2_end_point_x=lense_2_position.x+15;
					lense1_ray2_end_point_y=$("#container").height()*0.5-(lense_2_position.x-(lense_1_position.x-$("#container").width()*0.15))*slope_3;
				}
				//draw line from principal focus to infinite
				var refracted_ray_concave = new Kinetic.Line({
					points: [lense_1_position.x+15,$("#container").height()*0.3,lense1_ray2_end_point_x,lense1_ray2_end_point_y],
					stroke: 'black',
					strokeWidth: 2,
					lineCap: 'butt',
					id:'refracted_ray_concave',
					lineJoin: 'bevel'
				});
				var reflected_ray_concave = new Kinetic.Line({
					points: [lense_1_position.x+15,$("#container").height()*0.3,lense_1_position.x+15-$("#container").width()*0.15+4,$("#container").height()*0.5],
					stroke: 'black',
					strokeWidth: 2,
					lineCap: 'butt',
					dashArray: [29, 1, 0.001, 1],
					id:'reflected_ray_concave',
					lineJoin: 'bevel'
				});
				layer.add(refracted_ray_concave);layer.add(reflected_ray_concave);		
				
				if(lense_2_name!=null){	//if there is second lense							
						if(lense_2_name=="convex_lense" || lense_2_name=="plano_convex_lense" || lense_2_name=="meniscus_lense"){
							focal_point_lense_2=lense_2_position.x+15+$("#container").width()*0.15;
						}else if(lense_2_name=="concave_lense" || lense_2_name=="plano_concave_lense"){
							focal_point_lense_2=lense_2_position.x+15-$("#container").width()*0.15;
						}
						//find intesection point of principal ray and central ray in second lense if second lense is Concave
						intersect_point_3=intersect(intersect_point_1.x,intersect_point_1.y,lense_2_position.x+15,$("#container").height()*0.5,lense_2_position.x+15,intersect_point_1.y,focal_point_lense_2,$("#container").height()*0.5);
						if(object_name=="triangle" || object_name=="square"){
							intersect_point_3_tri_squ=intersect(intersect_point_1_tri_squ.x,intersect_point_1_tri_squ.y,lense_2_position.x+15,$("#container").height()*0.5,lense_2_position.x+15,intersect_point_1_tri_squ.y,focal_point_lense_2,$("#container").height()*0.5);
						}
						if(object_name=="arrow"){
							if(intersect_point_3.y>$("#container").height()*0.5){	
									x1=intersect_point_3.y-5;
							}else{
									x1=intersect_point_3.y+5;							
							}
						}
						//draw the image in second lense
						if(object_name=="arrow"){
							var image_31 = new Kinetic.Line({
									points: [intersect_point_3.x,$("#container").height()*0.5,intersect_point_3.x,intersect_point_3.y,intersect_point_3.x-5,x1,intersect_point_3.x,intersect_point_3.y,intersect_point_3.x+5,x1],
									id:"image_31",
									stroke: 'black',
									strokeWidth: 4,
									lineCap: 'butt',
									lineJoin: 'bevel',
									draggable:false
							});
							
							layer.add(image_31);
						}
						else if(object_name=="triangle"){
							var image_31 = new Kinetic.Polygon({ 							
									id:"image_31",
									stroke : "red", 
									strokeWidth : 2, 
									points : [ intersect_point_3.x, intersect_point_3.y, intersect_point_3_tri_squ.x,$("#container").height()*0.5,intersect_point_3.x,$("#container").height()*0.5],
									fill: "blue"					 
							});																										
						}
						else if(object_name=="square"){
							var image_31 = new Kinetic.Polygon({							
								points: [intersect_point_3.x,intersect_point_3.y,intersect_point_3_tri_squ.x,intersect_point_3_tri_squ.y,intersect_point_3_tri_squ.x,$("#container").height()*0.5,intersect_point_3.x,$("#container").height()*0.5,intersect_point_3.x,intersect_point_3.y],
								id:"image_31",
								stroke: 'black',
								strokeWidth: 2,
								fill:"green",
								lineCap: 'butt',
								closed: true,
								lineJoin: 'bevel'
							});									
						}		
						if((object_name=="square" || object_name=="triangle") && !((intersect_point_3.x<0 || intersect_point_3.x>$("#container").width()) && (intersect_point_3_tri_squ.x<0 || intersect_point_3_tri_squ.x>$("#container").width())))
						{
							layer.add(image_31);
						}	
				} 	
			}
			if(lense_2_name!=null){
					var xx;
					if(lense_1_name=="convex_lense" || lense_1_name=="plano_convex_lense" || lense_1_name=="meniscus_lense"){
							xx=intersect_point_2;
					}else{
							xx=intersect_point_3;
					}					
					var reflected_ray_lense2_1 = new Kinetic.Line({
								points: [lense_2_position.x+15,lense1_ray1_end_point_y,xx.x,xx.y],
								stroke: 'black',
								strokeWidth: 2,
								lineCap: 'butt',
								id:'reflected_ray_lense2_1',
								lineJoin: 'bevel'
					});	
					var reflected_ray_lense2_2 = new Kinetic.Line({
							points: [lense_2_position.x+15,lense1_ray2_end_point_y,xx.x,xx.y],
							stroke: 'black',
							strokeWidth: 2,
							lineCap: 'butt',
							id:'reflected_ray_lense2_2',
							lineJoin: 'bevel'
					});	
					if(xx.x<lense_2_position.x+15){
							reflected_ray_lense2_1.setDashArray([29, 1, 0.001, 1]);										
							reflected_ray_lense2_2.setDashArray([29, 1, 0.001, 1]);
							slope_4=Math.abs((xx.y-lense1_ray1_end_point_y)/(lense_2_position.x+15-xx.x));
							slope_5=Math.abs((xx.y-lense1_ray2_end_point_y)/(lense_2_position.x+15-xx.x));
							
							if(xx.y<lense1_ray1_end_point_y)				
							lense2_ray1_end_point_y=lense1_ray1_end_point_y+slope_4*($("#container").width()-(lense_2_position.x+15));
							else
							lense2_ray1_end_point_y=lense1_ray1_end_point_y-slope_4*($("#container").width()-(lense_2_position.x+15));
							if(xx.y<lense1_ray2_end_point_y)				
							lense2_ray2_end_point_y=lense1_ray2_end_point_y+slope_5*($("#container").width()-(lense_2_position.x+15));
							else
							lense2_ray2_end_point_y=lense1_ray2_end_point_y-slope_5*($("#container").width()-(lense_2_position.x+15));
							var reflected_ray_lense2_3 = new Kinetic.Line({
								points: [lense_2_position.x+15,lense1_ray1_end_point_y,$("#container").width(),lense2_ray1_end_point_y],
								stroke: 'black',
								strokeWidth: 2,
								lineCap: 'butt',
								id:'reflected_ray_lense2_3',
								lineJoin: 'bevel'
							});
							var reflected_ray_lense2_4 = new Kinetic.Line({
								points: [lense_2_position.x+15,lense1_ray2_end_point_y,$("#container").width(),lense2_ray2_end_point_y],
								stroke: 'black',
								strokeWidth: 2,
								lineCap: 'butt',
								id:'reflected_ray_lense2_4',
								lineJoin: 'bevel'
							});
							layer.add(reflected_ray_lense2_3);
							layer.add(reflected_ray_lense2_4);
						}
						layer.add(reflected_ray_lense2_1);
						layer.add(reflected_ray_lense2_2);
			}		
		
		}
		
	}
			//double click the mirrors to delete
			image.on('dblclick', function(evt) {			
				var mirror_instance = evt.targetNode;
				var mirror_instance_id = mirror_instance.getId();
				var lense_instance = evt.targetNode;
				var lense_instance_id = lense_instance.getId();
				image.remove();
				
				if(mirror_instance_id=="mirror_1")
				{
					stage.get('#2f_1').remove();
					stage.get('#2f_2').remove();
					stage.get('#f_1').remove();
					stage.get('#f_2').remove();
					stage.get('#vertical_axis1').remove();
					mirror_1_name=null;
					stage.get('#central_ray').remove();
					stage.get('#incident_ray').remove();
					stage.get('#central1_ray').remove();
					stage.get('#central2_ray').remove();
					stage.get('#incident1_ray').remove();
					stage.get('#incident2_ray').remove();
					stage.get('#image_1').remove();
					stage.get('#image_2').remove();
					stage.get('#image_3').remove();
					stage.get('#image_4').remove();
					stage.get('#image_5').remove();
					stage.get('#image_6').remove();
					stage.get('#image_7').remove();
				}
					if(lense_instance_id=="lense_1")
					{
					stage.get('#2f_1').remove();
					stage.get('#2f_2').remove();
					stage.get('#f_1').remove();
					stage.get('#f_2').remove();
					stage.get('#vertical_axis1').remove();
					lense_1_name=null;
						stage.get('#central_ray1').remove();
						stage.get('#incident_ray1').remove();
						stage.get('#refracted_ray_convex1').remove();
						stage.get('#reflected_ray1_lense1').remove();
						stage.get('#reflected_ray2_lense1').remove();
						stage.get('#refracted_ray_concave').remove();
						stage.get('#reflected_ray_concave').remove();
						stage.get('#image_11').remove();
					}
					
				if(mirror_1_name==null || lense_1_name==null)
				{
					if(object_name=="arrow"){
						stage.find("#arrow")[0].setX(20);
					}
					if(object_name=="triangle"){
						stage.find("#triangle")[0].setX(20);
					}
					if(object_name=="square"){
						stage.find("#square")[0].setX(20);
					}
				}
				layer.draw();
				drawImage();
			});
			
		//dragmove function for Arrow object
			arrow_object.on("dragmove", function() {
				drawImage();
				arrow_object.setDragBoundFunc(function(pos){
						if(pos.x < mirror_1_position.x+110){
						return {
						  x: pos.x,
						  y: this.getAbsolutePosition().y
						}
						}else{
							return {
							  x: this.getAbsolutePosition().x,
							  y: this.getAbsolutePosition().y
							}
						}
				});
				
			});
			triangle_object.on("dragmove", function() {
				drawImage();
				triangle_object.setDragBoundFunc(function(pos){
						if(pos.x < mirror_1_position.x+110){
						return {
						  x: pos.x,
						  y: this.getAbsolutePosition().y
						}
						}else{
							return {
							  x: this.getAbsolutePosition().x,
							  y: this.getAbsolutePosition().y
							}
						}
				});
				
			});
			square_object.on("dragmove", function() {
				drawImage();
				square_object.setDragBoundFunc(function(pos){
						if(pos.x < mirror_1_position.x+70){
						return {
						  x: pos.x,
						  y: this.getAbsolutePosition().y
						}
						}else{
							return {
							  x: this.getAbsolutePosition().x,
							  y: this.getAbsolutePosition().y
							}
						}
				});				
			});
			
			
			
			image.on("mouseover", function(){
				mouseToText.setText("Double click to remove mirror");
				layer.drawScene();
			});
			square_object.on("mouseover", function(){
				mouseToText.setText("Drag this polygon horizontal to get ray diagram");
				layer.drawScene();
			});
			triangle_object.on("mouseover", function(){
				mouseToText.setText("Drag this Triangle horizontal to get ray diagram");
				layer.drawScene();
			});
			arrow_object.on("mouseover", function(){
				mouseToText.setText("Drag this Arrow horizontal to get ray diagram");
				layer.drawScene();
			});

			
			layer.add(image);
			layer.draw();
		
	}
		
		stage.add(layer);	
});
