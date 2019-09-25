function sixFromThreeDigitHex(code) {
  return `${code[0]}${code[1]}${code[1]}` +
    `${code[2]}${code[2]}${code[3]}${code[3]}`;
}

function isHexcode(hexcode) {
  // won't handle 4 or 8 digit hexcodes with alpha channel
  const re = /(^#[A-Fa-f0-9]{3}$)|(^#[A-Fa-f0-9]{6}$)/g // boundary, hash, 4 or 7 chars
  return re.test(hexcode);
}

function hexToRgb(hexcode) {

  if (!isHexcode(hexcode)) {
    throw "hexToRgb requires 4 or 7 length string starting with #";
  }
  if (hexcode.length === 4) {
    hexcode = sixFromThreeDigitHex(hexcode);
  }
  const r = parseInt(hexcode.slice(1, 3), 16);
  const g = parseInt(hexcode.slice(3, 5), 16);
  const b = parseInt(hexcode.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function getRelativeLuminance(rgb) {
  const rgbSplit = rgb.split(",");
  const RsRGB = rgbSplit[0] / 255;
  const GsRGB = rgbSplit[1] / 255;
  const BsRGB = rgbSplit[2] / 255;
  const helper = (sRGB) => sRGB <= 0.03928 ? sRGB / 12.92 : ((sRGB + 0.055) / 1.055) ** 2.4;
  const R = helper(RsRGB);
  const G = helper(GsRGB);
  const B = helper(BsRGB);
  return (0.2126 * R + 0.7152 * G + 0.0722 * B);
}

function getContrastRatio(relativeLuminance1, relativeLuminance2) {
  const lighter = Math.max(relativeLuminance1, relativeLuminance2);
  const darker = Math.min(relativeLuminance1, relativeLuminance2);
  return ((lighter + 0.05) / (darker + 0.05));
}

function truncateFloor(number, decimalPlaces) {
  if (decimalPlaces < 1) {
    return Math.floor(number);
  }
  const numString = number.toString();
  const regexp = `[0-9]*.[0-9]{0,${decimalPlaces}}`;
  return parseFloat(numString.match(regexp)[0]);
}

function hexToContrastRatio(hexColor1, hexColor2) {
  const rgbColor1 = hexToRgb(hexColor1);
  const rgbColor2 = hexToRgb(hexColor2);
  const relativeLuminance1 = getRelativeLuminance(rgbColor1);
  const relativeLuminance2 = getRelativeLuminance(rgbColor2);
  const contrastRatio = getContrastRatio(relativeLuminance1, relativeLuminance2);
  return truncateFloor(contrastRatio, 2);
}

function blackOrWhiteTextChoice(backgroundColor) {
  const blackContrastRatio = hexToContrastRatio(backgroundColor, "#000000");
  const whiteContrastRatio = hexToContrastRatio(backgroundColor, "#FFFFFF");
  return whiteContrastRatio <= blackContrastRatio ? "#000000" : "#FFFFFF";
}

module.exports = {
  hexToRgb: hexToRgb,
  getRelativeLuminance: getRelativeLuminance,
  truncateFloor: truncateFloor,
  getContrastRatio: getContrastRatio,
  hexToContrastRatio: hexToContrastRatio,
  blackOrWhiteTextChoice: blackOrWhiteTextChoice,
}

