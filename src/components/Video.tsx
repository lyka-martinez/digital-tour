import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check } from 'lucide-react';
import Button from './Button';
import VideoControl from './VideoControl';
import { Room } from "../types";


type VideoProps = {
    room: Room | null;
    facility: string | null;
};

export const Video = ({ room, facility }: VideoProps) => {    
    console.log("Video rendered: ", new Date().toLocaleTimeString());


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);

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


    // Concatenate bed option with room name if available
    const dspRoomName = useMemo(
        () => (room?.bedOptions && selBedOption ? `${room.name} ${selBedOption}` : room?.name || ''),
        [room, selBedOption]
    );


    /* Video controls functions */
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
        <div className="video-cont flex flex-col h-fit w-full relative md-lg:h-full md-lg:p-4 lg:px-6 xl:py-5 xl:px-10 2xl:px-14">
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
                        <VideoControl
                            isPlaying={isPlaying}
                            isMuted={isMuted}
                            isFullscreen={isFullscreen}
                            togglePlayPause={togglePlayPause}
                            toggleMute={toggleMute}
                            toggleFullscreen={toggleFullscreen}
                        />
                    </>
                ) : (
                    <p className="text-brnd-light font-light sm:text-lg xl:text-xl">
                        No video available to play.
                    </p>
                )}
            </div>

            {room && ( 
                <div className="p-4 pb-0 sm:px-5 md-lg:px-0 md-lg:pb-3">
                    <div className="flex flex-col gap-3">
                        {/* Room Name */}
                        <h1 className="font-semibold tracking-wider uppercase mb-1 sm:text-lg md:text-xl lg:text-[1.25rem] 2xl:text-2xl">
                            {dspRoomName}
                        </h1>

                        {/* Bed Options */}
                        {room.bedOptions && (
                            <BedOptions 
                                bedOptions={room.bedOptions} 
                                selBedOption={selBedOption} 
                                onSelect={(type) => type !== selBedOption && setSelBedOption(type)} 
                            />
                        )}

                        {/* Description */}
                        <div>
                            <Description room={room} title={facility} />
                        </div>

                        <div className="divider mt-1 mb-0 md-lg:hidden"></div>
                    </div>
                </div>
            )}
        </div>
    );
}




/* Description Component */
const Description = memo(({ room, title }: { room: Room; title: string | null }) => {
    console.log("Description rendered: ", new Date().toLocaleTimeString());


    return (
        <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-xs">
            <input type="checkbox" className="peer" />
            <div className="collapse-title font-medium text-sm capitalize">
                {title ? `${title} Details` : "Description"}
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
    console.log("BedOptions rendered: ", new Date().toLocaleTimeString());


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
