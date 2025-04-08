window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const desktop = document.getElementById("desktop");

  setTimeout(() => {
    loading.style.opacity = 0;
    loading.style.visibility = "hidden";
    desktop.style.display = "flex";
  }, 2000);

  updateTime();
  setInterval(updateTime, 1000);
});

function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  document.getElementById("time").textContent = timeStr;
}

function launchApp(name) {
  document.getElementById(`app-${name}`).style.display = "flex";
}

function closeApp(name) {
  document.getElementById(`app-${name}`).style.display = "none";
}
