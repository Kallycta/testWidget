import { throwNewErr } from '@shared/convolo-core/helpers/helpers/throw-new-err';

const BLUR_FILTER = 'blur(4px) grayscale(10%) contrast(120%)';

export function createElementFromHTML(htmlString: string) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild;
}

export function moveCursorToEnd(el: HTMLInputElement) {
    if (typeof el.selectionStart === 'number') {
        el.selectionStart = el.selectionEnd = el.value.length;
    }
}

export function blurThePage() {
    for (const child of <any>document.body.children) {
        if (child.classList && !child.classList.contains('lc_callback_widget')) {
            if (['SCRIPT', 'STYLE'].indexOf(child.tagName) === -1) {
                // noinspection JSDeprecatedSymbols
                child.style.webkitFilter = BLUR_FILTER;
            }
        }
    }
}

export function unblurThePage() {
    for (const child of <any>document.body.children) {
        if (child.classList && !child.classList.contains('lc_callback_widget')) {
            if (['SCRIPT', 'STYLE'].indexOf(child.tagName) === -1) {
                // noinspection JSDeprecatedSymbols
                child.style.webkitFilter = '';
            }
        }
    }
}

// Going backwards: from byteStream, to percent-encoding, to original string.
export const b64DecodeUnicode = (str: string) =>
    decodeURIComponent(
        atob(str)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join(''),
    );

export const divQuerySelector = (selector: string): HTMLDivElement =>
    document.querySelector<HTMLDivElement>(selector) || throwNewErr(`div ${selector} not found`);

export function displayNoneIfExistsQuerySelector(selector: string): void {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
        element.style.display = 'none';
        element.setAttribute('aria-hidden', 'true');
    }
}

export function displayShowIfExistsQuerySelector(selector: string): void {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
        element.style.display = '';
        element.removeAttribute('aria-hidden');
    }
}

export const pad = (n: string, width: number, z?: string) =>
    n.length >= width ? n : new Array(width - n.length + 1).join(z || '0') + n;

export function addToChat(text: string, id: string | null = null) {
    const e1 = document.createElement('div');
    e1.innerText = text;
    if (id) e1.id = id;
    e1.classList.add('widgetModal-text');
    const chatContainer = divQuerySelector('#lc_chat_container');
    chatContainer?.appendChild(e1);

    setTimeout(() => {
        const widgetModalContainer = document.querySelector('.widgetModal-container');
        if (widgetModalContainer)
            widgetModalContainer.scrollTop = widgetModalContainer.scrollHeight;
    }, 50);
}

export const htmlEntities = (str: string) =>
    String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

export const htmlEntitiesExceptBrAndB = (str: string) =>
    htmlEntities(str.replace(/<br>/g, '\n').replace(/<BR>/g, '\n'))
        .replace(/\n/g, '<br>')
        .replace(/&lt;b&gt;/g, '<b>')
        .replace(/&lt;\/b&gt;/g, '</b>')
        // TODO: make this more safe
        .replace(/&lt;a(.*?)&gt;/g, '<a$1>')
        .replace(/&lt;\/a&gt;/g, '</a>');

export const ObjectKeys = <T extends object>(object: T): Array<keyof T> =>
    Object.keys(object) as Array<keyof T>;

export const hexToRgbA = (hex: string, opacity: number) =>
    hex.match(/^#([A-Fa-f0-9]{3}){1,2}$/)
        ? 'rgba(' +
          (hex.length === 4
              ? [hex[1] + hex[1], hex[2] + hex[2], hex[3] + hex[3]]
              : [hex.substring(1, 3), hex.substring(3, 5), hex.substring(5, 7)]
          )
              .map((cc) => +('0x' + cc))
              .join(', ') +
          ', ' +
          opacity +
          ')'
        : throwNewErr('Bad Hex');
