import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { useAuth } from '~/services/context/authContext';

const Login = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [offIcon, setOffIcon] = useState(true);

  const schema = yup.object({
    email: yup
      .string()
      .email()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .required()
      .transform((value: string) => value?.trim()),
    password: yup.string().min(8).required(),
  });

  type LoginForm = yup.InferType<typeof schema>;

  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
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

  const onSubmit = async (data: LoginForm) => {
    try {
      const email = data.email.trim().toLowerCase();
      console.log(data.email);
      await login(email, data.password);
      navigate('/favorites');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <fieldset className="border-none outline-none">
        <h1 className="text-[40px] font-medium text-left leading-[1.2] tracking-[-0.02em] mb-5">
          Log In
        </h1>
        <p className="leading-[1.38] text-bg-dark/80">
          Welcome back! Please enter your credentials to access your account and continue your
          search for an teacher.
        </p>
      </fieldset>

      <fieldset className="border-none outline-none flex flex-col gap-4.5">
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
        disabled={isSubmitting || loading}
        className="rounded-xl outline-none bg-bg-button py-4 mx-auto font-[inherit] w-109.5 h-15 font-bold  text-lg text-bg-dark text-center coursor-pointer"
      >
        Log In
      </button>
    </form>
  );
};
export default Login;
