import * as myFunctions from "./modules/functions.js";
myFunctions.isWebp();
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
myFunctions.DynamicAdapt("max");

const RATINGS = document.querySelectorAll(".rating");
const CATALOG_CATEGORIES = document.querySelectorAll(".catalog__swiper");

if (CATALOG_CATEGORIES.length > 0) {
	catalogSlidesGenerator();
}

// Инициализация обработки звездных рейтингов, если присутствуют
if (RATINGS.length > 0) {
	ratingsInit();
};

// Активация мобильного навбара
if (window.innerWidth < 769) {
	adaptiveNavBar();
};

if (window.location.hash) {
	document.getElementById(window.location.hash.slice(1)).classList.add("category--active");
	document.querySelector(".category[href*=" + "'" + window.location.hash + "'" + "]").classList.add("category--active-tab");
	catalogSlidesGenerator();
};

// Инициализация табов
tabsInit();

// Отключает рендер пустых "хлебных крошек"
breadcrumbs();

// Инициализация адаптивных слайдеров
//сдесь функция swiperDA убирает класс siper-slide из айтемов в каталоге
slidesInit();

toggleEmbed();


window.onresize = () => {
	slidesInit();
	adaptiveNavBar();

	if (CATALOG_CATEGORIES.length > 0) {
		catalogSlidesGenerator();

		if (window.matchMedia("(max-width: 768px)").matches) {
			FILTERS.toggleTrigger.addEventListener("click", toggleFilters);
		} else { FILTERS.toggleTrigger.removeEventListener("click", toggleFilters) }
	}
};


//Слайдер Swiper
const BANNER_SWIPER = new Swiper('.banners__swiper', {

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		//Буллеты (default)
		type: 'bullets',
		clickable: true,
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	// Управление клавиатурой
	keyboard: {
		// Вкл/выкл
		enabled: true,
		// Вкл/выкл только когда в поле зрения
		onlyInViewport: true,
		// Вкл/выкл стрелки вверх/вниз
		pageUpDown: true,
	},

	// Автопрокрутка
	autoplay: {
		// Пауза между прокруткой
		delay: 5000,
		// Закончить на последнем слайде
		stopOnLastSlide: false,
		// Откл после ручного переключения
		disableOnInteraction: false,
	},

	// Вкл/выкл перетаскивание на ПК
	simulateTouch: false,
	// Кол-во слайдов для показа (принимает дробные числа)
	slidesPerView: 1,
	// Откл функционала если слайдов меньше чем нужно
	watchOverflow: true,
	// Скорость перекл слайдов
	speed: 800,

	// Откл предзагрузку картинок
	// (для картинок class='swiper-lazy', путь к изображению в атрибут)
	// (data-src="", для самого src="img/1x1.png" заглушка)
	preloadImages: false,
	// Lazy loading
	lazy: {
		// Подгружать на старте переключения слайда
		loadOnTransitionStart: false,
		// Подгрузить пред и след картинки
		loadPrevNext: true,
	},

	// Обновить слайдер при изменении его элементов
	observer: true,
	// Обновить при изменении родительских элементов
	observeParents: true,
	// Обновить при изменении дочерних элементов
	observeSlideChildren: true,

	// Доступность (в имени объекта 2 цифры 1, а не буквы L)
	a11y: {
		// Вкл/выкл доступность
		enabled: true,
		// Сообщения
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
		paginationBulletMessage: 'Go to slide {{index}}',
		notificationClass: 'swiper-notification',
		containerMessage: '',
		containerRoleDescriptionMessage: '',
		itemRoleDescriptionMessage: '',
		// и т.д.
	},
});

const CATEGORY_SWIPER = new Swiper('.categories__swiper', {
	loop: true,
	// Navigation arrows
	navigation: {
		nextEl: '.categories__swiper-button-next',
		prevEl: '.categories__swiper-button-prev',
	},

	// Управление клавиатурой
	keyboard: {
		// Вкл/выкл
		enabled: true,
		// Вкл/выкл только когда в поле зрения
		onlyInViewport: true,
		// Вкл/выкл стрелки вверх/вниз
		pageUpDown: true,
	},

	// Вкл/выкл перетаскивание на ПК
	simulateTouch: false,
	// Кол-во слайдов для показа (принимает дробные числа)
	slidesPerView: 1,
	// Откл функционала если слайдов меньше чем нужно
	watchOverflow: true,
	// Скорость перекл слайдов
	speed: 800,

	// Обновить слайдер при изменении его элементов
	observer: true,
	// Обновить при изменении родительских элементов
	observeParents: true,
	// Обновить при изменении дочерних элементов
	observeSlideChildren: true,

	// Доступность (в имени объекта 2 цифры 1, а не буквы L)
	a11y: {
		// Вкл/выкл доступность
		enabled: true,
		// Сообщения
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
		paginationBulletMessage: 'Go to slide {{index}}',
		notificationClass: 'swiper-notification',
		containerMessage: '',
		containerRoleDescriptionMessage: '',
		itemRoleDescriptionMessage: '',
		// и т.д.
	},
});

const ITEM_SWIPER = new Swiper('.cards__swiper', {
	// Navigation arrows
	navigation: {
		nextEl: '.cards__swiper-button-next',
		prevEl: '.cards__swiper-button-prev',
	},

	// Управление клавиатурой
	keyboard: {
		// Вкл/выкл
		enabled: true,
		// Вкл/выкл только когда в поле зрения
		onlyInViewport: true,
		// Вкл/выкл стрелки вверх/вниз
		pageUpDown: true,
	},

	// Вкл/выкл перетаскивание на ПК
	simulateTouch: false,
	// Кол-во слайдов для показа (принимает дробные числа)
	slidesPerView: 1,
	// Откл функционала если слайдов меньше чем нужно
	watchOverflow: true,
	// Скорость перекл слайдов
	speed: 800,

	// Обновить слайдер при изменении его элементов
	observer: true,
	// Обновить при изменении родительских элементов
	observeParents: true,
	// Обновить при изменении дочерних элементов
	observeSlideChildren: true,

	// Доступность (в имени объекта 2 цифры 1, а не буквы L)
	a11y: {
		// Вкл/выкл доступность
		enabled: true,
		// Сообщения
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
		paginationBulletMessage: 'Go to slide {{index}}',
		notificationClass: 'swiper-notification',
		containerMessage: '',
		containerRoleDescriptionMessage: '',
		itemRoleDescriptionMessage: '',
		// и т.д.
	},
});

const CATALOG_SWIPER = new Swiper('.catalog__swiper', {
	loop: false,
	// Navigation arrows
	navigation: {
		nextEl: '.catalog__swiper-button-next',
		prevEl: '.catalog__swiper-button-prev',
	},

	pagination: {
		el: '.catalog__swiper-pagination',
		//Буллеты (default)
		type: 'bullets',
		clickable: true,
		dynamicBullets: true,
		//кастомные буллеты
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	},

	// Откл свайп
	allowTouchMove: false,
	simulateTouch: false,
	// Откл функционала если слайдов меньше чем нужно
	watchOverflow: false,
	// Скорость перекл слайдов
	speed: 300,
	autoHeight: false,
	spaceBetween: 30,
	slidesPerView: 1,
	/* slidesPerGroup: 12,
	grid: {
		fill: "row",
		rows: 3,
	}, */

	/* breakpoints: {
		320: {
			slidesPerView: 6,
			spaceBetween: 30,
			slidesPerGroup: 6,
		},
		480: {

		},
		992: {
			slidesPerView: 12,
			spaceBetween: 40,
			slidesPerGroup: 12,
		},
	}, */

	// Lazy loading
	preloadImages: false,
	lazy: {
		// Подгружать на старте переключения слайда
		loadOnTransitionStart: false,
		// Подгрузить пред и след картинки
		loadPrevNext: true,
	},
	// Следить за видимыми (вкл когда slidesPerView: auto/>1)
	watchSlidesProgress: true,
	// Добавлять класс видимым
	watchSlidesVisibility: true,

	// Обновить слайдер при изменении его элементов
	//observer: true,
	// Обновить при изменении родительских элементов
	//observeParents: true,
	// Обновить при изменении дочерних элементов
	//observeSlideChildren: true,

	// Доступность (в имени объекта 2 цифры 1, а не буквы L)
	a11y: {
		// Вкл/выкл доступность
		enabled: true,
		// Сообщения
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
		paginationBulletMessage: 'Go to slide {{index}}',
		notificationClass: 'swiper-notification',
		containerMessage: '',
		containerRoleDescriptionMessage: '',
		itemRoleDescriptionMessage: '',
		// и т.д.
	},
});

// Инициализация генератора страниц товара
// функция запускается автоматически, вызывать ее не нужно
function catalogSlidesGenerator() {
	// Проходим по всем категориям
	for (let index = 0; index < CATALOG_CATEGORIES.length; index++) {
		const category = CATALOG_CATEGORIES[index];
		// Запускаем генератор для активной категории
		category.classList.contains("category--active") ? categorySlidesGenerator(category) : null;
	}
};

// Генерирует страницы товара в каталоге в соответствии с кол-вом товаров
function categorySlidesGenerator(category) {
	const wrapper = category.querySelector(".swiper-wrapper");
	const items = category.querySelectorAll(".item");
	// Количество отображаемых айтемов
	let itemsPerSlide;
	// Если ширина экрана больше 991px показывает 12 айтемов, если меньше - 6
	window.screen.width > 768 ? itemsPerSlide = 12 : itemsPerSlide = 6;
	let i = 0;
	let nodes = Array.from(wrapper.children);
	let slides = nodes.filter((el) => { return el.classList.contains("swiper-slide") });
	if (slides.length < 1) {
		// Создаем необходимое кол-во страниц
		for (let index = 0; index < (items.length / itemsPerSlide); index++) {
			let newSlide = document.createElement('div');
			newSlide.classList.add("swiper-slide", "catalog__swiper-slide");
			wrapper.append(newSlide);
			// Добавляем на каждую страницу соответствующее кол-во айтемов
			for (let index = 0; index < itemsPerSlide; index++) {
				const item = items[i];
				item != undefined ? newSlide.append(item) : null;
				i++;
			};
		};
	} else {
		for (let index = 0; index < items.length; index++) {
			const item = items[index];
			item != undefined ? wrapper.append(item) : null;
		};
		for (let index = 0; index < slides.length; index++) {
			const slide = slides[index];
			wrapper.removeChild(slide);
		};
		catalogSlidesGenerator(category);
	};
};

function breadcrumbs() {
	const crumbs = document.querySelectorAll(".crumb");
	for (let index = 0; index < crumbs.length; index++) {
		const crumb = crumbs[index];
		if (!crumb.innerHTML) {
			crumb.style.display = "none";
		};
	};
};

function slidesInit() {
	const banners = document.querySelectorAll(".banners__item");
	const categories = document.querySelectorAll(".categories__list-item");
	const items = document.querySelectorAll(".item");
	const reviews = document.querySelectorAll(".reviews__review");
	swiperDynamicAdapt(banners, 992);
	swiperDynamicAdapt(categories, 768);
	swiperDynamicAdapt(items, 768);
	swiperDynamicAdapt(reviews, 768);
};

function swiperDynamicAdapt(arr, num) {
	for (let index = 0; index < arr.length; index++) {
		const item = arr[index];
		if (item.hasAttribute("data-da")) {
			if (window.matchMedia(`(max-width: ${num}px)`).matches) {
				item.classList.add("swiper-slide");
			} else {
				item.classList.remove("swiper-slide");
				item.removeAttribute("style");
			}
		}
	}
};

function tabsSwitch(nav, content, navClass, contentClass) {
	//Обработка нажатия табов
	nav.forEach(element => {
		element.addEventListener("click", function (e) {
			e.preventDefault();
			// Узнаем адрес ссылки без # для сопоставления с id таба
			let index = e.target.getAttribute('href').indexOf("#");
			let target = e.target.getAttribute('href').slice(index + 1);
			// Узнаем адрес для перенаправления
			let targetPage = e.target.getAttribute('href').slice(e.target.getAttribute('href').lastIndexOf("/"))/* .slice(1, index - 1) */;
			let currentPage = window.location.href.slice(window.location.href.lastIndexOf("/"));
			// Перенаправление на соответствующую страницу
			if (
				// Если адрес текущей страницы не совпадает с адресом цели
				currentPage.slice(1, index - 1) != targetPage.slice(1, index - 1)
				&&
				// И если у цели есть адрес, не считая id
				targetPage.slice(1, index - 1).length > 0
			) {
				// Переадресация
				window.location.replace(e.target.getAttribute('href'));
			};
			//Добавляет нажатому табу класс для выделения
			chooseTab(e, target);
			//Показывает блок контента соответствующий табу
			toggleTab(target);
			if (CATALOG_CATEGORIES.length > 0) {
				catalogSlidesGenerator();
			};
		})
	})

	//Добавляет нажатому табу класс для выделения
	function chooseTab(e, target) {
		document.querySelectorAll(`.${navClass}`).forEach(element => {
			element.classList.remove(`${navClass}`);
		});
		if (e.target.getAttribute('href').slice(1) === target) {
			e.target.classList.add(`${navClass}`);
		} else {
			document.querySelectorAll(".category").forEach(el => {
				if (el.getAttribute('href').slice(1) === target) {
					el.classList.add(`${navClass}`);
				}
			})
		}
	}

	//Показывает блок контента соответствующий табу
	function toggleTab(target) {
		content.forEach(element => { element.classList.remove(`${contentClass}`) });
		for (let i = 0; i < content.length; i++) {
			if (content[i].getAttribute('id') === target) {
				content[i].classList.add(`${contentClass}`);
			}
		}
	}
};

function tabsInit() {
	// Табы, главная
	const indexSwitchers = document.querySelectorAll(".tabs__nav-item");
	// Контент, главная
	const indexTabs = document.querySelectorAll(".tabs__block");
	// Список категорий
	const categoriesNav = document.querySelectorAll(".category");
	// Категории
	const categories = document.querySelectorAll(".catalog__swiper");
	// 
	const navCategories = document.querySelectorAll(".nav__list-item");

	tabsSwitch(indexSwitchers, indexTabs, "chosen", "target");
	tabsSwitch(categoriesNav, categories, "category--active-tab", "category--active");
	tabsSwitch(navCategories, categories, "category--active-tab", "category--active");
};

function ratingsInit() {
	let ratingActive, ratingValue;
	// Обработка всех рейтингов на странице
	for (let index = 0; index < RATINGS.length; index++) {
		const rating = RATINGS[index];
		initRating(rating);
	}

	// Инициализация конкретного рейтинга
	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		setRating(rating);
	}

	// Инициализация переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector(".rating__active");
		ratingValue = ratingActive.dataset.value;
	}

	// Изменение ширины активных звезд
	function setRatingActiveWidth(index = ratingValue) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}

	// Возможность поставить оценку
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll(".rating-input");
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener("mouseenter", function (e) {
				initRatingVars(rating);
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener("mouseleave", function (e) {
				setRatingActiveWidth();
			});
			ratingItem.addEventListener("click", function (e) {
				rating.querySelector(".rating__active").dataset.value = ratingItem.value;
				initRatingVars(rating);
				setRatingActiveWidth(ratingItem.value);

				if (rating.dataset.ajax) {
					setRatingValue(ratingItem.value, rating);
				} else {
					ratingValue = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}

	// Обработка при отправке на сервер
	async function setRatingValue(value, rating) {
		if (!rating.classList.contains('rating__sending')) {
			rating.classList.add('rating__sending');

			// Отправка данных (value) на сервер
			let response = await fetch('rating.json', {
				method: 'GET',

				// Для отправки на реальный сервер раскомментировать
				/* body: JSON.stringify({
					userRating: value
				}),
				headers: {
					'content-type': 'application/json'
				} */
			});
			if (response.ok) {
				const result = await response.json();

				// Получение нового рейтинга
				const newRating = result.newRating;

				// Вывод нового среднего результата
				ratingValue = newRating;

				// Обновление активных звезд
				setRatingActiveWidth();

				rating.classList.remove('rating__sending');
			} else {
				alert('Ошибка');

				rating.classList.remove('rating__sending');
			}
		}
	}
};

function adaptiveNavBar() {
	const navBar = document.querySelector(".nav__list");
	navBar.onclick = () => {
		navBar.classList.toggle("nav__list_open");
	};
};

function toggleEmbed() {
	const targets = document.querySelectorAll(".filters__list-item");
	for (let index = 0; index < targets.length; index++) {
		const target = targets[index];
		target.addEventListener("click", function (e) {
			e.target.classList.toggle("opened");
		});
	};
};


const FILTERS = document.querySelector(".catalog__filters");
if (FILTERS) {
	FILTERS.price = FILTERS.querySelectorAll(".filters__price input");
	FILTERS.price.output = {};
	FILTERS.price.output.min = FILTERS.querySelector(".filters__price-value_min");
	FILTERS.price.output.max = FILTERS.querySelector(".filters__price-value_max");
	FILTERS.toggleTrigger = FILTERS.querySelector(".catalog__caption");
	FILTERS.fill = FILTERS.querySelector(".slider__fill");
	catalogFiltersInit();
}

function toggleFilters() {
	FILTERS.parentElement.classList.toggle("catalog__customization_opened");
}
// Инициализация фильтров каталога
function catalogFiltersInit() {
	// При вводе цены на слайдере выводит минимальное и максимальное значение фильтра
	function showPriceValues() {
		/* FILTERS.price.output.min.innerHTML = Math.min(parseInt(FILTERS.price[0].value), parseInt(FILTERS.price[1].value)); */
		/* FILTERS.price.output.max.innerHTML = Math.max(parseInt(FILTERS.price[0].value), parseInt(FILTERS.price[1].value)); */
		let minVal = Math.min(parseInt(FILTERS.price[0].value), parseInt(FILTERS.price[1].value));
		let maxVal = Math.max(parseInt(FILTERS.price[0].value), parseInt(FILTERS.price[1].value));
		FILTERS.price.output.min.innerHTML = minVal;
		FILTERS.price.output.max.innerHTML = maxVal;
		FILTERS.fill.style.left = `${(minVal / FILTERS.price[0].max) * 100}%`;
		FILTERS.fill.style.right = `${100 - (maxVal / FILTERS.price[0].max) * 100}%`;
	};
	showPriceValues();
	FILTERS.price.forEach(element => {
		element.addEventListener("input", showPriceValues)
	});

	if (window.matchMedia("(max-width: 768px)").matches) {
		FILTERS.toggleTrigger.addEventListener("click", toggleFilters);
	}
};