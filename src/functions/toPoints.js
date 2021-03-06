const TILE_SIZE = 256;

function world2Screen({ x, y }, zoom) {
  const scale = Math.pow(2, zoom);
  return {
      x: x * scale * TILE_SIZE,
      y: y * scale * TILE_SIZE
  }
}

function latLng2World(_ref) {
  let lat = _ref.lat;
  let lng = _ref.lng;

  let sin = Math.sin(lat * Math.PI / 180);
  let x = lng / 360 + 0.5;
  let y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;

  y = y < -1 // eslint-disable-line
      ? -1 : y > 1 ? 1 : y;
  return { x, y };
}

export default function(lat, lng, zoom) {
  const coords = latLng2World({ lat, lng });
  return world2Screen(coords, zoom);
}
