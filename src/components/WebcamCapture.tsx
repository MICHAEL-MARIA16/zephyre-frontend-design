
import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, isAnalyzing, disabled = false }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startWebcam = useCallback(async () => {
    // Simulate webcam capture with a demo image
    try {
      // Create a canvas with a demo skin analysis image
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Create a gradient background to simulate skin
        const gradient = context.createLinearGradient(0, 0, 640, 480);
        gradient.addColorStop(0, '#F4C2A1');
        gradient.addColorStop(0.5, '#E8B893');
        gradient.addColorStop(1, '#D4A574');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 640, 480);
        
        // Add some texture to simulate skin
        context.fillStyle = 'rgba(200, 160, 120, 0.3)';
        for (let i = 0; i < 200; i++) {
          const x = Math.random() * 640;
          const y = Math.random() * 480;
          context.beginPath();
          context.arc(x, y, Math.random() * 2, 0, Math.PI * 2);
          context.fill();
        }
        
        // Add demo text
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.font = '20px Arial';
        context.textAlign = 'center';
        context.fillText('Demo Skin Analysis', 320, 240);
        context.font = '14px Arial';
        context.fillText('Click capture to analyze', 320, 270);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        onCapture(imageData);
        toast.success("Demo image captured! Starting skin analysis...");
      }
    } catch (error) {
      console.error("Error creating demo image:", error);
      toast.error("Unable to create demo capture.");
    }
  }, [onCapture]);

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsWebcamActive(false);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        onCapture(imageData);
        stopWebcam();
        toast.success("Image captured! Starting skin analysis...");
      }
    }
  }, [onCapture, stopWebcam]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        onCapture(imageData);
        toast.success("Image uploaded! Starting skin analysis...");
      };
      reader.readAsDataURL(file);
    }
  }, [onCapture]);

  const resetCapture = () => {
    setCapturedImage(null);
    stopWebcam();
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Skin Analysis Capture</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Captured Image Display */}
        {capturedImage && (
          <div className="relative">
            <img 
              src={capturedImage} 
              alt="Captured for analysis" 
              className="w-full rounded-lg"
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-2" />
                  <p className="text-white text-sm">Analyzing your skin...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Webcam Video */}
        {isWebcamActive && !capturedImage && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button onClick={captureImage} size="lg" className="rounded-full">
                <Camera className="h-5 w-5 mr-2" />
                Capture
              </Button>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        {!capturedImage && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={startWebcam} 
              disabled={disabled}
              className="flex-1 disabled:opacity-50"
            >
              <Camera className="h-4 w-4 mr-2" />
              {disabled ? 'Enter Name First' : 'Capture Demo Image'}
            </Button>
            
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              variant="outline" 
              className="flex-1 disabled:opacity-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {disabled ? 'Enter Name First' : 'Upload Image'}
            </Button>
          </div>
        )}

        {capturedImage && !isAnalyzing && (
          <Button onClick={resetCapture} variant="outline" className="w-full">
            Take Another Photo
          </Button>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Canvas for Image Processing */}
        <canvas ref={canvasRef} className="hidden" />
      </CardContent>
    </Card>
  );
};
