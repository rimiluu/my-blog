var express = require("express");
var router = express.Router();

const prisma = require("../lib/prisma");

/* GET home page. ブログページ閲覧*/


router.get("/", async function (req, res, next) {
  try {
    const contents = await prisma.content.findMany({//条件に合う生地を複数取得(全記事)
      orderBy: {
        id: "desc"//idが大きい順に表示
      }
    });
    res.render("index", { contents: contents });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data");
  }
});

/*入力記事保存*/ 

router.post("/", async function (req, res, next) {
  try {
    await prisma.content.create({//記事を使いするぜ！
      data: {
        title: req.body.title,
        date: new Date(req.body.date),
        detail: req.body.detail,
      },
    });
    res.status(201).redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("投稿の追加に失敗しました");
  }
});

module.exports = router;
