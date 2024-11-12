import { useState } from "react";

function Like() {
  const [liked, setLike] = useState(true);
  const [value, setValue] = useState("Like");


  const handleClick = () => {
    setLike(true);
    if (liked === true) {
      setValue("Liked");
      setLike(false);
    } else {
      setValue("Like");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const likeData = {
      value,
    };

    const response = fetch("http://localhost:3000/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    });

    console.log(response);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <input value={value} type="hidden"></input>
        <button type="submit" onClick={handleClick}>{value}</button>
        </form>
      </div>
    </>
  );
}

export default Like;
