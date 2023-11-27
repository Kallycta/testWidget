import { ICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';

export type ResultScriptResponseDto = {
    success: boolean;
    response: {
        customParams?: Record<ICallbackCustomParamKey, string>;
        comment?: string;
    };
};
