axios.defaults.headers.common['Authorization'] = '2hWzO5hSANW5w7MslYJt2FIL';



function cadastrarNome(){
    //encontrando o nome do usuário
    const inputNome = document.querySelector(".escrever-nome");
    const telaInicial = document.querySelector(".tela-de-entrada");
    telaInicial.innerHTML = `
    <img src="./imagens/bate-papo-uol.jpg"/>
    <img src="./imagens/Loading-PNG.gif"/>
    <p>Entrando...</p>`
    const nome = inputNome.value;
    console.log(nome);
    const nomeParaCadastro = {name: `${nome}`};
    const promessaNome = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', nomeParaCadastro);
    console.log(promessaNome);
    promessaNome.then(nomeCadastrado);
    promessaNome.catch(nomeInvalido);
}
function nomeCadastrado(resposta){
    const telaInicial = document.querySelector(".tela-de-entrada");
    const conteudo = document.querySelector(".conteudo");
    telaInicial.classList.add('escondido');
    conteudo.classList.remove('escondido');
    console.log('Nome cadastrado com sucesso!');
    console.log(resposta);
    console.log(resposta.status);
}
function nomeInvalido(erro){
    const tipoDeErroNome = erro.response.status;
    if(tipoDeErroNome == 400){
        const telaInicial = document.querySelector(".tela-de-entrada");
        telaInicial.innerHTML = `
        <img src="./imagens/bate-papo-uol.jpg"/>
        <input class="escrever-nome" type="text" placeholder="Digite seu nome"> 
        <button onclick="cadastrarNome()" class="botao-entrar"><p>Entrar</p></button>`
        alert('Nome inserido já está em uso, favor inserir nome válido');
    }
    console.log('Nome inválido!');
    console.log('Status code: ' + erro.response.status);
}