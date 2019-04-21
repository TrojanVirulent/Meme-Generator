let top_text, bottom_text, imageInput, topTextSize, bottomTextSize, generate_btn, canvas, ctx;

function generate_meme(img, t_text, b_text, t_text_size, b_text_size)
{
	canvas.height = img.height;
	canvas.width = img.width;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 0, 0);

	
	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	ctx.textAlign ='center';

	//Top text font size
	fontSize =canvas.width * t_text_size;
	ctx.font = fontSize + 'px Impact';
	ctx.lineWidth = fontSize / 15;
	document.getElementById("tfs").innerHTML = `<p>${t_text_size * 100}</p>`;



	//Draw top text
	ctx.textBaseLine = 'top';
	t_text.split('\n').forEach( function(t, i){
		ctx.fillText(t, canvas.width / 2, i * fontSize+20, canvas.width);
		ctx.strokeText(t, canvas.width / 2, i * fontSize+20, canvas.width);
	});

	//Bottom text font size
	fontSize =canvas.width * b_text_size;
	ctx.font = fontSize + 'px Impact';
	ctx.lineWidth = fontSize / 15;
	document.getElementById("bfs").innerHTML = `<p>${b_text_size * 100}</p>`

	//Draw bottom text
	ctx.textBaseLine = 'bottom';
	b_text.split('\n').reverse().forEach( function(t, i){
		ctx.fillText(t, canvas.width / 2, canvas.height- i * fontSize-5, canvas.width);
		ctx.strokeText(t, canvas.width / 2, canvas.height- i * fontSize-5, canvas.width);
	});

}

function showValTop(newVal){
  document.getElementById("tfs").innerHTML=newVal * 100;
}

function showValBottom(newVal){
  document.getElementById("bfs").innerHTML=newVal * 100;
}


function init() {
	top_text=document.getElementById("Top-text");
	bottom_text=document.getElementById("bottom-text");
	topTextSize=document.getElementById("top_text_size");
	bottomTextSize=document.getElementById("bottom_text_size");
	imageInput=document.getElementById("image_file");
	generate_btn=document.getElementById("generate_btn");
	canvas=document.getElementById("meme-canvas");

	ctx=canvas.getContext('2d');

	canvas.height = canvas.width = 0;

	generate_btn.addEventListener('click', function(){
		let reader = new FileReader();
		reader.onload= function() {
			let img = new Image;
			img.src = reader.result;
			generate_meme(img, top_text.value, bottom_text.value, topTextSize.value, bottomTextSize.value);
		};
		reader.readAsDataURL(imageInput.files[0]);
	});
}

init();