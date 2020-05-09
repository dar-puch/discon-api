export declare type what = 'artist' | 'label';
export interface Release {
    id: number;
    cover_image: string;
    title: string;
    catno: string;
    year: string;
    artist?: string;
    label?: string[];
}
export interface HistoryItem {
    queryId: string;
    date: string;
    parameters: {
        queryString: string;
        what: what;
    };
    result: Release[];
}
export declare const doFetch: (urlTail: string, method?: string, headers?: HeadersInit, body?: string | null) => Promise<any>;
export declare const search: (query: string, what: what) => Promise<Release[]>;
export declare const getReleaseById: (id: number) => Promise<Release>;
export declare const getHistory: () => Promise<HistoryItem[]>;
export declare const addToHistory: (item: HistoryItem) => Promise<void>;
export declare const removeFromHistory: (id: string) => Promise<void>;
