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


/* VideoControls component to manage video playback, mute/unmute, and fullscreen toggle. */
const VideoControls = ({
    isPlaying,
    isMuted,
    isFullscreen,
    togglePlayPause,
    toggleMute,
    toggleFullscreen,
}: VideoControlProps) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const controlsRef = useRef<HTMLDivElement | null>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showControls, setShowControls] = useState(false);


    /**
     * Clear hide timeout for controls. 
     */
    const clearHideTimeout = useCallback(() => {
        if (!hideTimeout.current) return;
        
        clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
    }, []);
    
    
    /**
     * Show controls and auto-hide after delay
     */
    const showAndAutoHideControls = useCallback(() => {
        setShowControls(true);
        clearHideTimeout();
        
        hideTimeout.current = setTimeout(() => setShowControls(false), 4000);
    }, [clearHideTimeout]);


    /**
     * Handle mouse enter/leave to show/hide controls
     */
    const hndlMouseEvents = useCallback((show: boolean) => {
        (show) 
            ? showAndAutoHideControls()
            : (clearHideTimeout(), setShowControls(false));
    }, [showAndAutoHideControls, clearHideTimeout]);
    
    
    /**
     * Reset hide timer on user activity
     */
    const hndlUserActivity = useCallback(() => {
        showAndAutoHideControls();
    }, [showAndAutoHideControls]);
    
    
    /**
     * Show controls on click inside parent
     * Ignore clicks on controls
     */
    const hndlClickEvents = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as Node;

        if (controlsRef.current?.contains(target)) return;
        if (parentRef.current?.contains(target)) {
            showAndAutoHideControls();
        }
    }, []);


    /**
     * Hide controls if click outside
     */
    useEffect(() => {
        const hndlClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (controlsRef.current?.contains(target) || parentRef.current?.contains(target)) {
                return;
            }

            setShowControls(false);
            clearHideTimeout();
        };

        document.addEventListener("mousedown", hndlClickOutside);
        return () => document.removeEventListener("mousedown", hndlClickOutside);
    }, []);


    /**
     * Listen for mousemove/mousedown to reset timer
     */
    useEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        parent.addEventListener("mousemove", hndlUserActivity);
        parent.addEventListener("mousedown", hndlUserActivity);

        return () => {
            parent.removeEventListener("mousemove", hndlUserActivity);
            parent.removeEventListener("mousedown", hndlUserActivity);
        };
    }, [hndlUserActivity]);


    /* Cleanup timer on unmount. */
    useEffect(() => clearHideTimeout, [clearHideTimeout]);


    return (
        <div 
            ref={parentRef}
            className="absolute inset-0 w-full h-full overflow-hidden z-20"
            onMouseEnter={() => hndlMouseEvents(true)}
            onMouseLeave={() => hndlMouseEvents(false)}
            onClick={hndlClickEvents}
        >
            <div
                className={`video-controls-cont transition-opacity duration-200 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="controls-gradient-overlay"></div>

                <div ref={controlsRef} className="video-controls flex">
                    <div className="left-controls flex-1">
                        {/* Play/Pause Button */}
                        <Button
                            type="control" 
                            tooltip={isPlaying ? "Pause (k)" : "Play (k)"}
                            icon={isPlaying ? <Pause className="w-auto h-[1.375rem] xl:h-[1.5rem]" /> : <Play className="w-auto h-[1.375rem] xl:h-[1.5rem]" />}
                            onClick={togglePlayPause}
                        />
                    </div>
                    
                    <div className="right-controls">
                        {/* Mute/Unmute Audio Button */}
                        <Button
                            type="control" 
                            tooltip={isMuted ? "Unmute (m)" : "Mute (m)"}
                            icon={isMuted ? <VolumeOff className="w-auto h-[1.375rem] xl:h-[1.5rem]" /> : <Volume2 className="w-auto h-[1.375rem] xl:h-[1.5rem]" />}
                            onClick={toggleMute}
                        />

                        {/* Fullscreen/Exit Fullscreen Button */}
                        <Button
                            type="control" 
                            tooltip={isFullscreen ? "Exit full screen (f)" : "Full screen (f)"}
                            icon={isFullscreen ? <Minimize className="w-auto h-[1.375rem] xl:h-[1.5rem]" /> : <Maximize className="w-auto h-[1.375rem] xl:h-[1.5rem]" />}
                            onClick={toggleFullscreen}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(VideoControls);
