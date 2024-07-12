/* 生物種族的 active */
$('#race a').on('click', function () {
	// 先清掉 9 個種族的 active 狀態
	$('#race a').removeClass('active')
	// 再為點選的那個種族加上 active
	$(this).addClass('active')
})

/* swiper -------------------------------- */
const swiper = new Swiper('#swiper', {
	// 基礎設定
	direction: 'horizontal',
	loop: true,
	speed: 1000,
	slidesPerView: 1,
	spaceBetween: 10,
	autoplay: {
		delay: 1000000
	},

	// 效果 coverflow
	effect: 'coverflow',
	centeredSlides: true,
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true
	},

	// 哪個斷點顯示幾張
	breakpoints: {
		576: {
			slidesPerView: 2
		},
		768: {
			slidesPerView: 3
		},
		920: {
			slidesPerView: 3
		},
		1200: {
			slidesPerView: 4
		}
	},

	// 分頁
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: false,
		clickable: true
	},

	// 上一張、下一張
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
})

// GSAP --------------------------------------------------------------------------------------------------------
// 註冊 plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText)

// ScrollToPlugin -----------------------------------------------------------------------------------------------
// 這個 plugin 用途是點選連結，滑動至該區塊的位置動畫
$('#navbar .main-link, .backtop a').each(function (index, link) {
	$(this).on('click', function (e) {
		e.preventDefault()
		if ($(this).attr('href') === '#section04' || $(this).attr('href') === '#section05') {
			gsap.to($(window), {
				scrollTo: {
					y: `#section0${index + 1}`
				},
				duration: 1.5,
				ease: 'back.inOut'
			})
		} else {
			gsap.to($(window), {
				scrollTo: {
					y: `#section0${index + 1}`,
					offsetY: 150 // 位移
				},
				duration: 1.5,
				ease: 'back.inOut'
			})
		}
	})
})
// 流星 ---------------------------------------------------------------------------------------------------------
// 管道模式，可以設定一系列的流程，將函式的結果 return 給下一個函式，當作參數接收使用
/*
func1 --> return x
func2 <-- x
func2 --> return y
func3 <-- y
func3 --> return z
*/

// 將流星動畫拆成三個步驟
// 1. 創建流星數目
function createStar(starNumber) {
	for (let i = 0; i < starNumber; i++) {
		$('.shooting_star').append('<div class="star"></div>')
	}
	const stars = gsap.utils.toArray('.star')
	return stars
}

// 2. 設定流星補間動畫預設值
function setStarTween(stars) {
	// console.log(stars)
	gsap.set('.shooting_star', {
		perspective: 100
	})
	stars.forEach(function (star, index) {
		gsap.set(star, {
			transformOrigin: '0 50%', // '預設 50% 50% => 0 50%'
			position: 'absolute',
			left: gsap.utils.random($(window).width() / 2, $(window).width() * 2),
			top: gsap.utils.random(-100, -200),
			rotation: -25
		})
	})
	return stars
}

// 3. 執行流星動畫
function playStarTimeline(stars) {
	const tl = gsap.timeline({
		repeat: -1
	})
	tl.to(stars, {
		x: `-=${$(window).width() * 1.5}`,
		y: `+=${$(window).height() * 1.5}`,
		z: 'random(-100, 500)',
		stagger: function (index, target, star) {
			// 第三參數設定為 1，表示取整數
			return gsap.utils.random(index + 5, (index + 5) * 2, 1)
		},
		duration: 'random(0.5, 3, 0.1)',
		ease: 'none'
	})
}

// 回傳一個函式
const playStar = gsap.utils.pipe(createStar, setStarTween, playStarTimeline)
playStar(30) // 30 是創建流星的數目

// ScrollTrigger 滾動控制 ----------------------------------------------------------------------------------------
// backtop 回頂端顯示隱藏
gsap.to('.backtop', {
	scrollTrigger: {
		trigger: '#footer',
		start: 'top bottom',
		end: '100% bottom',
		toggleActions: 'play none none reverse'
		// markers: true
	},
	display: 'block',
	opacity: 1,
	duration: 1
})

// 導覽列收合 ------------------------------------------------------------------------------------------------------
gsap.from('#navbar', {
	yPercent: -100, // -100%
	duration: 0.5,
	// paused: true,
	scrollTrigger: {
		start: 'top 60',
		// end: () => '+=' + $(document).height(),
		end: () => '+=' + document.documentElement.scrollHeight,
		onEnter(self) {
			// console.log(self.animation)
			self.animation.play() // self 指的是 scrollTrigger，它身上被綁定了很多屬性，其中 animation 指的是該補間動畫，也就是我們的導覽列
		},
		// scrollTrigger 範圍內更新時會呼叫的函式
		onUpdate(self) {
			// console.log(self.direction)
			self.direction === -1 ? self.animation.play() : self.animation.reverse()
		},
		markers: false
	}
})

// 導覽列 active 位置
$('.main-link').each(function (index, link) {
	let href = $(link).attr('href')
	// console.log(href)
	gsap.to(link, {
		scrollTrigger: {
			trigger: `${href}`,
			start: 'top center',
			end: 'bottom center',
			toggleClass: {
				targets: link,
				className: 'active'
			}
			// markers: true
		}
	})
})

// 視差效果 -------------------------------------------------------------------------------------------------------------------------
// 星空背景
gsap.to('body', {
	scrollTrigger: {
		trigger: 'body',
		start: 'top 0%',
		end: 'bottom 0%',
		scrub: 5
	},
	backgroundPosition: '50% 100%',
	ease: 'none'
})

// 浮空島
// 建立一個時間軸，用來放置三座島的進場動畫
const float_tl = gsap.timeline({
	scrollTrigger: {
		trigger: 'body',
		start: 'top 100%',
		end: 'bottom 100%',
		scrub: 5
	},
	ease: 'none'
})

float_tl
	.from('.float-wrap-01', {
		left: '-30%'
	})
	.from(
		'.float-wrap-02',
		{
			right: '-30%'
		},
		'<'
	)
	.from(
		'.float-wrap-03',
		{
			bottom: '-100%'
		},
		'<'
	)

// 浮空島本身上下移動動畫
$('.float-island').each(function (index, island) {
	gsap.to(island, {
		y: 50 * (index + 1),
		duration: 10 * (index + 1),
		repeat: -1,
		yoyo: true,
		ease: 'power1.inOut'
	})
})

// 霧
$('.fog').each(function (index, fog) {
	// gsp.set() 設定一個補間動畫的初始預設值
	gsap.set(fog, {
		width: '100%',
		height: '100%',
		background: `url(./images/fog.png) no-repeat center/80%`,
		opacity: 1,
		position: 'absolute',
		top: 'random(0, 100)' + '%',
		// 將偶數雲丟到畫面左側外面，奇數雲丟到畫面右側外面
		x: function () {
			return index % 2 === 0 ? -$(window).width() : $(window).width()
		}
	})
	gsap.to(fog, {
		// 偶數雲從左側跑到右側，奇數雲從右側跑到左側
		x: function () {
			return index % 2 === 0 ? $(window).width() : -$(window).width()
		},
		// 重複播放時，重新設定雲的 top 位置
		onRepeat() {
			$(fog).css({
				top: gsap.utils.random(0, 100) + '%'
			})
		},
		repeat: -1,
		duration: 60,
		ease: 'none'
	})
})

// SplitText 文字動畫 ---------------------------------------------------------------------------------------------------
gsap.set('#splitText', {
	perspective: 400
})

const tl = gsap.timeline({
	repeat: -1,
	repeatDelay: 8
})

const paragraphs = gsap.utils.toArray('#splitText p')
console.log(paragraphs) // [p, p, p, p, p]

const splitTexts = paragraphs.map(function (p) {
	return new SplitText(p, {
		charsClass: 'charBg'
	})
})

// 這是一個二維陣列
console.log(splitTexts) // 新陣列放 SplitText => [SplitText,SplitText,SplitText,SplitText,SplitText]

splitTexts.forEach(function (splitText) {
	const chars = splitText.chars
	gsap.set('#splitText', {
		display: 'flex'
	})
	// 進場動畫
	tl.from(
		chars,
		{
			y: 80,
			rotationX: 0,
			rotationY: 180,
			scale: 2,
			transformOrigin: '0% 50% -100',
			opacity: 0,
			ease: 'back',
			stagger: 0.1,
			duration: 2,
			// 離場動畫
			onComplete() {
				gsap.to(chars, {
					delay: 3,
					duration: 2,
					opacity: 0,
					scale: 2,
					y: 80,
					rotationX: 180,
					rotationY: 0,
					transformOrigin: '0% 50% -100',
					ease: 'back',
					stagger: 0.1,
					duration: 2
				})
			}
		},
		'+=3' // 下一組動畫延遲 3 秒進場，才會接在上一組動畫離場的後面
	)
})
