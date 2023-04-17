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
    console.log('foi sucesso na conferência!');
}
function erroNaPresenca(errop){
    console.log(errop);
    console.log('Deu BO na conferência!');
}
function buscarUsuarios(){
    const promessaUsuarios = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    promessaUsuarios.then(usuariosBuscados);
    promessaUsuarios.catch(erroUsuarios);
}
function usuariosBuscados(usuarios){
    console.log('Usuarios buscados');
    renderizarUsuarios(usuarios.data);
}
function erroUsuarios(erroU){
    console.log(erroU);
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
    buscarUsuarios();
    setInterval(buscarMensagens, 3000);
    setInterval(buscarUsuarios, 10000);
    setInterval(conferirAtividade, 5000);
}
function nomeInvalido(erro){
    const tipoDeErroNome = erro.response.status;
    if(tipoDeErroNome == 400){
        window.location.reload();
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
            <li data-test="message" class="status">
                <p class="horario">${listaDeMensagens[i].time}</p>
                <p class="nome">${listaDeMensagens[i].from}</p>
                <p class="texto-mensagem">${listaDeMensagens[i].text}</p>
            </li>`
        }
    }
}

function renderizarUsuarios(listaDeUsuarios){
    const containerUsuarios = document.querySelector('.container-usuarios');
    console.log(listaDeUsuarios);
    for(let i=0; i < listaDeUsuarios.length; i++){
        containerUsuarios.innerHTML += `
        <div onclick="checkUsuario(this)" class="usuario">
            <ion-icon class="icone-menu" name="person-circle"></ion-icon>
            <div class="nome-usuario">${listaDeUsuarios[i].name}</div>
            <ion-icon class = "check escondido" name="checkmark"></ion-icon>
        </div>` 
    }
}

function enviarMensagem(){
    const inputMensagem = document.querySelector(".escrever-mensagem");
    const mensagem = inputMensagem.value;
    const mensagemASerEnviada = {
        from: `${nome}`,
        to: "Todos",
        text: `${mensagem}`,
        type: "message"
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
function checkUsuario(opcaoUsuario){
    const selecionadoAnteriormente = document.querySelector('.usuario.selecionado');
    selecionadoAnteriormente.classList.remove('selecionado');
    const checkAnterior = selecionadoAnteriormente.querySelector('.check');
    checkAnterior.classList.add('escondido');
    opcaoUsuario.classList.add('selecionado');
    const checkAtual = opcaoUsuario.querySelector('.check');
    checkAtual.classList.remove('escondido');
}
function checkVisibilidade(opcaoVisibilidade){
    const visibilidadeAnterior = document.querySelector('.visibilidade.selecionado');
    visibilidadeAnterior.classList.remove('selecionado');
    const checkVAnterior = visibilidadeAnterior.querySelector('.check');
    checkVAnterior.classList.add('escondido');
    opcaoVisibilidade.classList.add('selecionado');
    const checkVAtual = opcaoVisibilidade.querySelector('.check');
    checkVAtual.classList.remove('escondido');
}