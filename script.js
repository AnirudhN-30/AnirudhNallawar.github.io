function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderPhotoCollage() {
  const container = document.getElementById('photo-collage');
  const images = window.PHOTOGRAPHY_IMAGES || [];
  if (!container || images.length === 0) return;

  const selected = shuffle(images).slice(0, Math.min(15, images.length));
  container.innerHTML = '';

  selected.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Photography sample ${index + 1}`;
    img.loading = 'lazy';
    container.appendChild(img);
  });
}

window.addEventListener('DOMContentLoaded', renderPhotoCollage);
