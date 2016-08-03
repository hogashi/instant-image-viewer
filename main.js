// main.js

HEAD = 1; // where it starts
TAIL = 300; // where it ends
num = HEAD; // where it is

htmltag = document.getElementsByTagName('html')[0];
titletag = document.getElementsByTagName('title')[0];
imgtag = document.getElementsByTagName('img')[0];
box = document.getElementsByTagName('textarea')[0];

var doLimit = (v) => { // map
	if(v < 1) {
		return 1;
	}
	else if(v > TAIL) {
		return TAIL;
	}
	return v;
};

var setImage = () => {
	imgtag.src = `img_${num}.jpg`;
	titletag.innerHTML = num;
};

(() => { // init
	htmltag.style.setProperty('height', '100%');
	imgtag.style = 'display: block; height: 100%;';
	setImage();
})();

box.addEventListener('keydown', (e) => { // page jump
	if(e.key == 'Escape') { // cancel
		e.preventDefault();
		box.value = '';
		box.style.setProperty('display', 'none');
	}
	if(e.key == 'Enter') {
		e.preventDefault();
		num = doLimit(parseInt(box.value, 10));
		setImage();
		box.value = '';
		box.style.setProperty('display', 'none');
	}
});

document.addEventListener('keydown', (e) => {
	switch(e.key) {
		case 'Home': // head
			e.preventDefault();
			num = HEAD;
			break;
		case 'End': // tail
			e.preventDefault();
			num = TAIL;
			break;
		case 'l': // forward
			e.preventDefault();
			num = doLimit(num + 1);
			break;
		case 'h': // backward
			e.preventDefault();
			num = doLimit(num - 1);
			break;
		case 'o': // window-size <--> original
			e.preventDefault();
			if(htmltag.style.getPropertyValue('height') == '100%') {
				htmltag.style.setProperty('height', '');
			}
			else {
				htmltag.style.setProperty('height', '100%');
			}
			break;
		case 'j': // page jump
			e.preventDefault();
			box.style.setProperty('display', 'block');
			box.focus();
			break;
		default:
			return;
	}
	setImage(); // update
});
