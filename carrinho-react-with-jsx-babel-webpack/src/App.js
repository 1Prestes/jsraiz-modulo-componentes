import React from 'react'

import Carrinho from './Components/Carrinho'
import ListaProdutos from './Components/ListaProdutos'
import Produto from './Components/Produto'

import produtosLista from './data'

export default function AppComponente () {
    const [carrinhoItens, setCarrinhoItens] = React.useState({})

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
                <ListaProdutos>
                    {produtosLista.map(produto => (
                        <Produto
                            key={produto.id}
                            item={produto}
                            onAddCarriho={addCarrinho}
                        />
                    ))}
                </ListaProdutos>
            </div>
            <div className='col-sm-4'>
                <Carrinho
                    itens={carrinhoItens}
                    onRemoveItemCarrinho={removeItemCarrinho}
                />
            </div>
        </React.Fragment>
    )
}
