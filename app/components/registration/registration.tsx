import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSubmit } from 'react-router';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';

const Registration = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [offIcon, setOffIcon] = useState(true);
  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleToggle = () => {
    if (offIcon) {
      setOffIcon(false);
      setPasswordVisibility(false);
    } else {
      setOffIcon(true);
      setPasswordVisibility(true);
    }
  };

  const onSubmit = data => {
    submit(data, { method: 'post' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <fieldset className="border-none outline-none">
        <h1 className="text-[40px] font-medium text-left leading-[1.2] tracking-[-0.02em] mb-5">
          Registration
        </h1>
        <p className="leading-[1.38] text-bg-dark/80">
          Thank you for your interest in our platform! In order to register, we need some
          information. Please provide us with the following information
        </p>
      </fieldset>

      <fieldset className="border-none outline-none flex flex-col gap-4.5">
        <input
          {...register('name')}
          type="text"
          className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38] "
          placeholder="Name"
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          {...register('email')}
          className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38] "
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <div className="relative">
          <input
            {...register('password')}
            type={passwordVisibility ? 'password' : 'text'}
            className="border border-solid border-bg-dark/10 rounded-xl outline-none py-4 w-full h-13.5 pl-4.5 placeholder:text-bg-dark leading-[1.38] "
            placeholder="Password"
          />
          {offIcon ? (
            <FiEyeOff
              className="absolute inline-block top-1/2 right-4.5 -translate-y-1/2 w-5 h-5"
              onClick={handleToggle}
            />
          ) : (
            <FiEye
              className="absolute inline-block top-1/2 right-4.5 -translate-y-1/2 w-5 h-5"
              onClick={handleToggle}
            />
          )}
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </fieldset>
      <button
        type="submit"
        className="rounded-xl outline-none bg-bg-button py-4 mx-auto font-[inherit] w-109.5 h-15 font-bold  text-lg text-bg-dark text-center"
      >
        Sign Up
      </button>
    </form>
  );
};
export default Registration;
