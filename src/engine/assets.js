export function getAssetUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('/')) return path;
  if (window.currentUnitId) {
    return `/units/${window.currentUnitId}/${path}`;
  }
  return path;
}
