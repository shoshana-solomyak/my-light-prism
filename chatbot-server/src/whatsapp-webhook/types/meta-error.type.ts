/**
 * @metaApi
 * @private
 */
export interface MetaError {
    code: number;
    title: string;
    message: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    error_data: {
        details: string;
    };
}
