const GET_ALL_PRODUCT = ({ userId, category, town }) => {
  if (!town) {
    return `
            SELECT product.id, title, price, created_date as createdDate, town,
            (SELECT count(*) FROM user_like) as likeCount
            FROM product 
            JOIN user_like ON user_like.product_id=product.id
            JOIN chat ON chat.product_id=product.id
            WHERE state='판매중'
        `;
  }
};

exports.INSERT_PRODUCT = ({ title, price, description, town, user_id, category }) => {
  const state = '판매중';
  const watch_count = 0;
  return `
        INSERT INTO product
        (title,price,description,town,user_id,state,category,watch_count,created_date)
        VALUES
        ('${title}',${price},'${description}','${town}','${user_id}','${state}','${category}',${watch_count},now())
        `;
};
