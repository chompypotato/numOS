window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const desktop = document.getElementById("desktop");

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

function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  document.getElementById("time").textContent = timeStr;
}

function launchApp(name) {
  document.getElementById(`app-${name}`).style.display = "flex";
}

function closeApp(name) {
  document.getElementById(`app-${name}`).style.display = "none";
}

function makeDraggable() {
  const windows = document.querySelectorAll('.app-window');
  windows.forEach(win => {
    const header = win.querySelector('.window-header');
    let isDragging = false, offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.zIndex = Date.now(); // bring to front
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

function initPaint() {
  const canvas = document.getElementById("paintCanvas");
  const ctx = canvas.getContext("2d");
  let painting = false;

  canvas.addEventListener("mousedown", () => painting = true);
  canvas.addEventListener("mouseup", () => painting = false);
  canvas.addEventListener("mousemove", draw);

  function draw(e) {
    if (!painting) return;
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
