import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import styles from '@/styles/ProjectEdit.module.css'

const SignedUpload = ({ id, title, imageCount, handler, innerText = "Add Images" }) => {
    const [resource, setResource] = useState();
    return (
        <>
            <CldUploadWidget
                signatureEndpoint="/api/sign-cloudinary-params"
                uploadPreset="next-cloudinary-signed"
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    uploadPreset: "next-cloudinary-signed",
                    sources: [
                        "local",
                        "camera",
                        "google_drive"
                    ],
                    folder: `projects/${id}`,
                    publicId: title.trim().toLowerCase().replace(' ', '_').concat(`_${imageCount + 1}`),
                    // secure: true,
                    resourceType: 'image',
                    context: { alt: `Photo ${imageCount + 1} of ${title}` },
                    maxFiles: 10,
                    showAdvancedOptions: true,
                    cropping: false,
                    multiple: true,
                    maxImageWidth: 1600,
                    maxImageHeight: 1600,
                    minImageWidth: 400,
                    minImageHeight: 400,
                    defaultSource: "local",
                    styles: {
                        palette: {
                            window: "#111111",
                            sourceBg: "#111111",
                            windowBorder: "#F7FDF0",
                            tabIcon: "#F7FDF0",
                            inactiveTabIcon: "#8E9FBF",
                            menuIcons: "#58FD51",
                            link: "#58FD51",
                            action: "#336BFF",
                            inProgress: "#58FD51",
                            complete: "#33ff00",
                            error: "#EA2727",
                            textDark: "#000000",
                            textLight: "#F7FDF0"
                        },
                        fonts: {
                            default: null,
                            "sans-serif": {
                                url: null,
                                active: true
                            }
                        }
                    }
                }}
                onUpload={(error, result, widget) => {
                    if (error) {
                        console.error(error);
                    }
                    setResource(result?.info);
                    handler(result?.info);
                    widget.close();
                }}
            >
                {({ open }) => {
                    function handleOnClick(e) {
                        setResource(undefined);
                        e.preventDefault();
                        open();
                    }
                    return (
                        <button type="button" className={styles.uploadButton} onClick={handleOnClick}>{innerText}</button>
                    );
                }}
            </CldUploadWidget>
            {/* <h3>Signed</h3>

            <p>URL: {resource?.secure_url}</p> */}
        </>
    )
}

export default SignedUpload;




/*

{
    "event": "success",
    "info": {
        "id": "uw-file3",
        "batchId": "uw-batch2",
        "asset_id": "757f004f63ce43a8ae854d976ef28c9a",
        "public_id": "projects/1/tabletop_2",
        "version": 1675822912,
        "version_id": "6b1954d91e49860f2a6c6051c8f18111",
        "signature": "dc4b8c2ef8c760779d722e578f702b4e9e900f11",
        "width": 1200,
        "height": 1600,
        "format": "webp",
        "resource_type": "image",
        "created_at": "2023-02-08T02:21:52Z",
        "tags": [],
        "pages": 1,
        "bytes": 121716,
        "type": "upload",
        "etag": "e9e4890d69873de282d28cfc59242aeb",
        "placeholder": false,
        "url": "http://res.cloudinary.com/dsnkbgfrm/image/upload/v1675822912/projects/1/tabletop_2.webp",
        "secure_url": "https://res.cloudinary.com/dsnkbgfrm/image/upload/v1675822912/projects/1/tabletop_2.webp",
        "folder": "projects/1",
        "access_mode": "public",
        "context": {
            "custom": {
                "alt": "Photo 2 of Tabletop"
            }
        },
        "original_filename": "IMG_0007",
        "original_extension": "JPG",
        "api_key": "849125158945199",
        "path": "v1675822912/projects/1/tabletop_2.webp",
        "thumbnail_url": "https://res.cloudinary.com/dsnkbgfrm/image/upload/c_limit,h_60,w_90/v1675822912/projects/1/tabletop_2.jpg"
    }
}

 */