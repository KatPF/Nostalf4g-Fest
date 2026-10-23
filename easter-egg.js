document.addEventListener('DOMContentLoaded', () => {
    const logoTrigger = document.querySelector('.brand-logo-trigger');
    let logoClicks = 0;

    if (!logoTrigger) {
        return;
    }

    logoTrigger.addEventListener('click', () => {
        logoClicks += 1;

        if (logoClicks === 8) {
            document.documentElement.classList.add('easter-egg-background');
            logoTrigger.setAttribute('aria-pressed', 'true');

            const notice = document.createElement('p');
            notice.className = 'easter-egg-notice';
            notice.setAttribute('role', 'status');
            notice.textContent = "It's peanut butter jelly time!!!";

            const animation = document.createElement('span');
            animation.className = 'easter-egg-animation';
            animation.setAttribute('aria-hidden', 'true');
            animation.textContent = '🍌';
            notice.append(animation);

            document.body.append(notice);
        }
    });
});
