import React from 'react';

// Import Style
import styles from '../influencer.css';

const imgUrls = [
    "https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900",
    "https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328",
    "https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg",
];

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImageIndex: 0
        };
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
    }

    previousSlide() {
        const lastIndex = imgUrls.length - 1,
            { currentImageIndex } = this.state,
            shouldResetIndex = currentImageIndex === 0,
            index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
        this.setState({ currentImageIndex: index });
    }

    nextSlide() {
        const lastIndex = imgUrls.length - 1,
            { currentImageIndex } = this.state,
            shouldResetIndex = currentImageIndex === lastIndex,
            index = shouldResetIndex ? 0 : currentImageIndex + 1;
        this.setState({ currentImageIndex: index });
    }

    render() {
        return (
            <div className={styles.carousel}>
                <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#x3c;" />
                <ImageSlide url={imgUrls[this.state.currentImageIndex]} />
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '25em',
        width: '100%',
        transition: 'background-image .3s ease-in-out'
    };

    return (
        <div style={styles}></div>
    );
}

export default Carousel;