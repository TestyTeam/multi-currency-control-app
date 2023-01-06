import type { KyInstance } from 'ky/distribution/types/ky';
export declare function kyS(baseUrl: string, optionalKeys?: {
    hasRetry: boolean;
    hasCache: boolean;
}): KyInstance;
