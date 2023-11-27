import { ICallbackCustomParamKey } from '@shared/convolo-icallback-js/brands/ICallbackCustomParamKey';

export type CallsResponse = {
    success: true;
    calls: CallModel[];
    data: {
        calls_total: number;
        calls_answered: number;
        calls_no_answer: number;
        calls_missed: number;
        is_more_calls: boolean;
    };
};

export class CallModel {
    id: number;
    call_id: string;
    username: string;
    widget_name: string;
    widget_id: number;
    url: string;
    client_number: string;
    time_created: Date | null;
    record_link: string | null;
    status: string;
    time_future: Date | null;
    time_started: Date | null;
    time_answered: Date | null;
    time_lead_answered: Date | null;
    operator_number: string | null;
    operator_name: string | null;
    time_ended: Date | null;
    details?: string;
    ip?: string;
    events?: string;
    result_client?: string;
    result_operator?: string;
    data_source?: string;
    referer?: string;
    source?: string;
    campaign?: string;
    technical_comment?: string;
    technical_rating?: number;
    disconnected_by?: 'lead' | 'agent' | null;
    hidden_custom_fields: ICallbackCustomParamKey[];
}

export interface CallViewModel extends CallModel {
    start_time_view: string;
    operator_answer_time_view: string;
    lead_answered_time_view: string;
    talk_time_view: string;
    operator_view: string;
    status_view: string;
    record_link_view: string;
    result_client_view?: string;
    result_operator_view?: string;
    referer_view?: string;
    source_view?: string;
    campaign_view?: string;
    url_view: string;
    enumerate: string;
    showInfoFunc: any;
}

export class CallDetail {
    // noinspection JSUnusedGlobalSymbols
    constructor(
        public id: number,
        public call_id: string,
        public widget_name: string,
        public widget_id: string,
        public url: string,
        public client_number: string,
        public time_created: Date | null,
        public record_link: string,
        public status: string,
        public time_future: Date | null,
        public time_started: Date | null,
        public time_answered: Date | null,
        public time_lead_answered: Date | null,
        public operator_number: string,
        public operator_name: string,
        public time_ended: Date | null,
        public visit_str: string,
        public visit_stat: string,
    ) {}
}
