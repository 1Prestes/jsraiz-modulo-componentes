import React from 'react'

function valorTotal (carrinhoItens) {
    return Object.keys(carrinhoItens).reduce(
        (acc, produtoId) =>
            acc +
            carrinhoItens[produtoId].preco *
                carrinhoItens[produtoId].quantidade,
        0
    )
}

export default function Carrinho ({ itens, onRemoveItemCarrinho }) {
    return (
        <div className='carrinho'>
            <div className='carrinho_itens'>
                {Object.keys(itens).map(key => (
                    <div className='card carrinho_item mb-2' key={key}>
                        <div className='card-body'>
                            <h5 className='card-title'>{itens[key].nome}</h5>
                            <p className='card-text'>
                                Preço unidade R${itens[key].preco},00 |
                                Quantidate:
                                {itens[key].quantidade}
                            </p>
                            <p className='card-text'>
                                Valor: R$
                                {itens[key].preco * itens[key].quantidade},00
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
