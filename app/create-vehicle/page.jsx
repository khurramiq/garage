'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreateVehicle = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    type: 'Car',
    image: '',
    name: '',
    make: '',
    model: '',
    purchaseDate: new Date(),
    startingODO: '',
    notes: '',
  });

  const createVehicle = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/vehicle/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          type: post.type,
          image: post.image,
          name: post.name,
          make: post.make,
          model: post.model,
          purchaseDate: post.purchaseDate,
          startingODO: post.startingODO,
          notes: post.notes,
        }),
      });

      if (response.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createVehicle}
    />
  );
};

export default CreateVehicle;
