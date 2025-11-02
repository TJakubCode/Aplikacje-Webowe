const kittensButton = document.getElementById('kittens');
const catsButton = document.getElementById('cats');

const kittensImages = document.getElementById('kittens-gallery');
const catsImages = document.getElementById('cat-gallery');

kittensButton.addEventListener('click',() =>{
  kittensImages.style.display = 'grid';
  kittensButton.classList.add('active');
  catsButton.classList.remove('active');
  catsImages.style.display = 'none';
});

catsButton.addEventListener('click',() =>{
  catsImages.style.display = 'flex';
  catsButton.classList.add('active');
  kittensButton.classList.remove('active');
  kittensImages.style.display = 'none';
});

catsImages.style.display = 'none';
kittensButton.classList.add('active')