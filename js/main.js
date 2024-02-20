import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/481d0aff35c46d05a5e716fa7c6da2bf/raw/2ed0e393726dd5eef8ee452952f7b5d174fb0bc8/article-preview-data.json';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardShareButtonTemplate = document.getElementById(
	'card-share-button-template'
);
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

	const cardTitleEl = cardEl.querySelector('.card__title');
	cardTitleEl.textContent = title;

	const cardDescEl = cardEl.querySelector('.card__desc');
	cardDescEl.textContent = description;

	const cardImageEl = cardEl.querySelector('.card__image img');
	cardImageEl.src = './images/' + image;
	cardImageEl.alt = image.substring(0, image.indexOf('.'));

	const cardAuthorImageEl = cardEl.querySelector('.card__author-img');
	cardAuthorImageEl.src = './images/' + author.image;
	cardAuthorImageEl.alt = author.name;

	const cardAuthorNameEl = cardEl.querySelector('.card__author-name');
	cardAuthorNameEl.textContent = author.name;

	const cardAuthorPostDateEl = cardEl.querySelector(
		'.card__author-post-date'
	);
	cardAuthorPostDateEl.textContent = author.postDate;

	const cardShareButtonsEl = cardEl.querySelector(
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

	removeLoading();
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
