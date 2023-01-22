import Image from "next/image";
import styles from "@/styles/HeaderImage.module.css";

const HeaderImage = ( {src, alt} ) => {
    console.log(src);
    return (
        <div>
            <Image 
                src={src} 
                alt={alt}
                className={styles.headerImage}
                sizes="(max-width: 640px) 620px, (max-width: 1007px) 765px, 800px"
                priority
            />
        </div>
    )
}

export default HeaderImage;
