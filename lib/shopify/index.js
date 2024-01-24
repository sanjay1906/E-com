import { SHOPIFY_GRAPHQL_API_ENDPOINT } from "../constants"
import { ensureStartsWith, arrMult, removeEdgesAndNodes,reshapeProducts, reshapeProduct } from "../utils";
import { getMenuQuery, getCollectionsQuery, getCollectionProductsQuery, getProductQuery } from "./query";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export const shopifyFetch = async (query,variables) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': key
    },
    body: JSON.stringify({
      ...(query && { query }),
      ...(variables && { variables })
    })
  }
  try {
    const result = await fetch(endpoint,options);
    const body = await result.json();
    if (body.errors) {
      throw body.errors[0];
    }
    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      query
    };
  }
}

export const getMenu = async (handle) => {
  const res = await shopifyFetch(getMenuQuery,{handle});
  return (
    arrMult(res.body?.data?.menu?.items,domain)
  );
}

export const getCollections = async () => {
  const res = await shopifyFetch(getCollectionsQuery);
  return removeEdgesAndNodes(res.body?.data?.collections);
}

export const getCollectionProducts = async (handle,sortKey,reverse) => {
  const res = await shopifyFetch (getCollectionProductsQuery,{
      handle: handle,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${handle}\``);
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getProduct(handle) {
  const res = await shopifyFetch(getProductQuery,{handle});
  return reshapeProduct(res.body.data.product, false);
}