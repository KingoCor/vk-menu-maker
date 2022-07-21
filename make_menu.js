const addImage = () => {
    if (document.getElementById("id_input").value != '' && document.getElementById("url_input").value != '') {
        const id = document.getElementById("id_input").value;
        const url = document.getElementById("url_input").value;

        document.getElementById("id_input").value = '';
        document.getElementById("url_input").value = '';

        let li = document.createElement('li');
        li.innerHTML='\n<span id="img_id" class="img-id">'+id+'</span>'
        li.innerHTML+=`\n<span onclick='addButton("${id}","${url}")' class="add-item"><i class="fa-solid fa-plus"></i></span>`
        li.innerHTML+='<span onclick="deletImageFromList(this)" class="trash-bin"><i class="fa-solid fa-trash-can"></i></span>'
        li.innerHTML+='\n<span id="img_url" style="display: none;">'+url+'</span>'

        document.getElementById("photo_list").appendChild(li)
    }
}

const deletImageFromList = (bin) => {
    document.getElementById("photo_list").removeChild(bin.parentNode);
}

let current_img_url = ''
let current_img_id = ''
const addButton = (id,url) => {
    closeSettings();
    const menu = document.getElementById('menu');
    current_img_url = url;
    current_img_id = id;

    let hs = document.createElement('div');
    hs.className = "add-separater"
    hs.id = "first_hs"
    hs.onclick = () => {insertImg(hs)}
    menu.prepend(hs)

    const rows = menu.getElementsByTagName("tbody")[0].rows;
    if (rows) {
        for (const row of rows) {
            let hs = document.createElement('div');
            hs.className = "add-separater"
            hs.id = "hs"
            hs.onclick = () => {insertImg(hs)}
            menu.getElementsByTagName("tbody")[0].insertBefore(hs, row.nextSibling)

            const items = row.children[0].getElementsByTagName("img");
            for (const item of items) {
                let vs = document.createElement('div');
                vs.className = "add-separater"
                vs.id = "vs"
                vs.onclick = () => {insertImg(vs)}
                vs.style.height = row.children[0].height
                row.children[0].insertBefore(vs, item)
            }

            let vs = document.createElement('div');
            vs.className = "add-separater"
            vs.id = "vs"
            vs.onclick = () => {insertImg(vs)}
            vs.style.height = row.children[0].height
            row.children[0].appendChild(vs)
        }
    }
}

const deletSeparaters = () => {
    while (document.getElementsByClassName("add-separater").length!=0) {
        const separater = document.getElementsByClassName("add-separater")[0] 
        separater.parentNode.removeChild(separater)
    }
}

const insertImg = (inserter) => {
    if (inserter.id=="hs") {
        let tr = document.createElement("tr")
        tr.innerHTML = "<th><img onclick='showImageSettings(this)' style='width: 608px;' src='"+current_img_url+"' id='"+current_img_id+"'></th>"
        inserter.parentNode.replaceChild(tr,inserter)
        deletSeparaters();
    } else if (inserter.id=="first_hs") {
        let tr = document.createElement("tr")
        tr.innerHTML = "<th><img onclick='showImageSettings(this)' style='width: 608px;' src='"+current_img_url+"' id='"+current_img_id+"'></th>"
        let tbody = document.getElementsByTagName("tbody")[0];
        if (tbody) {
            tbody.insertBefore(tr,tbody.rows[0])
        } else {
            tbody = document.createElement("tbody")
            tbody.innerHTML = "<tr><th><img onclick='showImageSettings(this)' style='width: 608px;' src='"+current_img_url+"' id='"+current_img_id+"'></th></tr>"
            document.getElementById("menu").appendChild(tbody)
        }
        deletSeparaters();
    } else if (inserter.id=="vs") {
        const row = inserter.parentNode;
        let img = document.createElement("img")
        img.src = current_img_url
        img.id = current_img_id
        img.onclick = () => { showImageSettings(img) }
        inserter.parentNode.replaceChild(img,inserter)
        deletSeparaters();
        for (const element of row.children) {
            element.style.width = Math.round(608/row.children.length)+"px"
        }
        row.children[row.children.length-1].style.width = Math.round(608/row.children.length)-1+"px" 
    }
}

const closeSettings = () => {
    if (document.getElementById("image_settings")) {
        document.getElementById("image_settings").parentNode.removeChild(document.getElementById("image_settings"))
    }
}

const showImageSettings = (image) => {
    deletSeparaters();
    closeSettings();

    let link = ''
    if (image.getElementsByClassName("link").length) {
        link = image.getElementsByClassName("link")[0].innerText;
    }

    let div = document.createElement("div")
    div.id = "image_settings"
    div.className = "image-settings"
    div.innerHTML = '<input placeholder="Ссылка" class="img-input" id="link_input"></input>'
    div.innerHTML += '<span id="delet_image" class="trash-bin"><i class="fa-solid fa-trash-can"></i></span><br/>'
    div.innerHTML += '<button id="save_settings" class="primary" style="padding: 10px; font-size: 12pt;">Сохранить</button>'
    div.innerHTML += '<button class="primary" onclick="closeSettings()" style="padding: 10px; font-size: 12pt; margin-left: 10px;">Отмена</button>'

    document.getElementsByTagName("body")[0].appendChild(div)
    document.getElementById("save_settings").onclick = () => {saveSettings(image)}
    document.getElementById("delet_image").onclick = () => {deletImage(image)}
    document.getElementById("link_input").value = link
}

const saveSettings = (image) => {
    if (image.getElementsByClassName("link").length) {
        image.getElementsByClassName("link")[0].innerText = document.getElementById("link_input").value
    } else {
        let link = document.createElement("span");
        link.className = "link";
        link.style.display = "none";
        link.innerText = document.getElementById("link_input").value

        image.appendChild(link);
    }
    closeSettings();
}

const deletImage = (image) => {
    let row = image.parentNode
    row.removeChild(image)

    if (row.children.length!=0) {
        for (const element of row.children) {
            element.style.width = Math.round(608/row.children.length)+"px"
        }
        row.children[row.children.length-1].style.width = Math.round(608/row.children.length)-1+"px" 
    } else {
        console.log(row.children)
        console.log(row)
        row.parentNode.parentNode.removeChild(row.parentNode)
    }
    closeSettings();
}

const compile = () => {
    let text = 'Вы ничего не добавили'
    let tbody = document.getElementsByTagName("tbody")
    if (tbody.length!=0 && tbody[0].children.length!=0) {
        text=''
        for (const row of tbody[0].getElementsByTagName("th")) {
            for (const image of row.children) {
                let link = ";nolink| "
                if (image.getElementsByClassName("link").length) {
                    link = "|"+image.getElementsByClassName("link")[0].innerText
                }
                text+=`[[${image.id}|${image.clientWidth}x${row.clientHeight}px;nopadding${link}]]`
            }
            text+="\n"
        }
    }

    let div = document.createElement("div")
    div.id = "image_settings"
    div.style.textAlign = "center"
    div.className = "image-settings"
    div.innerHTML = '<textarea id="compiled_text"></textarea><br/>'
    div.innerHTML += '<button class="primary" onclick="closeSettings()" style="padding: 10px; font-size: 12pt; margin-left: 10px;">Закрыть</button>'
    document.getElementsByTagName("body")[0].appendChild(div)
    document.getElementById("compiled_text").value = text
}
