export enum TemplateType {
    LEADCM = 'leadcm',
    LEADCM_CHAT = 'leadcm_chat',
    LEADCM_DEFAULT = 'default',
}

export enum ButtonType {
    LEADCM = 'leadcm',
    LEADBACK = 'leadback',
    CUSTOM = 'custom',
}

export enum MobileType {
    DEFAULT = 'default',
    FULL_DOWN = 'full-down',
    OPEN = 'open',
    SIDE = 'side',
}

export enum MobilePositionTextInOpenButton {
    RIGHT = 'right',
    LEFT = 'left',
}

export enum BackgroundType {
    NONE = 'none',
    DARK = 'dark',
    BLUR = 'blur',
    IMAGE = 'image',
}

export enum ButtonBorderAnimationType {
    NONE = 'none',
    PULSE = 'pulse',
    WAVE = 'wave',
}

export enum TooltipPosition {
    RIGHT = 'right',
    LEFT = 'left',
    TOP = 'top',
}

export enum MobileTooltipPosition {
    // noinspection JSUnusedGlobalSymbols
    RIGHT = 'right',
    LEFT = 'left',
}

export enum DesktopTooltipPosition {
    // noinspection JSUnusedGlobalSymbols
    RIGHT = 'right',
    LEFT = 'left',
}

export enum MobileButtonPosition {
    // noinspection JSUnusedGlobalSymbols
    RIGHT = 'right', // old version
    LEFT = 'left', // old version

    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
}

export enum DesktopButtonPosition {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
}

export enum TooltipType {
    SOLID = 'SOLID',
    BORDERED = 'BORDERED',
    BORDERED_ANIMATED = 'BORDERED_ANIMATED',
    FLYING = 'FLYING',
    TIMER = 'TIMER',
}

export enum FontWeight {
    BOLD = 'bold',
    NORMAL = 'normal',
}

export enum EventType {
    INIT = 'INIT',
    OPENED_BY_TIMEOUT = 'OPENED_BY_TIMEOUT',
    OPENED_WHEN_LEAVING = 'OPENED_WHEN_LEAVING',
    OPENED_API = 'OPENED_API',
    CLOSED_API = 'CLOSED_API',
    BUTTON_HOVERED = 'BUTTON_HOVERED',
    BUTTON_CLICKED = 'BUTTON_CLICKED',
    DEPARTMENTS_OPENED = 'DEPARTMENTS_OPENED',
    DEPARTMENT_SELECTED = 'DEPARTMENT_SELECTED',
    TOOLTIP_CLICKED = 'TOOLTIP_CLICKED',
    TOOLTIP_SHOWN = 'TOOLTIP_SHOWN',
    CALL_ORDER_CLICKED = 'CALL_ORDER_CLICKED',
    CALL_ORDERED_API = 'CALL_ORDERED_API',
    CALL_ORDERED_OCC = 'CALL_ORDERED_OCC',
    CHOOSE_TIME_OPENED = 'CHOOSE_TIME_OPENED',
    CHECK_PHONE = 'CHECK_PHONE',
    CLOSE_TOOLTIP_CLICKED = 'CLOSE_TOOLTIP_CLICKED',
    CLOSE_MODAL_CLICKED = 'CLOSE_MODAL_CLICKED',
    CALL_SUCCESSFULLY_ORDERED = 'CALL_SUCCESSFULLY_ORDERED',

    STATE_CALL_ORDERED = 'STATE_CALL_ORDERED',
    STATE_MANAGER_ANSWERED = 'STATE_MANAGER_ANSWERED',
    STATE_LEAD_ANSWERED = 'STATE_LEAD_ANSWERED',
    STATE_LEAD_UNREACHABLE = 'STATE_LEAD_UNREACHABLE',
    STATE_DEFAULT_RESULT = 'STATE_DEFAULT_RESULT',
    STATE_ENDED = 'STATE_ENDED',
    STATE_WE_CALL_YOU_LATER = 'STATE_WE_CALL_YOU_LATER',

    RATING_SET = 'RATING_SET',

    CUSTOM_PARAMS = 'CUSTOM_PARAMS',
}

export enum MockNonWorkingTimeType {
    FORCE_NON_WORKING_TIME = 'FORCE_NON_WORKING_TIME',
    FORCE_WORKING_TIME = 'FORCE_WORKING_TIME',
}

export enum MockStateType {
    SHOW_DEPARTMENTS = 'SHOW_DEPARTMENTS',
    CALL_ORDERED = 'CALL_ORDERED',
    TIMER_STARTED = 'TIMER_STARTED',
    MANAGER_ANSWERED = 'MANAGER_ANSWERED',
    LEAD_ANSWERED = 'LEAD_ANSWERED',
    LEAD_UNREACHABLE = 'LEAD_UNREACHABLE',
    DEFAULT_RESULT = 'DEFAULT_RESULT',
    WE_CALL_YOU_LATER = 'WE_CALL_YOU_LATER',
    ENDED = 'ENDED',
}
