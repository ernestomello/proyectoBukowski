function cargar_tabla(tablaID)
{
    let tabla1 = document.getElementById(tablaID);

    let newRow = tabla1.insertRow(-1);
    let primer_dia = new Date("2023","07","01");
    for (let i = 0; i < 10; i++)
    {
        // Insert a cell in the row at index 0
        let newCell = newRow.insertCell();
        let nuevo = primer_dia.getDate() + i;
        // Append a text node to the cell
        let newAnchor = document.createElement('a');
        newAnchor.setAttribute('href','')
        
        let newImage = document.createElement('img');
        
        newImage.setAttribute('src','images/no-points.png');
        
        newImage.setAttribute('id',i);
        newImage.setAttribute('title',nuevo.toLocaleString());
        newAnchor.appendChild(newImage);
        newCell.appendChild(newAnchor);
    
    }
}

function contarPalabras() 
{
    let texto = document.getElementById("texto");
    let num   = document.getElementById("contador");
    
    let words  = texto.value.trimEnd().split(' ');
    
    if (words.length > 20)
        num.className = "contador_abajo_pasa";
    else    
        num.className = "contador_abajo";


    num.innerText = words.length + ' Palabras';
    
}
function tiempo_restante()
{
    let tiempo_restant = document.getElementById('tiempo_restante');

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
    tiempo_restant.innerText = 'Quedan '+ resultado +' hs.';
}
setInterval(contarPalabras, 1000);
setInterval(tiempo_restante, 3000);
cargar_tabla("tabla_dias")

