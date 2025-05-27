// Photo Storage System
let savedPhotos = JSON.parse(localStorage.getItem('savedPhotos')) || [];

// Save photo
function savePhoto(photoData) {
    const photo = {
        id: photoData.id,
        title: photoData.title || 'Untitled Photo',
        driveId: photoData.driveId,
        directLink: photoData.directLink,
        thumbnail: photoData.thumbnail,
        dateAdded: new Date().toISOString(),
        views: 0
    };
    
    // Check if already exists
    const exists = savedPhotos.find(p => p.driveId === photo.driveId);
    if (!exists) {
        savedPhotos.unshift(photo);
        localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
        return true;
    }
    return false;
}

// Get all photos
function getAllPhotos() {
    return savedPhotos;
}

// Delete photo
function deletePhoto(driveId) {
    savedPhotos = savedPhotos.filter(p => p.driveId !== driveId);
    localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
}

// Update views
function updateViews(driveId) {
    const photo = savedPhotos.find(p => p.driveId === driveId);
    if (photo) {
        photo.views++;
        localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
    }
}

// Export all photos
function exportPhotos() {
    const dataStr = JSON.stringify(savedPhotos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'my-photos-backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import photos
function importPhotos(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedPhotos = JSON.parse(e.target.result);
            savedPhotos = [...savedPhotos, ...importedPhotos];
            localStorage.setItem('savedPhotos', JSON.stringify(savedPhotos));
            location.reload();
        } catch (error) {
            alert('Invalid file format!');
        }
    };
    reader.readAsText(file);
}