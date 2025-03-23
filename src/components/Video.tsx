import { useEffect, useRef } from "react";
import { Room } from "../types";

type VideoProps = {
    room: Room | null;
};

export function Video({ room }: VideoProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        console.log("Room selected:", room);

        if (videoRef.current) {
            videoRef.current.load();    // Reload the video source
            videoRef.current.play();    // Play the new video
        }
    }, [room]);

    return (
        <div className="flex items-center justify-center h-full w-full overflow-hidden relative">
            {room ? (
                <>
                    <video
                        ref={videoRef}
                        className="h-full w-auto"
                        autoPlay
                        muted
                        loop
                    >
                        <source src={room.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <div className="absolute inset-0 flex flex-col-reverse items-start justify-between gap-4 p-8 text-neutral">
                        <div className="w-full bg-base-100/[.60] rounded-md p-4 flex flex-col gap-2">
                            <p className="font-semibold text-lg">{room.name}</p>
                            <p className="text-base">{room.description}</p>
                        </div>

                        {room.bedOptions && (
                            <div className="flex gap-2">
                                {room.bedOptions.map((option, index) => (
                                    <button key={index} className="btn rounded-md shadow-none">
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-xl text-brnd-light">Select a room to view its video content.</p>
            )}
        </div>
    );
}