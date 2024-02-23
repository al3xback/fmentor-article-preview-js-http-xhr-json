import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/481d0aff35c46d05a5e716fa7c6da2bf/raw/2ed0e393726dd5eef8ee452952f7b5d174fb0bc8/article-preview-data.json';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardImageTemplate = document.getElementById('card-image-template');
const cardShareButtonTemplate = document.getElementById(
	'card-share-button-template'
);
const cardContentTemplate = document.getElementById('card-content-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const { title, description, image, author, socialLinks } = JSON.parse(data);

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	/* [card image] */
	const cardImageTemplateNode = document.importNode(
		cardImageTemplate.content,
		true
	);
	const cardImageEl = cardImageTemplateNode.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = image.substring(0, image.indexOf('.'));

	/* [card content] */
	const cardContentTemplateNode = document.importNode(
		cardContentTemplate.content,
		true
	);
	const cardContentEl =
		cardContentTemplateNode.querySelector('.card__content');

	const cardTitleEl = cardContentEl.querySelector('.card__title');
	cardTitleEl.textContent = title;

	const cardDescriptionEl = cardContentEl.querySelector('.card__desc');
	cardDescriptionEl.textContent = description;

	const cardAuthorImageEl = cardContentEl.querySelector('.card__author-img');
	cardAuthorImageEl.src = './images/' + author.image;
	cardAuthorImageEl.alt = author.name;

	const cardAuthorNameEl = cardContentEl.querySelector('.card__author-name');
	cardAuthorNameEl.textContent = author.name;

	const cardAuthorPostDateEl = cardContentEl.querySelector(
		'.card__author-post-date'
	);
	cardAuthorPostDateEl.textContent = author.postDate;

	const cardShareButtonsEl = cardContentEl.querySelector(
		'.card__share-action-buttons'
	);

	for (const socialLink of socialLinks) {
		const { name, url } = socialLink;

		const cardShareButtonTemplateNode = document.importNode(
			cardShareButtonTemplate.content,
			true
		);
		const cardShareButtonEl =
			cardShareButtonTemplateNode.querySelector('a');
		cardShareButtonEl.href = url;
		cardShareButtonEl.title = 'Share on ' + name.toLowerCase();

		const cardShareButtonIconEl = cardShareButtonEl.querySelector('i');
		cardShareButtonIconEl.className = 'icon-' + name.toLowerCase();

		cardShareButtonsEl.appendChild(cardShareButtonTemplateNode);
	}

	/* [init] */
	removeLoading();
	cardEl.appendChild(cardImageTemplateNode);
	cardEl.appendChild(cardContentTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
