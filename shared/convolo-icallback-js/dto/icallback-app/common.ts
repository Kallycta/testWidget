import { zICallbackVisitStringId } from '@shared/convolo-icallback-js/brands/ICallbackVisitStringId';
import { zBool, zEnum, zObj, zStr } from '@shared/convolo-core/helpers/zod-helpers';
import { z } from 'zod';
import { zDateISOString } from '@shared/convolo-core/common/time-brands/date-iso-string';
import { zICallbackLeadId } from '@shared/convolo-icallback-js/brands/ICallbackLeadId';

export const zDialerAppCallRatingItem = zObj({
    title: zStr,
    positive: zBool,
    type: zEnum(['positive', 'neutral', 'negative']),
    active: zBool,
});

export const zDialerAppCallInfoItem = zObj({
    key: zStr,
    value: zStr,
});

export const zDialerAppCallItem = zObj({
    id: zICallbackVisitStringId,
    name: zStr,
    status: z.enum(['MISSED', 'NO ANSWER', 'ANSWERED', 'FUTURE', 'ON DEMAND', 'IN PROGRESS']),
    email: zStr,
    phoneNumber: zStr,
    rating: z.array(zDialerAppCallRatingItem),
    info: z.array(zDialerAppCallInfoItem),
    comment: zStr,
    date: zDateISOString,
    callType: z.enum(['call', 'callback', 'callthrough']),
    leadId: zICallbackLeadId,
});

export const zDialerAppLeadCallItem = zObj({
    id: zICallbackVisitStringId,
    leadId: zICallbackLeadId.nullable(),
    status: z.enum(['MISSED', 'NO ANSWER', 'ANSWERED', 'FUTURE', 'ON DEMAND', 'IN PROGRESS']),
    phoneNumber: zStr,
    date: zDateISOString,
    recordStarted: z.date().nullable(),
    recordEnded: z.date().nullable(),
    recordingLink: zStr.nullable(),
});

export const zDialerAppLeadItem = zObj({
    id: zICallbackLeadId,
    name: zStr,
    status: z.enum(['MISSED', 'NO ANSWER', 'ANSWERED', 'FUTURE', 'ON DEMAND', 'IN PROGRESS']),
    email: zStr,
    phoneNumber: zStr,
    rating: z.array(zDialerAppCallRatingItem),
    info: z.array(zDialerAppCallInfoItem),
    comment: zStr,
    date: zDateISOString,
    callType: z.enum(['call', 'callback', 'callthrough']),
    calls: z.array(zDialerAppLeadCallItem),
    agentName: zStr.nullable(),
});

export type DialerAppCallItem = z.infer<typeof zDialerAppCallItem>;
export type DialerAppLeadCallItem = z.infer<typeof zDialerAppLeadCallItem>;
export type DialerAppLeadItem = z.infer<typeof zDialerAppLeadItem>;

export const zDialerAppProfile = zObj({
    firstName: zStr,
    lastName: zStr,
    email: zStr,
    phoneNumber: zStr,
    languages: z.array(zStr),
    position: zStr,
});
