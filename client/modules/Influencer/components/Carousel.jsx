import React from 'react';

// Import Style
import styles from '../influencer.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageIndex: 0,
            imageSet: []
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ imageSet: nextProps.dataList });
    }

    previousSlide() {
        const { imageSet } = this.state;
        const lastIndex = imageSet.length - 1,
            { currentImageIndex } = this.state,
            shouldResetIndex = currentImageIndex === 0,
            index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
        this.setState({ currentImageIndex: index });
    }

    nextSlide() {
        const { imageSet } = this.state;
        const lastIndex = imageSet.length - 1,
            { currentImageIndex } = this.state,
            shouldResetIndex = currentImageIndex === lastIndex,
            index = shouldResetIndex ? 0 : currentImageIndex + 1;
        this.setState({ currentImageIndex: index });
    }

    render() {
        const { imageSet, currentImageIndex } = this.state;
        return (
            <div className={styles.carousel}>
                <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#x3c;" />
                {imageSet.length != 0 && <ImageSlide url={imageSet[currentImageIndex].image} />}
                <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#x3e;" />
            </div>
        );
    }
}

const Arrow = ({ direction, clickFunction, glyph }) => (
    <div
        className={direction == 'left' ? styles.slideArrowLeft : styles.slideArrowRight}
        onClick={clickFunction}>
        { glyph}
    </div>
);

const ImageSlide = ({ url }) => {
    const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '31em',
        width: '100%',
        transition: 'background-image .3s ease-in-out',
        backgroundRepeat: 'no-repeat'
    };

    return (
        <div style={styles}></div>
    );
}

export default Carousel;