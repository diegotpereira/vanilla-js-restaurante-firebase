const loadWrapper = document.getElementById('loadWrapper')

const signup = (email, password, nome) => {
    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            firebaseApp
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    firebaseApp
                        .database()
                        .ref('usuarios/${res.usurio.uid}')
                        .set({
                            email,
                            nome,
                            id: res.usuario.uid,
                        })
                        .then(() => {
                            firebaseApp
                                .database()
                                .ref(`usuarios/${res.usuario.uid}`)
                                .on('value', data => {
                                    let usuario = {...data.val(), id: res.usuario.uid }
                                    usuario && localStorage.setItem('abcusuario', JSON.stringify(usuario))
                                })
                        })
                        .catch(err => {
                            console.warn(err)
                        })
                })
        })
        .catch(err => {
            console.warn(err)
        })
}

carregarAlimentos = () => {
    const telaInicial = document.getElementById('telaInicial')
    firebaseApp
        .database()
        .ref(`comidas`)
        .on('value', snap => {
            let comidas = snap.val() ? Object.values(snap.val()) : []
            localStorage.setItem('abccomidas', JSON.stringify(comidas))

            comidas.map(({ desc, id, imagemURL, nome, preco }) => telaInicial.insertAdjacentElement('beforeend', cartaoAlimentacao(desc, id, imagemURL, nome, preco)))

            loadWrapper.style.display = 'none'
        })
}