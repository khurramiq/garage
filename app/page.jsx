'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.id) {
      router.push(`/profile`);
    }
  }, [session?.user.id]);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        The Garage Hub
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Powered By Adam</span>
      </h1>
      <p className="desc text-center">
        Your premier destination for expert automotive services and personalized
        vehicle enhancements.
      </p>
    </section>
  );
};

export default Home;
