export const loadImagesOnScrollEnd = (itemClassName, onScrollCallback) => {
    const items = document.querySelectorAll(itemClassName);

    if (items.length > 0) {
        const callback = function (entries, observer) {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetImg = entry.target;

                    onScrollCallback();
                    observer.unobserve(targetImg);
                }
            });
        };

        const observer = new IntersectionObserver(callback);
        const target = items[items.length - 1];

        observer.observe(target);
    }
};
