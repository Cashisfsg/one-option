export interface FetchUserDataResponse {
    first_name: string;
    last_name: string;
    email: string;
    photo?: string;
    level?: number;
    ftd_count: number;
}

export interface AuthenticateUserRequest {
    email: string;
    password: string;
}
