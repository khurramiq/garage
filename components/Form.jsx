import Link from 'next/link';
import { useState } from 'react';
import { deleteObject, getStorage, ref, ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { app, storage } from '@utils/firebase';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import UploadImage from '@components/uploadFile';
import EditIcon from '@material-ui/icons/Edit';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [progress, setProgress] = useState(0);
  const handleUploadClick = async (e, name) => {
    if (e.target.files.length < 1) return;
    const file = e.target.files[0];
    // change file name
    const myNewFile = new File([file], new Date().getTime() + file.name, {
      type: file.type,
    });
    const sotrageRef = sRef(storage, `images/${myNewFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, myNewFile);
    uploadTask?.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setPost({ ...post, image: downloadURL });
          setProgress(0);
        });
      }
    );
  };
  const deletePicuteFromStorage = (delUrl) => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, delUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setPost({ ...post, image: '' });
      })
      .catch((error) => {
        // Deletion unsuccessful
        console.log('Image deletion unsuccessful');
      });
  };
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Vehicle</span>
      </h1>
      {/* <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p> */}

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
           Type
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label> */}

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Type{' '}
            <span className="font-normal">
              (Please select type of vehicle.)
            </span>
          </span>
          <select
            required
            className="form_input"
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Bus">Bus</option>
          </select>
          {/* <input
            value={post.type}
            onChange={(e) => setPost({ ...post, type: e.target.value })}
            type='text'
            placeholder='Type'
            required
            className='form_input'
          /> */}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Image{' '}
            <span className="font-normal">
              (Please upload an image of vehicle.)
              {progress > 0 &&
                `
                progress ${progress}
                `}
            </span>
          </span>
          {post.image && (
            <div className="relative">
              <EditIcon
                onClick={() => deletePicuteFromStorage(post.image)}
                className="absolute right-0 top-0 cursor-pointer"
              />
              <img src={post.image} alt="thumbnail" />
            </div>
          )}
          {!post.image && (
            <UploadImage
              name="image"
              handleUploadClick={handleUploadClick}
              text="Choose image"
              // setFieldValue={setFieldValue}
            />
          )}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Name{' '}
            <span className="font-normal">(Please add name of vehicle.)</span>
          </span>
          <input
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            type="text"
            placeholder="Name"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Make{' '}
            <span className="font-normal">(Please add make of vehicle.)</span>
          </span>
          <input
            value={post.make}
            onChange={(e) => setPost({ ...post, make: e.target.value })}
            type="text"
            placeholder="Make"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Model{' '}
            <span className="font-normal">(Please add model of vehicle.)</span>
          </span>
          <input
            value={post.model}
            onChange={(e) => setPost({ ...post, model: e.target.value })}
            type="text"
            placeholder="Model"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Purchase Date{' '}
            <span className="font-normal">
              (Please add purchase date of vehicle.)
            </span>
          </span>
          <DatePicker
            className={'form_input'}
            value={post.purchaseDate}
            onChange={(date) => {
              setPost({ ...post, purchaseDate: date });
            }}
          />
          {/* <input
            value={post.purchaseDate}
            onChange={(e) => setPost({ ...post, purchaseDate: e.target.value })}
            type="text"
            placeholder="Purchase Date"
            required
            className="form_input"
          /> */}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Starting ODO{' '}
            <span className="font-normal">
              (Please add starting ODO of vehicle.)
            </span>
          </span>
          <input
            value={post.startingODO}
            onChange={(e) => setPost({ ...post, startingODO: e.target.value })}
            type="text"
            placeholder="Starting ODO"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Notes{' '}
            <span className="font-normal">(Please add notes to vehicle.)</span>
          </span>
          <input
            value={post.notes}
            onChange={(e) => setPost({ ...post, notes: e.target.value })}
            type="text"
            placeholder="Notes"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
