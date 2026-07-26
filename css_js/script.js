const audio = document.getElementById("music-audio");
const playButton = document.getElementById("player-play");
const startButton = document.getElementById("player-start");
const endButton = document.getElementById("player-end");
const progressBar = document.getElementById("player-progress");
const currentTimeEl = document.getElementById("player-current");
const durationEl = document.getElementById("player-duration");
const equalizer = document.getElementById("player-eq");
const timeInfo = document.querySelector(".time-info");
const progressWrap = document.querySelector(".progress-wrap");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

startButton.addEventListener("click", () => {
  audio.currentTime = 0;
});

endButton.addEventListener("click", () => {
  audio.currentTime = audio.duration ? Math.max(audio.duration - 0.1, 0) : 0;
});

progressWrap.addEventListener("click", (event) => {
  const rect = progressWrap.getBoundingClientRect();
  const clickPosition = event.clientX - rect.left;
  const seekRatio = clickPosition / rect.width;
  audio.currentTime = audio.duration ? seekRatio * audio.duration : 0;
});

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "❚❚";
  } else {
    audio.pause();
    playButton.textContent = "►";
  }
});

audio.addEventListener("play", () => {
  equalizer.classList.add("playing");
  timeInfo.classList.add("playing");
  progressWrap.classList.add("playing");
});

audio.addEventListener("pause", () => {
  equalizer.classList.remove("playing");
  timeInfo.classList.remove("playing");
  progressWrap.classList.remove("playing");
});

audio.addEventListener("ended", () => {
  playButton.textContent = "►";
  equalizer.classList.remove("playing");
  timeInfo.classList.remove("playing");
  progressWrap.classList.remove("playing");
});
