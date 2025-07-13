import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ControlPanelProps = {
  iframeLink: string;
  setIframeLink: (v: string) => void;
  bounceVigor: number;
  setBounceVigor: (v: number) => void;
  videoTitle: string;
  setVideoTitle: (v: string) => void;
  channelName: string;
  setChannelName: (v: string) => void;
  entranceDelay: number;
  setEntranceDelay: (v: number) => void;
  zoomDuration: number;
  setZoomDuration: (v: number) => void;
  staggerSpeed: number;
  setStaggerSpeed: (v: number) => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  iframeLink,
  setIframeLink,
  bounceVigor,
  setBounceVigor,
  videoTitle,
  setVideoTitle,
  channelName,
  setChannelName,
  entranceDelay,
  setEntranceDelay,
  zoomDuration,
  setZoomDuration,
  staggerSpeed,
  setStaggerSpeed,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          style={{
            position: "fixed",
            top: 24,
            right: 24,
            zIndex: 10001,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 15,
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
            cursor: "pointer",
          }}
        >
          Open Controls
        </button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: 400 }}>
        <DialogHeader>
          <DialogTitle>Control Panel</DialogTitle>
          <DialogDescription>
            Edit the video intro overlay properties in real time.
          </DialogDescription>
        </DialogHeader>
        <div style={{ marginTop: 10 }}>
          <div style={{ marginBottom: 10 }}>
            <label>Iframe Link:</label>
            <input
              type="text"
              value={iframeLink}
              onChange={(e) => setIframeLink(e.target.value)}
              style={{
                width: "100%",
                padding: 4,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Bounce Vigor (damping):</label>
            <input
              type="number"
              min={1}
              max={30}
              value={bounceVigor}
              onChange={(e) => setBounceVigor(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Video Title:</label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              style={{
                width: "100%",
                padding: 4,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Channel Name:</label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              style={{
                width: "100%",
                padding: 4,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Entrance Delay (s):</label>
            <input
              type="number"
              min={0}
              max={3}
              step={0.01}
              value={entranceDelay}
              onChange={(e) => setEntranceDelay(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Zoom Duration (s):</label>
            <input
              type="number"
              min={0.1}
              max={5}
              step={0.01}
              value={zoomDuration}
              onChange={(e) => setZoomDuration(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Stagger Speed (s):</label>
            <input
              type="number"
              min={0.01}
              max={1}
              step={0.01}
              value={staggerSpeed}
              onChange={(e) => setStaggerSpeed(Number(e.target.value))}
              style={{ width: 60, marginLeft: 8 }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ControlPanel;
