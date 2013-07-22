(function () {

	var bubbleNews = function () {
		this.bubblesSizes = [80,120,180,200,250];
		this.zIndex = 0;

		this.getNews = function () {
			return [
				{
					id : 1,
					title : 'Partidas estão mais intuitivas, diz produtor brasileiro de Fifa 14',
					content : 'Todo ano, perto do início do segundo semestre, a indústria dos games começa a se alvoroçar com a apresentação eminente de Fifa e PES, os dois principais simuladores de futebol do mercado. Em um campo onde a perfeição e realismo são as principais táticas para ganhar a preferência dos gamers, a busca por inovações mecânicas e gráficas é uma missão cotidiana das equipes da EA Sports e Konami. E isso não é uma tarefa fácil, nem muito menos rápida.',
					img : 'http://p2.trrsf.com.br/image/fget/cf/2205/1653/6/21/407/305/images.terra.com/2013/07/19/fifa-giliard01.jpg'
				},
				{
					id : 2,
					title : 'Ex-deputada pega 5 anos por recrutar mulheres para festas de Berlusconi',
					content : 'Um tribunal italiano emitiu nesta sexta-feira sentença para três associados do ex-premiê italiano Silvio Berlusconi após eles terem sido condenados por auxílio e cumplicidade com prostituição ao procurarem garotas para terem sexo pago com o político. Entre os condenados, está Nicole Minetti, ex-dentista que entrou na política sob a tutela do ex-premiê. Minetti, 28 anos, é uma celebridade de televisão que foi eleita conselheira regional da Lombardia em 2010 pelo Povo da Liberdade (PDL), partido de Berlusconi, e ocupou o cargo até 2012. Ela foi sentenciada a cinco anos de prisão por recrutar garotas de programa para as chamadas festas de "bunga bunga" promovidas pelo ex-premiê. A promotoria também a acusava de ter realizado sexo pago nestes eventos. Ela nega todas as acusações.',
					img : 'http://p2.trrsf.com.br/image/fget/cf/619/464/images.terra.com/2013/07/19/nicoleminetti8rts.jpg'
				},
				{
					id : 3,
					title : 'Marquezine reforça "time de belas" do Barcelona; veja fotos',
					content : 'Maior contratação do Barcelona para a temporada, Neymar não levará apenas seu talento ao clube catalão. A atriz Bruna Marquezine, namorada do craque, entrará na lista das belas conquistas amorosas dos jogadores do time espanhol, que já contava com a famosa cantora Shakira entre outras beldades; veja fotos a seguir',
					img : 'http://p2.trrsf.com.br/image/fget/cf/308/464/images.terra.com/2013/07/17/brunamarquezineneymartvglobodiv.jpg'
				},
				{
					id : 4,
					title : 'Dubai condena à prisão norueguesa que denunciou estupro',
					content : 'Um tribunal de Dubai, nos Emirados Árabes Unidos, condenou uma empresária norueguesa a 16 meses de prisão por ter relações sexuais fora do casamento após ela denunciar ter sido estuprada, informa o jornal americano USA Today, que cita agênciade notícias árabes. Marte Deborah Dalelv, que teria entre 24 e 25 anos, foi condenada na quarta-feira. Ela também foi considerada culpada de perjúrio e por ter ingerido bebidas alcóolicas, o que é proibido neste país islâmico. ',
					img : 'http://p2.trrsf.com.br/image/fget/cf/301/401/images.terra.com/2013/07/19/norueguesa-condenada-dubai-afp.jpg'
				}
			];
		};

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

		this.showLayer = function (settings) {
			var width = (document.body.offsetWidth - 30) + 'px',
				height = (document.body.offsetHeight- 45) + 'px',
				elem = document.querySelector('#layer'),
				title = document.querySelector('#news_title'),
				container = document.querySelector('#news_container');
			container.innerHTML = settings.content;
			title.innerHTML = settings.title;			
			elem.style.height = height;
			elem.style.display = 'block';
			elem.style.zIndex = this.zIndex + 1;
		};

		this.createBubble = function (settings) {
			var that = this,
				element = document.createElement('div'),
				mainBubble = document.querySelector('#bubbles'),
				size = that.getRandom(50,280),
				animation = (Math.ceil(Math.random() * 2) === 1) ? 'moveUp' : 'moveDown',
				moveDownDuration = that.getRandom(10, 80) + 's',
				sideDuration = that.getRandom(2, 5) + 's',
				left = that.getRandom(-100, 300) + 'px',
				top = that.getRandom(-50, 500) + 'px',
				img = document.createElement('img');

			this.zIndex ++;
			img.src = settings.img;
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
			element.appendChild(img);

			element.addEventListener('click', function () {
				this.style.zIndex = that.zIndex + 1; //that.toggleAnimation(1);
				that.zIndex++;
				//this.setAttribute('class','bubble paused');
				that.showLayer(settings);
			});
			mainBubble.appendChild(element);
		};

		this.addListeners = function () {
			var closeButton = document.querySelector('#close'),
				layer = document.querySelector('#layer');
			closeButton.addEventListener('click', function () {
				layer.style.display = 'none';
			});
		};

		this.generate = function () {
			var i = 0,
			news = this.getNews();
			for (i; i < news.length; i ++) {				
				this.createBubble(news[i]);
			}
			this.addListeners();
		};
	};

	var bubble = new bubbleNews();
	bubble.generate();

}());
