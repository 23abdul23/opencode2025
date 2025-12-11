'use client';

import React from 'react';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import axios from 'axios';

export default function Addevent  ()  {
  const [eventData, setEventData] = useState({
    Fullname: '',
    Description: '',
  });
  const [logoFile, setLogoFile] = useState(null);
  const [coverFiles, setCoverFiles] = useState([]);

  const logoUpload = (event) => {
    const file = event.target.files[0];
    setLogoFile(file);
  };

  const coverUpload = (event) => {
    const file = event.target.files[0];
    if (file) setCoverFiles((prev) => [...prev, file]);
  };

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', eventData.Fullname);
    formData.append('description', eventData.Description);
    formData.append('startDate', '2023-12-01T00:00:00Z');
    formData.append('endDate', '2023-12-02T00:00:00Z');

    // Interchange logo and cover files in FormData:
    // - If there's at least one cover file, use the first cover as the `logoImage` (backend expects logoImage[0]).
    // - Append the provided logo file and any remaining cover files as `coverImages`.
    
    //BELIEVE ME the interchange was necessary 

    if (coverFiles && coverFiles.length > 0) {
      // first cover becomes the logo
      formData.append('logoImage', coverFiles[0]);
      // remaining covers (if any) become coverImages
      coverFiles.slice(1).forEach((f) => formData.append('coverImages', f));
      // also include the explicit logoFile as an additional cover image
      if (logoFile) formData.append('coverImages', logoFile);
    } else {
      // no cover provided — fall back to original behaviour
      if (logoFile) formData.append('logoImage', logoFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/create`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event:', error?.response?.data || error.message);
    }
  };
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <div class="min-h-screen flex items-center justify-center pt-12">
        <div class="container max-w-screen-lg mx-auto">
          <div>
            <div class=" rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div class="">
                  <p class="font-medium text-lg">Event Details</p>
                </div>

                <div class="lg:col-span-2">
                  <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div class="md:col-span-5">
                      <label for="full_name">Full Name</label>
                      <input
                        type="text"
                        name="Fullname"
                        id="full_name"
                        class="h-10 border mt-1 rounded px-4 w-full text-black"
                        value={eventData.Fullname}
                        placeholder="Om Buddhadev"
                        onChange={handleChange}
                      />
                    </div>

                    <div class="md:col-span-5">
                      <label for="email">Event Description</label>
                      <input
                        type="text"
                        name="Description"
                        id="email"
                        class="h-10 border mt-1 rounded px-4 w-full text-black"
                        value={eventData.Description}
                        onChange={handleChange}
                      />
                    </div>

                    <div class="md:col-span-3">
                      <label for="address">Cover Image (only one)</label>
                      <input
                        type="file"
                        accept="image/*"
                        class="h-10 border mt-1 rounded px-4 w-full text-black"
                        onChange={coverUpload}
                      />
                    </div>

                    <div class="md:col-span-3">
                      <label for="address">Logo Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        class="h-10 border mt-1 rounded px-4 w-full text-black"
                        onChange={logoUpload}
                      />
                    </div>

                    <div class="md:col-span-5 text-right">
                      <div class="inline-flex items-end">
                        <button
                          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};
