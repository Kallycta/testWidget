import { currentVersion } from './Versions';
import { z } from 'zod';
import { zArrObj } from '@shared/convolo-core/helpers/zod-helpers';
import {
    BackgroundType,
    ButtonBorderAnimationType,
    ButtonType,
    DesktopButtonPosition,
    DesktopTooltipPosition,
    EventType,
    FontWeight,
    MobileButtonPosition,
    MobilePositionTextInOpenButton,
    MobileTooltipPosition,
    MobileType,
    MockNonWorkingTimeType,
    MockStateType,
    TemplateType,
    TooltipPosition,
    TooltipType,
} from './WidgetSettingsEnums';

export const zFormItem = z.object({
    title: z.string(),
    okText: z.string(),
    name: z.string(),
    type: z.string(),
});

export type FormItem = z.infer<typeof zFormItem>;

export const zICallbackWidgetDesignSettings = z.object({
    version: z.literal(currentVersion),
    isActive: z.boolean(),
    secondsToGo: z.number(),
    nonWorkingTime: z.boolean(),
    onDemand: z.boolean(),
    spaEnabled: z.boolean(),
    widgetDisabled: z.boolean().optional(),
    spaFullTime: z.boolean().optional(),
    widgetTexts: z.object({
        tipText: z.string(),
        nonWorkingTipText: z.string(),
        userName: z.string(),
        userPosition: z.string(),
        title: z.string(),
        subTitle: z.string(),
        text: z.string(),
        departmentSelectorFirstLine: z.string(),
        departmentSelectorSecondLine: z.string(),
        timeSelectorFirstLine: z.string(),
        timeSelectorSecondLine: z.string(),
        nonWorkingTitle: z.string(),
        nonWorkingSubTitle: z.string(),
        nonWorkingText: z.string(),
        chooseTimeYouWillBeCalled: z.string(),
        chooseTimeButton: z.string(),
        afterOrderingTitle: z.string(),
        afterOrderingText: z.string(),
        managerTryingToReachYou: z.string(),
        enterYourPhone: z.string(),
        callingTo: z.string(),
        pleasePickUp: z.string(),
        successfullyReached: z.string(),
        rateAgent: z.string(),
        fillFormBelowTitle: z.string(),
        fillFormBelowSubTitle: z.string(),
        cantReach: z.string(),
        defaultMessage: z.string(),
        weCallYouLater: z.string(),
        weCallYouLaterIn: z.string(),
        callMe: z.string(),
        callIsFree: z.string(),
        closeWindow: z.string(),
        chooseDepartment: z.string(),
        numberWrong: z.string(),
        countryWrong: z.string(),
        gdprBeforeLinkText: z.string(),
        gdprLinkText: z.string(),
        selectDepartmentButton: z.string(),
        phoneNumberExample: z.string(),
        ratingTextAreaPlaceholderText: z.string(),
        ratingDescription: z.string(),
        ratingCloseWindowButton: z.string(),
        press: z.string(),
        enter: z.string(),
        mobileTipText: z.string(),
    }),
    poweredUrl: z.string(),
    formItems: z.array(zFormItem),
    staticUrl: z.string(),
    url: z.string(),
    widgetStyles: z.object({
        modalOpacity: z.string(),
        avatarUrl: z.string(),
        avatarBlockHeight: z.string(),
        avatarWidth: z.string(),
        avatarMobileWidth: z.string(),

        logoUrl: z.string(),
        logoWidth: z.string(),
        logoHeight: z.string(),
        logoBottomGap: z.string(),

        imageBg: z.string(),
        imageBgHeight: z.string(),
        activeColor: z.string(),
        baseFontFamily: z.string(),
        titleFontFamily: z.string(),
        subTitleFontFamily: z.string(),
        subtitleAccentColor: z.string(),
        titleFontSize: z.string(),
        titleFontWeight: z.nativeEnum(FontWeight),
        titleLineHeight: z.string(),
        titleMarginBottom: z.string(),
        subTitleFontSize: z.string(),
        subTitleFontWeight: z.nativeEnum(FontWeight),
        subTitleLineHeight: z.string(),
        selectTimeLinkColor: z.string(),
        powerByColor: z.string(),
        poweredIsShow: z.boolean(),
        poweredByText: z.string(),
        poweredUnderlineIsShow: z.boolean(),
        poweredUnderlineColor: z.string(),
        poweredSvgFill: z.string(),
        poweredSvgHeight: z.string(),
        poweredSvgWidth: z.string(),
        customPoweredIcon: z.string().optional(),
        sectionBgColor: z.string(),

        baseFontSize: z.string(),
        baseColor: z.string(),
        secondaryColorHue: z.number(), // Just hue value in hsl scheme
        borderRadius: z.string(),
        modalBorderRadius: z.string(),
        sectionBorderRadius: z.string(),
        elementBorderRadius: z.string(),
        template: z.nativeEnum(TemplateType),
        backgroundType: z.nativeEnum(BackgroundType),
        avatarBorderRadius: z.string(),

        modalBgColor: z.string(),
        modalMinHeight: z.string(),
        backdropImage: z.string(),
        backdropBgColor: z.string(),
        bannerImage: z.string(),

        // new design
        headerHeightDefaultTemplate: z.string(), // for no portrait
        headerBgColor: z.string(),
        headerBgShadow: z.string(),
        headerPrimaryColor: z.string(),
        headerSecondaryColor: z.string(),
        primaryTextColor: z.string(),
        secondaryTextColor: z.string(),
        primaryColor: z.string(),
        defaultActiveColor: z.string(),
        imageBgWaveOn: z.boolean(),
        departmentsDropdownSelector: z.boolean(),
        departmentsSelectorBeforePhoneField: z.boolean(),

        // TODO: consider widget behaviour block
        allowChoosingTime: z.boolean(),
        openTimeSelectorForNonworkingTimeByDefault: z.boolean(),
        chooseTimeOnlyNonWorkingTime: z.boolean(),
        showAfterMS: z.number(),
        cooldownWhenLeavingMS: z.number(),
        useTimer: z.boolean(),
        useTimerMilliseconds: z.boolean(),

        useGDPR: z.boolean(),
        gdprLink: z.string(),

        showAvatarInModal: z.boolean(),
        showAvatarInNonworkingTime: z.boolean(),

        onlyCountries: z.string(),
        isSetRating: z.boolean(),
        isSetRatingUnreachable: z.boolean(),
        ratingTagButtonBorderRadius: z.string(),
        ratingTagButtonColor: z.string(),
        ratingActiveTagButtonColor: z.string(),
        ratingTagButtonBackgroundColor: z.string(),
        ratingActiveTagButtonBackgroundColor: z.string(),
        ratingTagsHeight: z.string(),
        disableExternalCss: z.boolean(),
        isSendLeadForm: z.boolean(),
        leadFormModalBackground: z.string(),
        leadFormModalBorderRadius: z.string(),
        leadFormElementBorderRadius: z.string(),
        leadFormTextColor: z.string(),
        leadFormInputBackground: z.string(),
        leadFormInputColor: z.string(),
        leadFormEnterTextVisible: z.boolean(),
        leadFormButtonBackground: z.string(),
        leadFormButtonColor: z.string(),
        leadFormButtonActiveColor: z.string(),
        leadFormButtonActiveBackground: z.string(),
        leadFormButtonDisActiveBackground: z.string(),
        leadFormInputColorPlaceholderColor: z.string(),
        ratingTextAreaPlaceholderColor: z.string(),
        mobileStyles: z.nativeEnum(MobileType),
        mobileUseMobileStyles: z.boolean(),
        mobilePositionTextInOpenButton: z.nativeEnum(MobilePositionTextInOpenButton),
        mobileWidgetTooltipCloseFontSize: z.string(),
        mobileTooltipSideSize: z.string(),
        mobileTooltipSideWidth: z.string(),
        mobileUseMobileAnimationTextButtonShow: z.boolean(),
        mobileFullTooltipAfterHide: z.boolean(),
        mobileFullTooltipBeforeHide: z.boolean(),
        mobileFillBottomCornerRadius: z.string(),
        mobileFillBottomBackgroundColor: z.string(),
        mobileWidgetButtonStylesWidth: z.string(),
        mobileWidgetButtonStylesHeight: z.string(),
        mobileWidgetButtonStylesZIndex: z.string(),
        mobileHeightContainer: z.string(),
        mobileFillBottomCloseButtonColor: z.string(),
        mobileFillBottomCloseButtonFontSize: z.string(),
        mobilButtonBorderRadius: z.string(),
        mobileButtonOpenTextWidth: z.string(),
        mobileButtonBackgroundIconContainer: z.string(),
    }),
    buttonStyles: z.object({
        buttonTemplate: z.nativeEnum(ButtonType),

        buttonPositionTop: z.string(),
        buttonPositionRight: z.string(),
        buttonPositionBottom: z.string(),
        buttonPositionLeft: z.string(),

        mobileButtonPositionX: z.string(),
        mobileButtonPositionY: z.string(),
        desktopButtonPositionX: z.string(),
        desktopButtonPositionY: z.string(),

        buttonCustomImage: z.string(),
        buttonColorShiftAnimation: z.boolean(),

        buttonColor: z.string(),
        buttonPulseColor: z.string(),
        buttonBgColor: z.string(),

        buttonBorderRadius: z.string(),

        buttonBorderAnimation: z.nativeEnum(ButtonBorderAnimationType),

        buttonSize: z.string(),
        buttonIcon: z.number(),

        mobileButtonPosition: z.nativeEnum(MobileButtonPosition),
        desktopButtonPosition: z.nativeEnum(DesktopButtonPosition),
    }),
    tooltipStyles: z.object({
        tooltipType: z.nativeEnum(TooltipType),
        tooltipPosition: z.nativeEnum(TooltipPosition),
        mobileTooltipPosition: z.nativeEnum(MobileTooltipPosition),
        desktopTooltipPosition: z.nativeEnum(DesktopTooltipPosition),
        tooltipWidth: z.string(),
        tooltipBg: z.string(),

        defaultTooltipBg: z.string(),
        defaultTooltipColor: z.string(),
        tooltipColor: z.string(),
        tooltipBorderColor: z.string(),
        tooltipBorderRadius: z.string(),
        tooltipCloseColor: z.string(),
        showTooltipAfterMs: z.number(),
        showAvatarInTooltip: z.boolean(),
        showPhoneField: z.boolean(),
        // TODO: include to migration, remove optional
        blockPopupIfShowPhoneField: z.boolean().optional(),
        checkPhoneNumber: z.boolean().optional(),
    }),
    departments: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                key: z.string(),
            }),
        )
        .optional()
        .nullable(),
    ratingTitles: zArrObj({
        level: z.number(),
        tags: z.array(z.string()),
    })
        .optional()
        .nullable(),
    defaultDepartmentId: z.string().optional().nullable(),
    timeoutDepartmentKey: z.string().optional().nullable(),
    timeoutDepartmentTimeoutMs: z.number().optional().nullable(),

    country: z.string(),
    phoneNumberWithoutDialCode: z.boolean().optional().nullable(),
    phoneNumberWithLocalCodePlaceholder: z.boolean().optional().nullable(),
    ip: z.string().optional().nullable(),

    // one-click-call phone
    occ_phone: z.string().optional().nullable(),
    occ_api: z.string().optional().nullable(),
    occ_api_nobutton: z.string().optional().nullable(),
    alreadyShownPopup: z.boolean().optional().nullable(),
    alreadyShownTooltip: z.boolean().optional().nullable(),

    custom_fields: z.any().optional(),
});

export type LeadCMDesignSettingsInterface = z.infer<typeof zICallbackWidgetDesignSettings>;

export const zLeadCMInitSettings = z.object({
    widget_key: z.string(),
    spa_main_widget_key: z.string(),
    visit_id: z.string(),
    settings_url: z.string(),
    submit_url: z.string(),
    register_url: z.string(),
    collect_data_url: z.string().optional(),
    time_available_url: z.string(),
    use_test_settings: z.boolean(),
    no_real_calls: z.boolean(),
    start_opened: z.boolean(),
    force_nwt: z.nativeEnum(MockNonWorkingTimeType).optional(),
    force_state: z.nativeEnum(MockStateType).optional(),
    only_local: z.boolean(),
    e_settings: z.string().optional(),
    ee_settings: z.string().optional(),
});

export enum MainState {
    InitialWorkingTime = 'InitialWorkingTime',
    // InitialNonWorkingTime = "InitialNonWorkingTime",
    CallOrdered = 'CallOrdered',
    ManagerAnswered = 'ManagerAnswered',
    LeadAnswered = 'LeadAnswered',
    LeadUnreachable = 'LeadUnreachable',
    DefaultResult = 'DefaultResult',
    Ended = 'Ended',
    WeCallYouLater = 'WeCallYouLater',
}

export enum WindowState {
    Minimized = 'Minimized',
    Opened = 'Opened',
}

export type LeadCMInitSettingsInterface = z.infer<typeof zLeadCMInitSettings> & {
    call?: (phoneNumber: string) => void;
    open?: () => void;
    close?: () => void;
    finish?: () => void;
    showTooltip?: () => void;
    disableTooltip?: () => void;
    disableCall?: () => void;
    disableEndTimeout?: () => void;
    enableCall?: () => void;
    updateSettings?: (path: string[], newValue: any) => void;
    getSettings?: (path: string[]) => any;
    dispatchCustomEvent?: (event: string, params: any) => void;
    init_callback_array?: Array<() => void>;
    event_handlers_array?: Array<{
        event: EventType;
        callback: (params: any) => void;
    }>;
    afterInit?: () => void;
    timeouts?: number[];
    listeners?: Array<{
        target: any; // Node
        listener: (e: any) => void; // Event
        event: string;
    }>;
    mainState?: MainState;
    windowState?: WindowState;
    versionBuild?: () => string;

    onMainStateChange?: (oldState: MainState, newState: MainState) => any;
    getStore?: () => any;
};
