document.addEventListener('DOMContentLoaded', () => {
	document.documentElement.classList.add('glitch-active');
	document.body.classList.add('is-entering');

	window.setTimeout(() => {
		document.body.classList.remove('is-entering');
		document.documentElement.classList.remove('glitch-active');
	}, 560);

	const links = document.querySelectorAll('a[href]');

	for (const link of links) {
		link.addEventListener('click', (event) => {
			if (event.defaultPrevented) {
				return;
			}

			if (link.target && link.target !== '_self') {
				return;
			}

			if (link.hasAttribute('download')) {
				return;
			}

			const href = link.getAttribute('href');
			if (!href || href.startsWith('#')) {
				return;
			}

			const url = new URL(link.href, window.location.href);
			if (url.origin !== window.location.origin) {
				return;
			}

			const sameDocument =
				url.pathname === window.location.pathname &&
				url.search === window.location.search;

			if (sameDocument) {
				return;
			}

			event.preventDefault();
			document.documentElement.classList.add('glitch-active');
			document.body.classList.add('is-leaving');

			window.setTimeout(() => {
				window.location.href = url.href;
			}, 420);
		});
	}
});