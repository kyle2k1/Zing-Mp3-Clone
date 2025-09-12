'use client';

import { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister
} from 'react-hook-form';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { PiEyeClosed, PiEyeLight } from 'react-icons/pi';
import { TfiClose } from 'react-icons/tfi';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CldUploadWidget } from 'next-cloudinary';

import useLoginModal from '@/hooks/(header)/useLoginModal';
import { cn } from '@/libs/utils';

import LoadingModal from '../(content)/LoadingModal';

interface FormProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validate: RegisterOptions<FieldValues>;
  hidden?: boolean;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}

const Input: React.FC<FormProps> = ({
  id,
  label,
  type,
  disabled,
  register,
  errors,
  validate,
  hidden,
  setHidden
}) => {
  const condition = errors[id];
  const message = errors[id]?.message as React.ReactNode;
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder=" "
        disabled={disabled}
        {...register(id, validate)}
        type={hidden ? type : 'text'}
        className={cn(
          'peer h-12 w-full rounded-full bg-stone-300 px-8 text-slate-950 ring ring-offset-0 focus:outline-none',
          condition ? 'ring-rose-500' : 'ring-stone-300'
        )}
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-0 -translate-y-1/4 scale-75 cursor-pointer px-8 text-slate-700 transition delay-150 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100 peer-hover:-translate-y-1/4 peer-hover:scale-75"
      >
        {label}
      </label>

      {condition && (
        <span className="bottom-0 px-8 text-xx font-semibold text-rose-500">{message}</span>
      )}

      {hidden !== undefined && setHidden && (
        <div className="absolute right-0 top-0 -translate-x-full translate-y-1/2 text-slate-950">
          {hidden ? (
            <PiEyeClosed
              className="cursor-pointer hover:opacity-90"
              onClick={() => setHidden((prev) => !prev)}
              size={24}
            />
          ) : (
            <PiEyeLight
              className="cursor-pointer hover:opacity-90"
              onClick={() => setHidden((prev) => !prev)}
              size={24}
            />
          )}
        </div>
      )}
    </div>
  );
};

const Social = ({ SocialAction }: { SocialAction: (value: string) => void }) => {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-base font-semibold leading-6 tracking-wider text-gray-900">with</h2>
      <div
        onClick={() => SocialAction('google')}
        className="w-6 cursor-pointer rounded-full shadow-lg transition ease-in-out hover:scale-110"
      >
        {' '}
        <FcGoogle size={24} />
      </div>
      <div
        onClick={() => SocialAction('github')}
        className="w-6 cursor-pointer rounded-full shadow-lg transition ease-in-out hover:scale-110"
      >
        {' '}
        <BsGithub className="text-black" size={24} />
      </div>
    </div>
  );
};

const Close = ({
  setShowLoginModal,
  reset
}: {
  setShowLoginModal: (value?: boolean | undefined) => void;
  reset: () => void;
}) => {
  return (
    <div
      onClick={() => {
        reset();
        setShowLoginModal(false);
      }}
      className="absolute right-0 top-0 flex h-10 w-10 -translate-x-1/3 translate-y-1/3 cursor-pointer items-center justify-center rounded-full hover:bg-fuchsia-400 hover:opacity-80"
    >
      <TfiClose className="text-white" size={30} />
    </div>
  );
};

const ImageUpload = ({
  onChange,
  value
}: {
  onChange: (value: StaticImageData | string) => void;
  value: StaticImageData | string;
}) => {
  const uploadPreset = 'kbjrbfku';
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset={uploadPreset} options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="flex aspect-square w-1/4 cursor-pointer items-center justify-center overflow-hidden rounded-full ring ring-fuchsia-500 ring-offset-2 transition hover:opacity-70"
          >
            {value && (
              <Image
                src={value}
                width={0}
                height={0}
                sizes="100vw"
                alt="Avatar"
                style={{ width: '100%', height: 'auto' }}
                className="aspect-square rounded-full object-cover"
              />
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

const Avatar = ({
  image,
  setImage
}: {
  image: StaticImageData | string;
  setImage: Dispatch<SetStateAction<StaticImageData | string>>;
}) => {
  return (
    <div className="my-3 flex h-fit w-full items-center justify-center">
      <ImageUpload value={image} onChange={(value) => setImage(value)} />
    </div>
  );
};

const emailVerify = (email: string) => {
  const emailPattern = (email: string) => {
    return !!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
  };
  return emailPattern(email) || 'Invalid email address...!';
};

const usernameVerify = (username: string) => {
  const check = (username: string) => {
    return !username.includes(' ');
  };
  return check(username) || 'Invalid Username';
};

const passwordVerify = (password: string) => {
  const check = (password: string) => {
    return !/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
  };
  return check(password) || 'Invalid Password.';
};

const otpVerify = (otp: number) => {
  const check = (otp: number) => {
    return !(otp.toString().length !== 6);
  };
  return check(otp) || 'Invalid OTP.';
};
const validate: RegisterOptions<FieldValues> = {
  required: { value: true, message: 'Please enter this field.' },
  maxLength: { value: 40, message: 'Maximum 40 characters please.' },
  minLength: { value: 6, message: 'At least 6 characters please.' }
};

type Variant = 'LOGIN' | 'REGISTER' | 'FORGET' | 'OTP' | 'RESET';
const LoginModal = () => {
  const router = useRouter();
  const { showLoginModal, setShowLoginModal } = useLoginModal();
  const [step, setStep] = useState<Variant>('LOGIN');
  const [otp, setOTP] = useState<number | null>(null);
  const [hidden, setHidden] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<StaticImageData | string>('/images/placeholder.png');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      image: '',
      otp: null,
      newPassword: ''
    }
  });
  const Submit = ({
    step,
    setStep,
    onSubmit
  }: {
    step: Variant;
    setStep: (value: Variant) => void;
    onSubmit: () => void;
  }) => {
    return (
      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            onSubmit();
          }}
          className="peer h-12 w-full rounded-full bg-fuchsia-600 px-8 text-center font-semibold tracking-wide text-white hover:opacity-80 focus:outline-none"
        >
          {step === 'FORGET' && 'Send'}
          {step === 'LOGIN' && 'Sign In'}
          {step === 'REGISTER' && 'Sign Up'}
          {step === 'OTP' && 'Verify'}
          {step === 'RESET' && 'Reset'}
        </button>
        {step !== 'FORGET' && step === 'LOGIN' && (
          <div className="flex w-full justify-end text-gray-900">
            <div
              onClick={() => setStep('FORGET')}
              className="w-fit cursor-pointer transition ease-in-out hover:scale-105 hover:text-fuchsia-500"
            >
              {' '}
              Forget password?
            </div>
          </div>
        )}
      </div>
    );
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeof image === 'string') data = { ...data, image };
    setLoading(true);

    if (step === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => {
          signIn('credentials', { ...data, redirect: false }).then(() => {
            router.refresh();
            setShowLoginModal(false);
            reset();
            toast.success('Register Successfully');
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error('Email or Username already exists.');
        })
        .finally(() => setLoading(false));
    }
    if (step === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false }).then((callback) => {
        setLoading(false);
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in');
          setShowLoginModal(false);
          router.refresh();
        }
        if (callback?.error) {
          toast.error('Please double-check your information.');
        }
      });
    }

    if (step === 'FORGET') {
      axios
        .get(`/api/password/${data.username}`)
        .then((res) => {
          toast.success('You should receive a code in your email!');
          setOTP(res.data);
          setStep('OTP');
        })
        .catch(() => toast.error('Invalid username.'))
        .finally(() => setLoading(false));
    }
    if (step === 'OTP') {
      if (otp !== parseInt(data.otp, 10)) {
        toast.error('Incorrect OTP.');
        setLoading(false);
        return;
      }
      setOTP(null);
      setStep('RESET');
      setLoading(false);
      toast.success('Verify Successfully!');
      return;
    }
    if (step === 'RESET') {
      axios
        .post('/api/password/', {
          username: data.username,
          newPassword: data.newPassword
        })
        .then(() => {
          toast.success('Successfully!');
          setStep('LOGIN');
        })

        .finally(() => setLoading(false));
    }
  };

  const SocialAction = (action: string) => {
    setLoading(true);
    signIn(action, { redirect: false, callbackUrl: process.env.NEXTAUTH_URL })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid information');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in!');
          setShowLoginModal(false);
        }
      })
      .catch((error) => {
        console.log('🚀 ~ error:', error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <LoadingModal show={isLoading} setShow={setLoading} />
      <Transition appear show={showLoginModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setShowLoginModal(false);
            setStep('LOGIN');
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-3/4 transform flex-col gap-2 overflow-hidden rounded-2xl bg-white py-5 text-left align-middle shadow-xl transition-all md:flex-row md:py-0 xl:w-1/2">
                  {/* // Heading */}
                  <div className="relative block w-full md:hidden">
                    <h1 className="text-center text-xl font-bold tracking-wider text-slate-950 sm:text-2xl">
                      {step === 'LOGIN' ? 'Welcome to login!' : 'Welcome to website!'}
                    </h1>
                    <div
                      onClick={() => {
                        reset();
                        setShowLoginModal(false);
                      }}
                      className="absolute right-0 top-0 flex h-10 w-10 -translate-x-1/4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full hover:bg-fuchsia-400 hover:opacity-80"
                    >
                      <TfiClose className="text-slate-950 hover:text-white" size={24} />
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-6 px-4 md:w-1/2 md:p-6">
                    {/* // Title */}
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold leading-6 tracking-wider text-gray-900 md:text-2xl"
                      >
                        {step === 'LOGIN' && 'Sign In'}
                        {step === 'REGISTER' && 'Sign Up'}
                        {step === 'FORGET' && 'Reset password'}
                        {step === 'OTP' && 'Verify OTP'}
                        {step === 'RESET' && 'New password'}
                      </Dialog.Title>
                      {step === 'LOGIN' && <Social SocialAction={SocialAction} />}
                    </div>
                    {/* //Content */}
                    <div className="flex flex-col gap-3">
                      {step !== 'OTP' && step !== 'FORGET' && step !== 'RESET' ? (
                        <>
                          {step === 'REGISTER' && (
                            <>
                              <Avatar image={image} setImage={setImage} />

                              <Input
                                id="email"
                                label="Email"
                                disabled={isLoading}
                                register={register}
                                validate={{
                                  ...validate,
                                  validate: emailVerify
                                }}
                                errors={errors}
                              />
                            </>
                          )}
                          <Input
                            id="username"
                            label="Username"
                            disabled={isLoading}
                            register={register}
                            validate={{
                              ...validate,
                              validate: usernameVerify
                            }}
                            errors={errors}
                          />
                          <Input
                            id="password"
                            label="Password"
                            type="password"
                            disabled={isLoading}
                            register={register}
                            validate={{
                              ...validate,
                              validate: passwordVerify
                            }}
                            errors={errors}
                            hidden={hidden}
                            setHidden={setHidden}
                          />
                        </>
                      ) : step === 'FORGET' ? (
                        <Input
                          id="username"
                          label="Username"
                          disabled={isLoading}
                          register={register}
                          validate={{
                            ...validate,
                            validate: usernameVerify
                          }}
                          errors={errors}
                        />
                      ) : step === 'OTP' ? (
                        <Input
                          id="otp"
                          label="Enter your OTP code"
                          disabled={isLoading}
                          register={register}
                          validate={{
                            ...validate,
                            validate: otpVerify
                          }}
                          errors={errors}
                        />
                      ) : (
                        <Input
                          id="newPassword"
                          label="New Password"
                          type="password"
                          disabled={isLoading}
                          register={register}
                          validate={{
                            ...validate,
                            validate: passwordVerify
                          }}
                          hidden={hidden}
                          setHidden={setHidden}
                          errors={errors}
                        />
                      )}
                    </div>
                    <Submit step={step} setStep={setStep} onSubmit={handleSubmit(onSubmit)} />
                  </div>
                  {/* Right Part */}
                  <div className="relative hidden w-1/2 bg-gradient-to-br from-fuchsia-800 to-fuchsia-500 md:flex">
                    {/* //Button Close */}
                    <Close setShowLoginModal={setShowLoginModal} reset={reset} />
                    <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-white">
                      <h1 className="text-center text-2xl font-bold tracking-wider">
                        {step === 'LOGIN' ? 'Welcome to login!' : 'Welcome to website!'}
                      </h1>
                      <span className="text-base tracking-wider">Have an account?</span>
                      <div
                        onClick={() => setStep(step === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                        className="flex h-10 cursor-pointer items-center justify-center rounded-full border-2 border-white px-4 shadow-lg hover:opacity-80"
                      >
                        {' '}
                        <button type="button" className="">
                          {step === 'LOGIN' ? 'Sign Up' : 'Sign In'}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* //Below */}
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-950 sm:gap-5 md:hidden">
                    <span className="text-base tracking-wider">Have an account?</span>
                    <div
                      onClick={() => setStep(step === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
                      className="flex h-10 cursor-pointer items-center justify-center rounded-full border border-slate-950 px-4 shadow-lg hover:border-none hover:bg-fuchsia-600 hover:text-white hover:opacity-80"
                    >
                      {' '}
                      <button type="button" className="">
                        {step === 'REGISTER' ? 'Sign Up' : 'Sign In'}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginModal;
