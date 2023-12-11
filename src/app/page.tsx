'use client';

import { useState } from 'react';

export default function Home() {
  const [description, setDescription] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/describe', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setDescription(data.description);
  };

  return (
    <div className={`p-28`}>
      <input type='file' onChange={handleImageUpload} accept='image/*' />
      <textarea value={description} readOnly />
    </div>
  );
}
