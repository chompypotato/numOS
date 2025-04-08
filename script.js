window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  const desktop = document.getElementById("desktop");

  setTimeout(() => {
    loading.style.opacity = 0;
    loading.style.visibility = "hidden";
    desktop.style.display = "flex";
  }, 3000); // adjust this duration to your liking
});
