let resizeListenerRegistered = false;

function getScreenSize() {
  return window.innerWidth;
}

function handleResize(callback) {
  const screenWidth = getScreenSize();
  callback(screenWidth);
}

export function addResizeListener(callback) {
  if (!resizeListenerRegistered) {
    window.addEventListener('resize', () => handleResize(callback));
    resizeListenerRegistered = true;
  }
}

export default getScreenSize;