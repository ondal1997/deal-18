exports.INSERT_CHAT = ({ product_id, seller_id, customer_id }) => {
  return `
        INSERT INTO chat 
        (product_id,seller_id,customer_id,uncheck_count_seller,uncheck_count_customer)
        VALUES (${product_id},'${seller_id}','${customer_id}',0,0)
    `;
};
