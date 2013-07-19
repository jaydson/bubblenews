(function () {
	var bubbleNews = function () {
		this.bubblesSizes = [80,120,180,200,250];
		this.zIndex = 0;

		this.getRandom = function (from, to) {
		    return Math.floor(Math.random() * (to - from + 1) + from);
		};

		this.toggleAnimation = function (toggle) {
			var elements = document.querySelectorAll('.bubble'),
				i = 0,
				elemLen = elements.length;
			if (toggle) {
				for (i; i < elemLen; i ++) {
					elements[i].setAttribute('class','bubble paused');
				}
			} else {
				for (i; i < elemLen; i ++) {
					elements[i].setAttribute('class','bubble');
				}
			}
		};

		this.showLayer = function () {
			var width = document.body.offsetWidth + 'px',
				height = document.body.offsetHeight + 'px',
				elem = document.querySelector('#layer');
			elem.style.width = width;
			elem.style.height = height;
			elem.style.display = 'block';
			elem.style.zIndex = this.zIndex + 1;
		};

		this.createBubble = function () {
			var that = this,
				element = document.createElement('div'),
				mainBubble = document.querySelector('#bubbles'),
				size = that.getRandom(50,280),
				animation = (Math.ceil(Math.random() * 2) === 1) ? 'moveUp' : 'moveDown',
				moveDownDuration = that.getRandom(10, 80) + 's',
				sideDuration = that.getRandom(2, 5) + 's',
				left = that.getRandom(-200, 300) + 'px',
				top = that.getRandom(-50, 500) + 'px',
				img = document.createElement('img');

			this.zIndex ++;
			img.src = 'http://p1.trrsf.com.br/image/get?src=http%3A%2F%2Fimages.terra.com%2F2013%2F04%2F05%2Fsolizstrongestafp.jpg&o=s&w=400';
			img.style.width = size - 10 + 'px';
			img.style.height = size - 10 + 'px';
			element.setAttribute('class','bubble');
			element.style.width = size + 'px';
			element.style.height = size + 'px';
			element.style.left = left;
			element.style.top = top;
			element.zIndex = this.zIndex;
			element.style.background = '#'+Math.floor(Math.random()*16777215).toString(16); // Credit >>> http://www.paulirish.com/2009/random-hex-color-code-snippets/
			element.style.MozAnimation = animation + ' ' + moveDownDuration + ' linear infinite, sideWays ' + sideDuration + ' ease-in-out infinite alternate';
			element.style.webkitAnimation = animation + ' ' + moveDownDuration + ' linear infinite, sideWays ' + sideDuration + ' ease-in-out infinite alternate';
			//element.style.opacity = 0.75;
			element.appendChild(img);

			element.addEventListener('click', function () {
				this.style.zIndex = that.zIndex + 1; //that.toggleAnimation(1);
				that.zIndex++;
				this.setAttribute('class','bubble paused');
				that.showLayer();
			});
			mainBubble.appendChild(element);
		};

		this.generate = function (bubbles) {
			var i = 0;
			for (i; i < bubbles; i ++) {				
				this.createBubble();
			}
		};
	};

	var bubble = new bubbleNews();
	bubble.generate(24);

}());
