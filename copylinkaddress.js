let popSoundUrl = chrome.runtime.getURL('sounds/pop.mp3');
let popSoundAudio = new Audio(popSoundUrl);

function getAbsoluteURL(url) {
    var link = document.createElement("a");
    link.href = url;
    return link.href; // This will return the full URL including query parameters and fragment
}

function showNotification(message) {
    var notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '-50px'; // Start out of view
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.backgroundColor = '#333';
    notification.style.color = '#fff';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)'; // More prominent, darker shadow
    notification.style.zIndex = '10000';
    // notification.style.width = '300px'; 
    // Fixed width
    notification.style.textAlign = 'center'; // Center text
    notification.style.fontSize = '16px';
    notification.style.backgroundImage = 'linear-gradient(to right, #31353b, #3a5378)';
    notification.style.transition = 'bottom 0.5s ease'; // Animation for slide in
    notification.style.opacity = '0.8'; // Slight transparency
    notification.style.minWidth = '200px'; // Minimum width to avoid too narrow boxes
    notification.style.maxWidth = 'calc(100% - 40px)'; // Prevent overflow on small screens
    
    var userLanguage = navigator.language || navigator.userLanguage;
    if (userLanguage.startsWith('ja')) {
        notification.innerText = 'クリップボードにコピーしました！';
    } else if (userLanguage.startsWith('zh')) {
        notification.innerText = '已复制到剪贴板！';
    } else {
        notification.innerText = 'Copied to clipboard!';
    }
        
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(function() {
        notification.style.bottom = '20px';
    }, 100);

    // Slide out and remove
    setTimeout(function() {
        notification.style.bottom = '-50px';
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 500); // Delay for the slide out animation
    }, 2000);
}

window.onkeydown = function(event) {
    var hoveredLink = $('a:hover');
    if (hoveredLink.length) {
        if (event.code === 'KeyX') {
            navigator.clipboard.writeText(hoveredLink.text())
            showNotification('Text copied to clipboard!');
        } else if (event.code === 'KeyZ') {
            var hoveredHrefAttr = hoveredLink.attr('href');
            var fullURL = getAbsoluteURL(hoveredHrefAttr);
            navigator.clipboard.writeText(fullURL);
            showNotification('URL copied to clipboard!');
        } else {
            return;
        }
        popSoundAudio.play();
    }
};
