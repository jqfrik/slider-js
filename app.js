let prevBtn = document.querySelector('.btn-prev');
let nextBtn = document.querySelector('.btn-next');
let slides = document.querySelectorAll('.slides');
let slide = document.querySelector('.slide');
let dots = document.getElementsByClassName('dots');
let collectionDot = document.getElementsByClassName('dot');

let currentFrame = 0;
let timeout = 1000;
let activeItem = 1;

let widthSlide = slide.offsetWidth;
let blockedBtn = false;

for (let dot of collectionDot){
	activeItem == Number(dot.dataset.value) ? dot.classList.add('active'):'';
}

function animationSlide(nextSlideWidth) {
	let start = Date.now();

	let timer = setInterval(function(){
		let timePassed = Date.now() - start;
		if (timePassed > timeout) {
			clearInterval(timer);
			return;
		}
		draw();
	},20);
	let addingToWidth = 10;
	let nextAdding = null;
	function draw(){
		if (nextAdding < widthSlide){
			nextAdding += addingToWidth;
			if (nextSlideWidth === 0){
				slides[0].style.transform = `translateX(-${slides[0].children.length * widthSlide + nextAdding})`;
				slides[0].style.transform = "translateX(0)";
			}else {
				slides[0].style.transform = `translateX(-${nextSlideWidth - widthSlide + nextAdding}px)`;
			}
		}
	}
}

prevBtn.addEventListener('click',(event)=> {
	let nextSlideWidth = currentFrame === 0 ? (slides[0].children.length -1)  * widthSlide : widthSlide * (currentFrame - 1);
	prevBtn.disabled = true;
	animationSlide(nextSlideWidth);
	setTimeout(function(){
		prevBtn.disabled = false;
	},500);
	activeItem <= 1 ? activeItem = 8 : activeItem--;
	for (let i of collectionDot) {
		debugger;
		i.classList.remove('active');
		activeItem == Number(i.dataset.value) ?  i.classList.add('active') : '';
	}
	for (let i of collectionDot) {
		i.dataset.value  === activeItem ? i.classList.add('active'): '';
	}
	if (currentFrame === 0){
		currentFrame = slides[0].children.length -1 ;
	}else {
		currentFrame--;
	}
})

nextBtn.addEventListener('click',(event)=> {
	let nextSlideWidth = currentFrame === slides[0].children.length - 1 ? 0 : widthSlide * (currentFrame + 1);
	nextBtn.disabled = true;
	animationSlide(nextSlideWidth);
	setTimeout(function(){
		nextBtn.disabled = false;
	},500);
	activeItem >= 8 ? activeItem = 1 : activeItem++;
	for (let i of collectionDot) {
		debugger;
		i.classList.remove('active');
		activeItem == Number(i.dataset.value) ?  i.classList.add('active') : '';
	}
	if (currentFrame === slides[0].children.length - 1){
		currentFrame = 0;
	}else {
		currentFrame++;
	}
})

for (let dot of collectionDot){
	dot.addEventListener('click',function(event) {
			debugger;
		for (let i = 0;i < dots[0].children.length;i++){
			dots[0].children[i].classList.remove('active')
		}
		event.target.tagName == 'BUTTON' ? event.target.classList.add('active'): '';
		let currentDot = event.target.dataset.value - 1;
		let offset = currentDot * widthSlide;
		currentFrame = currentDot;
		activeItem = currentDot + 1;
		animationSlide(offset);
	})
}