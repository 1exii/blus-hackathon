import styles from "../style";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins text-3xl font-bold text-white hover:text-gray-300 transition duration-300">
        Cerberus
      </p>
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        2025 Lexi, Arieana, Priya, Nithya.
      </p>
    </div>
  </section>
);

export default Footer;
