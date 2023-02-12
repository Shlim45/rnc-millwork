export const joinClassNames = (...cs) => (cs.map(c => c).join(" "));

export const images = [
    'projects/3/table_1_fdhleo',
    'projects/4/banister_m798gq',
    'projects/5/ent_center_v1_2_hebcdr',
    'projects/7/kitchen_5_xomklm',
    'projects/8/mantel_4_rgsjax',
    'projects/10/wine_cab_5_xfydmx',
    'projects/12/countertop_1_yi945f',
]

export const imageByIndex = (index) => images[index % images.length];