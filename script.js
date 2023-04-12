axios.defaults.headers.common['Authorization'] = '2hWzO5hSANW5w7MslYJt2FIL';
let nome = prompt('Qual o seu nome?');
function cadastrarNome(){
    const nomeParaCadastro = {name: `${nome}`};
    const promessaNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeParaCadastro);
    console.log(promessaNome);
    promessaNome.then(nomeCadastrado);
    promessaNome.catch(nomeInvalido);
}
cadastrarNome();
function nomeCadastrado(resposta){
    console.log('Nome cadastrado com sucesso!');
    console.log(resposta);
    console.log(resposta.status);
}
function nomeInvalido(erro){
    const tipoDeErroNome = erro.response.status;
    if(tipoDeErroNome == 400){
        nome = prompt('Nome inserido já está em uso, favor inserir nome válido');
        cadastrarNome();
    }
    console.log('Nome inválido!');
    console.log('Status code: ' + erro.response.status);
}