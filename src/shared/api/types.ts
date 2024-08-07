export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest extends SignInRequest {
    password2: string;
}

export type SuccessResponse = {
    detail: string;
};

export type SignInSuccessResponse = SuccessResponse & {
    token: string;
};
