let mediaRecorder;
let recordedChunks = [];

document.getElementById("start").addEventListener("click", async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" }
    });

    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        
        const videoElement = document.getElementById("preview");
        videoElement.src = url;
        videoElement.style.display = "block";

        const downloadLink = document.getElementById("download");
        downloadLink.href = url;
        downloadLink.download = "screen-recording.webm";
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download Video";
    };

    mediaRecorder.start();
    
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
});

document.getElementById("stop").addEventListener("click", () => {
    mediaRecorder.stop();
    
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
});
