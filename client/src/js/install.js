// Code to handle the install button
const butInstall = document.getElementById('buttonInstall');

// Handle the install button click
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered event and show the install button
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Reset the deferred prompt, it can only be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Handler for the app installed event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
