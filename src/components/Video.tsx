// import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { BedSingle, BedDouble, Check, Volume2, VolumeOff, Maximize, Minimize } from 'lucide-react';
import { BedOptionButton } from '../components/Buttons';
// import { Room } from "../types";

export const Video = () => {
    console.log("Video rendered:", new Date().toLocaleTimeString());


    return (
        <div className="video-cont flex flex-col h-fit w-full relative">
            <div className="video-size flex justify-center relative">
                <video
                    className="h-full w-auto"
                    autoPlay
                    muted
                    loop
                >
                    <source src={`./videos/premier-twin.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <div className="video-controls-cont">

                        <div className="video-controls flex justify-end">
                            {/* Mute/Unmute Audio Button */}
                            <div className="tooltip" data-tip="Mute">
                                <label className="swap btn btn-ghost h-[38px] w-[38px] px-1 text-base-100 border-transparent shadow-none hover:bg-neutral-800/80 focus:bg-neutral-800/80 active:bg-neutral-800/80">
                                    <input type="checkbox" defaultChecked />

                                    {/* volume on icon */}
                                    <Volume2 className="swap-on w-auto h-[20px]" />     

                                    {/* volume off icon */}
                                    <VolumeOff className="swap-off w-auto h-[20px]" />
                                </label>
                            </div>

                            {/* Fullscreen/Exit Fullscreen Button */}
                            <div className="tooltip" data-tip="Fullscreen">   
                                <label className="swap btn btn-ghost h-[38px] w-[38px] px-1 text-base-100 border-transparent shadow-none hover:bg-neutral-800/80 focus:bg-neutral-800/80 active:bg-neutral-800/80">
                                    <input type="checkbox" defaultChecked />

                                    {/* fullscreen icon */}
                                    <Maximize className="swap-on w-auto h-[20px]" />

                                    {/* exit fullscreen icon */}
                                    <Minimize className="swap-off w-auto h-[20px]" />
                                </label>
                            </div>
                        </div>

                        <div className="controls-gradient-overlay"></div>

                    </div>
                </div>
            </div>

            <div className="px-4 pt-3">
                <div className="flex flex-col gap-3">
                    {/* Room Name */}
                    <h1 className="font-semibold">
                        Premier Room
                    </h1>

                    {/* Bed Options */}
                    <div className="grid grid-flow-col xs:justify-start gap-2">
                        <BedOptionButton
                            text={'Queen bed'}
                            icon={<BedSingle className="w-auto h-[18px]" />}
                            isActive={true}
                            />

                        <BedOptionButton
                            text={'Twin bed'}
                            icon={<BedDouble className="w-auto h-[18px]" />}
                            isActive={false}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <div className="collapse room-details collapse-arrow bg-base-100 border border-base-300 rounded-lg">
                            <input type="checkbox" />
                            <div className="collapse-title font-medium text-sm capitalize">Description</div>
                            <div className="collapse-content flex flex-col gap-4 text-[13px]">

                                <div className="flex flex-col gap-2">
                                    <p className="font-bold text-sm text-brnd-secondary hidden">Premier Room</p>
                                    <div>
                                        Find all the essentials plus a little extra in our Premier Rooms. It comes with additional bathroom amenities and optional kitchenware, perfect for those who are looking for extended business or leisure stays.
                                    </div>
                                </div>

                                <div>
                                    <p className="font-medium tracking-wide pb-1">Room Features:</p>

                                    <ul className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">   
                                        <li key={`0`} className="flex items-start gap-2">
                                            <div className="h-[1.219rem] flex items-center">
                                                <Check className="w-auto h-[12px]" />
                                            </div>
                                            <div>29 to 35 sqm</div>
                                        </li>

                                        <li key={`1`} className="flex items-start gap-2">
                                            <div className="h-[1.219rem] flex items-center">
                                                <Check className="w-auto h-[12px]" />
                                            </div>
                                            <div>1 queen bed / 2 twin beds"</div>
                                        </li>

                                        <li key={`2`} className="flex items-start gap-2">
                                            <div className="h-[1.219rem] flex items-center">
                                                <Check className="w-auto h-[12px]" />
                                            </div>
                                            <div>Stable internet connection</div>
                                        </li>

                                        <li key={`3`} className="flex items-start gap-2">
                                            <div className="h-[1.219rem] flex items-center">
                                                <Check className="w-auto h-[12px]" />
                                            </div>
                                            <div>Dining area with 2-piece dinnerware set</div>
                                        </li>

                                        <li key={`4`} className="flex items-start gap-2">
                                            <div className="h-[1.219rem] flex items-center">
                                                <Check className="w-auto h-[12px]" />
                                            </div>
                                            <div>Mini refrigerator</div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="divider mt-1 mb-0"></div>
                </div>
            </div>
        </div>
    );
}
