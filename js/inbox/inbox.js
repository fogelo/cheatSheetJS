
// Воспроизведение звука по кнопке
const button = document
  .getElementById("audio-button")
  .addEventListener("click", () => {
    const audio = document.getElementById("audio-message");
    audio.play();
  });
