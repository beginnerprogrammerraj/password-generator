document.getElementById('generate-btn').addEventListener('click', generateColor);
document.getElementById('gradient-btn').addEventListener('click', generateGradient);

function generateColor() {
  var hue = document.getElementById('hue-slider').value;
  var randomColor = '#' + hsvToRgb(hue, Math.random(), 1).toString(16).padStart(6, '0');
  var rgb = hexToRgb(randomColor);
  displayColor(randomColor, rgb);
}

function generateGradient() {
  var numColors = document.getElementById('num-colors').value;
  var hue = document.getElementById('hue-slider').value;
  var colors = [];
  for (var i = 0; i < numColors; i++) {
    var saturation = i / (numColors - 1);
    var color = '#' + hsvToRgb(hue, saturation, 1).toString(16).padStart(6, '0');
    var rgb = hexToRgb(color);
    colors.push({hex: color, rgb: rgb});
  }
  displayGradient(colors);
}

function displayColor(color, rgb) {
  document.getElementById('color-box').style.backgroundColor = color;
  document.getElementById('color-code').textContent = `Hex: ${color}, RGB: (${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function displayGradient(colors) {
  var gradientString = 'Linear Gradient: ';
  colors.forEach(function(color) {
    gradientString += `${color.hex}, `;
  });
  gradientString = gradientString.slice(0, -2); // Remove the last comma
  document.getElementById('color-box').style.background = `linear-gradient(to right, ${gradientString})`;
  var rgbString = 'RGB: ';
  colors.forEach(function(color) {
    rgbString += `(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}), `;
  });
  rgbString = rgbString.slice(0, -2); // Remove the last comma
  document.getElementById('color-code').textContent = rgbString;
}

function hexToRgb(hex) {
  var bigint = parseInt(hex.slice(1), 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  return {r: r, g: g, b: b};
}

function hsvToRgb(h, s, v) {
  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch(i % 6){
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return Math.round(r * 255) << 16 | Math.round(g * 255) << 8 | Math.round(b * 255);
}
