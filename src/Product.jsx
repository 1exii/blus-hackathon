import styles from "./style";
import { Navbar, EmailInputs } from "./components";

const Product = () => {
  return (
    <div className={`bg-primary`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <EmailInputs />
        </div>
      </div>
    </div>
  );
};

export default Product;
