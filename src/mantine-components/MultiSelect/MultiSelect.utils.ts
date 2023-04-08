/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */

export const getAvailableTextWidth = (element: HTMLElement | null): number => {
  if (!element) {
    return 0;
  }
  const computedStyle = window.getComputedStyle(element);
  let elementWidth = element.clientWidth;
  elementWidth -=
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);
  return elementWidth;
};

/**
 Utility function used to get the width of a given set of text. Useful for determining how many strings can fit before showing +x more
 @param text The text to be rendered.
 @param font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 @param canvas The canvas element to use for measuring the text. If not provided, a new canvas will be created.
 If you are measuring multiple strings, it is more efficient to create a single canvas and pass it in to each call.
 */
export const getTextWidth = (
  text: string,
  font: string,
  canvas?: HTMLCanvasElement
): number => {
  // re-use canvas object for better performance
  const canvasElement: HTMLCanvasElement =
    canvas || document.createElement('canvas');
  const context = canvasElement.getContext('2d');
  if (!context) return 99999;
  context.font = font;
  const metrics = context?.measureText(text);
  return metrics?.width;
};

/**
 * Get the computed style of an element
 * @param element: the element to get the style from
 * @param prop: the css property to get
 */
export const getCssStyle = (element: HTMLElement, prop: string) => {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
};

/**
 * Get the computed font of an element
 * @param element: the element to get the style from, if not provided, will use a default font
 */
export const getCanvasFont = (el: HTMLElement | null) => {
  if (!el) {
    return 'normal 12px Ibm Plex Sans, sans-serif';
  }
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '12px';
  const fontFamily =
    getCssStyle(el, 'font-family') || 'Ibm Plex Sans, sans-serif';
  return `${fontWeight} ${fontSize} ${fontFamily}`;
};
