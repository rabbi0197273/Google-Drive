async function startDownload() {
    let fileId = document.getElementById("fileId").value.trim();
    if (!fileId) {
        alert("Please enter a File ID!");
        return;
    }
    await downloadFile(fileId);
}

async function downloadFile(fileId) {
    let apikeys = [
        "AIzaSyCt3DULzE2trDJhfFUosWZT-3GEObbMqVU",
        "AIzaSyCsbx8BSyLwkw6XX6Lg5OF1U0HNtI9VmCY",
        "AIzaSyATjR8DbYGha0Z2U84gPVT0dxROp7UdWy8",
        "AIzaSyBLMJAT6oqTZxAMsCsMjXzoo4lkJL4MmfM",
        "AIzaSyCIY6fomcJxOt0XQ_naa1rzfd5wlOMGKDY",
        "AIzaSyDCLkAwFkagtt077kgXw1HfmYGx-VLkvt8"
    ];
    
    let apikey = apikeys[Math.floor(Math.random() * apikeys.length)];
    let url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apikey}`;

    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Download failed");

        let blob = await response.blob();
        let a = document.createElement("a");
        a.href = window.URL.createObjectURL(blob);
        a.download = "downloaded_file"; // চাইলে নাম পরিবর্তন করা যাবে
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (e) {
        alert("Error: " + e.message);
    }
}
