
export function initializeNavigation (onPopStateHandler) {
    window.addEventListener('popstate', () => {
        const currentPath = window.location.search;
        if (onPopStateHandler) {
            onPopStateHandler(currentPath);
        }
    });
}
