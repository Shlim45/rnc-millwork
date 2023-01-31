import image1 from '@/../public/projects/3/table_1.jpg'
import image2 from '@/../public/projects/4/banister.webp'
import image3 from '@/../public/projects/5/ent_center_v1_2.webp'
import image4 from '@/../public/projects/7/kitchen_5.webp'
import image5 from '@/../public/projects/8/mantel_4.webp'
import image6 from '@/../public/projects/10/wine_cab_5.webp'
import image7 from '@/../public/projects/12/countertop_1.webp'

export const images = [image1, image2, image3, image4, image5, image6, image7]

const imageByIndex = (index) => images[index % images.length]

export default imageByIndex
