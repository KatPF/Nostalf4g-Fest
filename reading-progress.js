(() => {
    const progress = document.querySelector('.reading-progress');
    const progressFill = progress?.querySelector('.reading-progress-fill');

    if (!progress || !progressFill) {
        return;
    }

    let updateScheduled = false;

    const updateProgress = () => {
        updateScheduled = false;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const isScrollable = scrollableHeight > 0;
        const percentage = isScrollable
            ? Math.min(100, Math.max(0, Math.round((window.scrollY / scrollableHeight) * 100)))
            : 0;

        progress.hidden = !isScrollable;
        progress.setAttribute('aria-valuenow', String(percentage));
        progressFill.style.setProperty('--reading-progress', String(percentage / 100));
    };

    const scheduleUpdate = () => {
        if (!updateScheduled) {
            updateScheduled = true;
            window.requestAnimationFrame(updateProgress);
        }
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('load', scheduleUpdate);
    document.addEventListener('visibilitychange', scheduleUpdate);

    if ('ResizeObserver' in window) {
        new ResizeObserver(scheduleUpdate).observe(document.body);
    }

    updateProgress();
})();
