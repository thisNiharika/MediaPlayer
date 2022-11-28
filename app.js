let slideIndex = 1;



let allMusic = [
  {
	  index:0,
    name: "RAJA",
   src: "audio/a.mpeg"
  },
  {
	  index:1,
    name: "Tumse hi din hota h",
   artist: "4:52",
    img: "music-2",
   src: "audio/b.mp3"
  },
  {
	  index:2,
    name: "Beauz & Jvna - Crazy",
   artist: "4:52",
    img: "music-3",
 src: "audio/b.mp3"
  },
  {
	   index:3,
    name: "Hardwind - Want Me",
   artist: "4:52",
    img: "music-4",
    src: "audio/b.mp3"
  },
  {
	   index:4,
    name: "Jim - Sun Goes Down",
   artist: "4:52",
    img: "music-5",
 src: "audio/b.mp3" },
  {
	   index:5,
    name: "Lost Sky - Vision NCS",
    artist: "NCS Release",
    img: "music-6",
 src: "audio/b.mp3"
  }
];


updateHistory()

var audio;
var prevIndex;
var cindex = 0;
function updateHistory(){
	
	
	let prev = sessionStorage.getItem("history");
	let json = JSON.parse(prev);
	
	
	let list = document.getElementById("recent");
	list.innerText = ''
	
	if(json){
	json.reverse();
	let count = 0;
	
	for( ;count < 4 && count< json.length; count++){
	
    let li = document.createElement("div"); 
	li.innerText = json[count];
  

  list.appendChild(li);
	
}
	}
	
		
	
}

function playAudio(index) {
	
	cindex = index;
	if(audio){
		audio.pause();
		let prev = sessionStorage.getItem("history");
		let json = JSON.parse(prev)
		if(!json)
			json = []
		if(prevIndex){
		json.push(allMusic[prevIndex].name);
		sessionStorage.setItem("history",JSON.stringify(json));		
		updateHistory();
		}
	}
	
	prevIndex = index;
	
	console.log("Clicked "+index);
	highLight(index);
	audio = new Audio(allMusic[index].src);
    audio.play();
}

let list = document.getElementById("songs");

allMusic.forEach((item)=>{
  let li = document.createElement("div"); 
  li.id = item.index;
  li.innerText = item.name;
  
  
   (function() {
      var j = li.id
      li.onclick = function() {
        playAudio(j)
      }
    })()
  
  
  list.appendChild(li);
})
  



function highLight(index){
	
			
	allMusic.forEach((item)=>{
  var high = document.getElementById(item.index);
	high.style.color = 'black';
})
	
	var high = document.getElementById(index);
	high.style.color = 'red';
	
	var high = document.getElementById("currentSong");
	high.innerText= allMusic[index].name;
	
	
	
}


showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
 // dots[slideIndex-1].className += " active";
}



function playNext(){

	playAudio((cindex+1)%6);
}


function playPrev(){
	if(cindex == 0)
		cindex = 5;
	else
		cindex--;
	playAudio((cindex)%6);
}