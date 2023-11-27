import { LeadCMDesignSettingsInterface } from './WidgetSettingsTypes';
import { Version } from './Versions';
import {
    DesktopButtonPosition,
    DesktopTooltipPosition,
    FontWeight,
    MobileButtonPosition,
    MobilePositionTextInOpenButton,
    MobileTooltipPosition,
    MobileType,
} from './WidgetSettingsEnums';
import { throwNewErr } from '@shared/convolo-core/helpers/helpers/throw-new-err';

const migrations = {
    [Version.V30]: (settings: any) => {
        (settings.version as Version) = Version.V31;
        (settings as LeadCMDesignSettingsInterface).spaEnabled = false;

        return settings;
    },
    [Version.V31]: (settings: any) => {
        (settings.version as Version) = Version.V32;
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.openTimeSelectorForNonworkingTimeByDefault = true;
        if ('modalBgOpacity' in (settings as LeadCMDesignSettingsInterface).widgetStyles)
            delete (settings as any).widgetStyles.modalBgOpacity;

        return settings;
    },
    [Version.V32]: (settings: any) => {
        (settings.version as Version) = Version.V33;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.headerHeightDefaultTemplate =
            '230px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.subTitleFontWeight =
            FontWeight.BOLD;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.titleMarginBottom = '20px';

        return settings;
    },
    [Version.V33]: (settings: any) => {
        (settings.version as Version) = Version.V34;
        (settings as LeadCMDesignSettingsInterface).onDemand = false;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.logoBottomGap = '20px';

        return settings;
    },
    [Version.V34]: (settings: any) => {
        (settings.version as Version) = Version.V35;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.titleFontWeight =
            FontWeight.NORMAL;

        return settings;
    },
    [Version.V35]: (settings: any) => {
        (settings.version as Version) = Version.V36;
        (settings as LeadCMDesignSettingsInterface).buttonStyles.mobileButtonPosition =
            MobileButtonPosition.RIGHT;

        return settings;
    },
    [Version.V36]: (settings: any) => {
        (settings.version as Version) = Version.V37;
        (settings as LeadCMDesignSettingsInterface).buttonStyles.mobileButtonPosition =
            MobileButtonPosition.RIGHT;
        (settings as LeadCMDesignSettingsInterface).buttonStyles.desktopButtonPosition =
            DesktopButtonPosition.BOTTOM_RIGHT;

        (settings as LeadCMDesignSettingsInterface).buttonStyles.mobileButtonPositionX = '10px';
        (settings as LeadCMDesignSettingsInterface).buttonStyles.mobileButtonPositionY = '10px';
        (settings as LeadCMDesignSettingsInterface).buttonStyles.desktopButtonPositionX = '10px';
        (settings as LeadCMDesignSettingsInterface).buttonStyles.desktopButtonPositionY = '10px';

        (settings as LeadCMDesignSettingsInterface).tooltipStyles.mobileTooltipPosition =
            MobileTooltipPosition.RIGHT;
        (settings as LeadCMDesignSettingsInterface).tooltipStyles.desktopTooltipPosition =
            DesktopTooltipPosition.RIGHT;

        return settings;
    },
    [Version.V37]: (settings: any) => {
        (settings.version as Version) = Version.V38;
        (settings as LeadCMDesignSettingsInterface).tooltipStyles.showPhoneField = false;

        return settings;
    },
    [Version.V38]: (settings: any) => {
        (settings.version as Version) = Version.V39;
        if (
            (settings as LeadCMDesignSettingsInterface).poweredUrl === 'https://leadconnect.cc' ||
            (settings as LeadCMDesignSettingsInterface).poweredUrl === 'https://leadconnect.ae'
        )
            (settings as LeadCMDesignSettingsInterface).poweredUrl = `https://convolo.ai`;

        if ('poweredByLC' in (settings as LeadCMDesignSettingsInterface).widgetTexts)
            delete (settings as any).widgetTexts.poweredByLC;

        return settings;
    },
    [Version.V39]: (settings: any) => {
        (settings.version as Version) = Version.V40;
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.departmentsSelectorBeforePhoneField = false;

        return settings;
    },
    [Version.V40]: (settings: any) => {
        (settings.version as Version) = Version.V41;
        (settings as LeadCMDesignSettingsInterface).widgetTexts.departmentSelectorFirstLine = '';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.departmentSelectorSecondLine = '';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.timeSelectorFirstLine = '';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.timeSelectorSecondLine = '';

        return settings;
    },
    [Version.V41]: (settings: any) => {
        (settings.version as Version) = Version.V42;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.isSetRating = false;
        (settings as LeadCMDesignSettingsInterface).widgetTexts.rateAgent = 'Rate your call with';

        return settings;
    },
    [Version.V42]: (settings: any) => {
        (settings.version as Version) = Version.V43;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.disableExternalCss = false;

        return settings;
    },
    [Version.V43]: (settings: any) => {
        (settings.version as Version) = Version.V44;

        (settings as LeadCMDesignSettingsInterface).formItems = [];
        (settings as LeadCMDesignSettingsInterface).widgetStyles.isSendLeadForm = false;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormModalBackground =
            '#0074FF';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormModalBorderRadius = '16px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormElementBorderRadius =
            '8px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormTextColor = '#fff';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormButtonBackground = '#fff';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormButtonColor = '#0074FF';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormButtonActiveColor =
            '#0074FF';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormButtonActiveBackground =
            '#edededfb';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormButtonDisActiveBackground =
            '#57A4FF';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.fillFormBelowTitle =
            'Fill in the form below';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.fillFormBelowSubTitle =
            'to help us serve you better';

        return settings;
    },
    [Version.V44]: (settings: any) => {
        (settings.version as Version) = Version.V45;

        (settings as LeadCMDesignSettingsInterface).ratingTitles = [];
        return settings;
    },
    [Version.V45]: (settings: any) => {
        (settings.version as Version) = Version.V46;

        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingTagButtonBorderRadius =
            '8px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingTagButtonColor = '#797979';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingActiveTagButtonColor =
            '#0074FF';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingTagButtonBackgroundColor =
            '#7979791A';
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.ratingActiveTagButtonBackgroundColor = '#0074FF1A';
        return settings;
    },
    [Version.V46]: (settings: any) => {
        (settings.version as Version) = Version.V47;

        (settings as LeadCMDesignSettingsInterface).ratingTitles = [
            {
                level: 1,
                tags: ['very bad'],
            },
            {
                level: 2,
                tags: ['bad'],
            },
            {
                level: 3,
                tags: ['normal'],
            },
            {
                level: 4,
                tags: ['good'],
            },
            {
                level: 5,
                tags: ['excellent'],
            },
        ];
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormInputBackground = '#fff';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormInputColor = '#0074FF';

        (settings as LeadCMDesignSettingsInterface).widgetStyles.leadFormEnterTextVisible = true;
        return settings;
    },
    [Version.V47]: (settings: any) => {
        (settings.version as Version) = Version.V48;

        (settings as LeadCMDesignSettingsInterface).formItems = [
            {
                title: '1st step',
                okText: 'Next',
                name: 'Your Work Email Here',
                type: 'text',
            },
            {
                title: '2nd step',
                okText: 'Next',
                name: 'Your Work Email Here',
                type: 'text',
            },
            {
                title: '3rd step',
                okText: 'Next',
                name: 'Your Work Email Here',
                type: 'text',
            },
            {
                title: '4th step',
                okText: 'Finish',
                name: 'Your Work Email Here',
                type: 'text',
            },
        ];
        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingTextAreaPlaceholderColor =
            '#858585';
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.leadFormInputColorPlaceholderColor = '#858585';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.ratingTextAreaPlaceholderText =
            'Tell us on how can we improve...';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.ratingDescription =
            'Rate your experience';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.press = 'press';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.enter = 'Enter';

        return settings;
    },
    [Version.V48]: (settings: any) => {
        (settings.version as Version) = Version.V49;

        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileStyles = MobileType.DEFAULT;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileUseMobileStyles = false;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobilePositionTextInOpenButton =
            MobilePositionTextInOpenButton.RIGHT;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileWidgetTooltipCloseFontSize =
            '30px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileTooltipSideSize = '100px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileTooltipSideWidth = '40vw';
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.mobileUseMobileAnimationTextButtonShow = false;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileFullTooltipAfterHide = true;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileFullTooltipBeforeHide = true;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileFillBottomCornerRadius =
            '8px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileFillBottomBackgroundColor =
            '#57A4FF';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileWidgetButtonStylesWidth =
            '65px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileWidgetButtonStylesHeight =
            '65px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileWidgetButtonStylesZIndex =
            '99999';

        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileHeightContainer = '150px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileFillBottomCloseButtonColor =
            '#A0A0A0';
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.mobileFillBottomCloseButtonFontSize = '30px';

        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobilButtonBorderRadius = '16px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.mobileButtonOpenTextWidth =
            '300px';
        (
            settings as LeadCMDesignSettingsInterface
        ).widgetStyles.mobileButtonBackgroundIconContainer = '8px';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.mobileTipText = 'Test mobile text';

        return settings;
    },
    [Version.V49]: (settings: any) => {
        (settings.version as Version) = Version.V50;

        (settings as LeadCMDesignSettingsInterface).widgetStyles.isSetRatingUnreachable = false;
        return settings;
    },
    [Version.V50]: (settings: any) => {
        (settings.version as Version) = Version.V51;

        (settings as LeadCMDesignSettingsInterface).widgetStyles.modalMinHeight = '456px';

        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredIsShow = true;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredByText = 'powered by';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredUnderlineIsShow = true;
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredUnderlineColor = '#1c6bc9';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredSvgFill = '#AAAAAA';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredSvgHeight = '13px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.poweredSvgWidth = '67px';
        (settings as LeadCMDesignSettingsInterface).widgetStyles.customPoweredIcon = undefined;
        return settings;
    },
    [Version.V51]: (settings: any) => {
        (settings.version as Version) = Version.V52;

        (settings as LeadCMDesignSettingsInterface).phoneNumberWithoutDialCode = false;
        (settings as LeadCMDesignSettingsInterface).phoneNumberWithLocalCodePlaceholder = false;

        return settings;
    },
    [Version.V52]: (settings: any) => {
        (settings.version as Version) = Version.V53;

        (settings as LeadCMDesignSettingsInterface).widgetStyles.ratingTagsHeight = '400px';
        (settings as LeadCMDesignSettingsInterface).widgetTexts.ratingCloseWindowButton = 'Submit';

        return settings;
    },
};

export function migrate(settings: any): any {
    if (!('version' in settings)) throwNewErr("can't migrate, no version");

    // @ts-ignore
    while (migrations[settings.version]) {
        // @ts-ignore
        settings = migrations[settings.version](settings);
    }

    return settings;
}
