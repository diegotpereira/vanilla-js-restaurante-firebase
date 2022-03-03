const headerRef = document.getElementById('header')
const navRef = document.getElementById('mainNav')

const headerEl = '<h1 class="site-heading text-center text-faded d-none d-lg-block"><span class="site-heading-upper text-primary mb-3>"Um restaurante de classe mundial</span><span class="site-heading-upper text-primary mb-3">Um restaurante de classe mundial</span><span class="site-heading-lower"><br>ABC</b> Restaurante</span></h1>'

const navEl = (el) => `<div class="container"><a class="navbar-brand text-uppercase fw-bold d-lg-none" href="index.html"><b>ABC</b> Restaurant</a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent"><ul class="navbar-nav mx-auto"><li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="index.html">Home</a></li><li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="sobre.html">Sobre</a></li>${el}</ul></div></div>`

headerRef && headerRef.insertAdjacentHTML('beforebegin', headerEl)
navRef && firebaseApp.auth().onAuthStateChanged(usuario => {
    if (usuario) {
        navRef.insertAdjacentHTML('beforeend', navEl('<li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="pedidos.html">Pedidos</a></li><li class="nav-item px-lg-4"><a class="nav-link text-uppercase" onclick="Sair()">Sair</a></li>'))
    } else {
        navRef.insertAdjacentHTML('beforeend', navEl('<li class="nav-item px-lg-4"><a class="nav-link text-uppercase" href="entrar.html">Entrar</a></li>'))
    }
})
firebaseApp.auth().onAuthStateChanged(usuario => {
    if (usuario) {
        console.log("logado: ", usuario);
    } {
        console.log("desconectado");
    }
})