(function () {
    const sectionSelectors = [
        '.gh-ad-slots-top',
        '.gh-ad-slots-bottom',
        '.gh-ad-slots-mid'
    ];
    const slotsPerSection = 2;

    document.addEventListener('DOMContentLoaded', function () {
        const ads = getAds();

        document.querySelectorAll('.gh-ad-slots').forEach(function (section) {
            section.innerHTML = '';
            section.hidden = true;
        });

        if (!ads.length) {
            return;
        }

        const slots = sectionSelectors.flatMap(function (selector) {
            const section = document.querySelector(selector);

            if (!section) {
                return [];
            }

            section.hidden = false;

            return Array.from({length: slotsPerSection}, function () {
                return createSlot(section);
            });
        });

        const shuffledAds = shuffleArray(ads.slice());

        slots.forEach(function (slot, index) {
            const ad = shuffledAds[index];

            if (!ad) {
                slot.remove();
                return;
            }

            slot.href = ad.url;
            slot.target = '_blank';
            slot.rel = 'noopener sponsored';
            slot.setAttribute('aria-label', ad.alt || 'Annons');

            const image = slot.querySelector('img');
            image.src = ad.image;
            image.alt = ad.alt || 'Annons';
        });

        document.querySelectorAll('.gh-ad-slots').forEach(function (section) {
            section.hidden = !section.querySelector('.gh-ad-slot');
        });
    });

    function getAds() {
        const configuredAds = typeof ads !== 'undefined' ? ads : window.sptAds || window.SPT_ADS;

        if (!Array.isArray(configuredAds)) {
            return [];
        }

        return configuredAds.filter(function (ad) {
            return ad && ad.image && ad.url;
        });
    }

    function createSlot(section) {
        const slot = document.createElement('a');
        const image = document.createElement('img');

        slot.className = 'gh-ad-slot';
        image.width = 468;
        image.height = 120;
        image.loading = 'lazy';

        slot.appendChild(image);
        section.appendChild(slot);

        return slot;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }

        return array;
    }
})();
