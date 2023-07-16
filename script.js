/* var estructura ={
    fecha: "",
    contenido: "",
    titulo:""
} */
const cant_palabras = 30;
function cargar_tabla(decla = new Date())
{
    let tabla = document.getElementById("tabla_dias");  
    
    while(tabla.firstChild){
        tabla.removeChild(tabla.firstChild);
    } 
    let newRow = tabla.insertRow(-1);
    let hoy = new Date();
    let primer_dia = new Date(decla.getFullYear(),decla.getMonth(),"01");
    let ultimo_dia = new Date(decla.getFullYear(),decla.getMonth()+1,0);
    let mes_anterior = new Date(decla.getFullYear(),decla.getMonth()-1,1);
    let mes_siguiente = new Date(decla.getFullYear(),decla.getMonth()+1,1);

    let user = localStorage.getItem('usuario')

    let newCell = newRow.insertCell();
    
    let newImage = document.createElement('img');
    newImage.setAttribute('src','images/atras.png');
    newImage.setAttribute('title',mes_anterior.toLocaleDateString());
    newImage.setAttribute('id',"mes_ant");
    newImage.addEventListener("click", function(){
        cargar_tabla(mes_anterior);
        cargar_texto(mes_anterior);
    })
    newCell.appendChild(newImage);        
    
    for (let i = 0; i < ultimo_dia.getDate(); i++)
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
                        if (contarPalabras(registro[i].contenido) >= cant_palabras )
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
    if (mes_siguiente <= hoy){
        let newCell = newRow.insertCell();
        let newImage = document.createElement('img');
        newImage.setAttribute('src','images/adelante.png');
        newImage.setAttribute('title',mes_siguiente.toLocaleDateString());
        newImage.setAttribute('id',"mes_ant");
        newImage.addEventListener("click", function(){
            cargar_tabla(mes_siguiente);
            cargar_texto(mes_siguiente);
        })
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
        document.getElementById('titulo_dia').removeAttribute('readonly');
        document.getElementById('titulo_dia').setAttribute('placeholder','Ingrese un titulo para su dia');
        textarea.appendChild(newText);
        
    }
    else{
        newText = document.createElement('p');
        newText.setAttribute('id',key);
        newText.innerHTML ='No tiene Anotaciones el día '+key+' :( <br> Pero no te pongas mal ;) <br> <b> Hoy puede ser un gran día !!!</b>' ;
        document.getElementById('titulo_dia').value ="";
        document.getElementById('titulo_dia').setAttribute('placeholder','No tine titulo ingresado');
        document.getElementById('titulo_dia').setAttribute('readonly','true');
        textarea.appendChild(newText);
    }
    
    if (localStorage.getItem(user) != null){
        let inf = buscarFecha(localStorage.getItem(user),key);
        
        if (inf != null){ 
            newText.innerText = inf.contenido;
            document.getElementById('titulo_dia').value = inf.titulo;
        }
        
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
            return datos[i];
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
       
    if (words > cant_palabras)
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
    document.getElementById('guardado').style = 'display: none';
}


function guardar()
{
    let ini = new Date();
    let key = ini.toLocaleDateString();
    let texto = document.getElementById(key);
    let titulo = document.getElementById('titulo_dia');
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
                registros[i].titulo = titulo.value;
                pasa = 1;
            }
        }
        if (pasa != 1)
        {
            let regObj = {
                fecha: key,
                contenido: texto,
                titulo: titulo.value
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
    document.getElementById('guardado').style = 'display: block';
}


setInterval(mostrarPalabras, 1000);
setInterval(tiempo_restante, 20000);
setInterval(guardar, 30000);
let dia_actual = new Date(localStorage.getItem("dia_actual"));
let usuario_logueado = localStorage.getItem("usuario");
cargar_tabla();
cargar_texto(dia_actual);

const ul = document.querySelectorAll('.user');

ul.forEach(ul => ul.addEventListener('click', event =>{
    //alert(event.target.getAttribute('alt'));
    let alt = event.target.getAttribute('alt');
    let src = event.target.getAttribute('src');
    let clas = event.target.getAttribute('class');
    
    localStorage.setItem('usuario',alt);
    let img = "<img class="+clas+" src="+src+" alt="+alt+" width='20%'> Activo";
    document.getElementById('usuario').innerHTML = img;
    cargar_tabla();
    cargar_texto(dia_actual);
}))
/*document.getElementById("flecha").addEventListener( 'click', function() {
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
 */
