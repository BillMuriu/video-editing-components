import React from "react";

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
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 10000,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 12,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
        padding: 20,
        minWidth: 320,
        maxWidth: 360,
        fontSize: 14,
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 10 }}>Control Panel</div>
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
    </div>
  );
};

export default ControlPanel;
