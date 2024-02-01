import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Seekbar } from 'react-seekbar';
import msToTime from './msToTime';

interface ProgressBarProps {
  is_paused: boolean;
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
  duration: number;
  onSeek: (position: number) => void;
}

const ProgressBar = ({ is_paused, position, setPosition, duration, onSeek }: ProgressBarProps) => {
  const [pos, setPos] = useState(position);

  useEffect(() => {
    if (is_paused) {
      return;
    }
    setPos(position);
    const interval = setInterval(() => {
      setPos((prev) => prev + 400);
    }, 400);

    return () => clearInterval(interval);
  }, [is_paused, position, setPosition]);

  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between",width:"100%"}}>
      <p style={{margin: "0 10px", fontSize: "12px"}}>{msToTime(pos)}</p>
      <Seekbar height={5} position={pos} duration={duration} onSeek={onSeek} fullWidth />
      <p style={{margin: "0 10px", fontSize: "12px"}}>{msToTime(duration)}</p>
    </div>
  );
};

export default ProgressBar;