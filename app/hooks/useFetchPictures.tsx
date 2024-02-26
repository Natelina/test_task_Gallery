import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPicturesData } from "../redux/pictures/actionCreators";

const useFetchPictures = () => {
  const [pictures, setPictures] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=20`
    )
      .then((response) => response.text())
      .then((result) => dispatch(setPicturesData(JSON.parse(result))))
      .then(() => setIsLoading(false))
      .catch((error) => console.log("error", error));
  }, []);

  return { pictures, setPictures, isLoading };
};

export default useFetchPictures;
