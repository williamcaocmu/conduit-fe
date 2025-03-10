import { useContext, useEffect, useState } from "react";
import ArticlePreview from "./ArticlePreview";
import axios from "axios";
import { TagContext } from "../contexts/TagContextProvider";
const FEEDS_TYPES = [
  {
    name: "Your Feed",
    value: "own",
  },
  {
    name: "Global Feed",
    value: "global",
  },
];

const Feeds = () => {
  // own, global
  const [activeFeed, setActiveFeed] = useState("own");
  const [articles, setArticles] = useState([]);
  const { selectedTag } = useContext(TagContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/articles?tag=${selectedTag}`
      );
      setArticles(response.data.articles);
    };

    fetchData();
  }, [selectedTag]);

  return (
    <>
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {FEEDS_TYPES.map((feedType) => (
            <li className="nav-item" key={feedType.value}>
              <button
                className={`nav-link ${
                  activeFeed === feedType.value ? "active" : ""
                }`}
                onClick={() => setActiveFeed(feedType.value)}
              >
                {feedType.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {articles.map((article) => (
        <ArticlePreview
          key={article.id}
          author={article.author.username}
          createdAt={article.createdAt}
          likeCount={article.favoritesCount}
          tags={article?.tagList ?? []} // article.tagList = undefined || null
          title={article.title}
          description={article.description}
          imageUrl={article.author.image}
          authorUsername={article.author.username}
          slug={article.slug}
        />
      ))}

      <ul className="pagination">
        <li className="page-item active">
          <a className="page-link" href="">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="">
            2
          </a>
        </li>
      </ul>
    </>
  );
};
export default Feeds;
