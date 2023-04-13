axios.defaults.headers.common['Authorization'] = '2hWzO5hSANW5w7MslYJt2FIL';


let nome = '';
function buscarMensagens(){
    const promessaMensagens = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promessaMensagens.then(mensagensBuscadas);
    promessaMensagens.catch(erroMensagens);
}
function mensagensBuscadas(respm){
    console.log(respm);
    console.log('Mensagens buscadas com sucesso!');
    renderizarMensagens(respm.data);
}
function erroMensagens(errom){
    console.log(errom);
    console.log('Erro na busca das mensagens!');
}

function conferirAtividade(){
    const dadosConferencia = {name: `${nome}`};
    const promessaPresenca = axios.post('https://mock-api.driven.com.br/api/vm/uol/status',dadosConferencia);
    console.log(promessaPresenca);
    promessaPresenca.then(presencaConfirmada);
    promessaPresenca.catch(erroNaPresenca);
}
function presencaConfirmada(resp){
    console.log(resp);
    console.log('foi sucesso na conferência!')
}
function erroNaPresenca(errop){
    console.log(errop);
    console.log('Deu BO na conferência!');
}

function cadastrarNome(){
    //encontrando o nome do usuário
    const inputNome = document.querySelector(".escrever-nome");
    const telaInicial = document.querySelector(".tela-de-entrada");
    telaInicial.innerHTML = `
    <img src="./imagens/bate-papo-uol.jpg"/>
    <img src="./imagens/Loading-PNG.gif"/>
    <p>Entrando...</p>`
    nome = inputNome.value;
    const nomeParaCadastro = {name: `${nome}`};
    console.log(nomeParaCadastro);
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
    buscarMensagens();
    setInterval(buscarMensagens, 3000);
    setInterval(conferirAtividade, 5000);
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
function renderizarMensagens(listaDeMensagens){
    const containerMensagens = document.querySelector('.container-mensagens');
    containerMensagens.innerHTML = '';
    for(let i = 0; i < listaDeMensagens.length; i++){
        const tipoDeMensagem = listaDeMensagens[i].type;
        console.log(typeof(tipoDeMensagem));
        if(tipoDeMensagem == 'message'){
            containerMensagens.innerHTML += `
            <li data-test="message" class="mensagem">
                <p class="horario">${listaDeMensagens[i].time}</p>
                <p class="nome">${listaDeMensagens[i].from}</p>
                <p class="texto-mensagem">para</p> 
                <p class="nome">${listaDeMensagens[i].to}</p>
                <p class="texto-mensagem">${listaDeMensagens[i].text}</p>
            </li>`
        }else if(tipoDeMensagem == 'status'){
            containerMensagens.innerHTML += `
            <li class="status">
                <p class="horario">${listaDeMensagens[i].time}</p>
                <p class="nome">${listaDeMensagens[i].from}</p>
                <p class="texto-mensagem">${listaDeMensagens[i].text}</p>
            </li>`
        }
    }
}

function enviarMensagem(){
    const inputMensagem = document.querySelector(".escrever-mensagem");
    const mensagem = inputMensagem.value;
    const mensagemASerEnviada = {
        from: `${nome}`,
        to: "Todos",
        text: `${mensagem}`,
        type: "message" // ou "private_message" para o bônus
    };
    const promessaMensagem = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', mensagemASerEnviada);
    promessaMensagem.then(mensagemEnviadaComSucesso);
    promessaMensagem.catch(erroAoEnviarAMensagem);
}
function mensagemEnviadaComSucesso(respostaEnvioMensagem){
    console.log(respostaEnvioMensagem);
    console.log('Mensagem eviada com sucesso!');
    const inputMensagem = document.querySelector(".escrever-mensagem");
    inputMensagem.value = '';
    buscarMensagens();
}
function erroAoEnviarAMensagem(erroDaMensagem){
    console.log(erroDaMensagem);
    console.log('Deu erro ao enviar a mensagem para o servidor!');
    window.location.reload();
}

function abrirMenuLateral(){
    const menuLateral = document.querySelector(".caixa-menulateral");
    menuLateral.classList.remove('escondido');
}
function fecharMenuLateral(menu){
    const conteinerDoMenu = menu.parentNode;
    conteinerDoMenu.classList.add('escondido');
}