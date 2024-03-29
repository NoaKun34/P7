import { removeSelectedFilterItem } from "./Events.js";

export default function createSelectedFilterElement(filterId, filterTitle, closeIconPath) {
    const div = document.createElement('div');
    div.className = 'selectedFilter';

    const p = document.createElement('p');
    p.id = `selectedFilter${filterId}`;
    p.className = 'selectedFilterTitle';
    p.textContent = filterTitle;

    const img = document.createElement('img');
    img.className = 'selectedFilterClose';
    img.src = closeIconPath;
    img.alt = 'Supprimer le filtre';

    img.addEventListener('click', function() {
        removeSelectedFilterItem(filterTitle);
        div.remove();
    });

    div.appendChild(p);
    div.appendChild(img);

    return div;
}