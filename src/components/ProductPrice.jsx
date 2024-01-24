import React from 'react'

function ProductPrice({price,classes}) {
  // const { loading: loadingStatus, error: errorStatus, message: messageStatus } = sentEmailStatus || {};
  const { minVariantPrice } = price || {};
  const { amount,currencyCode } = minVariantPrice || {};
  const priceHtml = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3, style: 'currency', currency: currencyCode }).format(amount);
  return (
    <>
      {priceHtml && <span className={classes}>{ priceHtml }</span>}
    </>
  )
}

export default ProductPrice;