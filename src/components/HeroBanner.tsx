import { useEffect, useRef, useState } from 'react';
import { heroSlides } from '../data/heroSlides';
import Icon from './Icon';

const SLIDE_MS = 6500;

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length);
    }, SLIDE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const goTo = (idx: number) => setActive((idx + heroSlides.length) % heroSlides.length);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero__viewport">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === active;
          const alignClass =
            slide.align === 'right' ? ' hero__content--right' : '';
          const overlayClass =
            slide.align === 'right' ? ' hero__overlay--right' : '';
          return (
            <div
              key={slide.id}
              className={`hero__slide${isActive ? ' is-active' : ''}`}
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${heroSlides.length}`}
            >
              <img
                src={slide.image}
                alt=""
                className="hero__bg"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className={`hero__overlay${overlayClass}`} />
              <div className={`hero__content${alignClass}`}>
                <div className="hero__inner">
                  <span className="hero__eyebrow">{slide.badge}</span>
                  <h1 className="hero__title">{slide.title}</h1>
                  <p className="hero__subtitle">{slide.subtitle}</p>
                  <div className="hero__cta">
                    <a className="btn btn--primary btn--lg" href={slide.cta.href}>
                      {slide.cta.label}
                      <Icon name="arrow-right" size={16} />
                    </a>
                    <a className="btn btn--ghost-light btn--lg" href={slide.secondary.href}>
                      {slide.secondary.label}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="hero__arrow hero__arrow--left"
          onClick={() => goTo(active - 1)}
          aria-label="Previous slide"
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          className="hero__arrow hero__arrow--right"
          onClick={() => goTo(active + 1)}
          aria-label="Next slide"
        >
          <Icon name="chevron-right" size={20} />
        </button>

        <div className="hero__dots" role="tablist" aria-label="Slides">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`hero__dot${idx === active ? ' is-active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={idx === active}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
