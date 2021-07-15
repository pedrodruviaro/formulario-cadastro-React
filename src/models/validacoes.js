function validaCpf(cpf) {
    if(cpf.length !== 11){
        return {valido: false, texto: "CPF deve conter 11 dígitos!"}
    } else {
        return {valido: true, texto: ""}
    }
}

function validaSenha(senha) {
    if(senha.length < 4 || senha.length > 72){
        return {valido: false, texto: "Senha deve conter entre 4 e 72 caracteres!"}
    } else {
        return {valido: true, texto: ""}
    }
}

function validaCEP(cep){
    if(cep.length !== 8){
        return {valido: false, texto: "CEP deve conter 8 dígitos"}
    } else {
        return {valido: true, texto: ""}
    }
}

export { validaCpf, validaSenha, validaCEP  }