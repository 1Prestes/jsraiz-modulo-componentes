function ProdutoComponent ({ item, onAddCarriho }) {
  return React.createElement(
    'div',
    { className: 'col-sm-4 mb-3' },
    React.createElement(
      'div',
      { className: 'card loja_item' },

      React.createElement('img', {
        className: 'card-img-top',
        src: item.imagem
      }),
      React.createElement(
        'div',
        { className: 'card-body' },
        React.createElement('h5', { className: 'card-title' }, item.nome),
        React.createElement('small', null, `R$${item.preco},00`),
        React.createElement('p', { className: 'card-text' }, item.descricao),
        React.createElement(
          'button',
          {
            className: 'btn btn-primary btn-add',
            onClick: onAddCarriho.bind(null, item)
          },
          'Adicionar'
        )
      )
    )
  )
}

function ListaProdutosComponent ({ itens, onAddCarriho, children }) {
  return React.createElement('main', { className: 'row loja' }, children)
}

function CarrinhoComponent ({ itens, onRemoveItemCarrinho }) {
  function valorTotal (carrinhoItens) {
    return Object.keys(carrinhoItens).reduce(
      (acc, produtoId) =>
        acc +
        carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade,
      0
    )
  }
  return React.createElement(
    'div',
    { className: 'carrinho' },
    React.createElement(
      'div',
      { className: 'carrinho_itens' },
      Object.keys(itens).map(key =>
        React.createElement(
          'div',
          { className: 'card carrinho_item mb-2', key },
          React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement(
              'h5',
              { className: 'card-title' },
              itens[key].nome
            ),
            React.createElement(
              'p',
              { className: 'card-text' },
              `Preço unidade R$${itens[key].preco},00 | Quantidate: ${itens[key].quantidade}`
            ),
            React.createElement(
              'p',
              { className: 'card-text' },
              `Valor: R$${itens[key].preco * itens[key].quantidade},00`
            ),
            React.createElement(
              'button',
              {
                className: 'btn btn-danger btn-sm btn-remove',
                onClick: onRemoveItemCarrinho.bind(null, key)
              },
              'Remover'
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'carrinho_total p-3' },
      React.createElement(
        'h6',
        null,
        'Total: ',
        React.createElement('strong', null, `R$${valorTotal(itens)},00`)
      )
    )
  )
}
function AppComponente () {
  const [carrinhoItens, setCarrinhoItens] = React.useState({})

  const produtosLista = [
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

  function addCarrinho (produto) {
    if (!carrinhoItens[produto.id]) {
      setCarrinhoItens({
        ...carrinhoItens,
        [produto.id]: {
          ...produto,
          quantidade: 1
        }
      })
    } else {
      setCarrinhoItens({
        ...carrinhoItens,
        [produto.id]: {
          ...produto,
          quantidade: ++carrinhoItens[produto.id].quantidade
        }
      })
    }
  }

  function removeItemCarrinho (produtoId) {
    if (carrinhoItens[produtoId].quantidade <= 1) {
      delete carrinhoItens[produtoId]
      setCarrinhoItens({ ...carrinhoItens })
    } else {
      setCarrinhoItens({
        ...carrinhoItens,
        [produtoId]: {
          ...carrinhoItens[produtoId],
          quantidade: --carrinhoItens[produtoId].quantidade
        }
      })
    }
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'col-sm-8' },
      React.createElement(
        ListaProdutosComponent,
        null,
        produtosLista.map(produto =>
          React.createElement(ProdutoComponent, {
            key: produto.id,
            item: produto,
            onAddCarriho: addCarrinho
          })
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'col-sm-4' },

      React.createElement(CarrinhoComponent, {
        itens: carrinhoItens,
        onRemoveItemCarrinho: removeItemCarrinho
      })
    )
  )
}

ReactDOM.render(
  React.createElement(AppComponente),
  document.getElementById('app')
)
