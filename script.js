window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const desktop = document.getElementById("desktop");

  // Show the loading screen then hide it and reveal the desktop
  setTimeout(() => {
    loading.style.opacity = 0;
    setTimeout(() => {
      loading.style.display = "none";
      desktop.style.display = "block";
    }, 1000);
  }, 2000);

  updateTime();
  setInterval(updateTime, 1000);

  makeDraggable();
  initPaint();
});

// Update taskbar time
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("time").textContent = timeStr;
}

// Launch an app and center its window on the desktop
function launchApp(name) {
  const appWindow = document.getElementById(`app-${name}`);
  appWindow.style.display = "flex";
  // Center the window
  centerWindow(appWindow);
}

// Close an app window
function closeApp(name) {
  document.getElementById(`app-${name}`).style.display = "none";
}

// Function to center a window based on current viewport size
function centerWindow(win) {
  // Give the browser a moment to render the window so offsetWidth/Height are available
  setTimeout(() => {
    win.style.left = (window.innerWidth - win.offsetWidth) / 2 + "px";
    win.style.top = (window.innerHeight - win.offsetHeight) / 2 + "px";
  }, 10);
}

// Draggable windows
function makeDraggable() {
  const windows = document.querySelectorAll('.app-window');
  windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false, offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.zIndex = Date.now(); // Bring the window to front
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });
}

// Basic Paint App functionality
function initPaint() {
  const canvas = document.getElementById("paintCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let painting = false;

  canvas.addEventListener("mousedown", () => { painting = true; });
  canvas.addEventListener("mouseup", () => { painting = false; });
  canvas.addEventListener("mousemove", (e) => {
    if (!painting) return;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
    ctx.fill();
  });
}
