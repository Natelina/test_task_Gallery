"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPicturesData } from "../../redux/pictures/actionCreators";
import { RootState } from "redux/rootState";
import useFetchPictures from "@/app/hooks/useFetchPictures";
import PictureModal from "../PictureModal/PictureModal";
import { Pictures } from "@/app/types";

interface Props {
  numberPictures?: number;
}

const Gallery = ({ numberPictures }: Props) => {
  const [picture, setPicture] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectCurrentIndex, setSelectCurrentIndex] = useState(0);

  const picturesState = useSelector(
    (state: RootState) => state.pictures.pictures
  );

  const dispatch = useDispatch();
  const { pictures, isLoading } = useFetchPictures(numberPictures);

  useEffect(() => {
    dispatch(setPicturesData(pictures));
  }, [pictures]);

  const hendlerNextPicture = () => {
    fetch(
      `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=${2}`
    )
      .then((response) => response.text())
      .then((result) => dispatch(setPicturesData(JSON.parse(result))))
      .catch((error) => console.log("error", error));
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const hendlerBackPicture = () => {
    setCurrentIndex((prevIndex) =>
      currentIndex === 0 ? prevIndex : prevIndex - 1
    );
  };
  const selectedPicture = (elem: Pictures) => {
    setPicture(elem);
    const select = picturesState.indexOf(elem);
    setSelectCurrentIndex(select === 0 ? select : select - 1);
  };

  return (
    <>
      {isOpenModal ? (
        <PictureModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          picture={picture}
        />
      ) : null}
      {isLoading ? (
        <p className="text-lg font-semibold">Loading...</p>
      ) : (
        <div className="flex flex-col gap-8 justify-center items-center  h-full">
          <div className="flex justify-center items-center ">
            <h1 className="text-3xl italic font-semibold tracking-wide">
              Cat Gallery
            </h1>
            <img src="./png/cat.png" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4">
            {Array.isArray(picturesState) &&
              picturesState
                .slice(selectCurrentIndex, selectCurrentIndex + 3)
                .map((el: Pictures, index: number) => {
                  const isMiddle = index === 1;
                  return (
                    <div
                      key={el.id}
                      className={`cursor-pointer border-2 overflow-hidden ${isMiddle ? "h-60 w-96" : "h-40 w-60"}`}
                      onClick={() => {
                        selectedPicture(el);
                        isMiddle && setIsOpenModal(true);
                      }}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={el.url}
                        alt="cute cats"
                      />
                    </div>
                  );
                })}
          </div>
          <div>
            <div className="flex justify-center items-center gap-2">
              <div className="cursor-pointer hover:(border-2)">
                <img
                  className="rotate-180"
                  onClick={hendlerBackPicture}
                  src="./arrow.svg"
                  alt="arrow back"
                />
              </div>
              {Array.isArray(picturesState) &&
                picturesState
                  .slice(currentIndex, currentIndex + 10)
                  .map((el: Pictures) => {
                    return (
                      <div
                        key={el.id}
                        className="h-12 w-16 border-2 overflow-hidden cursor-pointer"
                        onClick={() => {
                          selectedPicture(el);
                        }}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={el.url}
                          alt="cute cats"
                        />
                      </div>
                    );
                  })}
              <img
                className="cursor-pointer"
                onClick={() => hendlerNextPicture()}
                src="./arrow.svg"
                alt="arrow next"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
