const loadWrapper = document.getElementById('loadWrapper')
const errDiv = document.querySelector('err')
const emptyWrapper = document.querySelector('emptyWrapper')

const signin = (email, password) => {
    firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            firebaseApp
                .database()
                .ref(`usuarios/${res.usuario.uid}`)
                .on('value', data => {
                    let usuario = data.val()
                    usuario && localStorage.setItem('abcusuario', JSON.stringify(usuario))
                })
            if (errDiv) {
                errDiv.innerHTML = ''
            }
        })
        .catch(err => {
            console.warn(err.message);
            if (errDiv) {
                errDiv.innerHTML = err.message
            }
        })
}

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

            comidas.map(({ desc, id, imagemURL, nome, preco }) => telaInicial.insertAdjacentHTML('beforeend', cartaoAlimentacao(desc, id, imagemURL, nome, preco)))

            loadWrapper.style.display = 'none'
        })
}

const Sair = () => {
    firebaseApp.auth().signOut()
    window.location = window.location
}

const enviarPedido = (produto, el) => {
    const id = Date.now()

    firebaseApp.auth().onAuthStateChanged(usuario => {
        if (usuario) {
            firebaseApp
                .database()
                .ref(`pedidos/${id}`)
                .set({
                    id,
                    produto,
                    usuarioID: usuario.uid
                })
            el.setAttribute('disabled', true)
            el.innerHTML = 'enviado'
        } else {
            alert('você não está logado')
        }
    })
}
const carregarPedidos = () => {
    console.log(emptyWrapper);

    firebaseApp
        .database()
        .ref(`pedidos`)
        .on('value', snap => {
            let pedidos = snap.val() ? Object.values(snap.val()) : []
            localStorage.setItem('abcpedidos', JSON.stringify(pedidos))

            const telaPedidos = document.getElementById('telaPedidos')

            pedidos.filter(({ usuarioID }) => usuarioID == firebaseApp.auth().currentUser.uid).map(({ produto }) => telaPedidos.insertAdjacentHTML('beforeend', pedidoCartao(produto.nome, produto.preco, produto.imagemURL)))

            loadWrapper.style.display = 'none'

            if (pedidos.filter(({ usuarioID }) => usuarioID == firebaseApp.auth().currentUser.uid).length < 1) {
                emptyWrapper.style.display = 'block'
            }
            console.log('comparação1: ', firebaseApp.auth().currentUser.uid);
        })
}