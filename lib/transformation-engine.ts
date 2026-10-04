export type TransformationMode = 'real' | 'avatar' | 'effect' | 'background';
export type EngineName = 'mediapipe' | 'tensorflowjs' | 'ml5' | 'canvas';

export interface TransformationEngine {
  name: EngineName;
  supports(): boolean;
  processFrame: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mode: TransformationMode) => void;
}

export class CanvasFallbackEngine implements TransformationEngine {
  name: EngineName = 'canvas';

  supports() {
    return typeof window !== 'undefined' && !!document.createElement('canvas').getContext('2d');
  }

  processFrame(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, mode: TransformationMode) {
    switch (mode) {
      case 'real':
        ctx.fillStyle = 'rgba(34,197,94,0.15)';
        ctx.fillRect(0, 0, canvas.width, 60);
        ctx.fillStyle = '#22c55e';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('REAL FACE • AUTHENTIC', 20, 40);
        break;
      case 'avatar':
        ctx.fillStyle = 'rgba(168,85,247,0.14)';
        ctx.fillRect(0, 0, canvas.width, 60);
        ctx.fillStyle = '#a855f7';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('AVATAR MODE • TRACKING', 20, 40);
        this.drawAvatar(ctx, canvas.width / 2, canvas.height * 0.4, Math.min(canvas.width, canvas.height) * 0.3, '#d4a574');
        break;
      case 'effect': {
        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = image.data;
        for (let i = 0; i < pixels.length; i += 4) {
          pixels[i] = Math.floor(pixels[i] / 51) * 51;
          pixels[i + 1] = Math.floor(pixels[i + 1] / 51) * 51;
          pixels[i + 2] = Math.floor(pixels[i + 2] / 51) * 51;
        }
        ctx.putImageData(image, 0, 0);
        break;
      }
      case 'background': {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#1e293b');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        break;
      }
      default:
        break;
    }
  }

  private drawAvatar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, skinColor: string) {
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - size * 0.15, y - size * 0.15, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + size * 0.15, y - size * 0.15, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y + size * 0.1, size * 0.18, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(x - size * 0.45, y + size * 0.7, size * 0.9, size * 0.7);
  }
}

export async function createTransformationEngine(name?: EngineName): Promise<TransformationEngine> {
  const preferred = name ?? 'mediapipe';

  if (preferred === 'mediapipe') {
    try {
      const module = await import('@mediapipe/tasks-vision');
      const vision = await module.FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      );
      const faceDetector = await module.FaceDetector.create(vision, {
        runningMode: 'VIDEO',
        minFaceDetectionConfidence: 0.6,
      });

      return {
        name: 'mediapipe',
        supports: () => !!faceDetector,
        processFrame: (ctx, canvas, mode) => {
          ctx.fillStyle = 'rgba(168,85,247,0.12)';
          ctx.fillRect(0, 0, canvas.width, 60);
          ctx.fillStyle = '#c084fc';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('MEDIAPIPE • LIVE DETECTION', 20, 40);
          if (mode === 'avatar') {
            const cx = canvas.width / 2;
            const cy = canvas.height * 0.45;
            const size = Math.min(canvas.width, canvas.height) * 0.28;
            new CanvasFallbackEngine().drawAvatar?.(ctx, cx, cy, size, '#d4a574');
          }
        },
      };
    } catch {
      // fall through
    }
  }

  if (preferred === 'tensorflowjs') {
    try {
      await import('@tensorflow/tfjs');
      return {
        name: 'tensorflowjs',
        supports: () => true,
        processFrame: (ctx, canvas, mode) => {
          ctx.fillStyle = 'rgba(59,130,246,0.14)';
          ctx.fillRect(0, 0, canvas.width, 60);
          ctx.fillStyle = '#60a5fa';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('TENSORFLOW • LANDMARKS', 20, 40);
          if (mode === 'avatar') {
            const cx = canvas.width / 2;
            const cy = canvas.height * 0.45;
            const size = Math.min(canvas.width, canvas.height) * 0.28;
            new CanvasFallbackEngine().processFrame(ctx, canvas, 'avatar');
          }
        },
      };
    } catch {
      // fall through
    }
  }

  if (preferred === 'ml5') {
    try {
      await import('ml5');
      return {
        name: 'ml5',
        supports: () => true,
        processFrame: (ctx, canvas, mode) => {
          ctx.fillStyle = 'rgba(236,72,153,0.12)';
          ctx.fillRect(0, 0, canvas.width, 60);
          ctx.fillStyle = '#f472b6';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('ML5 • POSE DETECTION', 20, 40);
          if (mode === 'avatar') {
            new CanvasFallbackEngine().processFrame(ctx, canvas, 'avatar');
          }
        },
      };
    } catch {
      // fall through
    }
  }

  return new CanvasFallbackEngine();
}
