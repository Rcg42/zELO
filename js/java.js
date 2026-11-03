/* ==========================================================
   zELO - Interatividade (Sprint 02)
   Seções:
   1. Menu hambúrguer      4. Formulário de contato
   2. Carrossel (início)   5. Cadastro
   3. Acordeão (FAQ)       6. Doações e badges
   No final do arquivo estão as chamadas das funções.
   ========================================================== */


/* ---------- 1. MENU HAMBÚRGUER ---------- */

// abre ou fecha o menu e troca o ícone do botão
function toggleMenu(menu, botaoMenu) {
    menu.classList.toggle("aberto");

    if (menu.classList.contains("aberto")) {
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.textContent = "☰";
    }
}

// cria o botão do menu e liga o clique a ele
function iniciarMenu() {
    const nav = document.querySelector("header nav");
    const menu = document.querySelector("header nav ul");

    if (nav === null || menu === null) {
        return; // página sem menu
    }

    const botaoMenu = document.createElement("button");
    botaoMenu.className = "menu-toggle";
    botaoMenu.textContent = "☰";
    nav.insertBefore(botaoMenu, menu);

    botaoMenu.addEventListener("click", function () {
        toggleMenu(menu, botaoMenu);
    });
}


/* ---------- 2. CARROSSEL (só na página inicial) ---------- */

// conteúdo de cada slide
const slides = [
    { titulo: "🏅 Badges para doadores", texto: "Cada doação é reconhecida com badges, incentivando novas contribuições." },
    { titulo: "🎓 Certificados para voluntários", texto: "O registro de atendimentos permite emitir certificados para os voluntários." },
    { titulo: "🔗 Conquistas compartilháveis", texto: "Doadores e voluntários podem compartilhar suas conquistas e inspirar outras pessoas." },
    { titulo: "🔒 Privacidade e LGPD", texto: "O compartilhamento das conquistas é sempre uma escolha de cada pessoa." }
];

let slideAtual = 0; // posição do slide que está aparecendo

// mostra na tela o slide atual
function mostrarSlide() {
    document.getElementById("slide-titulo").textContent = slides[slideAtual].titulo;
    document.getElementById("slide-texto").textContent = slides[slideAtual].texto;
    document.getElementById("slide-numero").textContent = (slideAtual + 1) + " / " + slides.length;
}

function proximoSlide() {
    slideAtual = slideAtual + 1;

    if (slideAtual >= slides.length) {
        slideAtual = 0; // volta para o primeiro
    }
    mostrarSlide();
}

function slideAnterior() {
    slideAtual = slideAtual - 1;

    if (slideAtual < 0) {
        slideAtual = slides.length - 1; // vai para o último
    }
    mostrarSlide();
}

// cria o carrossel na página e liga os botões
function criarCarrossel() {
    const inicio = document.querySelector(".inicio");

    if (inicio === null) {
        return; // só existe na página inicial
    }

    const secao = document.createElement("section");
    secao.className = "secao";
    secao.innerHTML =
        "<h2>Reconhecimento que motiva</h2>" +
        '<div class="carrossel">' +
        '  <button class="seta" id="anterior">&lt;</button>' +
        '  <div class="slide">' +
        '    <h3 id="slide-titulo"></h3>' +
        '    <p id="slide-texto"></p>' +
        '    <small id="slide-numero"></small>' +
        "  </div>" +
        '  <button class="seta" id="proximo">&gt;</button>' +
        "</div>";
    inicio.insertAdjacentElement("afterend", secao);

    document.getElementById("proximo").addEventListener("click", proximoSlide);
    document.getElementById("anterior").addEventListener("click", slideAnterior);

    // troca sozinho a cada 5 segundos
    setInterval(proximoSlide, 5000);

    mostrarSlide();
}


/* ---------- 3. ACORDEÃO (FAQ) ---------- */

// mostra ou esconde a resposta de um item
function toggleResposta(item) {
    item.classList.toggle("aberto");
}

// prepara todas as perguntas da página
function iniciarAcordeao() {
    const itens = document.querySelectorAll(".faq article");

    itens.forEach(function (item) {
        const pergunta = item.querySelector("h2");

        item.classList.add("acordeao"); // ativa o estilo do acordeão no CSS

        pergunta.addEventListener("click", function () {
            toggleResposta(item);
        });
    });
}


/* ---------- FUNÇÕES USADAS PELOS FORMULÁRIOS ---------- */

// confere se o e-mail tem @ e ponto
function emailEhValido(email) {
    if (email.includes("@") && email.includes(".")) {
        return true;
    }
    return false;
}

// marca o campo em vermelho e mostra a mensagem de erro
function mostrarErro(campo, mensagem, aviso) {
    campo.classList.add("erro");
    aviso.textContent = mensagem;
    aviso.classList.add("aviso-erro");
}

// tira as marcações de erro dos campos e limpa o aviso
function limparErros(campos, aviso) {
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("erro");
    }
    aviso.className = "aviso-form";
}

// cria o parágrafo de aviso, logo acima do botão do formulário
function criarAviso(formulario) {
    const aviso = document.createElement("p");
    aviso.className = "aviso-form";

    const botao = formulario.querySelector("button");
    formulario.insertBefore(aviso, botao);

    return aviso;
}


/* ---------- 4. FORMULÁRIO DE CONTATO ---------- */

// confere os campos um por um (true = tudo certo, false = achou erro)
function validarFormulario(campoNome, campoEmail, campoMensagem, aviso) {
    if (campoNome.value.trim() === "") {
        mostrarErro(campoNome, "Por favor, preencha o seu nome.", aviso);
        return false;
    }

    if (emailEhValido(campoEmail.value) === false) {
        mostrarErro(campoEmail, "Digite um e-mail válido.", aviso);
        return false;
    }

    if (campoMensagem.value.trim().length < 10) {
        mostrarErro(campoMensagem, "A mensagem precisa ter pelo menos 10 caracteres.", aviso);
        return false;
    }

    return true; // tudo certo
}

// mostra a mensagem de sucesso (o envio é apenas simulado)
function mostrarSucesso(formulario, botaoEnviar, aviso) {
    aviso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
    aviso.classList.add("aviso-ok");
    formulario.reset();

    // feedback no botão por 2 segundos
    botaoEnviar.textContent = "Enviado ✓";
    setTimeout(function () {
        botaoEnviar.textContent = "Enviar";
        aviso.textContent = "";
    }, 2000);
}

// liga o formulário de contato ao evento de envio
function iniciarFormulario() {
    const formulario = document.getElementById("form-contato");

    if (formulario === null) {
        return; // página sem formulário de contato
    }

    // desliga a validação automática do navegador (usamos a nossa)
    formulario.noValidate = true;

    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoMensagem = document.getElementById("mensagem");
    const botaoEnviar = formulario.querySelector("button");
    const aviso = criarAviso(formulario);

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // impede a página de recarregar

        limparErros([campoNome, campoEmail, campoMensagem], aviso);

        const tudoCerto = validarFormulario(campoNome, campoEmail, campoMensagem, aviso);

        if (tudoCerto === true) {
            mostrarSucesso(formulario, botaoEnviar, aviso);
        }
    });
}


/* ---------- 5. CADASTRO ---------- */

// confere os campos do cadastro (true = tudo certo, false = achou erro)
function validarCadastro(campoNome, campoEmail, campoTipo, aviso) {
    if (campoNome.value.trim().length < 3) {
        mostrarErro(campoNome, "Informe o nome (mínimo de 3 letras).", aviso);
        return false;
    }

    if (emailEhValido(campoEmail.value) === false) {
        mostrarErro(campoEmail, "Digite um e-mail válido.", aviso);
        return false;
    }

    if (campoTipo.value === "") {
        mostrarErro(campoTipo, "Escolha o tipo de cadastro.", aviso);
        return false;
    }

    return true; // tudo certo
}

// liga o formulário de cadastro (o cadastro é só simulado)
function iniciarCadastro() {
    const formulario = document.getElementById("form-cadastro");

    if (formulario === null) {
        return; // só existe na página Cadastro
    }

    formulario.noValidate = true;

    const campoNome = document.getElementById("cad-nome");
    const campoEmail = document.getElementById("cad-email");
    const campoTipo = document.getElementById("cad-tipo");
    const aviso = criarAviso(formulario);

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limparErros([campoNome, campoEmail, campoTipo], aviso);

        if (validarCadastro(campoNome, campoEmail, campoTipo, aviso) === true) {
            const nome = campoNome.value.trim();

            formulario.reset();
            aviso.textContent = "Cadastro de " + nome + " realizado com sucesso!";
            aviso.classList.add("aviso-ok");
        }
    });
}


/* ---------- 6. DOAÇÕES E BADGES ---------- */

// nome com que a lista fica guardada no navegador
const CHAVE_DOACOES = "zelo_doacoes_simples";

// lê as doações guardadas (se não houver, devolve lista vazia)
function lerDoacoes() {
    const texto = localStorage.getItem(CHAVE_DOACOES);

    if (texto === null) {
        return [];
    }
    return JSON.parse(texto);
}

// guarda a lista de doações no navegador
function salvarDoacoes(lista) {
    localStorage.setItem(CHAVE_DOACOES, JSON.stringify(lista));
}

// devolve o badge de acordo com o total doado
function descobrirBadge(total) {
    if (total >= 500) {
        return "🥇 Ouro";
    }
    if (total >= 100) {
        return "🥈 Prata";
    }
    return "🥉 Bronze";
}

// transforma 50 em "R$ 50,00"
function formatarValor(valor) {
    return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// transforma o texto digitado ("50,00") em número (50)
function lerValor(texto) {
    return Number(texto.trim().replace(",", "."));
}

// cria uma célula de tabela com um texto
function criarCelula(texto) {
    const celula = document.createElement("td");
    celula.textContent = texto;
    return celula;
}

// atualiza os 3 cards do topo (total, quantidade e última doação)
function mostrarResumo(doacoes) {
    let total = 0;

    for (let i = 0; i < doacoes.length; i++) {
        total = total + doacoes[i].valor;
    }

    document.getElementById("total-arrecadado").textContent = formatarValor(total);
    document.getElementById("qtd-doacoes").textContent = doacoes.length;

    if (doacoes.length === 0) {
        document.getElementById("ultima-valor").textContent = "-";
        document.getElementById("ultima-nome").textContent = "Última doação";
    } else {
        const ultima = doacoes[doacoes.length - 1];
        document.getElementById("ultima-valor").textContent = formatarValor(ultima.valor);
        document.getElementById("ultima-nome").textContent = "Última doação (" + ultima.nome + ")";
    }
}

// desenha a tabela de doações (da mais nova para a mais antiga)
function mostrarLista(doacoes) {
    const corpo = document.getElementById("lista-doacoes");
    corpo.innerHTML = "";

    if (doacoes.length === 0) {
        corpo.innerHTML = '<tr><td colspan="3">Nenhuma doação registrada ainda.</td></tr>';
        return;
    }

    for (let i = doacoes.length - 1; i >= 0; i--) {
        const linha = document.createElement("tr");
        linha.appendChild(criarCelula(doacoes[i].nome));
        linha.appendChild(criarCelula(formatarValor(doacoes[i].valor)));
        linha.appendChild(criarCelula(doacoes[i].data));
        corpo.appendChild(linha);
    }
}

// desenha a tabela de badges (soma o total de cada doador)
function mostrarBadges(doacoes) {
    const corpo = document.getElementById("lista-badges");
    const totais = {}; // guarda o total de cada doador
    corpo.innerHTML = "";

    if (doacoes.length === 0) {
        corpo.innerHTML = '<tr><td colspan="3">Nenhum badge conquistado ainda.</td></tr>';
        return;
    }

    for (let i = 0; i < doacoes.length; i++) {
        const nome = doacoes[i].nome;

        if (totais[nome] === undefined) {
            totais[nome] = 0;
        }
        totais[nome] = totais[nome] + doacoes[i].valor;
    }

    for (const nome in totais) {
        const linha = document.createElement("tr");
        linha.appendChild(criarCelula(nome));
        linha.appendChild(criarCelula(formatarValor(totais[nome])));

        const selo = document.createElement("span");
        selo.className = "badge";
        selo.textContent = descobrirBadge(totais[nome]);
        const celulaBadge = document.createElement("td");
        celulaBadge.appendChild(selo);
        linha.appendChild(celulaBadge);

        corpo.appendChild(linha);
    }
}

// atualiza tudo o que aparece na tela
function mostrarDoacoes() {
    const doacoes = lerDoacoes();

    mostrarResumo(doacoes);
    mostrarLista(doacoes);
    mostrarBadges(doacoes);
}

// confere os campos da doação (true = tudo certo, false = achou erro)
function validarDoacao(campoNome, campoValor, aviso) {
    if (campoNome.value.trim() === "") {
        mostrarErro(campoNome, "Digite o nome do doador.", aviso);
        return false;
    }

    const valor = lerValor(campoValor.value);

    if (isNaN(valor) || valor <= 0) {
        mostrarErro(campoValor, "Digite um valor maior que zero (ex.: 50,00).", aviso);
        return false;
    }

    return true; // tudo certo
}

// liga o formulário de doação e o botão "Limpar doações"
function iniciarDoacoes() {
    const formulario = document.getElementById("form-doacao");

    if (formulario === null) {
        return; // só existe na página Doações
    }

    formulario.noValidate = true;

    const campoNome = document.getElementById("doa-nome");
    const campoValor = document.getElementById("doa-valor");
    const aviso = criarAviso(formulario);

    mostrarDoacoes();

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        limparErros([campoNome, campoValor], aviso);

        if (validarDoacao(campoNome, campoValor, aviso) === true) {
            const doacoes = lerDoacoes();

            doacoes.push({
                nome: campoNome.value.trim(),
                valor: lerValor(campoValor.value),
                data: new Date().toLocaleDateString("pt-BR")
            });
            salvarDoacoes(doacoes);

            formulario.reset();
            mostrarDoacoes();

            aviso.textContent = "Doação registrada com sucesso!";
            aviso.classList.add("aviso-ok");
        }
    });

    // botão "Limpar doações"
    document.getElementById("limpar-doacoes").addEventListener("click", function () {
        if (confirm("Apagar todas as doações?")) {
            salvarDoacoes([]);
            mostrarDoacoes();
        }
    });
}


/* ---------- INÍCIO: chama as funções ---------- */
iniciarMenu();
criarCarrossel();
iniciarAcordeao();
iniciarFormulario();
iniciarCadastro();
iniciarDoacoes();
