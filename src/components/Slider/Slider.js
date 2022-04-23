import React, { Component } from "react";

import classes from "./Slider.module.css";
import SliderArrow from "../../assets/SliderArrow.png";
import SliderArrow1 from "../../assets/SliderArrow1.png";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      length: props.slides.length,
    };
  }

  nextSlide = () => {
    this.setState({
      current:
        this.state.current === this.state.length - 1
          ? 0
          : this.state.current + 1,
    });
  };

  prevSlide = () => {
    this.setState({
      current:
        this.state.current === 0
          ? this.state.length - 1
          : this.state.current - 1,
    });
  };

  render() {
    const { length, current } = this.state;
    const { slides } = this.props;

    if (!Array.isArray(slides) || length <= 0) {
      return null;
    }

    return (
      <section className={classes.slider}>
        {length > 1 && (
          <div className={classes.wrapper}>
            <div
              className={classes.left__arrow__wrapper}
              onClick={this.prevSlide}
            >
              <img
                className={classes.left__arrow}
                src={SliderArrow1}
                alt="not found"
              />
            </div>

            <div
              className={classes.right__arrow__wrapper}
              onClick={this.nextSlide}
            >
              <img
                className={classes.right__arrow}
                src={SliderArrow}
                alt="not found"
              />
            </div>
          </div>
        )}
        {slides.map((slide, index) => {
          return (
            <div
              className={
                index === current ? classes.slide.active : classes.slide
              }
              key={index}
            >
              {index === current && (
                <img src={slide} alt="not found" className={classes.image} />
              )}
            </div>
          );
        })}
      </section>
    );
  }
}

export default Slider;
