import { CldImage } from 'next-cloudinary';
import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { joinClassNames } from '@/utils'
import styles from '@/styles/Embla.module.css'

const TWEEN_FACTOR = 1.2


const DotButton = ({ selected, onClick, index }) => (
    <button
        className={selected ? joinClassNames(styles.embla__dot, styles.embla__dot__selected) : styles.embla__dot}
        type="button"
        aria-label={`Slide ${index + 1}`}
        onClick={onClick}
    />
);

const PrevButton = ({ enabled, onClick }) => (
    <button
        className={joinClassNames(styles.embla__button, styles.embla__button__prev)}
        onClick={onClick}
        disabled={!enabled}
        aria-label="Previous"
    >
        <svg className={styles.embla__button__svg} viewBox="137.718 -1.001 366.563 644">
            <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
    </button>
);

const NextButton = ({ enabled, onClick }) => (
    <button
        className={joinClassNames(styles.embla__button, styles.embla__button__next)}
        onClick={onClick}
        disabled={!enabled}
        aria-label="Next"
    >
        <svg className={styles.embla__button__svg} viewBox="0 0 238.003 238.003">
            <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
        </svg>
    </button>
);


const EmblaCarousel = ({ slides, options, title = false }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])
    const [tweenValues, setTweenValues] = useState([])
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState([])


    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi],
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi],
    )
    const scrollTo = useCallback(
        (index) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi, setSelectedIndex])

    const onScroll = useCallback(() => {
        if (!emblaApi) return

        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()

        const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
            if (!emblaApi.slidesInView().includes(index)) return 0
            let diffToTarget = scrollSnap - scrollProgress

            if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem) => {
                    const target = loopItem.target().get()
                    if (index === loopItem.index && target !== 0) {
                        const sign = Math.sign(target)
                        if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                        if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                    }
                })
            }
            return diffToTarget * (-1 / TWEEN_FACTOR) * 100
        })
        setTweenValues(styles)
    }, [emblaApi, setTweenValues])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        onScroll()
        emblaApi.on('scroll', () => {
            flushSync(() => onScroll())
        })
        emblaApi.on('reInit', onScroll)
    }, [emblaApi, setScrollSnaps, onSelect, onScroll])

    useEffect(() => {
        if (emblaApi) emblaApi.reInit()
    }, [emblaApi, slides])

    return (
        <div className={styles.sandbox__carousel}>
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {slides && slides.map(({ id, title, url, alt, link }, index) => (
                            <div className={styles.embla__slide} key={index}>
                                <div className={title ? styles.embla__slide__title : styles.embla__slide__number}>
                                    {title ? <span>{title}</span>
                                        : <span>{index + 1}</span>}
                                </div>
                                <div className={styles.embla__parallax}>
                                    <div
                                        className={styles.embla__parallax__layer}
                                        style={{
                                            ...(tweenValues.length && {
                                                transform: `translateX(${tweenValues[index]}%)`,
                                            }),
                                        }}
                                    >
                                        <Link href={link ? link : '#'}>
                                            <CldImage
                                                className={joinClassNames(styles.embla__slide__img, styles.embla__parallax__img)}
                                                priority
                                                width="800"
                                                height="600"
                                                key={id}
                                                src={url}
                                                alt={alt}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>

            <div className={styles.embla__dots}>
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        selected={index === selectedIndex}
                        index={index}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default EmblaCarousel
