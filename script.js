$(document).ready(function()
{
	var currentColor = "black";
	var rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]
	
	$(function(){
		$("#gridDialog").dialog({
			autoOpen: false,
			show: {effect:"fold", duration:"250"},
			hide: {effect:"explode", duration:"250"}
		});
	});
	
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
	
	var buildGrid = function(width)
	{
		$(".block").remove();
		
		var blockSize = $("#grid").width() / width;
		console.log("blockSize " + blockSize);
		
		var numblocks = ($("#grid").height() * $("#grid").width()) / (blockSize * blockSize);
		console.log("numblocks " + numblocks);
		
		var $block = $("<div class='block'/>");
		$block.css({"height":blockSize, "width":blockSize});
		
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
	
	rainbowize($("#rainbowLabel"));
	rainbowize($("#title"));
	buildGrid(80);
	
	$(document).on("mouseenter", ".block", function ()
	{
		console.log("mouse entered");
		
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
	
	$("#modifyCanvas").click(function()
	{
		$("#gridDialog").dialog("open");
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
	
	$("#dialogOK").click(function()
	{
		console.log($("#sizeInput").val());
		resetGrid();
		buildGrid($("#sizeInput").val());
		$("#gridDialog").dialog("close");
	});
	
	$("#dialogCancel").click(function()
	{
		$("#gridDialog").dialog("close");
	});
});