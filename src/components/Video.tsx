import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check } from 'lucide-react';
import Button from './Button';
import VideoControl from './VideoControl';
import { Room, OnboardingStep } from "../types";


type VideoProps = {
    room: Room | null;
};

export const Video = ({ room }: VideoProps) => {    
    // console.log("Video: ", new Date().toLocaleTimeString());


    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("description");

    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);


    const currentVideo = useMemo(() => {
        return (
            room?.bedOptions?.find((option) => option.type === selBedOption)?.video ||
            room?.bedOptions?.[0]?.video ||
            room?.video
        );
    }, [room, selBedOption]);


    useEffect(() => {
        if (room?.bedOptions?.length) {
            setSelBedOption((prev) => prev || room?.bedOptions?.[0]?.type || null);
        }
    }, [room]);


    useEffect(() => {
        if (!videoRef.current || !currentVideo) return;

        const videoElem = videoRef.current;
        const hndlLoadedData = () => {
            videoElem.play().catch(console.error);
            setIsPlaying(true);
        };

        videoElem.src = currentVideo;
        videoElem.addEventListener('loadeddata', hndlLoadedData);
        
        return () => videoElem.removeEventListener('loadeddata', hndlLoadedData);
    }, [currentVideo, room]);


    const dspRoomName = useMemo(
        () => (room?.bedOptions && selBedOption ? `${room.name} ${selBedOption}` : room?.name || ''),
        [room, selBedOption]
    );


    const hndlOnboardingClick = useCallback(() => {
        setOnboardingStep((prev) => {
            if (prev === "description" && room?.description) return "bedOption";
            if (prev === "bedOption" && room?.bedOptions?.length) return null;
            return prev;
        });

        console.log("setOnboardingStep: ", onboardingStep);
    }, [onboardingStep]);


    const isOnboardingStep = useCallback(
        (step: OnboardingStep) => onboardingStep === step,
        [onboardingStep]
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
        <div 
            className="video-cont flex flex-col h-fit w-full relative md-lg:h-full md-lg:p-4 lg:px-6 xl:py-5 xl:px-10 2xl:px-14"
            onClick={hndlOnboardingClick}
        >
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
                <div className="p-4 pb-0 sm:px-5 md-lg:px-0">
                    <div className="flex flex-col gap-3">
                        {/* Room Name */}
                        <h1 className="font-montserrat font-semibold tracking-wide mb-1 sm:text-lg md:text-xl lg:text-[1.375rem]">
                            {dspRoomName}
                        </h1>

                        {/* Bed Options */}
                        {room.bedOptions && (
                            <BedOptions 
                                bedOptions={room.bedOptions} 
                                selBedOption={selBedOption} 
                                onSelect={(type) => type !== selBedOption && setSelBedOption(type)}
                                isOnboardingStep={isOnboardingStep}
                            />
                        )}

                        {/* Description */}
                        <Description 
                            room={room} 
                            isOnboardingStep={isOnboardingStep}
                        />

                        <div className="divider mt-1 mb-0 md-lg:hidden"></div>
                    </div>
                </div>
            )}
        </div>
    );
}




type DescriptionProps = {
    room: Room; 
    isOnboardingStep: (step: OnboardingStep) => boolean;
}

/* Description Component */
const Description = memo(({ room, isOnboardingStep }: DescriptionProps) => {
    // console.log("Description: ", new Date().toLocaleTimeString());


    return (
        <div 
            className={`onboard-section ${isOnboardingStep("description") 
                ? "is-open-onboard tooltip-open tooltip tooltip-accent tooltip-bottom md:tooltip-top" 
                : ""
            }`}
            data-tip={isOnboardingStep("description") ? "Click to expand and view details" : undefined}
        >
            <div className="onboarding-overlay"></div>
        
            <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-xs">
                <input type="checkbox" className="peer" />
                <div className="collapse-title font-medium capitalize text-sm">
                    details
                </div>

                <div className="collapse-content flex flex-col gap-4 text-xs-sm md:text-sm md:gap-5 text-neutral-900">
                    <div className="flex flex-col gap-2 leading-[1.375rem]">
                        <div>{room.description}</div>
                    </div>

                    {room.roomFeatures && room.roomFeatures.length > 0 && (
                        <div>
                            <ul className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
                                {room.roomFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3 mb-[2px]">
                                        <div className="flex items-center h-[1.219rem] sm:h-[1.25rem]">
                                            <Check className="w-auto h-[0.688rem] md-lg:h-[0.75rem]" />
                                        </div>
                                        <div>{feature}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});




/* Bed Options Component */
type BedOptionsProps = {
    bedOptions: { type: string; video: string }[];
    selBedOption: string | null;
    onSelect: (type: string) => void;
    isOnboardingStep: (step: OnboardingStep) => boolean;
}

const BedOptions = memo(({ bedOptions, selBedOption, onSelect, isOnboardingStep }: BedOptionsProps) => {
    // console.log("BedOptions: ", new Date().toLocaleTimeString());


    return (
        <div 
            className={`onboard-section ${isOnboardingStep("bedOption") 
                ? "is-open-onboard tooltip-open tooltip tooltip-accent xs:w-fit sm:tooltip-right" 
                : ""
            }`}
            data-tip={isOnboardingStep("bedOption") ? "Select a bed option to view its video" : undefined}
        >
            <div className="onboarding-overlay"></div>

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
        </div>
    );
});
