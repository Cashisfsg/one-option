export interface FetchUserDataResponse {
    nickname: string;
    email: string;
    photo?: string;
    level?: number;
    ftd_count: number;
    sub_ref?: string;
    next_level?: number;
}

export interface FetchUserBalanceResponse {
    total_income: string;
    income_oborot: string;
    income_doxod: string;
}

export interface AuthenticateUserRequest {
    email: string;
    password: string;
}

export interface UpdateUserDataRequest {
    nickname: string;
    email?: string;
}

export interface UpdateUserDataResponse {
    details: string;
}

export interface UpdateUserPhotoRequest {
    photo: string;
}
