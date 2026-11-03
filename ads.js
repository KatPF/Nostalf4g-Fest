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
            alt: 'Publicidad retro de internet'
        },
        {
            src: 'Ads/period-memardo.png',
            alt: 'Imagen publicitaria retro de internet'
        },
        {
            src: 'Ads/iphone5.png',
            alt: 'Anuncio retro de iPhone 5 con un teléfono como premio'
        },
        {
            src: 'Ads/ad.png',
            alt: 'Anuncio retro de internet'
        }
    ];

    document.querySelectorAll('.anuncio-publicitario img').forEach((image) => {
        const ad = ads[Math.floor(Math.random() * ads.length)];
        image.src = ad.src;
        image.alt = ad.alt;
    });
})();
