document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const DadosFormulario = new FormData(e.target)
    const email = DadosFormulario.get('email')
    const password = DadosFormulario.get('password')
    const nome = DadosFormulario.get('nome')

    signup(email, password, nome)
})

firebaseApp.auth().onAuthStateChanged(usuario => {
    if (usuario) {
        window.location.pathname = '/'
    }
})