import { useState } from 'react';
import ReactModal from 'react-modal';
import { CldImage } from 'next-cloudinary';
import { joinClassNames } from '@/utils';
import styles from '@/styles/Embla.module.css'

const Modal = ({ image, alt, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <CldImage
                className={joinClassNames(styles.embla__slide__img, styles.embla__parallax__img)}
                priority
                width="800"
                height="600"
                src={image}
                alt={alt}
                onClick={openModal}
            />
            <ReactModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        background: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        // border: 'none',
                        width: '80%',
                        height: '80%',
                        margin: 'auto',
                        background: 'rgba(0, 0, 0, 0.75)',
                        textAlign: 'center',
                        scrollbarColor: 'black',
                        scrollBehavior: 'smooth',
                        overflow: 'clip'
                    },
                }}
            >
                {children}
                <br />
                <button onClick={closeModal} style={{
                    height: '25px',
                    border: 'none',
                    backgroundColor: 'inherit',
                    color: 'inherit',
                    cursor: 'pointer',
                    fontSize: '24px',
                }}>&#x274C;</button>
            </ReactModal>
        </>
    );
};

export default Modal;
