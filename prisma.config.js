//データベース設計はこのファイルにしてるよ
require("dotenv").config();//.envを読み込んでいる(環境設定)

const { defineConfig, env } = require("prisma/config");//prisma設定,環境変数取得(env)

module.exports = defineConfig({
  schema: "prisma/schema.prisma",//データベース設計はこのファイルにしてるよ

  migrations: {
    path: "prisma/migrations",//ContentSQL
  },

  engine: "classic",//実行エンジン方式

  datasource: {
    url: env("DATABASE_URL"),//接続先
  },
});
