/// <reference types="react" />
export declare enum ErrorType {
    CONNECTION_ERROR = 0,
    NOT_FOUND = 1
}
export declare function useJobRuns(jobFullName: string): readonly [{
    readonly page: number;
    readonly pageSize: number;
    readonly loading: boolean;
    readonly jobRuns: import("../api/JenkinsApi").Job | undefined;
    readonly error: {
        message: string;
        errorType: ErrorType;
    } | undefined;
}, {
    readonly setPage: import("react").Dispatch<import("react").SetStateAction<number>>;
    readonly setPageSize: import("react").Dispatch<import("react").SetStateAction<number>>;
}];
