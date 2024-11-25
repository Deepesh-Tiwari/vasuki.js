const run = async () => {
    // Start the video stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
  
    const videoFeedEl = document.getElementById("video-feed");
    videoFeedEl.srcObject = stream;
  
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    
  
    // Ensure the video starts playing before processing
    videoFeedEl.addEventListener("loadeddata", () => {
      setInterval(async () => {
        // Set canvas size to match the video feed
        canvas.width = videoFeedEl.videoWidth;
        canvas.height = videoFeedEl.videoHeight;
  
        // Draw the video frame to the canvas
        ctx.drawImage(videoFeedEl, 0, 0, canvas.width, canvas.height);
  
        // Convert canvas to Base64 image
        const base64Image = canvas.toDataURL("image/jpeg");
  
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Send image to APIi
        try {
          const response = await fetch("http://localhost:3000/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Image }),
          });
  
          const result = await response.json();
          console.log("Detection Result:", result);
        } catch (error) {
          console.error("Error sending image to API:", error);
        }
      }, 5000); // Send every 10 seconds
    });
  };
  
  run();
  