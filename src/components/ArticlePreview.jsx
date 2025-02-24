import { Link } from "react-router-dom";
import { format } from "date-fns";

/**
 *  props:
 *  author : string
 *  createdAt : string
 *  likeCount : number
 *  tags : string[]
 */

const ArticlePreview = ({
  author,
  createdAt,
  likeCount,
  tags,
  title,
  description,
  imageUrl,
  authorUsername,
  slug,
}) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${authorUsername}`}>
          <img src={imageUrl} />
        </Link>
        <div className="info">
          <Link to={`/profile/${authorUsername}`} className="author">
            {author}
          </Link>
          <span className="date">{format(createdAt, "MMMM d, yyyy")}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {likeCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>

        <ul className="tag-list">
          {tags.map((tag) => (
            <li className="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
};
export default ArticlePreview;
