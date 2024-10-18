export interface FetchReferenceStatisticResponse {
    all_click: 0;
    register_count: 0;
    deposit: string;
    ftd_count: 0;
    ftd_sum: string;
    witdraw_ref: string;
    oborot: string;
}

type Frequency = "daily" | "weekly" | "monthly";

export interface FetchReferenceChartDataRequest {
    frequency: Frequency;
}

export interface FetchReferenceChartDataResponse {
    clicks: number;
    register_count: number;
    ftd_count: number;
    day?: string;
}

export type FetchReferenceActivityDataResponse = {
    id: string;
    email: string;
    deposit: string;
    withdraw: string;
    oborot: string;
    balance: string;
    profit: string;
    doxod_procent: number;
    nickname: string;
    flag_photo: string;
}[];
