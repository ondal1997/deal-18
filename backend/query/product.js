const GET_ALL_PRODUCT = ({ size, userId, category, town, ownerId, backOf }) => {
  const LIMIT = size ?? 10;
  let condition = '';

  if (category) condition += `AND category='${category}' `;
  if (town) condition += `AND product.town='${town}' `;
  if (ownerId) condition += `AND product.user_id='${ownerId}' `;
  condition += `AND product.id>${backOf ?? 0}`;

  return `
            SELECT product.id, product_img_url as productImgUrl, title, price, created_date as createdDate, town, user_id,category,
            (SELECT count(*) FROM user_like WHERE user_like.product_id=product.id) as likeCount,
            (SELECT count(*) FROM chat WHERE chat.product_id=product.id) as commentCount,
            (SELECT count(*) 
              FROM user_like 
              WHERE '${userId}'=user_like.user_id AND user_like.product_id=product.id
              ) as isLiked
            FROM product 
            WHERE state='판매중' ${condition} 
            LIMIT ${LIMIT} 
             `;
};

const INSERT_PRODUCT = ({ title, price, description, town, user_id, category }) => {
  const state = '판매중';
  const watch_count = 0;
  return `
        INSERT INTO product
        (title,price,description,town,user_id,state,category,watch_count,created_date)
        VALUES
        ('${title}',${price},'${description}','${town}','${user_id}','${state}','${category}',${watch_count},now())
        `;
};

const GET_USER_PRODUCT = ({ productId, userId }) => {
  return `
        SELECT * 
        FROM product
        WHERE product.user_id='${userId}''
    `;
};

const GET_PRODUCT_IMG = ({ productId }) => {
  return `
    SELECT img_url FROM product_img
    WHERE product_id=productId
  `;
};

module.exports = { GET_ALL_PRODUCT, INSERT_PRODUCT, GET_USER_PRODUCT, GET_PRODUCT_IMG };

// {
//     id:1234, x
//     imgUrl: testImg0, -> 따로 select
//     title: '파란선풍기', x
//     town: '구암동', x
//     createdDate: new Date('2021.07.14'), x
//     price: 24500, x
//     commentCount: 1, x
//     likeCount: 2,x
//     isLiked: true,
//   },
