const produtos = [
  {
    id: 'abc123',
    nome: 'JSRaiz para FW',
    preco: 300,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  },
  {
    id: 'bbc123',
    nome: 'JSRaiz para Node',
    preco: 1200,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  },
  {
    id: 'cbc123',
    nome: 'Programação funcional com JS',
    preco: 500,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  }
]

const carrinhoItens = {}

function renderizaProduto (produto, index) {
  return `
        <div class="col-sm-4 mb-3">
            <div class="card">
                <div class="card loja_item">
                    <img src="${produto.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${produto.nome}</h5>
                        <small>R$${produto.preco},00</small>
                        <p class="card-text">${produto.descricao}.</p>
                        <button href="#" class="btn btn-primary btn-add" data-index="${index}">Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    `
}

function renderizaProdutos () {
  return produtos
    .map((produto, i) => {
      return renderizaProduto(produto, i)
    })
    .join('')
}

function renderizaItemCarrinho (produtoCarrinho) {
  return `
    <div class="card carrinho_item mb-2">
        <div class="card-body">
            <h5 class="card-title">${produtoCarrinho.nome}</h5>
            <p class="card-text">Preço unidade R$${
              produtoCarrinho.preco
            },00 | Quantidade: ${produtoCarrinho.quantidade}</p>
            <p class="card-text">Valor: R$${produtoCarrinho.preco *
              produtoCarrinho.quantidade},00</p>
            <button href="#" data-produto-id="${
              produtoCarrinho.id
            }" class="btn btn-danger btn-sm btn-remove">Remover</button>
        </div>
    </div>
    `
}

function renderizaCarrinho () {
  let html = ''
  for (let produtoId in carrinhoItens) {
    html = html + renderizaItemCarrinho(carrinhoItens[produtoId])
  }
  document.querySelector('.carrinho_itens').innerHTML = html
}

function renderCarrinhoTotal () {
  let total = 0
  for (let produtoId in carrinhoItens) {
    total =
      total +
      carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade
  }
  document.querySelector(
    '.carrinho_total'
  ).innerHTML = `<h6>Total: <strong>R$${total}</strong></h6>`
}

function adicionaItemNoCarrinho (produto) {
  if (!carrinhoItens[produto.id]) {
    carrinhoItens[produto.id] = produto
    carrinhoItens[produto.id].quantidade = 0
  }
  ++carrinhoItens[produto.id].quantidade
  renderizaCarrinho()
  renderCarrinhoTotal()
}

document.body.addEventListener('click', function (event) {
  const elemento = event.target

  if (elemento.classList.contains('btn-add')) {
    const index = parseInt(elemento.getAttribute('data-index'), 10)
    const produto = produtos[index]
    adicionaItemNoCarrinho(produto)
  }

  if (elemento.classList.contains('btn-remove')) {
    const produtoId = elemento.getAttribute('data-produto-id')
    if (carrinhoItens[produtoId].quantidade <= 1) {
      delete carrinhoItens[produtoId]
    } else {
      --carrinhoItens[produtoId].quantidade
    }
    renderizaCarrinho()
    renderCarrinhoTotal()
  }
})

document.querySelector('.loja').innerHTML = renderizaProdutos()
