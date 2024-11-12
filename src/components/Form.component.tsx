'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import type {
  FieldValues,
  FieldError,
  Path,
  UseFormRegister,
  RegisterOptions,
} from 'react-hook-form';
import type { IForm, IField } from 'components';

interface FormProps<T extends FieldValues> {
  formData: IForm<T>;
  onSubmit: (data: T) => void;
  className?: string;
  submitText?: string;
}

export default function Form<T extends FieldValues>({
  formData,
  onSubmit,
  className,
  submitText = 'submit',
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const submitHandler = handleSubmit(onSubmit);

  return (
    <form onSubmit={submitHandler} className={clsx('mt-8', className)}>
      <div className="space-y-5">
        {formData.fields.map((field) => (
          <Field
            key={field.id}
            id={field.id as Path<T>}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            register={register}
            error={errors[field.id] as FieldError}
            validation={field.validation}
          />
        ))}
      </div>

      <button
        className={clsx(
          'w-full h-10 block !mt-10',
          'font-medium capitalize',
          'bg-background text-on-background',
          'border border-on-background',
          'rounded-md focus:outline-none',
          'hover:bg-on-background hover:text-background',
          'transition-colors duration-300',
        )}
      >
        {submitText}
      </button>
    </form>
  );
}

interface FieldProps<T extends FieldValues> extends IField<T> {
  id: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  validation?: RegisterOptions<T, Path<T>>;
}

function Field<T extends FieldValues>({
  id,
  label,
  placeholder,
  type,
  register,
  error,
  validation,
}: FieldProps<T>) {
  const [inputType, setInputType] = useState(type);
  function passwordVisibilityHandler() {
    if (inputType === 'password') setInputType('text');
    else setInputType('password');
  }

  return (
    <div>
      <label
        htmlFor={id}
        className={clsx('block', 'text-sm font-medium text-on-background/[.7]')}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className={clsx(
            'block w-full h-10',
            'mt-1 px-3',
            'border border-on-background/[.2]',
            'rounded-md shadow-sm',
            'focus:ring focus:ring-on-background/[.2] focus:ring-opacity-50 focus:border-on-background sm:text-sm',
            'focus-visible:outline-none',
          )}
          {...register(id, validation)}
        />
        {type === 'password' && (
          <button
            type="button"
            className={clsx(
              'h-full w-12',
              'absolute top-0 right-0',
              'flex justify-center items-center',
              'text-xl',
              'opacity-60 hover:opacity-100 transition-opacity duration-300',
            )}
            onClick={passwordVisibilityHandler}
          >
            <FontAwesomeIcon
              icon={inputType === 'password' ? faEye : faEyeSlash}
              className={clsx('size-4', 'fill-on-foreground/[.7]')}
            />
          </button>
        )}
        {error && (
          <p className={clsx('text-red-500 text-xs italic', 'mt-3')}>
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
