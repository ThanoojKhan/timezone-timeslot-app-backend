import TimeslotModel from "../models/Timeslot";
import type { Timeslot } from "../types/timeslot";
import AppError from "../utils/appError";

export async function getTimeslotsUTCService(): Promise<string[]> {
    let data: Timeslot[];

    try {
        const result = await TimeslotModel.find()
            .sort({ utcTime: 1 })
            .select("-_id utcTime")
            .lean();

        data = result;
    } catch (err) {
        throw new AppError({ statusCode: 500, message: "Failed to fetch timeslots", error: err });
    }

    if (!data.length) {
        throw new AppError({ statusCode: 404, message: "No timeslots configured" });
    }

    return data.map(d => d.utcTime);
}