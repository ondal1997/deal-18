const ADD_LIKE = ({ userId, productId }) => {
  return `
        INSERT INTO user_like 
        (user_id,product_id) VALUES ('${userId}','${productId}')
        WHERE NOT EXISTS (SELECT 1 FROM user_like 
                        WHERE user_id = '${userId}' AND product_id = '${productId}')
    `;
};

const DELETE_LIKE = ({ userId, productId }) => {
  return `
    DELETE FROM user_like 
    WHERE user_id='${userId}' AND product_id='${productId}' AND
    EXISTS (SELECT 1 FROM user_like WHERE user_id = '${userId}' AND product_id = '${productId}')
`;
};

module.exports = { ADD_LIKE, DELETE_LIKE };
