import { ICallbackVisitAdditionalJson } from '@shared/convolo-icallback-js/types/i-callback-visit-additional-json';
import { ICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';
import { ICallbackWidgetSettings } from '@shared/convolo-icallback-js/types/i-callback-widget-settings';
import { z } from 'zod';
import { ICallbackWidgetKey } from '@shared/convolo-icallback-js/brands/ICallbackWidgetKey';

export const zBackendScriptResponseDto = z.object({
    success: z.boolean(),
    response: z.object({
        disabled: z.boolean().optional(),
        overrideCallGroup: z.any(),
        overrideCallOrder: z.any(),
        overrideEmail: z.string().optional(),
        overrideSms: z.string().optional(),
        overrideSettings: z.any(),
    }),
});

export type BackendScriptResponseDto = {
    success: boolean;
    response: {
        disabled?: boolean;
        customParams?: Record<ICallbackCustomParamKey, string>;
        overrideCallGroup?: NonNullable<
            ICallbackVisitAdditionalJson['additional_settings']
        >['override_call_group'];
        overrideCallOrder?: NonNullable<
            ICallbackVisitAdditionalJson['additional_settings']
        >['override_call_order'];
        overrideEmail?: string;
        overrideSms?: string;
        overrideSettings?: Partial<ICallbackWidgetSettings['design']>;
        customPreloadScript?: string;
    };
};

export type PreloadBackendScriptResponseDto = {
    success: boolean;
    response: {
        disabled?: boolean;
        widgetKey?: ICallbackWidgetKey;
    };
};
