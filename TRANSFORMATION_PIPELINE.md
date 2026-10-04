# Real-time Face Transformation Pipeline

This solution uses **local, client-side processing** with multiple pluggable transformation engines to avoid deploying a custom media server.

## Architecture

```
Camera → Transformation Engine → Canvas → WebRTC Peer Connection → Remote User
```

### Why this approach?

1. **No custom media server needed** — transformation happens in the browser
2. **Low latency** — local processing, no server round-trip
3. **Scalable** — no server-side compute burden
4. **Private** — all processing stays on the user's device
5. **Flexible** — engine can be swapped without changing call infrastructure

## Transformation Engines

### 1. **MediaPipe** (Recommended)

**Best for:** Production deployments, highest performance

```bash
npm install @mediapipe/selfie-segmentation @mediapipe/face-detection
```

**Features:**
- Ultra-fast face detection (~10ms)
- Head pose tracking
- Facial landmark detection (468 points)
- Background segmentation
- GPU-accelerated

**Implementation:**

```javascript
import { FaceDetection, FilesetResolver } from '@mediapipe/tasks-vision';

const vision = await FilesetResolver.forVisionTasks(
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
);

const faceDetector = await FaceDetection.create(vision, {
  runningMode: 'VIDEO',
  numFaces: 1,
});

// Get detections from video frames
const result = faceDetector.detectForVideo(video, performanceNow());
// Use result.detections[0] for face bbox, keypoints, etc.
```

### 2. **TensorFlow.js**

**Best for:** High-accuracy landmarks, detailed pose

```bash
npm install @tensorflow/tfjs @tensorflow/tfjs-backend-webgl @tensorflow-models/face-landmarks-detection
```

**Features:**
- 468 facial landmarks
- Iris detection
- Real-time pose estimation
- WebGL backend acceleration

**Implementation:**

```javascript
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

const detector = await faceLandmarksDetection.createDetector(
  faceLandmarksDetection.SupportedModels.MediaPipeFacemesh,
  { runtime: 'tfjs', maxFaces: 1 }
);

const faces = await detector.estimateFaces(video);
const landmarks = faces[0].keypoints; // [x, y, z] per landmark
```

### 3. **ML5.js**

**Best for:** Simple pose detection, ease of use

```bash
npm install ml5
```

**Features:**
- Pose estimation (17 keypoints)
- Face detection
- Simple API
- Pre-trained models

**Implementation:**

```javascript
const poseNet = await ml5.poseNet(video);
const poses = await poseNet.estimatePose(video);
```

### 4. **Canvas Fallback**

**Best for:** Devices without GPU, minimal dependencies

Simple frame processing using Canvas 2D context:
- Posterization (cartoon effect)
- Color filtering
- Basic shape drawing (avatar)
- No external libraries needed

## OBS Studio Integration

### Stream canvas to OBS for professional workflows:

**Method 1: WebRTC Input**

```javascript
// Send canvas stream via WebRTC to OBS
const canvasStream = canvas.captureStream(30);
const peerConnection = new RTCPeerConnection();
peerConnection.addTrack(canvasStream.getVideoTracks()[0]);
```

**Method 2: NDI Protocol**

```javascript
// Install OBS NDI plugin
// Export canvas via newTek NDI SDK (requires native module)
// OBS can then consume the NDI stream for advanced effects chains
```

**Method 3: RTMP via FFmpeg**

```bash
# Stream canvas to RTMP server (e.g., Twitch, YouTube, own RTMP server)
ffmpeg -f gdigrab -i desktop -f flv rtmp://your-server/live/stream
```

## Real-time Processing Pipeline

### Frame Processing Loop

```javascript
function processFrame() {
  // 1. Capture video frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 2. Run face detection (MediaPipe, TensorFlow, etc.)
  const detections = await faceDetector.detect(canvas);

  // 3. Based on mode, apply transformation
  if (mode === 'avatar') {
    drawAvatarAtFacePosition(ctx, detections[0]);
  } else if (mode === 'effect') {
    applyCartoonFilter(ctx);
  } else if (mode === 'background') {
    replaceBackground(ctx, detections);
  }

  // 4. Send canvas stream to WebRTC
  // Canvas stream is automatically consumed by RTCPeerConnection

  requestAnimationFrame(processFrame);
}
```

## Performance Targets

| Engine | FPS | Latency | CPU | GPU |
|--------|-----|---------|-----|-----|
| MediaPipe | 30-60 | 10-20ms | Low | Yes (WebGL) |
| TensorFlow.js | 25-40 | 20-40ms | Medium | Yes (WebGL) |
| ML5.js | 20-30 | 30-60ms | Medium | Optional |
| Canvas fallback | 20-30 | 5-10ms | Low | No |

## Deployment Checklist

- [ ] Install face tracking library (MediaPipe recommended)
- [ ] Implement transformation pipeline in `components/advanced-call-room.tsx`
- [ ] Add canvas stream to WebRTC peer connection
- [ ] Test all transformation modes
- [ ] Profile CPU/GPU usage and optimize
- [ ] Add graceful fallback for unsupported devices
- [ ] Deploy to production (Vercel, AWS Amplify, etc.)
- [ ] Configure OBS Studio integration (optional)
- [ ] Set up RTMP streaming pipeline (optional)

## Example: Complete transformation pipeline

See `components/advanced-call-room.tsx` for a full working implementation with:
- Real face mode
- Avatar mode with face tracking
- Cartoon effect mode
- Virtual background mode
- Real-time stats overlay
- Graceful engine fallback
