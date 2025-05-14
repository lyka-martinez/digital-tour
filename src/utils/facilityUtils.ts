import { Room } from "../types";


/**
 * Maps a facility object to a Room object.
 * @param facility - The facility object to map.
 * @returns A Room object.
 */

export const mapFacilityToRoom = (facility: any): Room => ({
    name: facility.title,
    description: facility.description || "No details available",
    video: facility.video || "",
    images: facility.images || [],
});
