import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type Teacher } from '~/types/teacher';

interface BookingFormProps {
  teacher: Teacher;  
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
}

const BookingForm = ({ teacher, onSubmit, onClose }: BookingFormProps) => {
    const schema = yup.object({
    reason: yup.string().oneOf(['career','kids','abroad','exams','culture'], 'Select a reason for learning').required(),
    fullName: yup.string().min(2).max(100).required('Full name required'),
    email: yup
      .string()
      .email()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required('Email required')
      .transform((value: string) => value?.trim()),
    phoneNumber: yup.string().min(10, 'Min 10 digits').required('Phone required')
  });

  type BookingForm = yup.InferType<typeof schema>;


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => () => reset(), [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <fieldset className="border-none outline-none ">
        <h1 className="text-[40px] font-medium text-left leading-[1.2] tracking-[-0.02em] mb-5">
          Book trial lesson
        </h1>
        <p className="leading-[1.38] text-bg-dark/80">
         Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.
        </p>
      </fieldset>
      <fieldset className='flex gap-3.5 mb-5'>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className="block w-11 h-11 rounded-full"
        />
        <div className="flex flex-col justify-between font-medium grow">
          <p className="text-xs text-text-grey">Your teacher</p>
          <h2 className="leading-normal text-base">{`${teacher.name} ${teacher.surname}`}</h2>
        </div>
      </fieldset>
      <fieldset className="font-medium mb-5 outline-none border-none">
        <legend className="text-2xl block mb-5">{`What is your main reason for learning ${teacher.languages.join('/')}?`}</legend>
        <div className="flex flex-col gap-4">
          {[
            { value: 'career', label: 'Career and business' },
            { value: 'kids', label: 'Lesson for kids' },
            { value: 'abroad', label: 'Living abroad' },
            { value: 'exams', label: 'Exams and coursework' },
            { value: 'culture', label: 'Culture, travel or hobby' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-primary-green/5">
              <input
                type="radio"
                value={value}
                id={value}
                className="w-3.5 h-3.5 text-primary-green border-primary-green focus:ring-primary-green"
                {...register('reason')}
              />
              <span className="leading-[1.38] text-bg-dark font-normal">{label}</span>
            </label>
          ))}
        </div>
        {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>}
      </fieldset>
      <fieldset className="border-none outline-none flex flex-col gap-4.5 mb-5 max-h-49.5">
          <input
            {...register('fullName')}
            type='text'
            className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38] "
            placeholder="Full Name"
          />  
          {errors.fullName && <p>{errors.fullName.message}</p>}
        <input
          {...register('email')}
          className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38]"
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
          <input
            {...register('phoneNumber')}
            type='text'
            className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38] "
            placeholder="Phone number"
          />  
          {errors.fullName && <p>{errors.fullName.message}</p>}
      </fieldset>
      <button
        type="submit"
        disabled={isSubmitting }
        className="rounded-xl outline-none bg-primary-green hover:bg-primary-green/75 py-4 mx-auto font-[inherit] w-109.5 h-15 font-bold  text-lg text-bg-dark text-center cursor-pointer"
      >
        Book
      </button>
    </form>
  );
};
export default BookingForm;
