/** @public */
export interface CommonBuild {
    timestamp: number;
    building: boolean;
    duration: number;
    result?: string;
    fullDisplayName: string;
    displayName: string;
    url: string;
    number: number;
}
/** @public */
export interface JenkinsBuild extends CommonBuild {
    actions: any;
}
