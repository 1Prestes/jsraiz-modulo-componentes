import React from 'react'

export default function Produto ({ item, onAddCarriho }) {
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
