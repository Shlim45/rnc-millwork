import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import carouselStyles from "@/styles/Carousel.module.css"
import { joinClassNames } from "@/utils";

const Carousel = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState();
    const carouselItemsRef = useRef([]);

    useEffect(() => {
        console.log(images);

        if (images && images[0]) {
            carouselItemsRef.current = carouselItemsRef.current.slice(
                0,
                images.length
            );

            setSelectedImageIndex(0);
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleSelectedImageChange = (newIdx) => {
        if (images && images.length > 0) {
            setSelectedImage(images[newIdx]);
            setSelectedImageIndex(newIdx);
            if (carouselItemsRef.current[newIdx]) {
                carouselItemsRef.current[newIdx].scrollIntoView({
                    inline: "center",
                    behavior: "smooth"
                });
            }
        }
    };

    const handleRightClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex + 1;
            if (newIdx >= images.length) {
                newIdx = 0;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    const handleLeftClick = () => {
        if (images && images.length > 0) {
            let newIdx = selectedImageIndex - 1;
            if (newIdx < 0) {
                newIdx = images.length - 1;
            }
            handleSelectedImageChange(newIdx);
        }
    };

    return (
        <div className={carouselStyles.carousel_container}>
            <div className={carouselStyles.selected_container}>
                {selectedImage && <Image src={selectedImage.url}
                    key={selectedImage.id}
                    alt={selectedImage.alt}
                    width={480} height={640}
                    className={carouselStyles.selected_image}
                    priority
                />}
            </div>
            <div className={carouselStyles.carousel}>
                <div className={carouselStyles.carousel__images}>
                    {images && images.map((image, idx) => (
                        <div key={idx} className={selectedImageIndex === idx
                            ? joinClassNames(carouselStyles.carousel__image, carouselStyles.carousel__image_selected)
                            : carouselStyles.carousel__image}
                        >
                            <Image
                                onClick={() => handleSelectedImageChange(idx)}
                                src={image.url}
                                alt={image.alt}
                                key={image.id}
                                width={150}
                                height={150}
                                ref={(el) => (carouselItemsRef.current[idx] = el)}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className={joinClassNames(carouselStyles.carousel__button, carouselStyles.carousel__button_left)}
                    onClick={handleLeftClick}
                >
                    &larr;
                </button>
                <button
                    className={joinClassNames(carouselStyles.carousel__button, carouselStyles.carousel__button_right)}
                    onClick={handleRightClick}
                >
                    &rarr;
                </button>
            </div>
        </div>
    );
}

export default Carousel;