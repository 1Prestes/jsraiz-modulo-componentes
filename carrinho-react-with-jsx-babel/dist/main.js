function ProdutoComponent({
  item,
  onAddCarriho
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card loja_item"
  }, /*#__PURE__*/React.createElement("img", {
    className: "card-img-top",
    src: item.imagem
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "card-title"
  }, item.nome), /*#__PURE__*/React.createElement("small", null, "R$", item.preco, ",00"), /*#__PURE__*/React.createElement("p", {
    className: "card-text"
  }, item.descricao), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-add",
    onClick: onAddCarriho.bind(null, item)
  }, "Adicionar"))));
}

function ListaProdutosComponent({
  itens,
  onAddCarriho,
  children
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "row loja"
  }, children);
}

function valorTotal(carrinhoItens) {
  return Object.keys(carrinhoItens).reduce((acc, produtoId) => acc + carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade, 0);
}

function CarrinhoComponent({
  itens,
  onRemoveItemCarrinho
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "carrinho"
  }, /*#__PURE__*/React.createElement("div", {
    className: "carrinho_itens"
  }, Object.keys(itens).map(key => /*#__PURE__*/React.createElement("div", {
    className: "card carrinho_item mb-2",
    key: key
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "card-title"
  }, itens[key].nome), /*#__PURE__*/React.createElement("p", {
    className: "card-text"
  }, "Pre\xE7o unidade R$", itens[key].preco, ",00 | Quantidate:", itens[key].quantidade), /*#__PURE__*/React.createElement("p", {
    className: "card-text"
  }, "Valor: R$", itens[key].preco * itens[key].quantidade, ",00"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm btn-remove",
    onClick: onRemoveItemCarrinho.bind(null, key)
  }, "Remover"))))), /*#__PURE__*/React.createElement("div", {
    className: "carrinho_total p-3"
  }, /*#__PURE__*/React.createElement("h6", null, "Total ", /*#__PURE__*/React.createElement("strong", null, "R$", valorTotal(itens), ",00"))));
}

function AppComponente() {
  const [carrinhoItens, setCarrinhoItens] = React.useState({});
  const produtosLista = [{
    id: 'abc123',
    nome: 'JSRaiz para FW',
    preco: 300,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  }, {
    id: 'bbc123',
    nome: 'JSRaiz para Node',
    preco: 1200,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  }, {
    id: 'cbc123',
    nome: 'Programação funcional com JS',
    preco: 500,
    descricao: 'O melhor curso JS',
    imagem: 'http://lorempixel.com/500/300/'
  }];

  function addCarrinho(produto) {
    if (!carrinhoItens[produto.id]) {
      setCarrinhoItens({ ...carrinhoItens,
        [produto.id]: { ...produto,
          quantidade: 1
        }
      });
    } else {
      setCarrinhoItens({ ...carrinhoItens,
        [produto.id]: { ...produto,
          quantidade: ++carrinhoItens[produto.id].quantidade
        }
      });
    }
  }

  function removeItemCarrinho(produtoId) {
    if (carrinhoItens[produtoId].quantidade <= 1) {
      delete carrinhoItens[produtoId];
      setCarrinhoItens({ ...carrinhoItens
      });
    } else {
      setCarrinhoItens({ ...carrinhoItens,
        [produtoId]: { ...carrinhoItens[produtoId],
          quantidade: --carrinhoItens[produtoId].quantidade
        }
      });
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "col-sm-8"
  }, /*#__PURE__*/React.createElement(ListaProdutosComponent, null, produtosLista.map(produto => /*#__PURE__*/React.createElement(ProdutoComponent, {
    key: produto.id,
    item: produto,
    onAddCarriho: addCarrinho
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-sm-4"
  }, /*#__PURE__*/React.createElement(CarrinhoComponent, {
    itens: carrinhoItens,
    onRemoveItemCarrinho: removeItemCarrinho
  })));
}

ReactDOM.render( /*#__PURE__*/React.createElement(AppComponente, null), document.getElementById('app'));