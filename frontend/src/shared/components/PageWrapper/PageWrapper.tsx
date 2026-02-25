import { type ReactNode } from "react";
import { WrapperContainer } from "./PageWrapper.styles";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <WrapperContainer>{children}</WrapperContainer>;
};

export default PageWrapper;
