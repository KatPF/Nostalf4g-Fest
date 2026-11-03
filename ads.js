(() => {
    const ads = [
        {
            src: 'Ads/Love-meet.net-GTAIV-WebBanner.webp',
            alt: 'Anuncio retro de Love Meet.net para Grand Theft Auto IV'
        },
        {
            src: 'Ads/LoveMeet-GTAIVOfficialWebsite-Menu.webp',
            alt: 'Captura retro del sitio oficial de Love Meet para Grand Theft Auto IV'
        },
        {
            src: 'Ads/grande-july3p-v0-9y0070vzsv7b1.webp',
            alt: 'Grande July 3P, un anuncio de la época de los 2000s'
        },
        {
            src: 'Ads/period-memardo.png',
            alt: '¿Y ese Ad de virgo, Momo?'
        },
        {
            src: 'Ads/iphone5.png',
            alt: 'Ganá gratis un iPhone 5'
        },
        {
            src: 'Ads/ad.png',
            alt: 'Anuncio retro de internet'
        },
        {
            src: 'Ads/mundogaturro.jpg',
            alt: 'Anuncio de Mundo Gaturro'
        },
        {
            src: 'Ads/biblia-online.jpg',
            alt: 'Anuncio de Biblia Online'
        }
    ];

    document.querySelectorAll('.anuncio-publicitario img').forEach((image) => {
        const ad = ads[Math.floor(Math.random() * ads.length)];
        image.src = ad.src;
        image.alt = ad.alt;
    });
})();
