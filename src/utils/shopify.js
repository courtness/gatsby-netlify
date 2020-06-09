/* eslint-disable import/prefer-default-export */
// import React from "react";

import { shuffleArray } from "~utils/helpers";

export function parseProducts(data) {
  if (!data || !data.allShopifyProduct || !data.allShopifyProduct.edges) {
    return null;
  }

  const products = [];

  data.allShopifyProduct.edges.forEach(({ node }) => {
    data.allMarkdownRemark.edges.forEach(edge => {
      const { fields, frontmatter } = edge.node;

      if (frontmatter.shopifyHandle === node.handle) {
        node.frontmatter = frontmatter;
        node.slug = fields.slug;
      }
    });

    if (node.frontmatter) {
      products.push(node);
    }
  });

  if (products && products.length > 0) {
    products.sort((a, b) => {
      const priorityA = a.frontmatter.priority;
      const priorityB = b.frontmatter.priority;

      if (priorityA < priorityB) {
        return -1;
      }

      if (priorityA > priorityB) {
        return 1;
      }

      return 0;
    });
  }

  return products;
}

export function filterProductsByColourVariants(data) {
  if (!data || !data.allShopifyProduct || !data.allShopifyProduct.edges) {
    return null;
  }

  const allProducts = parseProducts(data);
  const products = [];

  allProducts.forEach(product => {
    const loadedColours = [];

    if (!product.variants || !product.variants.length) {
      return;
    }

    product.variants.forEach(variant => {
      variant.selectedOptions.forEach(selectedOption => {
        if (
          selectedOption.name === `Colour` &&
          !loadedColours.includes(selectedOption.value)
        ) {
          loadedColours.push(selectedOption.value);

          const productClone = JSON.parse(JSON.stringify(product));
          const variantClone = JSON.parse(JSON.stringify(variant));

          variantClone.selectedOptions = [selectedOption];

          delete productClone.variants;

          productClone.variants = [variantClone];

          if (
            product.frontmatter &&
            product.frontmatter.featuredImages &&
            product.frontmatter.featuredImages.length > 0
          ) {
            let matchedVariantImage;

            product.frontmatter.featuredImages.forEach(featuredImage => {
              if (matchedVariantImage) {
                return;
              }

              if (
                selectedOption.value.toLowerCase() ===
                featuredImage.colorKey.toLowerCase()
              ) {
                [matchedVariantImage] = featuredImage.images;
              }
            });

            if (matchedVariantImage) {
              productClone.variant_image = matchedVariantImage;
            }
          }

          products.push(productClone);
        }
      });
    });
  });

  return products;
}

export function getOtherProducts(data, productIdToExclude, max = 3) {
  if (!data || !data.allShopifyProduct || !data.allShopifyProduct.edges) {
    return null;
  }

  const allColourProducts = shuffleArray(filterProductsByColourVariants(data));
  const products = [];

  allColourProducts.forEach(product => {
    if (products.length > max || product.id === productIdToExclude) {
      return;
    }

    products.push(product);
  });

  return products;
}

export function filterProductsByFeaturedVariants(data) {
  if (!data || !data.allShopifyProduct || !data.allShopifyProduct.edges) {
    return null;
  }

  const allProducts = parseProducts(data);

  const products = [];

  allProducts.forEach(product => {
    if (
      !product.frontmatter.featuredSkus ||
      product.frontmatter.featuredSkus.length === 0
    ) {
      return;
    }

    product.frontmatter.featuredSkus.forEach(featuredVariant => {
      product.variants.forEach(variant => {
        if (variant.sku === featuredVariant.featuredSku) {
          const productClone = JSON.parse(JSON.stringify(product));

          delete productClone.variants;

          productClone.variants = [variant];
          productClone.variant_image = featuredVariant.featuredSkuImage;
          productClone.variant_link = true;

          products.push(productClone);
        }
      });
    });
  });

  return products;
}

export function parseProductsIntoCollections(data) {
  if (!data || !data.allShopifyProduct || !data.allShopifyProduct.edges) {
    return null;
  }

  const products = parseProducts(data);

  const collections = {
    undefined: []
  };

  products.forEach(product => {
    if (!product.frontmatter.collection) {
      collections.undefined.push(product);

      return;
    }

    const { collection } = product.frontmatter;

    if (!collections[collection]) {
      collections[collection] = [];
    }

    collections[collection].push(product);
  });

  return collections;
}

export function getProductByHandle(handle, products) {
  if (!products || products.length === 0) {
    return null;
  }

  let matchedProduct;

  products.forEach(product => {
    if (matchedProduct) {
      return;
    }

    if (product.handle === handle) {
      matchedProduct = product;
    }
  });

  if (matchedProduct && matchedProduct.variants.length > 1) {
    const selectedOptions = {};

    matchedProduct.variants.forEach(variant => {
      variant.selectedOptions.forEach(option => {
        if (!selectedOptions[option.name]) {
          selectedOptions[option.name] = [];
        }

        if (!selectedOptions[option.name].includes(option.value)) {
          selectedOptions[option.name].push(option.value);
        }
      });
    });

    matchedProduct.all_options = selectedOptions;
  }

  return matchedProduct;
}
