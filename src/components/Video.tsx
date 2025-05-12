import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check, Images, X } from 'lucide-react';
import Button from './Button';
import VideoControl from './VideoControl';
import { Room, OnboardingStep } from "../types";


type VideoProps = {
    room: Room | null;
};


/* Main Video component for displaying room video and details. */
export const Video = ({ room }: VideoProps) => {    
    // console.log("Video: ", new Date().toLocaleTimeString());

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [selBedOption, setSelBedOption] = useState<string | null>(null);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>("description");

    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false)


    /**
     * Determine which video to play based on selected bed option
     */
    const currentVideo = useMemo(() => {
        return (
            room?.bedOptions?.find((option) => option.type === selBedOption)?.video || 
            room?.video || ""
        );
    }, [room, selBedOption]);


    /**
     * Set default bed option on room change
     */
    useEffect(() => {
        if (room?.bedOptions?.length) {
            setSelBedOption((prev) => prev || room?.bedOptions?.[0]?.type || null);
        }
    }, [room]);


    /**
     * Load and play video when source changes
     */
    useEffect(() => {
        if (!videoRef.current || !currentVideo) return;

        const videoElem = videoRef.current;
        
        const hndlLoadedData = () => {
            videoElem.play().catch(console.error);
            setIsPlaying(true);
        };

        videoElem.src = currentVideo;
        videoElem.muted = isMuted;
        videoElem.addEventListener('loadeddata', hndlLoadedData);
        
        return () => videoElem.removeEventListener('loadeddata', hndlLoadedData);
    }, [currentVideo, room]);


    /* Displayed room name with bed option. */
    const dspRoomName = useMemo(
        () => (room?.bedOptions && selBedOption ? `${room.name} ${selBedOption}` : room?.name || ''),
        [room, selBedOption]
    );
    
    
    /* Handle onboarding step click. */
    const hndlOnboardingClick = useCallback(() => {
        setOnboardingStep((prev) => {
            switch (prev) {
                case "description": return "bedOption";
                case "bedOption": return null;
                default: return prev;
            }
        });
    }, [room?.bedOptions?.length]);


    /**
     * Check if onboarding step is active
     */
    const isOnboardingStep = useCallback(
        (step: OnboardingStep) => onboardingStep === step,
        [onboardingStep]
    );


    /* Toggle mute state. */
    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    }, [isMuted]);
    
    
    /* Toggle play/pause state. */
    const togglePlayPause = useCallback(() => {
        if (!videoRef.current) return;
        
        (isPlaying) 
            ? videoRef.current.pause() 
            : videoRef.current.play().catch(console.error);
        
        setIsPlaying((prev) => !prev);
    }, [isPlaying]);
    
    
    /* Toggle fullscreen state. */
    const toggleFullscreen = useCallback(() => {
        const videoCont = videoRef.current?.parentElement;
        if (!videoRef.current) return;
        
        (!document.fullscreenElement) 
            ? videoCont?.requestFullscreen().catch(console.error)
            : document.exitFullscreen().catch(console.error);
        
        setIsFullscreen((prev) => !prev);
    }, [isFullscreen]);


    /**
     * Listen for fullscreen changes and update state
     */
    useEffect(() => {
        const hndlFullscreenChng = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", hndlFullscreenChng);
        return () => document.removeEventListener("fullscreenchange", hndlFullscreenChng);
    }, []);
    
    
    /* Handle keyboard shortcuts. */
    useEffect(() => {
        const hndlKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) return;

            switch (e.key.toLowerCase()) {
                case " ":
                case "k":
                    e.preventDefault();
                    togglePlayPause();
                    break;
                case "m":
                    e.preventDefault();
                    toggleMute();
                    break;
                case "f":
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                default: break;
            }
        };

        window.addEventListener("keydown", hndlKeyDown);
        return () => window.removeEventListener("keydown", hndlKeyDown);

    }, [togglePlayPause, toggleMute, toggleFullscreen, isFullscreen]);


    return (
        <div 
            className="video-cont flex flex-col h-fit w-full md-lg:h-full md-lg:p-4 lg:px-6 xl:py-5 xl:px-10 2xl:px-14"
            onClick={onboardingStep && 
                ((onboardingStep === "description" && room?.description) || 
                (onboardingStep === "bedOption" && room?.bedOptions?.length)) 
                    ? hndlOnboardingClick 
                    : undefined
            }
        >
            <div 
                className={`video-size flex justify-center items-center sticky top-0 overflow-hidden sm:relative ${!isFullscreen 
                    ? 'md-lg:rounded-lg' 
                    : ''
                }`}
            >
                {room && currentVideo ? (
                    <>
                        <video
                            ref={videoRef}
                            className="h-full w-auto"
                            controls={false}
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

                        <div className="flex flex-col gap-3">
                            {/* Bed Options */}
                            {room.bedOptions && (
                                <BedOptions 
                                bedOptions={room.bedOptions} 
                                selBedOption={selBedOption} 
                                onSelect={(type) => type !== selBedOption && setSelBedOption(type)}
                                isOnboardingStep={isOnboardingStep}
                                />
                            )}

                            {/* View Image Button */}
                            <div className="grid grid-flow-col">
                                <button 
                                    className="btn font-medium rounded-lg shadow-xs text-brnd-secondary bg-base-100 border-transparent hover:bg-base-100/40"
                                    onClick={() => {
                                        const modal = document.getElementById('carousel-cont') as HTMLDialogElement | null;
                                        if (modal) modal.showModal();
                                    }}
                                >
                                    <Images className="w-auto h-[1.125rem]" />
                                    View Images
                                </button>

                                <dialog id="carousel-cont" className="modal">
                                    <div className="modal-box size-full max-w-full rounded-none">
                                        
                                        {/* if there is a button in form, it will close the modal */}
                                        <form method="dialog">
                                            <button className="btn btn-circle btn-ghost absolute right-2 top-2">
                                                <X />
                                            </button>
                                        </form>
                                        
                                        <h3 className="font-bold text-lg">Carousel Template</h3>
                                        <p className="py-4">Press ESC key or click on ✕ button to close [changes made]</p>
                                    
                                    </div>
                                </dialog>
                            </div>
                        </div>

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


/* Description section for room details. */
const Description = memo(({ room, isOnboardingStep }: DescriptionProps) => {
    // console.log("Description: ", new Date().toLocaleTimeString());

    return (
        <div 
            className={`onboard-section ${isOnboardingStep("description") 
                ? "is-open-onboard tooltip-open tooltip tooltip-brnd-primary tooltip-bottom md:tooltip-top rounded-lg outline outline-brnd-light/60 outline-offset-4" 
                : ""
            }`}
            data-tip={isOnboardingStep("description") ? "Click to expand and view details" : undefined}
        >
            <div className="onboarding-overlay"></div>
        
            <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg shadow-xs">
                <input type="checkbox" className="peer" defaultChecked />
                <div className="collapse-title font-semibold capitalize text-sm">
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




/* Bed options selector for rooms with multiple bed types. */
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
                ? "is-open-onboard tooltip-open tooltip tooltip-brnd-primary xs:w-fit sm:tooltip-right rounded-lg outline outline-brnd-light/60 outline-offset-4" 
                : ""
            }`}
            data-tip={isOnboardingStep("bedOption") ? "Choose a bed type to view its video" : undefined}
        >
            <div className="onboarding-overlay"></div>

            <div className="grid grid-flow-col xs:justify-start gap-2">
                {bedOptions.map((option) => (
                    <Button
                        key={option.type}
                        type="bedOption"
                        text={`${option.type} Bed`}
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
