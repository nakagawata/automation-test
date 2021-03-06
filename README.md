# jest-puppeteerでのテスト環境構築

## test環境のセットアップ

1. node.js v12.0.0 をインストール
  1. コマンドラインで下記のコマンドを打ち込む
  ```
   node -v
   # v12.0.0と表示されればOK
  ```
2. もし、node.jsがインストールされていない場合は、下記の記事を参考にnode.jsをインストールする
[https://qiita.com/satoyan419/items/56e0b5f35912b9374305](https://qiita.com/satoyan419/items/56e0b5f35912b9374305)

3. リポジトリをcloneし、下記のコマンドを実行

```
# install dependencies
# node.js version 12
$ npm i # Or yarn
```

## 環境変数の設定
1. [ .env.sample ]をコピーし、[ .env ]にファイル名を編集
2. 各項目を埋めていく
```
STAGE_BASE_URL="alpha-stage環境のURL"
STAGE_EMAIL="aplpha-stage環境に登録されているアカウントのemailアドレス"
STAGE_PASSWORD="上記アドレスのpassword"
STAGE_BLOB_URL="alpha-stage環境blob-storageのURL"
BASE_URL="本番環境（正式ドメイン）のURL"
EMAIL="本番環境のURL"
PASSWORD="本番環境のpassword"
DOWNLOADPATH="CSVをダウンロードする際のダウンロード先フォルダのパス"
PAGE_WIDTH=画面を表示してテストする場合のウィンドウサイズ（幅）
PAGE_HEIGHT=画面を表示してテストする場合のウィンドウサイズ（高さ）
```

## テストの作動
プロジェクトディレクトリで下記コマンドの実行
```
npm run test # Or yarn test
```

## テスト結果
テスト実行により、下記の情報を表示
1. テスト毎のラベル
2. 各テストにかかったms単位での検証時刻
テストOK時「✔」、失敗時「×」が表示
「×」時にはエラー箇所とエラー内容を表示
3. 全テストのtotal数と成功/失敗数を表示
4. テストのトータルタイムを表示

![テスト結果サンプル](https://github.com/UnitedSevenCorporation/F2_Automated_Tester/blob/master/release-after-test/src/readme/test-result.png "テスト結果サンプル")


## ディレクトリ構成（随時編集）
