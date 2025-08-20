/**
 * @metaApi
 * @private
 */
export interface MetaContact {
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    wa_id: string;
    /* eslint-disable-next-line @typescript-eslint/naming-convention -- Names given by Meta */
    user_id: string;
    profile: {
        name: string;
    };
}
