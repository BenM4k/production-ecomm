import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import phone from '../assets/phone_1.png';

const Page = ({data = []}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = data[currentIndex];
  const handleClick = (index) => {
    setCurrentIndex(index);
  }
  return (
    <>
      <figure>
        <img src={phone} alt='Banner image' />
        <h1 className="title">{item?.title}</h1>
        <figcaption>{item?.desc}</figcaption>
        <div className="">
            <div className="left" onClick={() => handleClick(currentIndex === 0 ? data.length - 1 : currentIndex - 1)}>
                <HiChevronLeft />
            </div>
            <div className="right" onClick={() => handleClick(currentIndex === data.length - 1 ? 0 : currentIndex + 1)}>
                <HiChevronRight />
            </div>
        </div>
      </figure>
    </>

  );
}

export default Page;