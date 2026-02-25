import { Link } from 'react-router';
import Sticker from '../../../public/sticker.svg';
const Hero = () => {
  return (
    <main className="pt-5">
      <div className="flex gap-6">
        <div className="bg-[#f8f8f8] rounded-[30px] w-180 flex flex-col py-24.5 px-16">
          <h1 className="font-medium text-5xl tracking-[-0.02em] leading-[1.17] mb-8 ">
            Unlock your potential with the best{' '}
            <span className="italic font-normal bg-primary-green/60 rounded-lg">language</span>{' '}
            tutors
          </h1>
          <p className="tracking-[-0.02em] leading-[1.38] mb-16 w-118">
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
            language proficiency to new heights by connecting with highly qualified and experienced
            tutors.
          </p>
          <Link
            to="/teachers"
            className="block cursor-pointer bg-primary-green rounded-xl py-4 font-bold font-[inherit] text-center text-lg h-15 w-66.75 hover:bg-green-200"
          >
            Get started
          </Link>
        </div>
        <div className="bg-green-200 rounded-[30px] w-142 relative flex flex-col">
          <svg className="w-84.75 h-84.75 mx-auto mt-20 ">
            <use href="../../../public/sticker.svg"></use>
          </svg>
          <div className="bg-[url(../../../public/apple.svg)] bg-center bg-no-repeat bg-primary-green w-90 h-44 absolute bottom-0 rounded-t-lg flex justify-center items-center self-center"></div>
        </div>
      </div>
      <ul className="mt-6 rounded-[30px] flex gap-25 border-dashed border-[1.5px] border-primary-green/35 px-30.5 py-10 h-29">
        <li className=" flex items-center gap-4 tracking-[-0.02em]">
          <p className="font-medium leading-[1.14] text-[28px] ">32,000 +</p>
          <p className="leading-[1.29] text-[14px] text-bg-dark/70 w-18.5">Experienced tutors</p>
        </li>
        <li className=" flex items-center gap-4 tracking-[-0.02em] ">
          <p className="font-medium leading-[1.14] text-[28px] ">300,000 +</p>
          <p className="leading-[1.29] text-[14px] text-bg-dark/70 w-18.5">5-star tutor reviews</p>
        </li>
        <li className=" flex items-center gap-4 tracking-[-0.02em]  ">
          <p className="font-medium leading-[1.14] text-[28px] ">120 +</p>
          <p className="leading-[1.29] text-[14px] text-bg-dark/70 w-18.5">Subjects taught</p>
        </li>
        <li className=" flex items-center gap-4 tracking-[-0.02em] ">
          <p className="font-medium leading-[1.14] text-[28px] ">200 +</p>
          <p className="leading-[1.29] text-[14px] text-bg-dark/70 w-18.5">Tutor nationalities</p>
        </li>
      </ul>
    </main>
  );
};

export default Hero;
