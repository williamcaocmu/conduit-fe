import { useEffect, useState } from "react";
import axios from "axios";

const PopularTags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3001/popularTags");
      setTags(response.data.tags);
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map((tag) => (
          <a key={tag} href="" className="tag-pill tag-default">
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
export default PopularTags;
