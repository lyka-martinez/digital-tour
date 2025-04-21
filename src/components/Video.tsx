import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check, Volume2, VolumeOff, Maximize, Minimize } from 'lucide-react';
import { BedOptionButton } from '../components/Buttons';
import { Room } from "../types";

type VideoProps = {
    room: Room | null;
};

export const Video = ({ room }: VideoProps) => {
    console.log("Video:", new Date().toLocaleTimeString());
    
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);


    // Set selBedOption with the first bed option when the room changes
    useEffect(() => {
        if (room?.bedOptions?.length) {
            setSelBedOption((prev) => prev || room?.bedOptions?.[0]?.type || null);
        }
    }, [room]);
    
    
    // Determine the current video source based on the selected bed option or default to the room video
    const currentVideo = useMemo(() => {
        if (selBedOption && room?.bedOptions) {
            return room.bedOptions.find(option => option.type === selBedOption)?.video || room.video;
        }

        return room?.bedOptions?.[0]?.video || room?.video;
    }, [room, selBedOption]);


    // Reload and play the video whenever the current video source changes
    useEffect(() => {
        console.log("Room: ", room?.name, " ", new Date().toLocaleTimeString());
        
        if (videoRef.current && currentVideo) {
            videoRef.current.load();
            videoRef.current.play().catch((err) => console.error("Error playing video:", err));
        }
    }, [currentVideo, room]);
    
    
    const handleBedOptionClick = useCallback((type: string) => {
        if (type === selBedOption) return;
        setSelBedOption(type);
    }, [selBedOption]);

    const clearConsole = useCallback(() => {
        console.clear();
    }, []);


    return (
        <div className="video-cont flex flex-col h-fit w-full relative">
            <div className="video-size flex justify-center items-center relative">
                {room ? (
                    <>
                        <video
                            ref={videoRef}
                            className="h-full w-auto"
                            autoPlay
                            muted
                            loop
                            >
                            <source src={currentVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <div className="video-controls-cont">

                                <div className="video-controls flex justify-end">
                                    <button 
                                        className="btn"
                                        onClick={clearConsole}
                                    >
                                        Clear Log
                                    </button>

                                    {/* Mute/Unmute Audio Button */}
                                    <div className="tooltip" data-tip="Mute">
                                        <label className="swap btn btn-ghost h-[38px] w-[38px] px-1 text-base-100 border-transparent shadow-none hover:bg-neutral-800/80 focus:bg-neutral-800/80 active:bg-neutral-800/80">
                                            <input type="checkbox" defaultChecked />

                                            <Volume2 className="swap-on w-auto h-[20px]" />
                                            <VolumeOff className="swap-off w-auto h-[20px]" />
                                        </label>
                                    </div>

                                    {/* Fullscreen/Exit Fullscreen Button */}
                                    <div className="tooltip" data-tip="Fullscreen">   
                                        <label className="swap btn btn-ghost h-[38px] w-[38px] px-1 text-base-100 border-transparent shadow-none hover:bg-neutral-800/80 focus:bg-neutral-800/80 active:bg-neutral-800/80">
                                            <input type="checkbox" defaultChecked />

                                            <Maximize className="swap-on w-auto h-[20px]" />
                                            <Minimize className="swap-off w-auto h-[20px]" />
                                        </label>
                                    </div>
                                </div>

                                <div className="controls-gradient-overlay"></div>

                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-brnd-light font-light">
                        No video available to play.
                    </p>
                )}
            </div>

            {room && ( 
                <div className="px-4 pt-3">
                    <div className="flex flex-col gap-3">
                        {/* Room Name */}
                        <h1 className="font-semibold">
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

                        <div className="divider mt-1 mb-0"></div>
                    </div>
                </div>
            )}
        </div>
    );
}


// Description Component
const Description = memo(({ room }: { room: Room }) => {
    console.log("Description:", new Date().toLocaleTimeString());

    const [isDescVisible, setIsDescVisible] = useState(false);


    const toggleDescription = useCallback(() => {
        setIsDescVisible((prev) => !prev);
    }, []);


    return (
        <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg">
            <input 
                type="checkbox"
                className="peer"
                onChange={toggleDescription}
                checked={isDescVisible}
            />
            <div className="collapse-title font-medium text-sm capitalize">
                {isDescVisible ? "hide description" : "show description"}
            </div>

            <div className="collapse-content flex flex-col gap-4 text-[13px]">

                <div className="flex flex-col gap-2">
                    <p className="font-bold text-sm text-brnd-secondary hidden">{room.name}</p>

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
                                    <div className="h-[1.219rem] flex items-center">
                                        <Check className="w-auto h-[12px]" />
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


// Bed Options Component
type BedOptionsProps = {
    bedOptions: { type: string; video: string }[];
    selBedOption: string | null;
    onSelect: (type: string) => void;
}

const BedOptions = memo(({ bedOptions, selBedOption, onSelect }: BedOptionsProps) => {
    console.log("BedOptions: ", selBedOption, " ", new Date().toLocaleTimeString());

    return (
        <div className="grid grid-flow-col xs:justify-start gap-2">
            {bedOptions.map((option) => (
                <BedOptionButton
                    key={option.type}
                    text={`${option.type} bed`}
                    icon={option.type === "Queen" 
                        ? <BedSingle className="w-auto h-[18px]" /> 
                        : <BedDouble className="w-auto h-[18px]" />
                    }
                    isActive={selBedOption === option.type}
                    onClick={() => onSelect(option.type)}
                />
            ))}
        </div>
    );
});
