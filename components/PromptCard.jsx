'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import moment from 'moment';
import momentTZ from 'moment-timezone';

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const purchaseDate = () => {
    const d = new Date(post?.purchaseDate);
    // const year = moment(momentTZ(d).tz('Europe/Berlin')).format('YYYY');
    // const month = moment(momentTZ(d).tz('Europe/Berlin')).format('MM');
    // const day = moment(momentTZ(d).tz('Europe/Berlin')).format('DD');
    const year = moment(d).format('YYYY');
    const month = moment(d).format('MM');
    const day = moment(d).format('DD');
    return year + '-' + month + '-' + day;
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-2 font-satoshi text-sm text-gray-700">
        <strong>Name: </strong>
        {post.name}
      </p>
      <p className="font-satoshi text-sm text-gray-700">
        <strong>Type: </strong>
        {post.type}
      </p>
      <p className="font-satoshi text-sm text-gray-700">
        <strong>Purchase Date: </strong>
        {purchaseDate()}
      </p>
      <div className="my-2">
        <Image src={post?.image} alt="user_image" width={320} height={150} />
      </div>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit/View
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
