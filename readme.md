# 送った画像のダウンロード用リンクを返すBot

![リンクをもらうまで](https://raw.githubusercontent.com/wiki/sakkuntyo/discord-pictureDownloader/images/20190912_112041516_iOS.gif)

[招待リンク](https://discordapp.com/api/oauth2/authorize?client_id=620442080606683151&permissions=34816&scope=bot)

## 目的

- Discordに上げられた画像をDLするステップが多いためめんどくさい(3Step)
  - 画像をクリック -> 元ファイルを開く -> 名前をつけて画像を保存

- Step数を減らして楽にしたい
  - discordbotが返すURLをクリックしたら一発でダウンロードされる様にした

## 動作環境

- ubuntu 18.04
- nodejs 10.16.1
  - discord.js
  - dropbox 4.0.30
  - bitly 6.1.0
  - isomorphic-fetch 2.2.1
  - request 2.88.0

## 起動方法

```
# nodejsのインストール
$ git clone https://github.com/creationix/nvm ~/.nvm
$ source ~/.nvm/nvm.sh
$ echo "source ~/.nvm/nvm.sh" >> ~/.bashrc
$ nvm install 10.16.0
$ nvm use 10.16.0

# このアプリの起動
$ git clone https://github.com/sakkuntyo/discord-oumukaesi-nodejs
$ cd discord-oumukaesi-nodejs
$ sed "s/<discordtoken>/ここにdiscordのトークンを入れる/g" -i index.js
$ sed "s/<dropboxtoken>/ここにdropboxのトークンを入れる/g" -i index.js
$ sed "s/<bitlytoken>/ここにbitlyのトークンを入れる/g" -i index.js
$ npm install
$ npm start

# デーモンにしたい場合、pm2を使う
$ npm install -g pm2
$ pm2 start bin/www line-oumukaesi
## OSの起動と同時に起動
$ pm2 startup
## 現在のpm2 listの状態を保存
$ pm2 save
```

## [Discord Developer Portal](https://discordapp.com/developers/)でする事

### 1.アプリケーション作成

### 2.Bot設定ページのBUILD-A-BOTにある Add Bot ボタンを押下

今後このページからBot設定を行う

### 3.OAuth2設定ページから招待リンクを作成してBotをチャンネルに追加する

- 必要なスコープ
  - bot
- 必要な権限
  - Send Messages

### 4.tokenはBot設定ページの Click to Reveal Token をクリックして表示される物を使用する


## [Dropbox Developer](https://www.dropbox.com/developers/apps)でする事

## [bitly itlinks](http://bitly.com/a/oauth_apps)でする事
