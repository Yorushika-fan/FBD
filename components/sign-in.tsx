import { signIn } from '@/app/[locale]/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
