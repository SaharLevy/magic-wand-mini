import { Children, type ReactNode } from "react";
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

  return (
    <CarouselWrapper>
      <CarouselHeading variant="subtitle1">{heading}</CarouselHeading>
      <CarouselRow>
        <IconButton
          onClick={() => {
            console.log("api:", emblaApi);
            emblaApi?.scrollPrev();
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        <View ref={emblaRef}>
          <Track>
            {Children.map(children, (child) => (
              <Slide>{child}</Slide>
            ))}
          </Track>
        </View>

        <IconButton onClick={() => emblaApi?.scrollNext()}>
          <ChevronRightIcon />
        </IconButton>
      </CarouselRow>
    </CarouselWrapper>
  );
};
