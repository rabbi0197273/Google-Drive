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
let currentVideoData = {};

// Navigation functions
function showHome() {
  s('homeSection').style.display = 'block';
  s('dashboardSection').style.display = 'none';
  s('homeBtn').className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300';
  s('dashboardBtn').className = 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300';
}

function showDashboard() {
  s('homeSection').style.display = 'none';
  s('dashboardSection').style.display = 'block';
  s('homeBtn').className = 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300';
  s('dashboardBtn').className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300';
  loadSavedVideos();
}

let get=()=>{
  let url = s('videourl').value;
  
  if(!url) {
    alert('Please enter a Google Drive video link');
    return;
  }
  
  let result = getIdFromUrl(url);
  
  if(!result || !result[0]) {
    alert('Invalid Google Drive link. Please check the URL format.');
    return;
  }
  
  videoId = result[0];
  
  // Store current video data
  currentVideoData = {
    id: videoId,
    url: url,
    title: s('videotitle').value || 'Untitled Video',
    poster: s('posterurl').value || '',
    timestamp: new Date().toISOString()
  };
  
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
src="https://rabbi0197273.github.io/Google-Drive/simple-player.html?id=${videoId}" 
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
  
  window.open('https://rabbi0197273.github.io/Google-Drive/simple-player.html?id=' + videoId, '_blank');
}

// Save video to localStorage
function saveVideo() {
  if(!videoId) {
    alert('Please generate a video preview first');
    return;
  }
  
  let savedVideos = JSON.parse(localStorage.getItem('driveplyr-videos') || '[]');
  
  // Check if video already exists
  if (savedVideos.find(v => v.id === videoId)) {
    alert('This video is already saved in dashboard!');
    return;
  }
  
  savedVideos.push(currentVideoData);
  localStorage.setItem('driveplyr-videos', JSON.stringify(savedVideos));
  
  alert('Video saved to dashboard!');
}

// Load saved videos in dashboard
function loadSavedVideos() {
  let savedVideos = JSON.parse(localStorage.getItem('driveplyr-videos') || '[]');
  let container = s('savedVideos');
  let noVideos = s('noVideos');
  
  if (savedVideos.length === 0) {
    container.innerHTML = '';
    noVideos.style.display = 'block';
    return;
  }
  
  noVideos.style.display = 'none';
  container.innerHTML = savedVideos.map(video => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img src="https://lh3.googleusercontent.com/d/${video.id}" alt="${video.title}" class="w-full h-48 object-cover">
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${video.title}</h3>
        <p class="text-gray-600 text-sm mb-3">Saved: ${new Date(video.timestamp).toLocaleDateString()}</p>
        <div class="space-y-2">
          <button onclick="copyVideoEmbed('${video.id}')" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Copy Embed</button>
          <button onclick="openVideoPlayer('${video.id}')" class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">Open Player</button>
          <button onclick="deleteVideo('${video.id}')" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Copy embed code for saved video
function copyVideoEmbed(id) {
  let embedCode = `<iframe width="560" height="315" 
src="https://rabbi0197273.github.io/Google-Drive/simple-player.html?id=${id}" 
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture" allowfullscreen>
</iframe>`;
  
  navigator.clipboard.writeText(embedCode).then(() => {
    alert('Embed code copied to clipboard!');
  }).catch(() => {
    prompt('Copy this embed code:', embedCode);
  });
}

// Open player for saved video
function openVideoPlayer(id) {
  window.open('https://rabbi0197273.github.io/Google-Drive/simple-player.html?id=' + id, '_blank');
}

// Delete saved video
function deleteVideo(id) {
  if (confirm('Are you sure you want to delete this video from dashboard?')) {
    let savedVideos = JSON.parse(localStorage.getItem('driveplyr-videos') || '[]');
    savedVideos = savedVideos.filter(v => v.id !== id);
    localStorage.setItem('driveplyr-videos', JSON.stringify(savedVideos));
    loadSavedVideos();
    alert('Video deleted from dashboard!');
  }
}
