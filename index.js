//discordbotの操作に必要
const discordtoken = '<discordtoken>'
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const request = require("request");

//dropboxの操作に必要
const dropboxtoken = '<dropboxtoken>'
const fetch = require('isomorphic-fetch');
const dropbox = require('dropbox').Dropbox;
const dbx = new dropbox({ accessToken: dropboxtoken, fetch: fetch});

//bitlyの操作に必要
const bitlytoken = '<bitlytoken>'
const { BitlyClient } = require('bitly');
const bitly = new BitlyClient(bitlytoken, {});

client.on('ready', () => {
  if(!(fs.existsSync("./tmp"))){
    fs.mkdirSync("./tmp")
  }
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  msg.attachments.forEach(a => {
    console.log(a)
    //画像のバイナリ取得
    var request = require("request");
      
    request.get(a.attachment,{encoding: null},(err,res,body) => {
      //ランダムファイル名作成
      var filename = Math.random().toString(32).substring(2)
      //tmpフォルダに書き込み
      fs.writeFileSync("./tmp/" + filename,body)

      //画像アップロード
      dbx.filesUpload({
        path: `/${filename}.jpg`,
        contents: body
      }).then((res) => {
        console.log(res)
        //画像ダウンロードリンク作成
        dbx.sharingCreateSharedLink({
          path: `/${filename}.jpg`
        }).then((res) => {
          console.log(res)
          //短縮リンク作成
          bitly.shorten(res.url.replace("dl=0","dl=1"))
          .then((res) => {
            console.log(res)
            msg.channel.send("<" + res.url + ">")

            //アップロードしたファイルの削除
            fs.unlinkSync("./tmp/" + filename)
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  })
});
  
client.login(discordtoken);
