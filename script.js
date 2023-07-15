function cargar_tabla()
{
    let tabla = document.getElementById("tabla_dias");   
    let newRow = tabla.insertRow(-1);
    let hoy = new Date();
    let primer_dia = new Date(hoy.getFullYear(),hoy.getMonth(),"01");
    let ultimo = new Date(hoy.getFullYear(),hoy.getMonth()+1,0)
    for (let i = 0; i < ultimo.getDate(); i++)
    {
        // Inserta una celda en la fila
        let newCell = newRow.insertCell();
        // se carga en nuevo el día a generar
        let nuevo = (primer_dia.getDate() + i).toString();
        // en día se agrega el objeto fecha completa con el día nuevo
        let dia = new Date(primer_dia.getFullYear(),primer_dia.getMonth(),nuevo);
        // Append a text node to the cell
        
        // se crea una etiqueta <img>
        let newImage = document.createElement('img');
        // en caso de que haya registro en localStorage del día que se está cargando se pone otra imagen
        if (dia < hoy){
            let registro = localStorage.getItem(dia.toLocaleDateString())
            if (registro){
                //hay que evaluar la cantida de palabras que se guardaron para mostrar: 1-ponit.png /2-ponints.png#HECHO
                if (contarPalabras(registro) > 15 )
                    newImage.setAttribute('src','images/2-points.png');  
                else
                    newImage.setAttribute('src','images/1-point.png');
            }
            else{
            newImage.setAttribute('src','images/no-points.png');
            }
        }else
            newImage.setAttribute('src','images/future-points.png');

        newImage.setAttribute('title',dia.toLocaleDateString());
        newImage.setAttribute('id',i);
        newImage.addEventListener("click", function(){cargar_texto(dia.toLocaleDateString())})
        newCell.appendChild(newImage);        
    
    }
}

function cargar_texto(id_texto)
{
    let textarea = document.getElementById('textarea');
    let parr = document.getElementsByTagName('p');
    let tarea = document.getElementsByTagName('textarea');
    let hoy = new Date();
    let newText;
    
    if (parr.length != 0){
        let p = document.getElementById(parr[0].id)
        textarea.removeChild(p);
    }
    if (tarea.length != 0){
        let p = document.getElementById(tarea[0].id)
        textarea.removeChild(p);
    }
    
    
    if ( hoy.toLocaleDateString() == id_texto){
        //creo un textarea para permitir ingresar texto
        newText = document.createElement('textarea');
        newText.setAttribute('id',id_texto);
        textarea.appendChild(newText);
        
    }
    else{
        newText = document.createElement('p');
        newText.setAttribute('id',id_texto);
        newText.innerText ='No tiene Anotaciones este día :(';
        textarea.appendChild(newText);
    }
    
    if (localStorage.getItem(id_texto)){
        newText.innerText = localStorage.getItem(id_texto);
    }

}
function contarPalabras(texto) 
{
    let words  = texto.trimEnd().split(' ');
    return words.length
}
function mostrarPalabras()
{
    let texto = document.getElementsByTagName("textarea");
    let words;
    if (texto.length != 0){        
        words = contarPalabras(texto[0].value);
    }else{
        let texto = document.getElementsByTagName("p");
        if (texto.length != 0){
            words = contarPalabras(texto.item(0).innerText);
        }
    }
    
    
    let num   = document.getElementById("contador");
       
    if (words > 20)
        num.className = "contador_abajo_pasa";
    else    
        num.className = "contador_abajo";
    num.innerText = words + ' Palabras';
    
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

function guardar()
{
    let ini = new Date();
    let texto = document.getElementById(ini.toLocaleDateString())
    if (localStorage.getItem(ini.toLocaleDateString()))
    {
        localStorage.setItem(ini.toLocaleDateString(),texto.value)
        //alert("se guardo "+ini.toLocaleDateString())
    }else{
        alert("No se guaro"+ini.toLocaleDateString())
    }
}
setInterval(mostrarPalabras, 1000);
setInterval(tiempo_restante, 3000);
setInterval(guardar, 30000);
cargar_tabla();
cargar_texto("14/7/2023");
