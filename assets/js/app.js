//variables
const listaTweets = document.querySelector("#lista-tweets");
const cajaTexto = document.getElementById("tweet");

//Events
eventListeners();

function eventListeners() {
  //Cuando se envia el form
  document
    .getElementById("formulario")
    .addEventListener("submit", agregarTweet);

  //borrar tweets
  listaTweets.addEventListener("click", borrarTweet);

  //para cargar los tweets cuando inicia la pagina
  listaTweets.addEventListener("DOMContentLoaded", listarTweetlocalStorage());
}

//Funciones
//para mostrar los tweets del localStorage en la lista
function listarTweetlocalStorage() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  cajaTexto.focus();
  tweets.forEach(function (tweet) {
    const btnBorrar = document.createElement("a");
    btnBorrar.classList = "borrar-tweet";
    btnBorrar.innerText = "X";
    const li = document.createElement("li");
    li.innerText = tweet;
    li.appendChild(btnBorrar);
    listaTweets.appendChild(li);
  });
}

//para agregar el tweet al listado
function agregarTweet(e) {
  e.preventDefault();
  //para leer el valor del input
  const tweet = document.getElementById("tweet").value;
  //para crear el boton eliminar
  const btnBorrar = document.createElement("a");
  btnBorrar.classList = "borrar-tweet";
  btnBorrar.innerText = "X";
  //para crear un elemento
  const li = document.createElement("li");
  //valido que la caja de texto contenga un valor y agrego a la lista
  if (cajaTexto.value == "") {
    alert("Debe ingresar un valor");
    cajaTexto.focus();
  } else {
    li.innerText = tweet;
    li.appendChild(btnBorrar);
    listaTweets.appendChild(li);
    //para agregar el tweet al localStorage
    agregarTweetLocalStorage(tweet);
    limpiarCaja();
  }
}

//para eliminar el tweet
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    let resp = confirm("seguro que quiere eliminar el tweet?");
    if (resp == true) {
      e.target.parentElement.remove();
      borrarTweetLocalStorage(e.target.parentElement.innerText);
      cajaTexto.focus();
    }
  }
}

//para agregar un tweet al localStorage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  //agrego el tweet al array de tweets
  tweets.push(tweet);
  //convierto el json y lo guardo
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//para borrar el tweet del localStorage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;

  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//para obtener los tweets guardados en el localStorage
function obtenerTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

//para limpiar la caja de texto
function limpiarCaja() {
  cajaTexto.value = "";
  cajaTexto.focus();
}
