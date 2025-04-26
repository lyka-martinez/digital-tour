import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check, Volume2, VolumeOff, Maximize, Minimize, Play, Pause } from 'lucide-react';
import Button from './Buttons';
import { Room } from "../types";


type VideoProps = {
    room: Room | null;
};

export const Video = ({ room }: VideoProps) => {    
    console.log("Room: ", room?.name, " ", new Date().toLocaleTimeString());


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);

    const [showControls, setShowControls] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    
    // Determine the current video source based on the selected bed option or default to the room video
    const currentVideo = useMemo(() => {
        if (selBedOption && room?.bedOptions) {
            return room.bedOptions.find(option => option.type === selBedOption)?.video || room.video;
        }

        return room?.bedOptions?.[0]?.video || room?.video;
    }, [room, selBedOption]);


    // Set selBedOption with the first bed option when the room changes
    useEffect(() => {
        if (room?.bedOptions?.length) {
            setSelBedOption((prev) => prev || room?.bedOptions?.[0]?.type || null);
        }
    }, [room]);


    // Reload and play the video whenever the current video source changes
    useEffect(() => {
        if (!videoRef.current || !currentVideo) return;

        videoRef.current.src = currentVideo;
        videoRef.current.play().catch(console.error);
    }, [currentVideo, room]);


    const handleBedOptionClick = useCallback((type: string) => {
        if (type !== selBedOption) setSelBedOption(type);
    }, [selBedOption]);


    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;

        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }, [isMuted]);


    const togglePlayPause = useCallback(() => {
        if (!videoRef.current) return;

        (isPlaying) 
            ? videoRef.current.pause() 
            : videoRef.current.play().catch(console.error);

        setIsPlaying((prev) => !prev);
    }, [isPlaying]);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev);

        console.log("Fullscreen: ", !isFullscreen);
    }, [isFullscreen]);



    return (
        <div className="video-cont flex flex-col h-fit w-full relative md-lg:h-full md-lg:p-4 lg:px-6 xl:px-10 2xl:px-12">
            <div className="video-size flex justify-center items-center sticky top-0 overflow-hidden sm:relative md-lg:rounded-lg">
                {room ? (
                    <>
                        <video
                            ref={videoRef}
                            className="h-full w-auto"
                            autoPlay
                            loop
                        >
                            <source src={currentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Video Controls */}
                        <div 
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            onMouseEnter={() => setShowControls(true)}
                            onMouseLeave={() => setShowControls(false)}
                        >
                            <div 
                                className={`video-controls-cont transition-opacity ${
                                    showControls ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
                            }`}>

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
                    </>
                ) : (
                    <p className="text-brnd-light font-light sm:text-lg xl:text-xl">
                        No video available to play.
                    </p>
                )}
            </div>

            {room && ( 
                <div className="px-4 pt-3 sm:px-5 md-lg:px-0 md-lg:pb-3">
                    <div className="flex flex-col gap-3">
                        {/* Room Name */}
                        <h1 className="font-semibold mb-1 sm:text-lg lg:text-xl xl:text-2xl">
                            {room.name}
                        </h1>

                        {/* Bed Options */}
                        {room.bedOptions && (
                            <BedOptions 
                                bedOptions={room.bedOptions} 
                                selBedOption={selBedOption} 
                                onSelect={handleBedOptionClick} 
                            />
                        )}

                        {/* Description */}
                        <div>
                            <Description room={room} />
                        </div>

                        <div className="divider mt-1 mb-0 md-lg:hidden"></div>
                    </div>
                </div>
            )}
        </div>
    );
}




/* Description Component */
const Description = memo(({ room }: { room: Room }) => {    
    const [isDescVisible, setIsDescVisible] = useState(false);


    const toggleDescription = useCallback(() => {
        setIsDescVisible((prev) => !prev);
    }, []);


    return (
        <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-xs">
            <input 
                type="checkbox"
                className="peer"
                onChange={toggleDescription}
                checked={isDescVisible}
            />
            <div className="collapse-title font-medium text-sm capitalize">
                {isDescVisible ? "hide description" : "show description"}
            </div>

            <div className="collapse-content flex flex-col gap-4 text-xs-sm sm:text-sm">

                <div className="flex flex-col gap-2">
                    {room.description && (
                        <div>{room.description}</div>
                    )}
                </div>

                {room.roomFeatures && room.roomFeatures.length > 0 && (
                    <div>
                        <p className="font-medium tracking-wide pb-1">Room Features:</p>

                        <ul className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
                            {room.roomFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <div className="flex items-center h-[1.219rem] sm:h-[1.25rem]">
                                        <Check className="w-auto h-[0.75rem]" />
                                    </div>
                                    <div>{feature}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>
        </div>
    );
});




/* Bed Options Component */
type BedOptionsProps = {
    bedOptions: { type: string; video: string }[];
    selBedOption: string | null;
    onSelect: (type: string) => void;
}

const BedOptions = memo(({ bedOptions, selBedOption, onSelect }: BedOptionsProps) => {
    return (
        <div className="grid grid-flow-col xs:justify-start gap-2">
            {bedOptions.map((option) => (
                <Button
                    key={option.type}
                    type="bedOption"
                    text={`${option.type} bed`}
                    icon={option.type === "Queen" 
                        ? <BedSingle className="w-auto h-[1.125rem]" /> 
                        : <BedDouble className="w-auto h-[1.125rem]" />
                    }
                    isActive={selBedOption === option.type}
                    onClick={() => onSelect(option.type)}
                />
            ))}
        </div>
    );
});
