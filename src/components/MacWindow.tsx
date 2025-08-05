import React, { ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { toast } from "sonner";

interface MacWindowProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  darkMode?: boolean;
}

interface TrafficLightProps {
  color: string;
  onClick: () => void;
}

const TrafficLight: React.FC<TrafficLightProps> = ({ color, onClick }) => (
  <svg
    onClick={onClick}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    role="button"
    tabIndex={0}
    aria-label={`${color} traffic light button`}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') onClick();
    }}
    style={{ cursor: 'pointer' }}
  >
    <circle
      cx="7"
      cy="7"
      r="6"
      fill={color}
      stroke="rgba(0,0,0,0.2)"
      strokeWidth="0.8"
    />
  </svg>
);

const MacWindow: React.FC<MacWindowProps> = ({ title, children, onClose, darkMode = false }) => {
  return (
    <Rnd
      default={{ x: 100, y: 80, width: 800, height: 600 }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      dragHandleClassName="title-bar"
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true
      }}
      style={{
        background: darkMode ? '#1e1e1e' : '#f0f0f3',
        borderRadius: 12,
        boxShadow: darkMode ? '0 15px 30px rgba(0,0,0,0.8)' : '0 15px 30px rgba(0,0,0,0.1)',
        fontFamily: '"San Francisco", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: darkMode ? '#eee' : '#222'
      }}
    >
      <div
        className="title-bar"
        style={{
          height: 36,
          background: darkMode ? '#2c2c2c' : '#e0e0e0',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          boxShadow: darkMode ? 'inset 0 -1px 0 #444' : 'inset 0 -1px 0 #c6c6c6',
          flexShrink: 0,
          userSelect: 'none',
          color: darkMode ? '#ccc' : '#333'
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <TrafficLight
            color="#ff5f56"
            onClick={onClose}
          />
          <TrafficLight
            color="#ffbd2e"
            onClick={() => toast.info('Minimize button clicked')}
          />
          <TrafficLight
            color="#27c93f"
            onClick={() => toast.info('Maximize button clicked')}
          />
        </div>

        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: 600,
            fontSize: 14,
            color: 'inherit',
            userSelect: 'text',
            pointerEvents: 'none'
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          padding: 24,
          color: 'inherit',
          overflowY: 'auto',
          flexGrow: 1,
          userSelect: 'text'
        }}
      >
        {children}
      </div>
    </Rnd>
  );
};

export default MacWindow;