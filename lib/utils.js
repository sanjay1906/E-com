import { HIDDEN_PRODUCT_TAG } from "../lib/constants"
export const ensureStartsWith = (stringToCheck,startsWith) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const arrMult = (arr,domain) => {
    return arr?.length > 0 && arr.map((item) => ({
      title: item.title,
      url: item.url.replace(domain, ''),
      items: arrMult(item.items,domain)
    })) || []
  }
  
  export const removeEdgesAndNodes = (array) => {
    return array.edges.map((edge) => edge?.node);
  };

  const reshapeImages = (images, productTitle) => {
    const flattened = removeEdgesAndNodes(images);
  
    return flattened.map((image) => {
      const filename = image.url.match(/.*\/(.*)\..*/)[1];
      return {
        ...image,
        altText: image.altText || `${productTitle} - ${filename}`
      };
    });
  };

  export const reshapeProduct = (product, filterHiddenProducts = true) => {
    if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
      return undefined;
    }
  
    const { images, variants, ...rest } = product;
  
    return {
      ...rest,
      images: reshapeImages(images, product.title),
      variants: removeEdgesAndNodes(variants)
    };
  };
  
  export const reshapeProducts = (products) => {
    const reshapedProducts = [];
  
    for (const product of products) {
      if (product) {
        const reshapedProduct = reshapeProduct(product);
  
        if (reshapedProduct) {
          reshapedProducts.push(reshapedProduct);
        }
      }
    }
  
    return reshapedProducts;
  };