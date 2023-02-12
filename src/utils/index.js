export const joinClassNames = (...cs) => (cs.map(c => c).join(" "));

export const imageByIndex = (images = [], index) => images[index % images.length];
