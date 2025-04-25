window.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mousedown", () => {
    cursor.style.backgroundImage = "url('cursor-click.png')";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.backgroundImage = "url('cursor-normal.png')";
  });

  const hoverElements = document.querySelectorAll(
    'a, button, [data-hover="true"]',
  );
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.backgroundImage = "url('cursor-read.png')";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.backgroundImage = "url('cursor-normal.png')";
    });
  });
});
