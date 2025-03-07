import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AuthContext } from "../contexts/AuthContextProvider";

const ArticleDetails = () => {
  const [article, setArticle] = useState();
  const [status, setStatus] = useState("idle");
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");

  const param = useParams();
  const { userProfile } = useContext(AuthContext);

  const isOwner = userProfile?.username === article?.author?.username;
  const isCommentOwner = (commentAuthorUsername) => {
    return userProfile.username === commentAuthorUsername;
  };

  const fetchArticleDetails = async () => {
    setStatus("loading");
    const response = await axios.get(
      `http://localhost:3000/api/articles/${param.slug}`
    );

    if (response.status === 200) {
      setArticle(response.data.article);
      setStatus("success");
    }
  };

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/articles/${param.slug}/comments`
    );

    if (response.status === 200) {
      setComments(response.data.comments);
    }
  };

  useEffect(() => {
    fetchArticleDetails();
  }, [param]);

  useEffect(() => {
    if (!param.slug) return;

    fetchComments();
  }, [param.slug]);

  if (status === "idle") {
    return <div> Welcome </div>;
  }

  if (status === "loading") {
    return <div>Loading .... </div>;
  }

  // create new comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    const response = await axios.post(
      `http://localhost:3000/api/articles/${param.slug}/comments`,
      {
        comment: { body: commentBody },
      },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setCommentBody("");
      fetchComments();
    }
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <a href="/profile/eric-simons">
              <img src={article.author.image} />
            </a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">
                {article.author.username}
              </a>

              <span className="date">
                {format(article.createdAt, "MMMM d, yyyy")}
              </span>
            </div>
            {!isOwner && (
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round" />
                &nbsp; Follow {article.author.username}{" "}
                <span className="counter">({article.favoritesCount})</span>
              </button>
            )}
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Post{" "}
              <span className="counter">({article.favoritesCount})</span>
            </button>
            {isOwner && (
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit" /> Edit Article
              </button>
            )}
            {isOwner && (
              <button className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-a" /> Delete Article
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <div>{article.body}</div>

            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href="profile.html">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="" className="author">
                {article.author.username}
              </a>
              <span className="date">
                {format(article.createdAt, "MMM d, yyyy")}
              </span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round" />
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart" />
              &nbsp; Favorite Article{" "}
              <span className="counter">({article.favoritesCount})</span>
            </button>
            {isOwner && (
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-edit" /> Edit Article
              </button>
            )}
            {isOwner && (
              <button className="btn btn-sm btn-outline-danger">
                <i className="ion-trash-a" /> Delete Article
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form" onSubmit={handleSubmit}>
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                />
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>

            {comments.map((comment) => (
              <div className="card" key={comment.id}>
                <div className="card-block">
                  <p className="card-text">{comment.body}</p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src={comment.author.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    {comment.author.username}
                  </a>
                  <span className="date-posted">
                    {format(comment.createdAt, "MMM d, yyyy - HH:mm")}
                  </span>
                  {(isOwner || isCommentOwner(comment.author.username)) && (
                    <span className="mod-options">
                      <i className="ion-trash-a" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ArticleDetails;
