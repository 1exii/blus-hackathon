import { phishing } from "../assets";
import styles, { layout } from "../style";

const Info = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={phishing} alt="img" className="w-[100%] h-[100%] relative z-[5]" />

      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Our Inspiration <br className="sm:block hidden" /> 
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      We know how easy it is to fall victim to financial scams. 
      We see it every day, on the news. While we were 
      lucky to get extensive education on how to 
      recognize and take action on phishing and fraud, 
      some people have not received that training. 
      The loss of such large amounts of money can 
      impact people's lives substantially, and we 
      just wanted to make the world a more just place 
      in the ways we could.
      </p>
    </div>
  </section>
);

export default Info;
