/* =========================================================
   Estúdio Distorção - catalogo.js (desafio extra, opção 1)
   - Lista de produtos em array de objetos
   - Produtos exibidos dinamicamente no HTML
   - Filtro por categoria e pesquisa por nome
   - Carrinho com inclusão, alteração de quantidade e remoção
   ========================================================= */

/* ---------- Dados ---------- */
const produtos = [
    { id: 1, nome: "Kit de palhetas Distorção (6 unid.)", categoria: "acessorios", preco: 19.9, imagem: "imagens/produtos/palhetas.jpg", descricao: "Palhetas médias com a logo do estúdio." },
    { id: 2, nome: "Cabo P10 para instrumento 3 m", categoria: "acessorios", preco: 49.9, imagem: "imagens/produtos/cabo.jpg", descricao: "Cabo blindado com plugues reforçados." },
    { id: 3, nome: "Par de baquetas 5A", categoria: "acessorios", preco: 44.9, imagem: "imagens/produtos/baquetas.jpg", descricao: "Madeira hickory com ponta de madeira." },
    { id: 4, nome: "Pedal de distorção", categoria: "acessorios", preco: 289.9, imagem: "imagens/produtos/pedal.jpg", descricao: "Distorção clássica de rock com controles de volume, tom e ganho." },
    { id: 5, nome: "Mini amplificador 10 W", categoria: "acessorios", preco: 349.9, imagem: "imagens/produtos/mini-amp.jpg", descricao: "Ideal para estudar em casa, com saída para fone." },
    { id: 6, nome: "Encordoamento guitarra 0.10", categoria: "cordas", preco: 39.9, imagem: "imagens/produtos/cordas-guitarra.jpg", descricao: "Níquel, tensão média, jogo com 6 cordas." },
    { id: 7, nome: "Encordoamento baixo 4 cordas 0.45", categoria: "cordas", preco: 119.9, imagem: "imagens/produtos/cordas-baixo.jpg", descricao: "Aço inoxidável, som brilhante e duradouro." },
    { id: 8, nome: "Encordoamento violão aço 0.11", categoria: "cordas", preco: 44.9, imagem: "imagens/produtos/cordas-violao-aco.jpg", descricao: "Bronze 80/20 para violão folk e dreadnought." },
    { id: 9, nome: "Encordoamento violão nylon", categoria: "cordas", preco: 54.9, imagem: "imagens/produtos/cordas-violao-nylon.jpg", descricao: "Nylon cristal com bordões de prata, tensão média, para violão clássico." },
    { id: 10, nome: "Camiseta Estúdio Distorção", categoria: "vestuario", preco: 79.9, imagem: "imagens/produtos/camiseta.jpg", descricao: "Algodão, preta, com a palheta da marca no peito." },
    { id: 11, nome: "Pacote 4 aulas de Canto e Técnica Vocal", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-canto.jpg", descricao: "Respiração, afinação e interpretação. Quatro aulas de 50 minutos." },
    { id: 12, nome: "Pacote 4 aulas de Teclado", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-teclado.jpg", descricao: "Acordes, ritmo e leitura de cifras. Quatro aulas de 50 minutos." },
    { id: 13, nome: "Pacote 4 aulas de Guitarra", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-guitarra.jpg", descricao: "Bases, riffs e solos, do rock ao blues. Quatro aulas de 50 minutos." },
    { id: 14, nome: "Pacote 4 aulas de Baixo", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-baixo.jpg", descricao: "Groove e levadas com dedos e palheta. Quatro aulas de 50 minutos." },
    { id: 15, nome: "Pacote 4 aulas de Violão de Aço", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-violao-aco.jpg", descricao: "Batidas e dedilhados no violão folk. Quatro aulas de 50 minutos." },
    { id: 16, nome: "Pacote 4 aulas de Violão Clássico", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-violao-classico.jpg", descricao: "Técnica, leitura de partitura e repertório. Quatro aulas de 50 minutos." },
    { id: 17, nome: "Pacote 4 aulas de Ukulele", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-ukulele.jpg", descricao: "Acordes, batidas e as primeiras músicas. Quatro aulas de 50 minutos." },
    { id: 18, nome: "Pacote 4 aulas de Bateria", categoria: "pacotes", preco: 320.0, imagem: "imagens/produtos/aulas-bateria.jpg", descricao: "Coordenação, levadas e viradas. Quatro aulas de 50 minutos." },
    { id: 19, nome: "Pacote de gravação 10 horas", categoria: "pacotes", preco: 1050.0, imagem: "imagens/produtos/pacote-gravacao.jpg", descricao: "Estúdio com técnico de som para usar em até 90 dias. Sai por R$ 105,00 a hora." },
    { id: 20, nome: "Gravação do ensaio 3 horas", categoria: "pacotes", preco: 270.0, imagem: "imagens/produtos/gravacao-ensaio.jpg", descricao: "Sala de ensaio com a banda gravada em multipista. Você leva as pistas para ouvir e ajustar os arranjos." },
    { id: 21, nome: "Vale-ensaio 3 horas", categoria: "pacotes", preco: 135.0, imagem: "imagens/produtos/vale-ensaio.jpg", descricao: "Três horas de sala de ensaio com desconto." }
];

const nomesCategorias = {
    acessorios: "Acessórios",
    cordas: "Cordas",
    vestuario: "Vestuário",
    pacotes: "Pacotes"
};

/* ---------- Estado ---------- */
let categoriaAtual = "todos";
let termoBusca = "";
let carrinho = []; // itens no formato { id, quantidade }

/* ---------- Elementos da página ---------- */
const listaProdutos = document.getElementById("listaProdutos");
const resultadoBusca = document.getElementById("resultadoBusca");
const filtrosCategoria = document.getElementById("filtrosCategoria");
const buscaProduto = document.getElementById("buscaProduto");

const itensCarrinho = document.getElementById("itensCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const btnFinalizar = document.getElementById("btnFinalizar");
const btnLimpar = document.getElementById("btnLimpar");
const mensagemCarrinho = document.getElementById("mensagemCarrinho");

/* ---------- Funções auxiliares ---------- */
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// deixa o texto em minúsculas e sem acentos, para a busca achar "violao" e "violão"
function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function buscarProduto(id) {
    return produtos.find(function (produto) {
        return produto.id === id;
    });
}

/* ---------- Catálogo ---------- */
function filtrarProdutos() {
    return produtos.filter(function (produto) {
        const categoriaOk = categoriaAtual === "todos" || produto.categoria === categoriaAtual;
        const buscaOk = normalizar(produto.nome).includes(normalizar(termoBusca));
        return categoriaOk && buscaOk;
    });
}

function renderizarProdutos() {
    const filtrados = filtrarProdutos();
    listaProdutos.innerHTML = "";

    if (filtrados.length === 0) {
        resultadoBusca.textContent = "Nenhum produto encontrado. Tente outro nome ou categoria.";
        return;
    }

    resultadoBusca.textContent = filtrados.length === 1
        ? "1 produto encontrado"
        : filtrados.length + " produtos encontrados";

    filtrados.forEach(function (produto) {
        const coluna = document.createElement("div");
        coluna.className = "col-6 col-xl-4";
        coluna.innerHTML = `
            <article class="card card-produto h-100">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body d-flex flex-column">
                    <span class="categoria-produto">${nomesCategorias[produto.categoria]}</span>
                    <h3 class="card-title mt-1">${produto.nome}</h3>
                    <p class="card-text">${produto.descricao}</p>
                    <p class="preco mt-auto">${formatarPreco(produto.preco)}</p>
                    <button type="button" class="btn btn-destaque btn-adicionar" data-id="${produto.id}">
                        Adicionar ao carrinho
                    </button>
                </div>
            </article>`;
        listaProdutos.appendChild(coluna);
    });
}

// clique nos botões de categoria
filtrosCategoria.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".btn-filtro");
    if (!botao) {
        return;
    }

    filtrosCategoria.querySelectorAll(".btn-filtro").forEach(function (b) {
        b.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    categoriaAtual = botao.dataset.categoria;
    renderizarProdutos();
});

// pesquisa enquanto digita
buscaProduto.addEventListener("input", function () {
    termoBusca = buscaProduto.value.trim();
    renderizarProdutos();
});

// clique em "Adicionar ao carrinho" (um único ouvinte para todos os cards)
listaProdutos.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".btn-adicionar");
    if (!botao) {
        return;
    }
    adicionarAoCarrinho(Number(botao.dataset.id));
});

/* ---------- Carrinho ---------- */
function adicionarAoCarrinho(id) {
    const item = carrinho.find(function (i) {
        return i.id === id;
    });

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ id: id, quantidade: 1 });
    }

    mostrarMensagem(buscarProduto(id).nome + " adicionado ao carrinho.");
    renderizarCarrinho();
}

function alterarQuantidade(id, variacao) {
    const item = carrinho.find(function (i) {
        return i.id === id;
    });

    item.quantidade += variacao;

    if (item.quantidade <= 0) {
        removerDoCarrinho(id);
        return;
    }
    renderizarCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(function (i) {
        return i.id !== id;
    });
    renderizarCarrinho();
}

function calcularTotal() {
    let total = 0;
    carrinho.forEach(function (item) {
        total += buscarProduto(item.id).preco * item.quantidade;
    });
    return total;
}

function contarItens() {
    let quantidade = 0;
    carrinho.forEach(function (item) {
        quantidade += item.quantidade;
    });
    return quantidade;
}

function renderizarCarrinho() {
    itensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<li class="vazio">Seu carrinho está vazio.</li>';
    }

    carrinho.forEach(function (item) {
        const produto = buscarProduto(item.id);
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <span class="item-nome">${produto.nome}</span>
                <span class="item-subtotal">${item.quantidade} x ${formatarPreco(produto.preco)}</span>
            </div>
            <div class="controle-quantidade">
                <button type="button" class="btn-qtd" data-id="${produto.id}" data-acao="diminuir" aria-label="Diminuir quantidade">-</button>
                <span>${item.quantidade}</span>
                <button type="button" class="btn-qtd" data-id="${produto.id}" data-acao="aumentar" aria-label="Aumentar quantidade">+</button>
                <button type="button" class="btn-qtd" data-id="${produto.id}" data-acao="remover" aria-label="Remover produto">x</button>
            </div>`;
        itensCarrinho.appendChild(li);
    });

    contadorCarrinho.textContent = contarItens();
    totalCarrinho.textContent = formatarPreco(calcularTotal());
}

// botões +, - e x dentro do carrinho
itensCarrinho.addEventListener("click", function (evento) {
    const botao = evento.target.closest(".btn-qtd");
    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    if (acao === "aumentar") {
        alterarQuantidade(id, 1);
    } else if (acao === "diminuir") {
        alterarQuantidade(id, -1);
    } else if (acao === "remover") {
        removerDoCarrinho(id);
    }
});

function mostrarMensagem(texto) {
    mensagemCarrinho.textContent = texto;
}

btnLimpar.addEventListener("click", function () {
    if (carrinho.length === 0) {
        mostrarMensagem("O carrinho já está vazio.");
        return;
    }
    carrinho = [];
    renderizarCarrinho();
    mostrarMensagem("Carrinho esvaziado.");
});

/* ---------- Finalizar compra (com efeito) ---------- */
const painelCarrinho = document.querySelector(".carrinho");
let finalizando = false; // evita cliques repetidos durante o efeito

btnFinalizar.addEventListener("click", function () {
    if (finalizando) {
        return;
    }
    if (carrinho.length === 0) {
        mostrarMensagem("Adicione pelo menos um produto antes de finalizar.");
        return;
    }

    finalizando = true;
    const total = formatarPreco(calcularTotal());
    const quantidade = contarItens();

    // 1. botão em estado de "processando"
    btnFinalizar.disabled = true;
    btnFinalizar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Processando...';
    mostrarMensagem("");

    setTimeout(function () {
        // 2. os itens deslizam para fora do carrinho
        itensCarrinho.classList.add("saindo");

        setTimeout(function () {
            carrinho = [];
            renderizarCarrinho();
            itensCarrinho.classList.remove("saindo");

            // 3. confirmação animada e chuva de palhetas
            mostrarConfirmacao(total, quantidade);
            soltarPalhetas();

            btnFinalizar.disabled = false;
            btnFinalizar.textContent = "Finalizar compra";
            finalizando = false;
        }, 400);
    }, 1200);
});

function mostrarConfirmacao(total, quantidade) {
    const numeroPedido = "DST-" + String(Date.now()).slice(-6);
    const itens = quantidade === 1 ? "1 item" : quantidade + " itens";

    mensagemCarrinho.innerHTML = `
        <div class="confirmacao-pedido">
            <svg class="check-pedido" viewBox="0 0 56 56" aria-hidden="true">
                <circle cx="28" cy="28" r="25"></circle>
                <path d="M17 29 L25 37 L40 21"></path>
            </svg>
            <strong>Pedido ${numeroPedido} confirmado!</strong>
            <span>${itens}, total de ${total}. Retire na recepção do estúdio.</span>
        </div>`;

    // reinicia a animação de brilho do carrinho
    painelCarrinho.classList.remove("pedido-feito");
    void painelCarrinho.offsetWidth;
    painelCarrinho.classList.add("pedido-feito");
}

// cria palhetas da logo que caem pela tela e somem depois
function soltarPalhetas() {
    // respeita quem configurou o sistema para reduzir animações
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const chuva = document.createElement("div");
    chuva.className = "chuva-palhetas";

    for (let i = 0; i < 30; i++) {
        const palheta = document.createElement("img");
        palheta.src = "imagens/logo-simbolo.svg";
        palheta.alt = "";
        palheta.style.left = (Math.random() * 100) + "%";
        palheta.style.width = (18 + Math.random() * 22) + "px";
        palheta.style.animationDelay = (Math.random() * 0.6) + "s";
        palheta.style.animationDuration = (2.2 + Math.random() * 1.4) + "s";
        palheta.style.setProperty("--giro", (Math.random() * 720 - 360) + "deg");
        chuva.appendChild(palheta);
    }

    document.body.appendChild(chuva);
    setTimeout(function () {
        chuva.remove();
    }, 4500);
}

/* ---------- Início ---------- */
renderizarProdutos();
renderizarCarrinho();
