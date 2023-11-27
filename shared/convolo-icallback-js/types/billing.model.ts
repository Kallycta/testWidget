import { UserId } from '@shared/convolo-core/brands/user-id';

export enum BillingCurrency {
    // noinspection JSUnusedGlobalSymbols
    SEK = 'SEK',
    AED = 'AED',
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
}

export class BillingModel {
    id: number = -1;
    lcUserId: UserId;
    currency: BillingCurrency;
    startDate: Date;
    billingPeriod: number;
    agreementPeriod: number;
    paymentTerms: number;
    callsIncluded: number;
    smsIncluded: number;
    extraCallPrice: number;
    extraSmsPrice: number;
    extraDomainPrice: number;
    minInvoice: number;
    credit: number = 0;
    balance: number = 0;
    checkDate: Date | null;
    lcUserLogin: string;
    checkouts: MonthlyCheckoutModel[];

    domainsIncluded: number;
    lcPrice: number;

    companyName: string;
    organisationNumber: string;
    VATNumber: string;
    invoiceAddress: string;
    preSalesChannel: string;
    service: string;
    autoRenewalDate: Date;
    MRRSEK: number;
    nextOrderValueSEK: number;
    invoiceEmail: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    prepayAmount: number;
    isCancelled: boolean;
    partner: string;

    constructor(data: Partial<BillingModel> = {}) {
        Object.assign(this, data);
    }
}

export class MonthlyCheckoutModel {
    id: number;
    checkoutDate: Date;
    startDate: Date;
    endDate: Date;
    callsTotal: number;
    callsExtra: number;
    smsTotal: number;
    smsExtra: number;
    domainsTotal: number;
    domainsExtra: number;
    extraCharge: number;
    isExtraInvoiced: boolean;
    oldCredit: number;
    newCredit: number;

    constructor(data: Partial<MonthlyCheckoutModel> = {}) {
        Object.assign(this, data);
    }
}
