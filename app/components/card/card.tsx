import { FiHeart, FiBookOpen, FiStar } from 'react-icons/fi';
import { useState } from 'react';
import { type Teacher } from '~/types/teacher';

interface CardProps {
  teacher: Teacher;
}

const Card = ({ teacher }: CardProps) => {
  const [isMoreRequested, setIsMoreRequested] = useState(false);
  const toggleReadMore = () =>
    isMoreRequested ? setIsMoreRequested(false) : setIsMoreRequested(true);

  return (
    <div className="rounded-3xl bg-white p-6 flex gap-12 ">
      <div className="rounded-full border-3 border-[#fbe9ba] border-solid w-30 h-30 flex justify-center items-center shrink-0 relative">
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className="block w-24 h-24 rounded-full"
        />
        <div className="bg-live absolute top-4.75 right-5.75 w-3 h-3 rounded-full border-white border-2 border-solid"></div>
      </div>
      <div className="grow">
        <div className="flex flex-space gap-16 mb-8">
          <div className="flex flex-col gap-2 font-medium grow">
            <p className="leading-normal text-text-grey">Languages</p>
            <h2 className="leading-none text-2xl">{`${teacher.name} ${teacher.surname}`}</h2>
          </div>
          <ul className="flex gap-4">
            <li className="flex items-center justify-center gap-2 font-medium leading-normal self-start">
              <FiBookOpen />
              <p>Lessons online</p>
              <span className="ml-2 text-bg-dark/20 ">|</span>
            </li>
            <li className="flex items-center justify-center gap-2 font-medium leading-normal self-start">
              <p>Lessons done:</p>
              <span>{teacher.lessons_done}</span>
              <span className="ml-2 text-bg-dark/20 ">|</span>
            </li>
            <li className="flex items-center justify-center gap-2 font-medium leading-normal self-start">
              <FiStar className="fill-[#ffc531] stroke-0" />
              <p>
                Rating: <span>{teacher.rating}</span>
              </p>
              <span className="ml-2 text-bg-dark/20 ">|</span>
            </li>
            <li className="flex items-center justify-center gap-2 font-medium leading-normal self-start">
              Price / 1 hour: <span className="text-live">{`${teacher.price_per_hour}$`}</span>
            </li>
          </ul>
          <FiHeart />
        </div>
        <div className="flex flex-col gap-2 leading-normal font-medium mb-4">
          <p className="text-text-grey">
            Speaks: <span className="underline text-bg-dark">{teacher.languages.join(', ')}</span>
          </p>
          <p className="text-text-grey">
            Lesson Info: <span className="text-bg-dark">{teacher.lesson_info}</span>
          </p>
          <p className="text-text-grey">
            Conditions: <span className=" text-bg-dark">{teacher.conditions.join(' ')}</span>
          </p>
        </div>
        <button
          type="button"
          className="outline-none underline font-medium leading-normal mb-4 cursor-pointer"
          onClick={toggleReadMore}
        >
          {isMoreRequested ? 'Read less' : 'Read more'}
        </button>
        {isMoreRequested ? (
          <>
            <p className="mb-8">{teacher.experience}</p>
            <ul className="flex flex-col gap-8 leading-normal font-medium text-bg-dark mb-8">
              {teacher.reviews.map((review, i) => (
                <li key={i} className="flex flex-col gap-4">
                  <div className=" flex gap-3">
                    <div className="rounded-full w-11 h-11 bg-primary-green/50 text-primary-green border-2 border-primary-green/90 flex justify-center items-center">
                      {review.reviewer_name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-text-grey">{review.reviewer_name}</h3>
                      <div className="flex gap-2">
                        <FiStar className="fill-[#ffc531] stroke-0" />
                        <span className="leading-[1.29] text-sm ">{review.reviewer_rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="">{review.comment}</p>
                </li>
              ))}
            </ul>
            <ul className="flex gap-2 mb-8 font-medium leading-[1.14] text-sm">
              {teacher.levels.map((level, i) => (
                <li
                  key={i}
                  className="first:bg-primary-green first:border-none rounded-[35px] py-2 px-3 border border-bg-dark/20 flex justify-center items-center"
                >
                  {`#${level}`}
                </li>
              ))}
            </ul>
            <button className="rounded-xl outline-none bg-primary-green hover:bg-primary-green/75 py-4 mx-auto font-[inherit] w-58.5 h-15 font-bold  text-lg text-bg-dark text-center cursor-pointer">
              Book trial lesson
            </button>
          </>
        ) : (
          <ul className="flex gap-2 font-medium leading-[1.14] text-sm">
            {teacher.levels.map((level, i) => (
              <li
                key={i}
                className="first:bg-primary-green first:border-none rounded-[35px] py-2 px-3 border border-bg-dark/20 flex justify-center items-center"
              >
                {`#${level}`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Card;
