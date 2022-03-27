console.log("js1.js")

document.getElementById("download").addEventListener('submit', async (event) => {
    event.preventDefault();
    const url = 'http://localhost:3000/profile-download-single';
    console.log('submit')
    const formData = new FormData(event.target);
    console.log('formData:', formData)
    const result = await fetch(url, {
        method: 'POST',
        body: formData // on oublie pas de lui envoyer les infos
    });
    // const responsejson = await response.json();
    // console.log('response.status', response.status)
    // console.log('responsejson[0]', responsejson[0])
    // console.log('responsejson[1]', responsejson[1])
    const photo = document.getElementById('photo');

    const blob = await result.blob();
    console.log('blob:', blob);
    const base64 = URL.createObjectURL(blob);
    console.log('base64 ',base64);

    var img = document.createElement('img');
    photo.href = base64; 
    // console.log('img.href:', img.href)
    photo.appendChild(img);
    


    // const a = document.createElement('a');
    // a.href = window.URL.createObjectURL(blob);
    // a.download = 'toto';
    // return a.click();

})