// import { useState, useCallback } from "react";
import { FacilityButton } from "./Buttons";
// import { Room } from "../types";

// import facilities from "../data/facilities.json";

export const Facility = () => {
    console.log("Facility rendered:", new Date().toLocaleTimeString());


    return (
        <div className="facility-cont px-4 py-3">
            <div className="flex flex-col gap-2">

                <div className="tabs tabs-border">
                    <input type="radio" name="facilities_tabs" className="tab" aria-label="Room" defaultChecked />
                    <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5">

                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                            <FacilityButton
                                text={'Deluxe Classic'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Deluxe Premium'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Premier'}
                                isActive={true}
                            />

                            <FacilityButton
                                text={'Suite'}
                                isActive={false}
                            />
                        </div>

                    </div>

                    <input type="radio" name="facilities_tabs" className="tab " aria-label="Amenities" />
                    <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5">

                        {/* Facilities Item Button */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                            <FacilityButton
                                text={'Function Room'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Swimming Poolsss'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Jacuzzi'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Fitness Center'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Game Room'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Mini Golf'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={`Children's Playground`}
                                isActive={false}
                            />
                        </div>

                    </div>

                    <input type="radio" name="facilities_tabs" className="tab " aria-label="Arrival Experience" />
                    <div className="tab-content rounded-xl border-base-300 bg-base-100 px-4 py-5">

                        {/* Facilities Item Button */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                            <FacilityButton
                                text={'Front Office'}
                                isActive={false}
                            />

                            <FacilityButton
                                text={'Elevator'}
                                isActive={false}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
