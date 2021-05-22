const loadingEl = document.querySelector('#loading');
const itemEl = document.querySelector('#items');
let loading = false;

const getItemsFromBackEnd = async () => {

    loading = true;
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    loading = false;

    return data;
}

const appendItemsToDom = async () => {
    const items = await getItemsFromBackEnd(); 

    if(!loading) {
        loadingEl.innerHTML = ''
    }
    
    items.forEach( item => {
        const div = document.createElement('div');

        div.className = 'item'
        div.innerHTML = `
        <h3>${item.title}</h3>
        <ul>
            <li><strong>Scheduled Date: </strong> ${item.date}</li>
            <li><strong>Description: </strong> ${item.description}</li>
        </ul>
        <div class="tags">${item.tags}</div>
        `

        itemEl.appendChild(div)
    });
}

appendItemsToDom()