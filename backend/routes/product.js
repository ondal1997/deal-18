const pool = require('../db');
const express = require('express');
const {
  GET_ALL_PRODUCT,
  GET_USER_PRODUCT,
  INCREASE_PRODUCT_WATCH_COUNT,
  GET_PRODUCT_DETAIL,
} = require('../query/product');
const router = express.Router();

//GET: product list
router.get('/products', async (req, res) => {
  const { userId } = req.session;
  const { size, backOf, category, ownerId, town, state } = req.query;
  try {
    const [productRows] = await pool.query(GET_ALL_PRODUCT({ size, userId, category, town, ownerId, backOf, state }));

    const products = productRows.map((productRow) =>
      productRow.isLiked ? { ...productRow, isLiked: true } : { ...productRow, isLiked: false },
    );

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'DB 실패' });
  }
});

// 상풍 조회(상세)
router.get('/products/:productId', async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  try {
    await pool.query(INCREASE_PRODUCT_WATCH_COUNT({ productId }));
    const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));

    const product = productRows[0];
    if (!product) {
      res.status(404).json({ error: '자료가 없습니다.' });
      return;
    }

    product.isYours = product.userId === userId;
    const [userLikeRows] = await pool.query('select * from user_like where user_id=? and product_id=?', [
      userId,
      productId,
    ]);
    product.isLiked = !!userLikeRows.length;
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err });
    console.error(err);
  }
});

const authenticationValidator = async (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(401).json({ error: '로그인이 필요합니다.' });
    return;
  }

  next();
};

// 상품 생성
router.post('/products', authenticationValidator, async (req, res) => {
  const { userId } = req.session;

  let { title, category, description, town, state, price, imgUrls } = req.body;

  state = state || '판매중';
  // TODO: state, category 범위체크

  if (!imgUrls.length) {
    res.status(400).json({ error: '최소 1개의 이미지가 필요합니다.' });
    return;
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [insertResult] = await conn.query(`
    insert into product (title, category, description, town, state, user_id, product_img_url${price ? ', price' : ''})
    values ('${title}', '${category}', '${description}', '${town}', '${state}', '${userId}', '${imgUrls[0]}'${
      price ? `, ${price}` : ''
    }) 
    `);

    const productId = insertResult.insertId;

    await conn.query(`
    insert into product_img (img_url, product_id)
    values ${imgUrls.map((imgUrl) => `('${imgUrl}', ${productId})`)}
    `);
    await conn.commit();

    const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));
    const product = productRows[0];
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 생성에 실패하였습니다.' });
    await conn.rollback();
  } finally {
    conn.release();
  }
});

// 상품 수정
router.put('/products/:productId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  // 본인 소유인지 체크!
  const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));
  const product = productRows[0];
  if (!product) {
    res.status(404).json({ error: '존재하지 않는 상품입니다.' });
    return;
  }
  if (product.userId !== userId) {
    res.status(403).json({ error: '본인의 것만 수정할 수 있습니다.' });
    return;
  }

  let { title, category, description, town, state, price, imgUrls } = req.body;
  // TODO: state, category 범위체크

  if (!imgUrls.length) {
    res.status(400).json({ error: '최소 1개의 이미지가 필요합니다.' });
    return;
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(`
    UPDATE product SET
    title='${title}', category='${category}', description='${description}', town='${town}', state='${state}',
    product_img_url='${imgUrls[0]}' ${price ? `, price=${price}` : ''} WHERE id='${productId}'
    `);

    await conn.query(`delete from product_img where product_id=${productId}`);

    await conn.query(`
    insert into product_img (img_url, product_id)
    values ${imgUrls.map((imgUrl) => `('${imgUrl}', ${productId})`)}
    `);
    await conn.commit();

    const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));
    const product = productRows[0];
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 수정에 실패하였습니다.' });
    await conn.rollback();
  } finally {
    conn.release();
  }
});

// 상품 삭제
router.delete('/products/:productId', authenticationValidator, async (req, res) => {
  const { userId } = req.session;
  const { productId } = req.params;

  // 본인 소유인지 체크!
  const [productRows] = await pool.query(GET_PRODUCT_DETAIL({ productId }));
  const product = productRows[0];
  if (!product) {
    res.status(404).json({ error: '존재하지 않는 상품입니다.' });
    return;
  }
  if (product.userId !== userId) {
    res.status(403).json({ error: '본인의 것만 삭제할 수 있습니다.' });
    return;
  }

  try {
    await pool.query(`delete from product where id=${productId}`);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '상품 삭제 실패하였습니다.' });
  }
});

module.exports = router;
