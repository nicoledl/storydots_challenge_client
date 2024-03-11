'use client'
import { useState } from 'react'
import style from '../../../styles/home.module.css'

function Modal({product, handleModal}) {
  const {name, description, brandId, image_url, price, id} = product;

  function closeModal() {
    handleModal(false)
  }

  return(
    <div className={style.modal}>
      <div>
        <div className={style.modal_container}>
          <span onClick={closeModal}>X</span>
          <img src={image_url} alt={name} />
          <div>
            <p>{name}</p>
            <p>{price}</p>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal