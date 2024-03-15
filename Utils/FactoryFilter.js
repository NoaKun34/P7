import { removeSelectedFilterItem } from "./Events.js";

export default function createSelectedFilterElement(filterId, filterTitle, closeIconPath) {
    // Création de l'élément div principal
    const div = document.createElement('div');
    div.className = 'selectedFilter';

    // Création de l'élément p pour le titre du filtre
    const p = document.createElement('p');
    p.id = `selectedFilter${filterId}`;
    p.className = 'selectedFilterTitle';
    p.textContent = filterTitle;

    // Création de l'élément img pour l'icône de fermeture
    const img = document.createElement('img');
    img.className = 'selectedFilterClose';
    img.src = closeIconPath;
    img.alt = 'Supprimer le filtre';

    img.addEventListener('click', function() {
        removeSelectedFilterItem(filterTitle);
        div.remove();
    });

    // Assemblage des éléments
    div.appendChild(p);
    div.appendChild(img);

    return div;
}