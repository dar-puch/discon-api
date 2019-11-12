export declare type what = 'artist' | 'label';
export interface Release {
    id: number;
    cover_image: string;
    title: string;
    catno: string;
    year: number;
    artist?: string;
    label?: string;
}
export declare const search: (query: string, what: what) => Promise<{
    releases: Release[];
}>;
export declare const getReleasesById: (labelID: number, what: what) => Promise<{
    releases: Release[];
}>;
