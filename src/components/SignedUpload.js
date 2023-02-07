import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import styles from '@/styles/ProjectEdit.module.css'

const SignedUpload = ({ id, title, imageCount }) => {
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
                    publicId: title.trim().toLowerCase().replace(' ', '_').concat(`_${imageCount}`),
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
                    setResource(result?.info);
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
                        <button className={styles.uploadButton} onClick={handleOnClick}>
                            Add Images
                        </button>
                    );
                }}
            </CldUploadWidget>
            <h3>Signed</h3>

            <p>URL: {resource?.secure_url}</p>
        </>
    )
}

export default SignedUpload;