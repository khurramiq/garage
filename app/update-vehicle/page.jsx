'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdateVehicle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get('id');

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
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getVehicleDetails = async () => {
      const response = await fetch(`/api/vehicle/${vehicleId}`);
      const data = await response.json();

      setPost({
        type: data.type,
        image: data.image,
        name: data.name,
        make: data.make,
        model: data.model,
        purchaseDate: data.purchaseDate,
        startingODO: data.startingODO,
        notes: data.notes,
      });
    };

    if (vehicleId) getVehicleDetails();
  }, [vehicleId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!vehicleId) return alert('Missing vehicleId!');

    try {
      const response = await fetch(`/api/vehicle/${vehicleId}`, {
        method: 'PATCH',
        body: JSON.stringify({
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdateVehicle;
