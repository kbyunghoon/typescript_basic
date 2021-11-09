const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const { api } = require("./api");
const port = 3001;

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get("/tt", async (req, res) => {
  //req.query의 name을 가져와 url 인코딩
  const url = encodeURI(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${api}`
  );
  //url api get
  const { data } = await axios.get(url);
  //버전 확인
  const all_data = await axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((res) => {
      const db = {
        img: `http://ddragon.leagueoflegends.com/cdn/${res.data[0]}/img/profileicon/${data.profileIconId}.png`,
        name: data.name,
        summonerLevel: data.summonerLevel,
      };
      return db;
    });

  //모든 데이터 전송
  res.send(all_data);
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
