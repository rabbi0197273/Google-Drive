function getparam(a,e){return e||(e=window.location.href),new URL(e).searchParams.get(a)}
let s=a=>document.getElementById(a);

function getIdFromUrl(url) { return url.match(/[-\w]{25,}/); }

let apikey = [
  'AIzaSyCt3DULzE2trDJhfFUosWZT-3GEObbMqVU', 
  'AIzaSyCsbx8BSyLwkw6XX6Lg5OF1U0HNtI9VmCY', 
  'AIzaSyBLMJAT6oqTZxAMsCsMjXzoo4lkJL4MmfM', 
  'AIzaSyCIY6fomcJxOt0XQ_naa1rzfd5wlOMGKDY'
][Math.floor(Math.random() * 4)];

let videoId;

let get=()=>{
  let url = s('videourl').value;
  if(!url) {
    alert('Please enter a Google Drive video link');
    return;
  }
  
  videoId = getIdFromUrl(url)[0];
  if(!videoId) {
    alert('Invalid Google Drive link');
    return;
  }
  
  // Show thumbnail
  let thumbnail = s('videoThumbnail');
  thumbnail.src = 'https://lh3.googleusercontent.com/d/' + videoId;
  thumbnail.style.display = 'block';
  
  // Show preview section
  s('videoPreview').style.display = 'block';
}

let copyEmbedCode = () => {
  if(!videoId) {
    alert('Please generate a video preview first');
    return;
  }
  
  let embedCode = `<iframe width="560" height="315" 
src="./simple-player.html?id=${videoId}" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture" allowfullscreen>
</iframe>`;
  
  navigator.clipboard.writeText(embedCode).then(() => {
    alert('Embed code copied to clipboard!');
  }).catch(() => {
    prompt('Copy this embed code:', embedCode);
  });
}

let openPlayer = () => {
  if(!videoId) {
    alert('Please generate a video preview first');
    return;
  }
  
  window.open('./simple-player.html?id=' + videoId, '_blank');
}