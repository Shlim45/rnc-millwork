import Image from "next/image";
import styles from "@/styles/HeaderImage.module.css";

/* 
    {
        src: '/_next/static/media/lumber_on_sawstop_blurred.79ba599e.webp',
        height: 600,
        width: 800,
        blurDataURL: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flumber_on_sawstop_blurred.79ba599e.webp&w=8&q=70',
        blurWidth: 8,
        blurHeight: 6
    }
*/

const HeaderImage = ( {src, alt} ) => {
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
