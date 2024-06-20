const overlayHtml = `
	<div id="screen-record-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; flex-direction: column;">
		<button id="start-record" style="padding: 10px 20px; margin: 10px; background-color: green; color: white; font-size: 20px;">Start Recording</button>
		<button id="exit-overlay" style="padding: 10px 20px; margin: 10px; background-color: red; color: white; font-size: 20px;">Exit</button>
	</div>
	<div id="record-controls" style="position: fixed; bottom: 10px; right: 10px; z-index: 10001; display: none;">
		<button id="stop-record" style="padding: 10px 20px; background-color: red; color: white; font-size: 20px;">Stop Recording</button>
	</div>
	<div id="recorded-videos-container" style="position: fixed; top: 10px; right: 10px; z-index: 10002; display: none; max-height: 90%; overflow-y: auto;">
		<div id="recorded-videos"></div>
	</div>
`;
document.body.insertAdjacentHTML('beforeend', overlayHtml);

const startRecordButton = document.getElementById('start-record');
const exitOverlayButton = document.getElementById('exit-overlay');
const stopRecordButton = document.getElementById('stop-record');
const recordedVideosContainer = document.getElementById('recorded-videos-container');
const recordedVideosDiv = document.getElementById('recorded-videos');
const overlay = document.getElementById('screen-record-overlay');
const recordControls = document.getElementById('record-controls');

let mediaRecorder;
let recordedChunks = [];
let allVideos = [];

startRecordButton.addEventListener('click', async () => {
	const streamId = await new Promise((resolve, reject) => {
		chrome.runtime.sendMessage({ type: 'capture' }, (response) => {
			if (response.type === 'success') {
				resolve(response.streamId);
			} else {
				reject(response.message);
			}
		});
	});

	const stream = await navigator.mediaDevices.getUserMedia({
		video: {
			mandatory: {
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: streamId
			}
		}
	});

	mediaRecorder = new MediaRecorder(stream);
	mediaRecorder.ondataavailable = (event) => {
		if (event.data.size > 0) {
			recordedChunks.push(event.data);
		}
	};

	mediaRecorder.onstop = () => {
		const blob = new Blob(recordedChunks, { type: 'video/webm' });
		const videoURL = URL.createObjectURL(blob);
		allVideos.push(videoURL);

		const videoElement = document.createElement('video');
		videoElement.src = videoURL;
		videoElement.controls = true;
		videoElement.style.width = '300px';
		videoElement.style.height = 'auto';
		videoElement.style.margin = '10px';
		recordedVideosDiv.appendChild(videoElement);

		recordedChunks = [];
		recordedVideosContainer.style.display = 'block';
	};

	mediaRecorder.start();
	overlay.style.display = 'none';
	recordControls.style.display = 'block';
});

stopRecordButton.addEventListener('click', () => {
	mediaRecorder.stop();
	recordControls.style.display = 'none';
	overlay.style.display = 'flex';
});

exitOverlayButton.addEventListener('click', () => {
	document.getElementById('screen-record-overlay').remove();
	document.getElementById('record-controls').remove();
	document.getElementById('recorded-videos-container').remove();
});
