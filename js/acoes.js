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