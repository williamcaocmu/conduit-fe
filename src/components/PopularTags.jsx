import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TagContext } from "../contexts/TagContextProvider";

const PopularTags = () => {
  const [tags, setTags] = useState([]);
  const { selectedTag, setSelectedTag } = useContext(TagContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/tags");
      setTags(response.data.tags);
    };

    fetchData();
  }, []);

  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map((tag) => (
          <a
            key={tag}
            className={`tag-pill tag-default ${
              selectedTag === tag ? "tag-outline" : ""
            }`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};
export default PopularTags;
