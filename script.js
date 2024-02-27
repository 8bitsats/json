let meta = {};
let inscriptions = [];

function addInscription() {
    const inscriptionsContainer = document.getElementById('inscriptionsContainer');
    const newInscriptionDiv = document.createElement('div');
    newInscriptionDiv.classList.add('inscription');
    newInscriptionDiv.innerHTML = `
        <input type="text" placeholder="ID" class="inscription-id">
        <input type="text" placeholder="Name" class="inscription-name">
        <div class="attributes-container"></div>
        <button onclick="addAttribute(this)">Add new attribute</button>
        <button onclick="removeInscription(this)">Remove inscription</button>
    `;
    inscriptionsContainer.appendChild(newInscriptionDiv);
}

function addAttribute(button) {
    const attributesContainer = button.previousElementSibling;
    const newAttributeDiv = document.createElement('div');
    newAttributeDiv.classList.add('attribute');
    newAttributeDiv.innerHTML = `
        <input type="text" placeholder="Trait Type">
        <input type="text" placeholder="Value">
        <input type="text" placeholder="Status">
        <input type="text" placeholder="Percent">
        <button onclick="removeAttribute(this)">Remove</button>
    `;
    attributesContainer.appendChild(newAttributeDiv);
}

function removeInscription(button) {
    button.parentElement.remove();
}

function removeAttribute(button) {
    button.parentElement.remove();
}

function downloadMetaJSON() {
    meta = {
        name: document.getElementById('name').value,
        slug: document.getElementById('slug').value,
        supply: document.getElementById('supply').value,
        description: document.getElementById('description').value,
        inscription_icon: document.getElementById('inscriptionIcon').value,
        twitter_link: document.getElementById('twitterLink').value,
        discord_link: document.getElementById('discordLink').value,
        website_link: document.getElementById('websiteLink').value,
    };
    downloadObjectAsJson(meta, 'meta');
}

function downloadInscriptionsJSON() {
    inscriptions = Array.from(document.getElementsByClassName('inscription')).map(inscriptionDiv => {
        const id = inscriptionDiv.querySelector('.inscription-id').value;
        const name = inscriptionDiv.querySelector('.inscription-name').value;
        const attributes = Array.from(inscriptionDiv.getElementsByClassName('attribute')).map(attributeDiv => {
            const inputs = attributeDiv.querySelectorAll('input');
            return {
                trait_type: inputs[0].value,
                value: inputs[1].value,
                status: inputs[2].value,
                percent: inputs[3].value,
            };
        });
        return { id, meta: { name, attributes } };
    });
    downloadObjectAsJson(inscriptions, 'inscriptions');
}

function downloadObjectAsJson(exportObj, exportName){
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('slug').value = '';
    document.getElementById('supply').value = '';
    document.getElementById('description').value = '';
    document.getElementById('inscriptionIcon').value = '';
    document.getElementById('twitterLink').value = '';
    document.getElementById('discordLink').value = '';
    document.getElementById('websiteLink').value = '';
    document.getElementById('inscriptionsContainer').innerHTML = '';
    meta = {};
    inscriptions = [];
}
