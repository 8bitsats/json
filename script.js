let items = [];

function addAttribute() {
    const container = document.createElement('div');
    container.innerHTML = `
        <input type="text" placeholder="Trait Type" class="input-field">
        <input type="text" placeholder="Value" class="input-field">
        <input type="text" placeholder="Status" class="input-field">
        <input type="text" placeholder="Percent" class="input-field">
        <button onclick="this.parentNode.remove()" type="button">Remove</button>
    `;
    document.getElementById('attributesContainer').appendChild(container);
}

function addItem() {
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;
    const rank = parseInt(document.getElementById('rank').value, 10);
    const name = document.getElementById('name').value;
    const attributeNodes = document.getElementById('attributesContainer').querySelectorAll('div');
    const attributes = Array.from(attributeNodes).map(node => {
        const inputs = node.querySelectorAll('input');
        return {
            trait_type: inputs[0].value,
            value: inputs[1].value,
            status: inputs[2].value,
            percent: inputs[3].value
        };
    });

    items.push({
        id: id,
        meta: {
            status: status,
            rank: rank,
            name: name,
            attributes: attributes
        }
    });

    // Clear the form for the next item
    document.getElementById('basicFields').reset();
    document.getElementById('attributesContainer').innerHTML = '<button onclick="addAttribute()" type="button">Add Attribute</button>';
}

function generateJSON() {
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(items, null, 2);
}
