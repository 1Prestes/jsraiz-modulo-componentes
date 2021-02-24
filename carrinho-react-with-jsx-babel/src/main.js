function ProdutoComponent ({ item, onAddCarriho }) {
  return (
    <div className='col-sm-4 mb-3'>
      <div className='card loja_item'>
        <img className='card-img-top' src={item.imagem} />
        <div className='card-body'>
          <h5 className='card-title'>{item.nome}</h5>
          <small>R${item.preco},00</small>
          <p className='card-text'>{item.descricao}</p>
          <button
            className='btn btn-primary btn-add'
            onClick={onAddCarriho.bind(null, item)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

function ListaProdutosComponent ({ itens, onAddCarriho, children }) {
  return <main className='row loja'>{children}</main>
}

function valorTotal (carrinhoItens) {
  return Object.keys(carrinhoItens).reduce(
    (acc, produtoId) =>
      acc +
      carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade,
    0
  )
}

function CarrinhoComponent ({ itens, onRemoveItemCarrinho }) {
  return (
    <div className='carrinho'>
      <div className='carrinho_itens'>
        {Object.keys(itens).map(key => (
          <div className='card carrinho_item mb-2' key={key}>
            <div className='card-body'>
              <h5 className='card-title'>{itens[key].nome}</h5>
              <p className='card-text'>
                Preço unidade R${itens[key].preco},00 | Quantidate:
                {itens[key].quantidade}
              </p>
              <p className='card-text'>
                Valor: R${itens[key].preco * itens[key].quantidade},00
              </p>
              <button
                className='btn btn-danger btn-sm btn-remove'
                onClick={onRemoveItemCarrinho.bind(null, key)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='carrinho_total p-3'>
        <h6>
          Total <strong>R${valorTotal(itens)},00</strong>
        </h6>
      </div>
    </div>
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

  return (
    <React.Fragment>
      <div className='col-sm-8'>
        <ListaProdutosComponent>
          {produtosLista.map(produto => (
            <ProdutoComponent
              key={produto.id}
              item={produto}
              onAddCarriho={addCarrinho}
            />
          ))}
        </ListaProdutosComponent>
      </div>
      <div className='col-sm-4'>
        <CarrinhoComponent
          itens={carrinhoItens}
          onRemoveItemCarrinho={removeItemCarrinho}
        />
      </div>
    </React.Fragment>
  )
}

ReactDOM.render(<AppComponente />, document.getElementById('app'))
