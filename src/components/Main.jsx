import styles from "../style";
import Button from './Button';

const Main = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} max-w-[1200px] mx-auto`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-10 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[64px] text-[48px] text-white ss:leading-[100.8px] leading-[75px]">
            Lorem <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Ipsum Dolor</span>{" "}
          </h1>
        </div>
        <p className={`${styles.paragraph} max-w-[500px] mt-5`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </p>
        <Button styles={`mt-10`} link="/product"/>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <div className="absolute z-[0] w-[30%] h-[30%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[70%] h-[70%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[40%] h-[40%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
};

export default Main;
