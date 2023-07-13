function prueba()
{
console.error('alerta de consola')
}

function contarPalabras() 
{
    let texto = document.getElementById("texto");
    let num   = document.getElementById("contador");
    let tiempo_restante = document.getElementById('tiempo_restante');
    
    let words  = texto.value.trimEnd().split(' ');
    let ini = new Date();
    let fin = new Date(ini.getFullYear(),ini.getMonth(),ini.getDate() +1 )
    
    let segundos = Math.abs(ini - fin) / 1000;
    let minutos = Math.floor(segundos / 60);
    //segundos %= 60;
    let horas = Math.floor(minutos / 60);
    //minutos %= 60;
    let resultado = [
        ("0" + horas).substring(0,2),
        ("0" + minutos).substring(0,2),
        ("0" + segundos).substring(0,2)
    ].join(":");
    if (words.length > 30)
        num.className = "contador_abajo_pasa";
    else    
        num.className = "contador_abajo";


    num.innerText = words.length + ' Palabras';
    tiempo_restante.innerText = '- Quedan '+ resultado +' hs.';
}
setInterval(contarPalabras, 1000);