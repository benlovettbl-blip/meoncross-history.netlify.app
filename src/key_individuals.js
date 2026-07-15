import { getAssetUrl } from './core_app.js';

export function initKeyIndividualsTask(container, keyIndividualsData) {
  if (!keyIndividualsData || keyIndividualsData.length === 0) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'key-individuals-wrapper fade-in';
  wrapper.style.padding = '20px';
  wrapper.style.maxWidth = '1200px';
  wrapper.style.margin = '0 auto';

  const header = document.createElement('div');
  header.style.textAlign = 'center';
  header.style.marginBottom = '40px';
  header.innerHTML = `
    <h1 style="font-family: var(--font-heading); color: var(--primary); margin-bottom: 10px; font-size: 2.5rem;">Key Individuals</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Profiles of the major historical figures who shaped these events.</p>
  `;
  wrapper.appendChild(header);

  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
  grid.style.gap = '25px';

  keyIndividualsData.forEach(person => {
    const card = document.createElement('div');
    card.className = 'person-card';
    card.style.background = 'rgba(255, 255, 255, 0.05)';
    card.style.border = '1px solid var(--border-glass)';
    card.style.borderRadius = '12px';
    card.style.overflow = 'hidden';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.transition = 'transform 0.2s, box-shadow 0.2s';
    card.style.cursor = 'pointer';

    card.onmouseover = () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    };
    card.onmouseout = () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    };

    if (person.image) {
      const imgContainer = document.createElement('div');
      imgContainer.style.width = '100%';
      imgContainer.style.height = '280px';
      imgContainer.style.background = 'var(--bg-card)';
      imgContainer.style.display = 'flex';
      imgContainer.style.alignItems = 'center';
      imgContainer.style.justifyContent = 'center';
      imgContainer.style.borderBottom = '1px solid var(--border-glass)';
      imgContainer.style.overflow = 'hidden';

      const img = document.createElement('img');
      img.src = getAssetUrl(person.image);
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.onerror = () => { imgContainer.style.display = 'none'; };
      imgContainer.appendChild(img);
      card.appendChild(imgContainer);
    }

    const info = document.createElement('div');
    info.style.padding = '20px';
    info.style.flex = '1';

    const name = document.createElement('h3');
    name.textContent = person.name;
    name.style.margin = '0 0 5px 0';
    name.style.color = 'var(--primary)';
    name.style.fontFamily = 'var(--font-heading)';

    const role = document.createElement('p');
    role.textContent = person.role;
    role.style.margin = '0 0 15px 0';
    role.style.color = 'var(--text-muted)';
    role.style.fontSize = '0.9rem';
    role.style.textTransform = 'uppercase';
    role.style.letterSpacing = '1px';

    const bio = document.createElement('div');
    bio.style.margin = '0';
    bio.style.color = 'var(--text-main)';
    bio.style.fontSize = '0.95rem';
    bio.style.lineHeight = '1.5';

    if (person.bio) {
      bio.textContent = person.bio;
    } else if (person.significance) {
      bio.innerHTML = `<strong>Significance:</strong> ${person.significance}`;
      if (person.achievements && person.achievements.length > 0) {
        bio.innerHTML += `<br><br><strong>Achievements:</strong><ul style="margin-top: 5px; padding-left: 20px; margin-bottom: 0;"><li>${person.achievements.join('</li><li>')}</li></ul>`;
      }
    }

    info.appendChild(name);
    
    if (person.lifespan) {
      const life = document.createElement('p');
      life.textContent = person.lifespan;
      life.style.fontSize = '0.85rem';
      life.style.color = 'var(--text-muted)';
      life.style.marginTop = '-10px';
      life.style.marginBottom = '10px';
      info.appendChild(life);
    }

    info.appendChild(role);
    info.appendChild(bio);

    card.appendChild(info);

    grid.appendChild(card);
  });

  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}
