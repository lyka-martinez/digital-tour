export function Video() {
    return(
        <>
            <div>
                <video 
                    className="rounded-[16px] w-full h-[36.1875rem]" 
                    autoPlay 
                    muted 
                    loop
                >
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                </video>
            </div>
        </>
    );
}