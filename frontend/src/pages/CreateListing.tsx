import React from "react";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadUrl,
} from "firebase/strorage";
import { app } from "../firebase";
const CreateListing = () => {
  interface FormData {
    imageUrls: string[];
  }
  const [files, setFiles] = React.useState<any>([]);
  const [formData, setFormData] = React.useState<FormData>({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = React.useState<string | null>(
    null
  );
  const [uploading, setUploading] = React.useState(false);
  console.log(files);
  console.log(formData);

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls: any) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false)
        })
        .catch((error) => {
          setImageUploadError("Image upload failed (2MB max per image)");
          setUploading(false)
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false)
    }
  };

  const storeImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (error: any) => {
          reject(error);
        },
        () => {
          getDownloadUrl(uploadTask.snapshot.ref).then((downloadUrl: any) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center my-7 font-bold">Create Listing</h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            required
            minLength={10}
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span className="">Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span className="">Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span className="">Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span className="">Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex item-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>

            <div className="flex item-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min={1}
                max={15}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col item-center">
                <p>Discounted price</p>
                <span className="text-[10px]">($/month)</span>
              </div>
            </div>

            <div className="flex item-center flex-col">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={15}
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex gap-2 item-center">
                <p>Regular price</p>
                <span className="text-[10px]">($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max: 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              accept="images/*"
              id="images"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 uppercase hover:shadow-2xl disabled:opacity-80"
            disabled={uploading}>
              {uploading ? "Uploading" : "Upload"}
            </button>
          </div>
        </div>

        <p className="text-red-700 text-sm">
          {imageUploadError && imageUploadError}
        </p>

        {formData.imageUrls.length > 0 &&
          formData.imageUrls.map((url, index) => {
            return (
              <div
                key={url}
                className="flex justify-between p-3 border item-center"
              >
                <img
                  src={url}
                  alt="listing-img"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-700 p-3 rounded-sm uppercase hover:opacity-90 border"
                >
                  Delete
                </button>
              </div>
            );
          })}

        <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Create listing
        </button>
      </form>
    </main>
  );
};

export default CreateListing;
