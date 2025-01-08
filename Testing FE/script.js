document.getElementById("fetch-videos").addEventListener("click", async () => {
  const videoListDiv = document.getElementById("video-list");
  videoListDiv.innerHTML = "<p>Loading videos...</p>";

  try {
    // Call API using Axios
    const response = await axios.get(
      "http://localhost:3000/api/videos/getAll-videos",
      {
        params: { page: 1, limit: 10 }, // Optional: Add pagination if supported
      }
    );

    const videos = response.data;

    // Clear loading text
    videoListDiv.innerHTML = "";

    // Check if there are videos
    if (videos.length === 0) {
      videoListDiv.innerHTML = "<p>No videos found.</p>";
      return;
    }

    // Display videos
    videos.forEach((video) => {
      const videoItem = document.createElement("div");
      videoItem.className = "video-item";

      // Thumbnail
      const thumbnail = document.createElement("img");
      thumbnail.src = video.video_thumbnail;
      thumbnail.alt = `Thumbnail for ${video.video_title}`;
      thumbnail.style.width = "100%";
      thumbnail.style.maxHeight = "200px";
      thumbnail.style.objectFit = "cover";

      // Title
      const videoTitle = document.createElement("div");
      videoTitle.className = "video-title";
      videoTitle.textContent = video.video_title;

      // Description
      const videoDescription = document.createElement("div");
      videoDescription.className = "video-description";
      videoDescription.textContent =
        video.video_description || "No description available.";

      // Video Element
      const videoElement = document.createElement("video");
      videoElement.src = video.video_url;
      videoElement.controls = true;
      videoElement.style.width = "100%";
      videoElement.style.marginTop = "10px";

      // Append elements to video item
      videoItem.appendChild(thumbnail);
      videoItem.appendChild(videoTitle);
      videoItem.appendChild(videoDescription);
      videoItem.appendChild(videoElement);

      // Append video item to list
      videoListDiv.appendChild(videoItem);
    });
  } catch (error) {
    console.error("Error fetching videos:", error.response || error.message);
    videoListDiv.innerHTML =
      "<p>Failed to load videos. Please try again later.</p>";
  }
});
