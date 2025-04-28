import { memo, useState, useCallback, useRef, useEffect } from "react";
import { Volume2, VolumeOff, Maximize, Minimize, Play, Pause } from 'lucide-react';
import Button from './Button';


type VideoControlProps = {
    isPlaying: boolean;
    isMuted: boolean;
    isFullscreen: boolean;
    togglePlayPause: () => void;
    toggleMute: () => void;
    toggleFullscreen: () => void;
};

const VideoControls = ({
    isPlaying,
    isMuted,
    isFullscreen,
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
}: VideoControlProps) => {
    const controlsRef = useRef<HTMLDivElement | null>(null);
    const [showControls, setShowControls] = useState(false);


    const handleMouseEvents = useCallback((show: boolean) => {
        setShowControls(show);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
                setShowControls(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div 
            className="absolute inset-0 w-full h-full overflow-hidden z-20"
            onMouseEnter={() => handleMouseEvents(true)}
            onMouseLeave={() => handleMouseEvents(false)}
            onClick={() => handleMouseEvents(true)}
        >
            <div
                ref={controlsRef}
                className={`video-controls-cont transition-opacity duration-200 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >

                <div className="video-controls flex">
                    <div className="left-controls flex-1">
                        {/* Play/Pause Button */}
                        <Button
                            type="control" 
                            tooltip={isPlaying ? "Pause" : "Play"}
                            icon={isPlaying ? <Pause className="w-auto h-[1.25rem]" /> : <Play className="w-auto h-[1.25rem]" />}
                            onClick={togglePlayPause}
                        />

                        {/* Mute/Unmute Audio Button */}
                        <Button
                            type="control" 
                            tooltip={isMuted ? "Unmute" : "Mute"}
                            icon={isMuted ? <VolumeOff className="w-auto h-[1.25rem]" /> : <Volume2 className="w-auto h-[1.25rem]" />}
                            onClick={toggleMute}
                        />
                    </div>
                    
                    <div className="right-controls">
                        {/* Fullscreen/Exit Fullscreen Button */}
                        <Button
                            type="control" 
                            tooltip={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            icon={isFullscreen ? <Minimize className="w-auto h-[1.25rem]" /> : <Maximize className="w-auto h-[1.25rem]" />}
                            onClick={toggleFullscreen}
                        />
                    </div>
                </div>

                <div className="controls-gradient-overlay"></div>

            </div>
        </div>
    );
}

export default memo(VideoControls);
