import { getAssetUrl } from './engine/assets.js';

export function renderCoverSourcesHTML(unitData, skipFirstImage = false) {
  if (unitData.cover_sources && unitData.cover_sources.length > 0) {
    const sourcesToRender = skipFirstImage
      ? unitData.cover_sources.slice(1)
      : unitData.cover_sources;
    if (sourcesToRender.length === 0) return '';
    return `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; text-align: left;">
        ${sourcesToRender
          .map(
            (src) => `
          <div style="display: flex; align-items: center; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <div style="flex: 0 0 150px; height: 150px; border-radius: 8px; overflow: hidden; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <img src="${getAssetUrl(src.image)}" alt="${src.title}" style="width: 100%; height: 100%; object-fit: cover; cursor: zoom-in;" onclick="window.openModal && window.openModal(this.src)">
            </div>
            <div style="flex: 1;">
              <h4 style="margin: 0 0 5px 0; color: #0f172a; font-size: 1rem;">${src.title}</h4>
              <p style="margin: 0; color: #475569; font-size: 0.85rem; line-height: 1.4;">${src.description}</p>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    `;
  } else if (Array.isArray(unitData.cover_image) && unitData.cover_image.length > 0) {
    const imagesToRender = skipFirstImage ? unitData.cover_image.slice(1) : unitData.cover_image;
    if (imagesToRender.length === 0) return '';
    return `
      <div style="display: flex; gap: 15px; justify-content: center; margin-bottom: 20px;">
        ${imagesToRender
          .map(
            (img) => `
          <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; flex: 1; max-height: 400px; display: flex; align-items: center; justify-content: center; background: #0f172a;">
            <img src="${getAssetUrl(img)}" alt="Unit Cover" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">
          </div>
        `,
          )
          .join('')}
      </div>
    `;
  } else if (unitData.cover_image && !skipFirstImage) {
    return `
      <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 4px solid white; display: block; margin: 0 auto 5px auto; max-width: 33%;">
        <img src="${getAssetUrl(unitData.cover_image)}" alt="Unit Cover" style="max-width: 100%; height: auto; display: block; max-height: 400px; margin: 0 auto;">
      </div>
    `;
  }
  return '';
}
