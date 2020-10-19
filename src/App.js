import React, { useState, useEffect } from "react";
import "./styles.css";
import qs from "qs";

export default function App() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [meme, setMeme] = useState(null);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((json) => setTemplates(json.data.memes));
  }, []);
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    if (fieldName === "top") {
      setTopText(fieldValue);
    } else {
      setBottomText(fieldValue);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = {
      template_id: selectedId,
      text0: topText,
      text1: bottomText,
      username: "xzk03017",
      password: "xzk03017@cndps.com"
    };
    // ?template_id=12324234&text0=ssdf....
    fetch(`https://api.imgflip.com/caption_image?${qs.stringify(params)}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          setMeme(json.data.url);
        }
      });
  };
  const handleClick = (imageId) => {
    setSelectedId(imageId);
  };
  return (
    <div className="App">
      <div className="meme">{meme ? <img src={meme} alt="" /> : null}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="top" value={topText} onChange={handleChange} />
        <input
          type="text"
          name="bottom"
          value={bottomText}
          onChange={handleChange}
        />
        <input type="submit" value="Generate meme" />
      </form>
      <div className="meme-container">
        {templates &&
          templates.map((elem) => (
            <img
              onClick={() => handleClick(elem.id)}
              alt=""
              id={elem.id}
              src={elem.url}
            />
          ))}
      </div>
    </div>
  );
}
