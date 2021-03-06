import React, { useEffect } from "react";
import axios from "axios";

function NewsFeed() {
  const [articles, setArticles] = React.useState([]);

  useEffect(() => {
    var options = {
      method: "GET",
      url: "https://crypto-news-live.p.rapidapi.com/news",
      headers: {
        "x-rapidapi-host": "crypto-news-live.p.rapidapi.com",
        "x-rapidapi-key": process.env.api_key,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const firstSeven = articles.slice(0, 7);
  return (
    <div className="news-feed">
      {firstSeven.map((article) => {
        return (
          <div className="news-feed-item">
            <a href={article.url}>{article.title}</a>
          </div>
        );
      })}
    </div>
  );
}

export default NewsFeed;
