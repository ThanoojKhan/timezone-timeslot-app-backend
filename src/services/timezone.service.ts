import TimezoneModel from "../models/Timezone";
import type { Timezone } from "../types/timezone";
import AppError from "../utils/appError";

export async function getTimezonesService(): Promise<Timezone[]> {
    try {
        const data: Timezone[] = await TimezoneModel.find()
            .select("-_id id name offset iana")
            .lean();

        if (!data.length) {
            throw new AppError({ statusCode: 404, message: "No timezones configured" });
        }

        return data;
    } catch (err) {
        throw new AppError({ statusCode: 500, message: "Failed to fetch timezones", error: err });
    }
}