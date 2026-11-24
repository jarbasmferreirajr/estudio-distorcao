/* =========================================================
   Estúdio Distorção - main.js
   1. Menu: fecha o menu do celular ao clicar em um link
   2. Modal de serviços: conteúdo trocado conforme o card clicado
   3. Funções de validação (usadas pelos dois formulários)
   4. Formulário de contato
   5. Formulário de aula experimental
   6. Botão "Quero agendar" do modal
   ========================================================= */

/* ---------- 1. Menu ---------- */
const menu = document.getElementById("menuPrincipal");
const linksMenu = document.querySelectorAll("#menuPrincipal a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        // só fecha quando o menu está aberto (tela pequena)
        if (menu.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

/* ---------- 2. Modal de serviços ---------- */
const servicos = {
    aulas: {
        titulo: "Aulas de instrumento",
        imagem: "imagens/servico-aulas.jpg",
        descricao: "Aulas individuais para todas as idades a partir de 10 anos. O professor monta um plano de estudo conforme o seu nível e o estilo que você quer tocar.",
        itens: [
            "Oito cursos: canto e técnica vocal, teclado, guitarra, baixo, violão de aço, violão clássico, ukulele e bateria",
            "Aulas de 50 minutos, uma vez por semana",
            "Primeira aula experimental gratuita",
            "Apresentação semestral dos alunos"
        ],
        preco: "R$ 90,00 por aula ou R$ 320,00 no plano mensal (4 aulas)"
    },
    ensaio: {
        titulo: "Sala de ensaio",
        imagem: "imagens/servico-ensaio.jpg",
        descricao: "Duas salas com tratamento acústico e equipamento revisado toda semana. É só chegar com a banda, ligar e tocar.",
        itens: [
            "Bateria completa com pratos",
            "Amplificadores de guitarra e de baixo",
            "Sistema de som com 4 microfones para voz",
            "Ar-condicionado e horários até as 23h"
        ],
        preco: "R$ 50,00 por hora"
    },
    gravacao: {
        titulo: "Gravação",
        imagem: "imagens/servico-gravacao.jpg",
        descricao: "Estúdio para gravar singles, EPs e demos, com técnico de som acompanhando toda a sessão.",
        itens: [
            "Gravação multipista de banda ou instrumento a instrumento",
            "Microfones condensadores e dinâmicos",
            "Técnico de som durante toda a sessão",
            "Entrega dos arquivos de cada pista"
        ],
        preco: "R$ 120,00 por hora"
    },
    mixagem: {
        titulo: "Mixagem e master",
        imagem: "imagens/servico-mixagem.jpg",
        descricao: "Finalizamos a sua música, gravada aqui ou em outro estúdio, deixando o som equilibrado e pronto para as plataformas digitais.",
        itens: [
            "Mixagem de todas as pistas da faixa",
            "Masterização no padrão das plataformas de streaming",
            "Até duas rodadas de ajustes",
            "Entrega em WAV e MP3"
        ],
        preco: "R$ 250,00 por faixa"
    }
};

const modalServico = document.getElementById("modalServico");
const modalTitulo = document.getElementById("modalServicoTitulo");
const modalImagem = document.getElementById("modalServicoImagem");
const modalDescricao = document.getElementById("modalServicoDescricao");
const modalItens = document.getElementById("modalServicoItens");
const modalPreco = document.getElementById("modalServicoPreco");
const btnAgendarServico = document.getElementById("btnAgendarServico");

// guarda qual serviço está aberto no modal
let servicoSelecionado = "";

// evento disparado pelo Bootstrap antes de o modal aparecer;
// "relatedTarget" é o botão que foi clicado
modalServico.addEventListener("show.bs.modal", function (evento) {
    const botao = evento.relatedTarget;
    const chave = botao.dataset.servico;
    const servico = servicos[chave];

    if (!servico) {
        return;
    }

    servicoSelecionado = chave;
    preencherModal(servico);
});

function preencherModal(servico) {
    modalTitulo.textContent = servico.titulo;
    modalImagem.src = servico.imagem;
    modalImagem.alt = "Foto do serviço " + servico.titulo;
    modalDescricao.textContent = servico.descricao;
    modalPreco.textContent = servico.preco;

    // recria a lista de itens
    modalItens.innerHTML = "";
    servico.itens.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        modalItens.appendChild(li);
    });
}

/* ---------- 3. Funções de validação ---------- */
function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("is-invalid");
    elementoErro.textContent = mensagem;
}

function limparErro(campo, elementoErro) {
    campo.classList.remove("is-invalid");
    elementoErro.textContent = "";
}

function validarNome(campo, erro) {
    const nome = campo.value.trim();

    if (nome === "") {
        mostrarErro(campo, erro, "Informe o seu nome.");
        return false;
    }
    if (nome.split(/\s+/).length < 2) {
        mostrarErro(campo, erro, "Informe nome e sobrenome.");
        return false;
    }
    limparErro(campo, erro);
    return true;
}

function validarEmail(campo, erro) {
    const email = campo.value.trim();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        mostrarErro(campo, erro, "Informe o seu e-mail.");
        return false;
    }
    if (!formatoEmail.test(email)) {
        mostrarErro(campo, erro, "E-mail inválido. Exemplo: nome@email.com");
        return false;
    }
    limparErro(campo, erro);
    return true;
}

function validarTelefone(campo, erro) {
    // considera só os números: DDD + 8 ou 9 dígitos
    const numeros = campo.value.replace(/\D/g, "");

    if (numeros === "") {
        mostrarErro(campo, erro, "Informe um telefone para contato.");
        return false;
    }
    if (numeros.length < 10 || numeros.length > 11) {
        mostrarErro(campo, erro, "Telefone inválido. Use DDD + número.");
        return false;
    }
    limparErro(campo, erro);
    return true;
}

function validarSelecao(campo, erro, mensagem) {
    if (campo.value === "") {
        mostrarErro(campo, erro, mensagem);
        return false;
    }
    limparErro(campo, erro);
    return true;
}

function validarMensagem(campo, erro) {
    const mensagem = campo.value.trim();

    if (mensagem.length < 20) {
        mostrarErro(campo, erro,
            "Escreva uma mensagem com pelo menos 20 caracteres (faltam " + (20 - mensagem.length) + ").");
        return false;
    }
    limparErro(campo, erro);
    return true;
}

// formata o telefone enquanto a pessoa digita: (47) 99999-9999
function mascaraTelefone(campo) {
    campo.addEventListener("input", function () {
        const numeros = campo.value.replace(/\D/g, "").slice(0, 11);
        let formatado = numeros;

        if (numeros.length > 2) {
            formatado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
        }
        if (numeros.length > 6) {
            const meio = numeros.length === 11 ? 7 : 6;
            formatado = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, meio) + "-" + numeros.slice(meio);
        }
        campo.value = formatado;
    });
}

// a validação completa acontece no envio; depois disso, se o campo
// está com erro, ele é revalidado enquanto o usuário corrige
function revalidarAoCorrigir(campo, validar) {
    campo.addEventListener("input", function () {
        if (campo.classList.contains("is-invalid")) {
            validar();
        }
    });
}

function mostrarSucesso(elemento, texto) {
    elemento.innerHTML = "";
    const alerta = document.createElement("div");
    alerta.className = "alerta-sucesso";
    alerta.textContent = texto;
    elemento.appendChild(alerta);
}

/* ---------- 4. Formulário de contato ---------- */
const formContato = document.getElementById("formContato");
const retornoFormulario = document.getElementById("retornoFormulario");

const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    telefone: document.getElementById("telefone"),
    assunto: document.getElementById("assunto"),
    mensagem: document.getElementById("mensagem")
};

const erros = {
    nome: document.getElementById("erroNome"),
    email: document.getElementById("erroEmail"),
    telefone: document.getElementById("erroTelefone"),
    assunto: document.getElementById("erroAssunto"),
    mensagem: document.getElementById("erroMensagem")
};

const validacoesContato = {
    nome: function () { return validarNome(campos.nome, erros.nome); },
    email: function () { return validarEmail(campos.email, erros.email); },
    telefone: function () { return validarTelefone(campos.telefone, erros.telefone); },
    assunto: function () { return validarSelecao(campos.assunto, erros.assunto, "Escolha um assunto."); },
    mensagem: function () { return validarMensagem(campos.mensagem, erros.mensagem); }
};

mascaraTelefone(campos.telefone);

Object.keys(validacoesContato).forEach(function (chave) {
    revalidarAoCorrigir(campos[chave], validacoesContato[chave]);
});

formContato.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // chama todas as validações para marcar todos os erros de uma vez
    let tudoCerto = true;
    Object.keys(validacoesContato).forEach(function (chave) {
        if (!validacoesContato[chave]()) {
            tudoCerto = false;
        }
    });

    if (tudoCerto) {
        const primeiroNome = campos.nome.value.trim().split(/\s+/)[0];
        mostrarSucesso(retornoFormulario,
            "Obrigado, " + primeiroNome + "! Recebemos sua mensagem e vamos responder em até 1 dia útil.");
        formContato.reset();
    } else {
        retornoFormulario.innerHTML = "";
        // leva o foco para o primeiro campo com erro
        formContato.querySelector(".is-invalid").focus();
    }
});

/* ---------- 5. Aula experimental ---------- */
const formAula = document.getElementById("formAula");
const retornoAula = document.getElementById("retornoAula");
const grupoPeriodo = document.getElementById("grupoPeriodo");

const camposAula = {
    nome: document.getElementById("expNome"),
    telefone: document.getElementById("expTelefone"),
    email: document.getElementById("expEmail"),
    curso: document.getElementById("expCurso"),
    nivel: document.getElementById("expNivel"),
    dia: document.getElementById("expDia")
};

const errosAula = {
    nome: document.getElementById("erroExpNome"),
    telefone: document.getElementById("erroExpTelefone"),
    email: document.getElementById("erroExpEmail"),
    curso: document.getElementById("erroExpCurso"),
    nivel: document.getElementById("erroExpNivel"),
    dia: document.getElementById("erroExpDia"),
    periodo: document.getElementById("erroExpPeriodo")
};

// período escolhido nos botões de opção (manhã, tarde ou noite)
function periodoEscolhido() {
    const marcado = formAula.querySelector('input[name="periodo"]:checked');
    return marcado ? marcado.value : "";
}

// o estúdio abre de terça a sexta das 9h às 23h e no sábado das 9h às 18h,
// então no sábado não existe horário à noite
function validarPeriodo() {
    const periodo = periodoEscolhido();

    if (periodo === "") {
        mostrarErro(grupoPeriodo, errosAula.periodo, "Escolha um período.");
        return false;
    }
    if (camposAula.dia.value === "sabado" && periodo === "noite") {
        mostrarErro(grupoPeriodo, errosAula.periodo, "Aos sábados atendemos até as 18h. Escolha manhã ou tarde.");
        return false;
    }
    limparErro(grupoPeriodo, errosAula.periodo);
    return true;
}

const validacoesAula = {
    nome: function () { return validarNome(camposAula.nome, errosAula.nome); },
    telefone: function () { return validarTelefone(camposAula.telefone, errosAula.telefone); },
    email: function () { return validarEmail(camposAula.email, errosAula.email); },
    curso: function () { return validarSelecao(camposAula.curso, errosAula.curso, "Escolha o curso."); },
    nivel: function () { return validarSelecao(camposAula.nivel, errosAula.nivel, "Informe o seu nível."); },
    dia: function () { return validarSelecao(camposAula.dia, errosAula.dia, "Escolha o dia."); }
};

mascaraTelefone(camposAula.telefone);

Object.keys(validacoesAula).forEach(function (chave) {
    revalidarAoCorrigir(camposAula[chave], validacoesAula[chave]);
});

// trocar o dia ou o período revalida a regra do sábado
grupoPeriodo.addEventListener("change", function () {
    if (grupoPeriodo.classList.contains("is-invalid")) {
        validarPeriodo();
    }
});
camposAula.dia.addEventListener("change", function () {
    if (periodoEscolhido() !== "") {
        validarPeriodo();
    }
});

// pega o texto visível da opção escolhida em um select
function textoSelecionado(select) {
    return select.options[select.selectedIndex].text;
}

formAula.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let tudoCerto = true;
    Object.keys(validacoesAula).forEach(function (chave) {
        if (!validacoesAula[chave]()) {
            tudoCerto = false;
        }
    });
    if (!validarPeriodo()) {
        tudoCerto = false;
    }

    if (tudoCerto) {
        const primeiroNome = camposAula.nome.value.trim().split(/\s+/)[0];
        const curso = textoSelecionado(camposAula.curso);
        const dia = textoSelecionado(camposAula.dia).toLowerCase();
        const periodo = formAula.querySelector('input[name="periodo"]:checked').nextElementSibling.textContent.toLowerCase();

        mostrarSucesso(retornoAula,
            "Pronto, " + primeiroNome + "! Sua aula experimental de " + curso + " ficou pré-agendada para " +
            dia + " de " + periodo + ". Vamos confirmar o horário pelo WhatsApp.");

        formAula.reset();
    } else {
        retornoAula.innerHTML = "";
        const primeiroErro = formAula.querySelector(".is-invalid");
        if (primeiroErro === grupoPeriodo) {
            grupoPeriodo.querySelector("input").focus();
        } else {
            primeiroErro.focus();
        }
    }
});

/* ---------- 6. Botão "Quero agendar" do modal ---------- */
btnAgendarServico.addEventListener("click", function () {
    // ao fechar, o Bootstrap devolve o foco ao botão "Ver detalhes";
    // por isso a rolagem até o formulário só acontece depois que o modal fecha
    modalServico.addEventListener("hidden.bs.modal", irParaFormulario, { once: true });
    bootstrap.Modal.getInstance(modalServico).hide();
});

function irParaFormulario() {
    if (servicoSelecionado === "aulas") {
        // aulas têm o próprio formulário de aula experimental
        document.getElementById("aula-experimental").scrollIntoView();
        camposAula.curso.focus({ preventScroll: true });
        return;
    }

    // os demais serviços vão para o formulário de contato com o assunto escolhido
    campos.assunto.value = servicoSelecionado;
    limparErro(campos.assunto, erros.assunto);

    document.getElementById("formContato").scrollIntoView();
    campos.nome.focus({ preventScroll: true });
}
