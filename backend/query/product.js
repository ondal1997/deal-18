const GET_ALL_PRODUCT = ({ size, userId, category, town, ownerId, backOf, state }) => {
  const LIMIT = size ?? 10;

  let condition = `product.id > ${backOf ?? 0} `;
  if (town) condition += `AND product.town='${town}' `;
  if (ownerId) condition += `AND product.user_id='${ownerId}' `;
  if (state) condition += `AND state='${state}' `;
  if (category) condition += `AND category='${category}' `;

  return `
            SELECT product.id, product_img_url as productImgUrl, title, price, created_date as createdDate, town, user_id,category,
            (SELECT count(*) FROM user_like WHERE user_like.product_id=product.id) as likeCount,
            (SELECT count(*) FROM chat WHERE chat.product_id=product.id) as commentCount,
            (SELECT count(*) 
              FROM user_like 
              WHERE '${userId}'=user_like.user_id AND user_like.product_id=product.id
              ) as isLiked
            FROM product 
            WHERE ${condition}
            ORDER BY product.id DESC
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

const INCREASE_PRODUCT_WATCH_COUNT = ({ productId }) => {
  return `update product set watch_count = watch_count + 1 where id = ${productId}`;
};

const GET_PRODUCT_DETAIL = ({ productId }) => {
  return `
      select a.id, a.title, a.price, a.description, a.town, a.user_id as userId, a.state, a.category, a.watch_count as watchCount, a.created_date as createdDate,
          i.imgUrls, ifnull(likeCount, 0) as likeCount, ifnull(commentCount, 0) as commentCount
      from
          product as a
          left join (select product_id, JSON_ARRAYAGG(img_url) as imgUrls from product_img group by product_id) as i
              on a.id = i.product_id
          left join (select product_id, count(*) as likeCount from user_like group by product_id) as b on a.id = b.product_id
          left join (select product_id, count(*) as commentCount from chat group by product_id) as c on a.id = c.product_id
      where
          a.id=${productId}
  `;
};

module.exports = {
  GET_ALL_PRODUCT,
  INSERT_PRODUCT,
  GET_USER_PRODUCT,
  GET_PRODUCT_IMG,
  INCREASE_PRODUCT_WATCH_COUNT,
  GET_PRODUCT_DETAIL,
};

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
