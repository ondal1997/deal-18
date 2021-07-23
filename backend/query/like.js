const GET_LIKE_PRODUCT = ({ size, userId }) => {
  const LIMIT = size ?? 10;

  return `
            SELECT p.id, product_img_url as productImgUrl, title, price, created_date as createdDate, town, user_id,category,
            (SELECT count(*) FROM user_like WHERE user_like.product_id=p.id) as likeCount,
            (SELECT count(*) FROM chat WHERE chat.product_id=p.id) as commentCount
            FROM product as p
              INNER JOIN (SELECT product_id FROM user_like as ul WHERE ul.user_id='${userId}') b on p.id=b.product_id
            ORDER BY p.id DESC
            LIMIT ${LIMIT} 
             `;
};
const ADD_LIKE = ({ userId, productId }) => {
  console.log(productId);
  return `
        INSERT INTO user_like 
        (user_id,product_id) VALUES ('${userId}','${productId}')
    `;
};

const DELETE_LIKE = ({ userId, productId }) => {
  return `
    DELETE FROM user_like
    WHERE user_id='${userId}' AND product_id='${productId}'
`;
};

module.exports = { GET_LIKE_PRODUCT, ADD_LIKE, DELETE_LIKE };
