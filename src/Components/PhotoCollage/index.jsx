import React from "react";
import "./styles.css";
import { CardList } from "./GalleryList";

const PhotoCollage = () => {
  return (
    <section className="photo-collage">
      <h2 className="text-center text-3xl font-semibold mb-6">Nuestros Momentos</h2>
      <CardList />
    </section>
  );
};

export default PhotoCollage;
