const setImage = (imgInput) => {
    const [file] = imgInput.files;
    if (file) {
        img_url = URL.createObjectURL(file);
        document.getElementById("source").src = img_url;
        document.getElementById("source").style.width = "50vw"

        document.getElementById("file_path").innerText = file.name;
        document.getElementById("make_button").style.display = 'block';
        document.getElementById("img_preview_container").style.display = 'flex';
        document.getElementById('img_canvas').style.display = 'none';
    }
}

const setSize = (x,y,width,height) => {
    const canvas = document.getElementById('img_canvas');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');

    const source = document.getElementById("source")

    canvas.style.width = width*(source.clientWidth/source.naturalWidth)+"px"
    canvas.width = width
    canvas.height = height

    ctx.drawImage(document.getElementById("source"), x, y, width, height, 0, 0, width, height); 
}

const getSizes = () => {
    const source = document.getElementById("source")
    const x1 = document.getElementById("x1-slider").value;
    const y1 = document.getElementById("y1-slider").value;
    const x2 = document.getElementById("x2-slider").value;
    const y2 = document.getElementById("y2-slider").value;

    const x = (x1*source.naturalWidth)/100;
    const y = (y1*source.naturalHeight)/100;
    const width = (x2*source.naturalWidth)/100 - x;
    const height = (y2*source.naturalHeight)/100 - y;

    return([x,y,width,height])
}

const equalize = (input) => {
    let fields = input.id.split("-")
    let id = fields[0]
    if (fields[1]=="slider") {
        id+="-num"
    } else {
        id+="-slider"
    }
    document.getElementById(id).value=input.value

    const [x,y,width,height] = getSizes();
    setSize(x,y,width,height);
}

const downloadImage = () => {
    let tempLink = document.createElement('a');
    let fileName = 'button.png';
    tempLink.download = fileName;
    tempLink.href = document.getElementById('img_canvas').toDataURL("image/png", 0.9);
    tempLink.click();
}

const move = (cord,operation) => {
    const shift = document.getElementById(cord+"2-slider").value - document.getElementById(cord+"1-slider").value;
    if (operation=="-" && document.getElementById(cord+"1-slider").value-shift>=0) {
        document.getElementById(cord+"1-slider").value -= shift;
        document.getElementById(cord+"2-slider").value -= shift;
        document.getElementById(cord+"1-num").value -= shift;
        document.getElementById(cord+"2-num").value -= shift;
    } else if (operation=="+" && Number(document.getElementById(cord+"2-slider").value)+shift<=100) {
        document.getElementById(cord+"1-slider").value = Number(document.getElementById(cord+"1-slider").value) + shift;
        document.getElementById(cord+"2-slider").value = Number(document.getElementById(cord+"2-slider").value) + shift;
        document.getElementById(cord+"1-num").value = document.getElementById(cord+"1-slider").value;
        document.getElementById(cord+"2-num").value = document.getElementById(cord+"2-slider").value;
    }
    const [x,y,width,height] = getSizes(); 
    setSize(x,y,width,height);
}

