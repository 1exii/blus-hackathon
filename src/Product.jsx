import styles from "./style";
import {Navbar} from "./components";

const Product = () => {

  return (
    <div className={`bg-primary w-full h-screen overflow-hidden`}>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
      </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
            <h1>Product Page</h1>
            </div>
        </div>
    </div>
  );
};


export default Product;
