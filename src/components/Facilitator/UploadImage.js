import React, { useState } from "react";

export default function UploadImage({
    setFiles,
    limit = 5,
    prevImages = [],
    formLoading = false,
}) {
    const [images, setImages] = useState({
        preview: [],
        raw: [],
    });
    const [err, setErr] = useState("");

    const handleChange = (e) => {
        if (!formLoading) {
            setErr("");
            const files = Array.from(e.target.files);

            if (images.preview.length + files.length > limit) {
                setErr("Only 5 images can be uploaded at a time");
                return false;
            }

            const types = ["image/png", "image/jpeg"];
            const currentImages = [];

            files.forEach((file) => {
                if (types.every((type) => file.type !== type)) {
                    setErr(
                        `"${file.type}" is not a supported format(jpg and png)`
                    );
                    return false;
                } else if (file.size > 10000000) {
                    // 10MB Limit
                    setErr(`"${file.name}" is too large, maximum 10MB`);
                    return false;
                } else {
                    // formData.append("image", file);
                    currentImages.push(file);
                }
                setImages({
                    preview: [
                        ...images.preview,
                        ...currentImages.map((file) =>
                            URL.createObjectURL(file)
                        ),
                    ],
                    raw: [...images.raw, ...currentImages],
                });
                setFiles([...images.raw, ...currentImages]);
            });
        }
    };

    function cancelImage(ind) {
        if (!formLoading) {
            setImages({
                preview: images.preview.filter((el, i) => i !== ind),
                raw: images.raw.filter((el, i) => i !== ind),
            });
            setFiles([images.raw.filter((el, i) => i !== ind)]);
        }
    }

    function previewImage(image, i, cancel = true) {
        return (
            <div key={i.toString()} className="flex flex-col items-center my-2">
                <img
                    src={image}
                    alt={`hotel-${i}`}
                    className="bg-gray-400 w-16 h-12 mx-1 rounded border border-gray-800"
                />
                <div
                    className={`text-white font-bold flex items-center justify-center text-xs rounded w-12 h-4 mt-1 cursor-pointer ${
                        formLoading
                            ? "bg-gray-600 cursor-default"
                            : "bg-red-600 hover:bg-red-800"
                    }`}
                    onClick={() => cancelImage(i)}>
                    cancel
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full bg-grey-lighter">
            <div className="flex flex-wrap items-center">
                <label
                    className={`${
                        images.preview.length >= limit ? "hidden" : "flex"
                    } justify-center items-center px-2 py-1 rounded tracking-wide border border-blue cursor-pointer text-white ${
                        formLoading
                            ? "bg-gray-600 cursor-defaults"
                            : "bg-indigo-600 hover:bg-indigo-800"
                    }`}>
                    <svg
                        className="w-5 h-4"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="ml-1 text-sm font-bold">Add</span>
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleChange}
                        disabled={formLoading}
                        multiple
                    />
                </label>
                <div className="flex px-4 flex-wrap">
                    {prevImages.map((image, i) =>
                        previewImage(image, i, false)
                    )}
                    {images.preview.map((image, i) => previewImage(image, i))}
                </div>
            </div>
            <div className="text-xs italic text-center text-red-500">{err}</div>
        </div>
    );
}
