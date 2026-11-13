var express = require("express");
var router = express.Router();

const prisma = require("../lib/prisma");


/* GET home page. */


router.get("/", async function (req, res, next) {
  try {
    const keyword = req.query.keyword;
    //キーワード取得
    const contents = await prisma.content.findMany({
  where: {
    OR: [
      {title:{contains:keyword}},
      {detail:{contains:keyword}}
    ]
  }
});
//ejsに渡す
res.render("search", {
  keyword: keyword,
  contents: contents
});
  } catch (error) {
    console.error(error);
    res.status(500).send("検索に失敗しました");
  }
});

module.exports = router;
