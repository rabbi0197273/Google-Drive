function getparam(a,e){return e||(e=window.location.href),new URL(e).searchParams.get(a)}
let s=a=>document.getElementById(a);

function getIdFromUrl(url) { 
  // Handle different Google Drive URL formats
  let match = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
  if (match) return [match[1]];
  
  match = url.match(/id=([a-zA-Z0-9_-]{25,})/);
  if (match) return [match[1]];
  
  match = url.match(/([a-zA-Z0-9_-]{25,})/);
  if (match) return [match[0]];
  
  return null;
}

let apikey = [
  'AIzaSyCt3DULzE2trDJhfFUosWZT-3GEObbMqVU', 
  'AIzaSyCsbx8BSyLwkw6XX6Lg5OF1U0HNtI9VmCY', 
  'AIzaSyBLMJAT6oqTZxAMsCsMjXzoo4lkJL4MmfM', 
  'AIzaSyCIY6fomcJxOt0XQ_naa1rzfd5wlOMGKDY'
][Math.floor(Math.random() * 4)];

let videoId;

let get=()=>{
  let url = s('videourl').value;
  console.log('Input URL:', url);
  
  if(!url) {
    alert('Please enter a Google Drive video link');
    return;
  }
  
  let result = getIdFromUrl(url);
  console.log('Extracted result:', result);
  
  if(!result || !result[0]) {
    alert('Invalid Google Drive link. Please check the URL format.');
    return;
  }
  
  videoId = result[0];
  console.log('Video ID:', videoId);
  
  // Show thumbnail
  let thumbnail = s('videoThumbnail');
  let thumbnailUrl = 'https://lh3.googleusercontent.com/d/' + videoId;
  console.log('Thumbnail URL:', thumbnailUrl);
  
  thumbnail.src = thumbnailUrl;
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
