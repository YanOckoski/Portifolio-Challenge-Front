function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',

]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.',
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    telefone:{
        valueMissing: 'O campo do telefone deve ser preenchido.',
    },
    mensagem:{
        valueMissing: 'Digite sua mensagem.',
    },
}

const validadores = {
    nome:input => validaNome(input),
    telefone:input => validaTelefone(input),
    email:input => validaEmail(input),
    mensagem:input => validaEmail(input)
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}


/*form*/

const button = document.querySelector('button')

const handleSubmit = (event) => {
 event.preventDefault();

 const nome = document.querySelector('input[name = nome]').value;
 const telefone = document.querySelector('input[name=telefone]').value;
 const email =  document.querySelector('input[name=email]').value;
 const mensagem = document.querySelector('textarea[name = mensagem]').value;


fetch('https://api.sheetmonkey.io/form/wmZvCuSVehNNzYViLoUT1K', {

    method:  'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      
    body: JSON.stringify({nome, telefone, email, mensagem}),
}).then(()=> removeloding());
}

document.querySelector('form').addEventListener('submit', handleSubmit);

