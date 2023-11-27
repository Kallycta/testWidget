import { LeadCMSettings } from './managers/LeadCMSettings';
import { LeadCMWidgetRoot } from './components/LeadCMWidgetRoot';
import { LeadCMStateManager } from './managers/LeadCMStateManager';
import { LeadCMApiManager } from './managers/LeadCMApiManager';
import { LeadCMModalWindow } from './components/LeadCMModalWindow';
import {
    displayNoneIfExistsQuerySelector,
    displayShowIfExistsQuerySelector,
    divQuerySelector,
    htmlEntitiesExceptBrAndB,
    ObjectKeys,
} from './utils/helpers';
import { LeadCMRequestManager } from './managers/LeadCMRequestManager';
import * as anime from 'animejs';
import {
    EventType,
    MockNonWorkingTimeType,
    MockStateType,
    TooltipType,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsEnums';
import {
    LeadCMDesignSettingsInterface,
    LeadCMInitSettingsInterface,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetSettingsTypes';
import {
    MainState,
    WindowState,
} from '@shared/convolo-icallback-js/types/callback_widget_schemas/WidgetStates';
import { patternMatchExec } from '@shared/convolo-core/helpers/helpers/pattern-match-exec';

require('./polyfills');
require('./styles');

type Anime = typeof anime;
export const animejs = (anime as any).default as Anime;

(async function () {
    let oldLocationPathName = document.location.pathname;
    let isOnLocationChangeReloadForSpaInit = false;
    let isSpaFullTime = false;

    // axios.get('http://httpbin.org/get').then(({ data }) => console.error(data));

    setInterval(
        () => (isOnLocationChangeReloadForSpaInit ? checkLocationChangedForSpaReload() : null),
        1000,
    );

    try {
        await LeadCMSettings.init();
        afterInit();
    } catch (e) {
        if (LeadCMSettings.getInstance().getInitSettings().use_test_settings)
            console.log('init error', e);
        LeadCMRequestManager.dispatchCustomEvent('ERROR_INIT', {
            err: e.toString?.().substring(0, 1024),
        });
        return;
    }

    function afterInit() {
        window.leadCM.timeouts = [];
        window.leadCM.listeners = [];

        const settings = LeadCMSettings.getInstance().getSettings();
        const initSettings = LeadCMSettings.getInstance().getInitSettings();
        if (settings.spaEnabled) isOnLocationChangeReloadForSpaInit = true;
        if (settings.spaFullTime && settings.spaEnabled) isSpaFullTime = true;
        if (settings.widgetDisabled) return;

        LeadCMRequestManager.collectData({
            referer: document.referrer,
            screenWidth: screen.width,
            screenHeight: screen.height,
            userAgent: navigator.userAgent,
            title: document.title,
        });

        adjustSettingsBeforeInit(settings, initSettings);

        // run main code after the settings is ready
        LeadCMWidgetRoot.getInstance();

        /* develblock:start */
        // PUT ALL MOCKS HERE TO AVOID PROBLEMS IN PRODUCTION

        // initSettings.force_state = MockStateType.ENDED as MockStateType;
        // LeadCMSettings.getInstance().getSettings().nonWorkingTime = true;
        // initSettings.start_opened = true;
        /* develblock:end */

        LeadCMStateManager.init(
            MainState.LeadAnswered,
            initSettings.start_opened ? WindowState.Opened : WindowState.Minimized,
        );

        LeadCMStateManager.getInstance().store = {
            phone: '+46 8 1234567',
            agentName: 'AGENT',
            // TODO leadAnswered: false ??
            leadAnswered: false,
        };

        LeadCMApiManager.init();

        initAutoPopupsTimeoutAndWhenLeaving(settings);

        LeadCMModalWindow.getInstance();

        // one-click-phone autostart
        setTimeout(() => processOneClickCall(settings), 4000);

        // callbacks after the widget is init
        if (Array.isArray(window.leadCM?.init_callback_array))
            window.leadCM.init_callback_array.forEach((init_fn) => init_fn());

        processForcedState(initSettings);

        testAvatarImage(settings);

        initAnimations();

        LeadCMRequestManager.dispatchEvent(EventType.INIT);
    }

    function initAnimations() {
        if (
            LeadCMSettings.getInstance().getSettings().tooltipStyles.tooltipType ===
            TooltipType.BORDERED_ANIMATED
        ) {
            animejs
                .timeline({ loop: false })
                .add({
                    targets: '.lc_widgetTooltip',
                    duration: 1000,
                    delay: 600,
                    width: [
                        {
                            value: LeadCMSettings.getInstance().getSettings().buttonStyles
                                .buttonSize,
                        },
                        {
                            value: LeadCMSettings.getInstance().getSettings().tooltipStyles
                                .tooltipWidth,
                        },
                    ],
                    opacity: [0, 1],
                })
                .add({
                    targets: [
                        '.lc_widgetTooltip-avatar',
                        '.lc_widgetTooltip-userName',
                        '.lc_widgetTooltip-text',
                    ],
                    opacity: [{ value: 0 }, { value: 1 }],
                })
                .add({
                    targets: '.lc_widgetTooltip-text .letter',
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 600,
                    offset: '-=775',
                    delay: (el, i) => 34 * (i + 1),
                })
                .add({
                    targets: [
                        '.lc_widgetTooltip-avatar',
                        '.lc_widgetTooltip-userName',
                        '.lc_widgetTooltip-text',
                    ],
                    opacity: [{ value: 1 }, { value: 0 }],
                    delay: 2600,
                })
                .add({
                    targets: '.lc_widgetTooltip',
                    duration: 600,
                    easing: 'easeOutExpo',
                    width: LeadCMSettings.getInstance().getSettings().buttonStyles.buttonSize,
                    opacity: 0,
                    height: LeadCMSettings.getInstance().getSettings().buttonStyles.buttonSize,
                })
                .add({
                    targets: ['.widgetMessage', '.widgetNotification'],
                    opacity: [{ value: 0 }, { value: 1 }],
                })
                .add({
                    targets: '.widgetMessage',
                    opacity: [1, 0],
                    delay: 2600,
                });
        }
    }

    function checkLocationChangedForSpaReload() {
        if (document.location.pathname !== oldLocationPathName) {
            // console.log(
            //     'checking location reload ',
            //     document.location.pathname,
            //     oldLocationPathName,
            // );

            if (!isSpaFullTime) isOnLocationChangeReloadForSpaInit = false;

            try {
                LeadCMWidgetRoot.finishWidget();
            } catch (e) {
                // console.log('app.ts 203 checkLocationChangedForSpaReload 10:12:0', e);
            }

            setTimeout(() => {
                window.leadCM.afterInit = () => LeadCMSettings.init().then(afterInit);
                let em = document.createElement('script');
                em.type = 'text/javascript';
                em.async = true;
                em.src =
                    'https://app.leadconnect.cc' +
                    '/js/icallback.js?v=' +
                    Math.random() +
                    '&key=' +
                    (window.leadCM.spa_main_widget_key || window.leadCM.widget_key) +
                    '&uri=' +
                    encodeURIComponent(window.location.href) +
                    '&only_settings=1';
                let s = document.getElementsByTagName('script')[0];
                s.parentNode?.insertBefore(em, s);
            }, 2000);

            oldLocationPathName = document.location.pathname;
        }
    }

    function adjustSettingsBeforeInit(
        settings: LeadCMDesignSettingsInterface,
        initSettings: LeadCMInitSettingsInterface,
    ) {
        if (initSettings.force_nwt === MockNonWorkingTimeType.FORCE_WORKING_TIME)
            settings.nonWorkingTime = false;
        if (initSettings.force_nwt === MockNonWorkingTimeType.FORCE_NON_WORKING_TIME)
            settings.nonWorkingTime = true;

        if (initSettings.widget_key === 'bec668a77de378bf90ad071a7834c5d1') {
            // @ts-ignore
            settings.widgetStyles['noTypeTelInPhoneInput'] = 1;
        }

        ObjectKeys(settings.widgetTexts).forEach(
            (key) =>
                (settings.widgetTexts[key] = settings.widgetTexts[key]
                    .replace(/%(date|time|manager|phone|agent_name|callerid)%/gi, '###$1###')
                    .replace(/%[a-zA-Z0-9_]{1,30}%/g, '')),
        );

        if (settings.nonWorkingTime) {
            settings.widgetTexts.title = settings.widgetTexts.nonWorkingTitle;
            settings.widgetTexts.subTitle = settings.widgetTexts.nonWorkingSubTitle;
            settings.widgetTexts.text = settings.widgetTexts.nonWorkingText;
            settings.widgetTexts.tipText = settings.widgetTexts.nonWorkingTipText;
            if (!settings.widgetStyles.showAvatarInNonworkingTime)
                settings.widgetStyles.avatarUrl = '';
        }

        if (
            settings.widgetStyles.allowChoosingTime &&
            settings.widgetStyles.chooseTimeOnlyNonWorkingTime &&
            !settings.nonWorkingTime
        )
            settings.widgetStyles.allowChoosingTime = false;

        processHtmlEntitiesExceptBrAndBForWidgetTextKeys([
            'tipText',
            'nonWorkingTipText',
            'title',
            'subTitle',
            'managerTryingToReachYou',
            'defaultMessage',
            'nonWorkingTitle',
            'nonWorkingSubTitle',
            'afterOrderingTitle',
            'cantReach',
            'pleasePickUp',
            'callingTo',
            'successfullyReached',
            'fillFormBelowTitle',
            'fillFormBelowSubTitle',
            'rateAgent',
            'weCallYouLater',
            'weCallYouLaterIn',
        ]);

        settings.poweredUrl = settings.poweredUrl.replace(
            'https://leadconnect',
            'https://www.leadconnect',
        );

        function processHtmlEntitiesExceptBrAndBForWidgetTextKeys(
            textKeys: Array<keyof LeadCMDesignSettingsInterface['widgetTexts']>,
        ) {
            textKeys.forEach(
                (key) =>
                    (settings.widgetTexts[key] = htmlEntitiesExceptBrAndB(settings.widgetTexts[key])
                        .replace(/<b>/g, '<span><b>')
                        .replace(/<\/b>/g, '</b></span>')),
            );
        }
    }

    function initAutoPopupsTimeoutAndWhenLeaving(settings: LeadCMDesignSettingsInterface) {
        // auto opening by timeout
        if (!settings.alreadyShownPopup && settings.widgetStyles.showAfterMS > 0) {
            window.leadCM.timeouts?.push(
                window.setTimeout(() => {
                    if (!LeadCMStateManager.getInstance().autoPopupAlreadyTriggered) {
                        LeadCMRequestManager.dispatchEvent(EventType.OPENED_BY_TIMEOUT);
                        LeadCMStateManager.setWindowState(WindowState.Opened);
                    }
                }, settings.widgetStyles.showAfterMS),
            );
        }

        // auto opening when leaving
        if (!settings.alreadyShownPopup && settings.widgetStyles.cooldownWhenLeavingMS > 0) {
            window.leadCM.timeouts?.push(
                window.setTimeout(() => {
                    const openWindowOnLeave = (e: MouseEvent) => {
                        if (e.clientY <= 50 || e.screenY <= 50) {
                            if (!LeadCMStateManager.getInstance().autoPopupAlreadyTriggered) {
                                LeadCMStateManager.setWindowState(WindowState.Opened);
                                LeadCMRequestManager.dispatchEvent(EventType.OPENED_WHEN_LEAVING);
                            }
                        }
                    };

                    document.addEventListener('mouseout', openWindowOnLeave);
                    window.leadCM.listeners?.push({
                        target: document,
                        event: 'mouseout',
                        listener: openWindowOnLeave,
                    });
                }, settings.widgetStyles.cooldownWhenLeavingMS),
            );
        }
    }

    function processOneClickCall(settings: LeadCMDesignSettingsInterface) {
        if (settings.occ_phone)
            if (settings.occ_api) {
                LeadCMApiManager.call(settings.occ_phone);
            } else if (
                settings.occ_api_nobutton ||
                (settings.nonWorkingTime && settings.occ_phone.length > 5)
            ) {
                LeadCMApiManager.call(settings.occ_phone);
                LeadCMStateManager.setMainState(MainState.Ended);
                LeadCMStateManager.getInstance().autoPopupAlreadyTriggered = true;
            } else {
                LeadCMRequestManager.dispatchEvent(EventType.CALL_ORDERED_OCC, {
                    phone: settings.occ_phone,
                });

                LeadCMStateManager.setWindowState(WindowState.Opened);

                const phoneInput = LeadCMModalWindow.getInstance().phoneInput;
                if (phoneInput && settings.occ_phone.length > 5) {
                    phoneInput.value = settings.occ_phone;
                    phoneInput.dispatchEvent(new Event('keyup'));
                    LeadCMModalWindow.getInstance().callOnClick().then().catch();
                }
            }
    }

    function processForcedState(initSettings: LeadCMInitSettingsInterface) {
        patternMatchExec(initSettings.force_state, [
            [
                MockStateType.SHOW_DEPARTMENTS,
                () => {
                    divQuerySelector('#widgetModal-section-phone')?.classList.add('-loading');
                    displayNoneIfExistsQuerySelector('#widgetModal-section-phone');
                    displayShowIfExistsQuerySelector('#widgetModal-section-department');
                },
            ],
            [
                MockStateType.CALL_ORDERED,
                () => LeadCMStateManager.setMainState(MainState.CallOrdered),
            ],
            [
                MockStateType.TIMER_STARTED,
                () => {
                    LeadCMStateManager.setMainState(MainState.CallOrdered);
                    LeadCMStateManager.getInstance().startTimer();
                },
            ],
            [
                [
                    MockStateType.MANAGER_ANSWERED,
                    MockStateType.LEAD_ANSWERED,
                    MockStateType.LEAD_UNREACHABLE,
                    MockStateType.DEFAULT_RESULT,
                    MockStateType.WE_CALL_YOU_LATER,
                    MockStateType.ENDED,
                ],
                () => {
                    LeadCMStateManager.setMainState(MainState.CallOrdered);
                    LeadCMStateManager.getInstance().startTimer();
                    LeadCMStateManager.setMainState(MainState.ManagerAnswered);

                    patternMatchExec(initSettings.force_state, [
                        [
                            MockStateType.LEAD_ANSWERED,
                            () => LeadCMStateManager.setMainState(MainState.LeadAnswered),
                        ],
                        [
                            MockStateType.ENDED,
                            () => LeadCMStateManager.setMainState(MainState.Ended),
                        ],
                        [
                            MockStateType.LEAD_UNREACHABLE,
                            () => LeadCMStateManager.setMainState(MainState.LeadUnreachable),
                        ],
                        [
                            MockStateType.DEFAULT_RESULT,
                            () => LeadCMStateManager.setMainState(MainState.DefaultResult),
                        ],
                        [
                            MockStateType.WE_CALL_YOU_LATER,
                            () => LeadCMStateManager.setMainState(MainState.WeCallYouLater),
                        ],
                    ]);
                },
            ],
        ]);
    }

    function testAvatarImage(settings: LeadCMDesignSettingsInterface) {
        if (!settings.widgetStyles.avatarUrl) return;

        const testAvatarImg = document.createElement('img');
        testAvatarImg.setAttribute('src', settings.widgetStyles.avatarUrl);

        const testAvatarImgTimeout = window.setTimeout(() => {
            testAvatarImg.remove();
            LeadCMRequestManager.dispatchCustomEvent('ERROR_AVATAR_LOAD_FAILED', {
                url: settings.widgetStyles.avatarUrl,
            });

            // better to kill then show broken
            // LeadCMWidgetRoot.finishWidget();
        }, 10000);

        testAvatarImg.addEventListener('load', () => {
            testAvatarImg.remove();
            window.clearTimeout(testAvatarImgTimeout);
        });
    }
})();
