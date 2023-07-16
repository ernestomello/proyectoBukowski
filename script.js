var estructura ={
    fecha: "",
    contenido: "",
    titulo:""
}

function cargar_tabla(decla = new Date())
{
    let tabla = document.getElementById("tabla_dias");   
    let newRow = tabla.insertRow(-1);
    let hoy = decla;
    let primer_dia = new Date(hoy.getFullYear(),hoy.getMonth(),"01");
    let ultimo = new Date(hoy.getFullYear(),hoy.getMonth()+1,0)
    let user = localStorage.getItem('usuario')
    
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
            let registro = JSON.parse(localStorage.getItem(user))
            
            if (registro){
                let largo = registro.length;
                let pasa = 0;
                
                for (let i = 0; i < largo; i++)
                {
                    if (registro[i].fecha == dia.toLocaleDateString()){
                        if (contarPalabras(registro[i].contenido) > 15 )
                        {
                            newImage.setAttribute('src','images/2-points.png');  
                            pasa = 1;
                        }
                        else
                        {
                            newImage.setAttribute('src','images/1-point.png');
                            pasa = 1;
                        }
                    }                    
                }
                if (pasa == 0)
                    newImage.setAttribute('src','images/no-points.png');
                //hay que evaluar la cantida de palabras que se guardaron para mostrar: 1-ponit.png /2-ponints.png#HECHO
               
            }
            else{
            newImage.setAttribute('src','images/no-points.png');
            }
        }else
            newImage.setAttribute('src','images/future-points.png');

        newImage.setAttribute('title',dia.toLocaleDateString());
        newImage.setAttribute('id',i);
        newImage.addEventListener("click", function(){cargar_texto(dia)})
        newCell.appendChild(newImage);        
    
    }
}

function cargar_texto(id_texto = new Date())
{
    let textarea = document.getElementById('textarea');
    let parr = document.getElementsByTagName('p');
    let tarea = document.getElementsByTagName('textarea');
    let hoy = new Date();
    let key =id_texto.toLocaleDateString();
    let newText;
    let user = localStorage.getItem('usuario');
    localStorage.setItem('dia_actual',id_texto);
    
    if (parr.length != 0){
        let p = document.getElementById(parr[0].id)
        textarea.removeChild(p);
    }
    if (tarea.length != 0){
        let p = document.getElementById(tarea[0].id)
        textarea.removeChild(p);
    }
    
    
    if ( hoy.toLocaleDateString() == key){
        //creo un textarea para permitir ingresar texto
        newText = document.createElement('textarea');
        newText.setAttribute('id',key);
        textarea.appendChild(newText);
        
    }
    else{
        newText = document.createElement('p');
        newText.setAttribute('id',key);
        newText.innerText ='No tiene Anotaciones este día :(';
        textarea.appendChild(newText);
    }
    
    if (localStorage.getItem(user) != null){
        let inf = buscarFecha(localStorage.getItem(user),key);
        
        if (inf != null)
            newText.innerText = inf;
        //falta cargar el titulo..que no se como
        //newText.innerText = localStorage.getItem(key);
    }

}

function buscarFecha(jsonData,fecha)
{
    let datos = JSON.parse(jsonData);
    let largo = datos.length;
    
    for (let i = 0; i<largo;i++)
    {
        if (datos[i].fecha == fecha)
        {
            return datos[i].contenido;
        }
    } 
return null
}
function contarPalabras(texto) 
{
    let words  = texto.trimEnd().split(' ');
    return words.length
}
function mostrarPalabras()
{
    let texto = document.getElementsByTagName("textarea");
    let words = 0;
    let hoy = new Date();

    
    if (texto.length != 0){    
        if (texto[0].id == hoy.toLocaleDateString())    
            words = contarPalabras(texto[0].value);
    }else{
        let texto = document.getElementsByTagName("p");
        if (texto.length != 0){
            if (texto[0].id == hoy.toLocaleDateString())
                words = contarPalabras(texto.item(0).innerText);
        }
    }
    
    
    let num   = document.getElementById("contador");
       
    if (words > 20)
        num.className = "contador_abajo_pasa";
    else    
        num.className = "contador_abajo";
    
    if (words == 0)
        num.innerText = ""
    else
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
    let key = ini.toLocaleDateString();
    let texto = document.getElementById(key);
    if (texto == null)
        return;
    else
        texto = texto.value;

    let user = localStorage.getItem('usuario');
    let registros = JSON.parse(localStorage.getItem(user));
    let pasa = 0;

    if ( registros != null)
    {
        let largo = registros.length;
        for(let i = 0; i < largo; i++)
        {
            if (registros[i].fecha == key)
            {
                registros[i].contenido = texto;
                pasa = 1;
            }
            //alert("se guardo "+ini.toLocaleDateString())
        }
        if (pasa != 1)
        {
            let regObj = {
                fecha: key,
                contenido: texto,
                titulo: ""
            };
            registros.push(regObj);
        }
        localStorage.setItem(user,JSON.stringify(registros));
    }else{
        let regObj = {
            fecha: key,
            contenido: texto,
            titulo: ""
        };
        let arrObj = [regObj];
        localStorage.setItem(user,JSON.stringify(arrObj));
        //alert("No se guaro"+key)
    }
}
setInterval(mostrarPalabras, 1000);
setInterval(tiempo_restante, 3000);
setInterval(guardar, 30000);
let dia_actual = new Date(localStorage.getItem("dia_actual"));
cargar_tabla();
cargar_texto(dia_actual);
document.getElementById("flecha").addEventListener( 'click', function() {
    let contenedor =document.getElementById("menu_usuarios");
    if (contenedor.style.display === "none")
    {
        contenedor.style.display = "block";
        this.style.transform ="rotate(180deg)";
    }
    else{
        contenedor.style.display = "none"
        this.style.transform ="rotate(0deg)";
    }
 } )
