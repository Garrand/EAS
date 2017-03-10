$(document).ready(function()
{
	var currentColor = "black";
	var rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
	var rainbowize = function($word)
	{
		console.log("rainbowize " + $word.text());
		console.log($word.text().length);
		
		var word = $word.text();
		
		$word.empty();
		console.log($word.text() + " emptied?");
		
		for(var i = 0; i < word.length; i++)
		{
			var color = rainbowColors[i % rainbowColors.length];
			var $letter = $("<span>" + word.charAt(i) + "</span>");
			
			$letter.css({"color": color});
			
			$word.append($letter);
		}
		
		console.log("final word " + $word.text());
	}
	
	rainbowize($("#rainbowLabel"));
	
	var buildGrid = function(width)
	{
		var numblocks = ($("#grid").height() * $("#grid").width()) / (width * width);
		console.log(numblocks);
		
		var $block = $("<div class='block'/>");
		$block.css({"height":width, "width":width});
		
		for( i=0; i<numblocks; i++)
		{
			$("#grid").append($block.clone());
		}
	}
	
	var resetGrid = function()
	{
		$(".block").css({"backgroundColor": "white"});
	}
	
	var colorBlock = function($block)
	{
		$block.css({"backgroundColor": currentColor});
	}
	
	var rainbowBlock = function($block)
	{
		var color = rainbowColors[Math.floor(Math.random() * (rainbowColors.length) - 1)];
		$block.css("background", color);
	}
	
	buildGrid(10);
	
	$(".block").mouseenter(function ()
	{
		if(!$("#overwrite").is(":checked"))
		{			
			if($(this).css("background-color") != "rgb(255, 255, 255)")
			{
				return;
			}
		}
		
		if($("#rainbow").is(":checked"))
		{
			rainbowBlock($(this));
		}
		else
		{			
			colorBlock($(this));
		}
	});
	
	$("#clearCanvas").click(function (){
		$(".block").css("background", "white");
	});
	
	$(".radioButton").click(function()
	{
		currentColor = $(this).attr("id");
	});
	
	$("#displayGrid").click(function()
	{
		if($("#displayGrid").is(":checked"))
		{
			$(".block").css({"outline": "1px solid"});
		}
		else
		{
			$(".block").css({"outline": "none"});
		}
	});
	
});