export function getAssetUrl(path) {
  if (!path) return '';
  if (typeof path === 'object' && path !== null) {
    if (typeof path.url === 'string') path = path.url;
    else if (typeof path.src === 'string') path = path.src;
    else if (typeof path.image === 'string') path = path.image;
    else if (typeof path.image_url === 'string') path = path.image_url;
    else if (Array.isArray(path) && path.length > 0 && typeof path[0] === 'string') path = path[0];
    else return '';
  }
  if (typeof path !== 'string') return '';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return `/units/${window.currentUnitId}/${path}`;
  }
  return path;
}
