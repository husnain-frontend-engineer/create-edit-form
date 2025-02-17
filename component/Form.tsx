'use client';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  height: 30rem;
  width: 22rem;
  margin: 5rem auto;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease-in-out;

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  background: ${props => (props.disabled ? '#aaa' : 'linear-gradient(135deg, #ff7eb3, #ff758c)')};
  padding: 12px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease-in-out;

  &:hover {
    background: ${props => (props.disabled ? '#aaa' : 'linear-gradient(135deg, #ff758c, #ff3d68)')};
    transform: ${props => (props.disabled ? 'none' : 'scale(1.05)')};
  }
`;

const ErrorText = styled.span`
  color: #ff4d4d;
  font-size: 0.9rem;
  font-weight: bold;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: 'husnain',
      email: 'husnain.bin.ramzan@gmail.com',
    },
  });

  const onSubmit = (data: { name: string; email: string }) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name' style={{ color: 'white', fontWeight: 'bold' }}>
          Full Name
        </label>
        <Input placeholder='Enter your full name' {...register('name', { required: 'Name is required' })} />
        {errors.name && <ErrorText>{String(errors.name.message)}</ErrorText>}
        <label htmlFor='email' style={{ color: 'white', fontWeight: 'bold' }}>
          Email
        </label>
        <Input
          placeholder='Enter your email'
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
          })}
        />
        {errors.email && <ErrorText>{String(errors.email.message)}</ErrorText>}

        <Button disabled={!isDirty} type='submit'>
          Edit
        </Button>
      </StyledForm>
    </Container>
  );
}
