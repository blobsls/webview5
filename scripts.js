document.addEventListener('DOMContentLoaded', () => {
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const extensionsSwitch = document.getElementById('extensionsSwitch');

    // Check for saved user preference, if any, on load of the website
    if (localStorage.getItem('darkMode') === 'enabled' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }

    darkModeSwitch.addEventListener('change', () => {
        if (darkModeSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Check for saved user preference for extensions
    if (localStorage.getItem('extensionsAllowed') === 'enabled') {
        extensionsSwitch.checked = true;
    }

    extensionsSwitch.addEventListener('change', () => {
        if (extensionsSwitch.checked) {
            localStorage.setItem('extensionsAllowed', 'enabled');
            enableExtensions();
        } else {
            localStorage.setItem('extensionsAllowed', 'disabled');
            disableExtensions();
        }
    });
});

function enableExtensions() {
    chrome.permissions.request({
        permissions: ['activeTab', 'scripting']
    }, (granted) => {
        if (granted) {
            console.log('All web extensions are now allowed to edit pages.');
        } else {
            console.log('Permission not granted.');
        }
    });
}

function disableExtensions() {
    chrome.permissions.remove({
        permissions: ['activeTab', 'scripting']
    }, (removed) => {
        if (removed) {
            console.log('All web extensions are now prevented from editing pages.');
        } else {
            console.log('Permission not removed.');
        }
    });
}
