import { Children, useEffect, type ReactNode } from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useEmblaCarousel from "embla-carousel-react";
import {
  CarouselWrapper,
  CarouselHeading,
  CarouselRow,
  View,
  Track,
  Slide,
  ArrowButton,
} from "./Carousel.styles";

interface CarouselProps {
  heading: string;
  children: ReactNode;
}

export const Carousel = ({ heading, children }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, children]);

  return (
    <CarouselWrapper>
      <CarouselHeading variant="subtitle1">{heading}</CarouselHeading>
      <CarouselRow>
        <ArrowButton
          onClick={() => {
            emblaApi?.scrollNext();
          }}
        >
          <ChevronLeftIcon />
        </ArrowButton>

        <View ref={emblaRef} dir="rtl">
          <Track>
            {Children.map(children, (child) => (
              <Slide>{child}</Slide>
            ))}
          </Track>
        </View>

        <ArrowButton onClick={() => emblaApi?.scrollPrev()}>
          <ChevronRightIcon />
        </ArrowButton>
      </CarouselRow>
    </CarouselWrapper>
  );
};
