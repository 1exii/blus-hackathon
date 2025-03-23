import styles from "./style";
import { Info, Features, CallToAction, Footer, Navbar, Main } from "./components";

const Home = () => {

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
            <Navbar />
        </div>
      </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
            <Main />
            <Features />
            <Info />
            <CallToAction />
            <Footer />
            </div>
        </div>
    </div>
  );
};


export default Home;
