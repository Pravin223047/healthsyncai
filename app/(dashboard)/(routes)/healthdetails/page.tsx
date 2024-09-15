"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@mui/material";

interface Profile {
  name: string;
  email: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  age: string;
  weight: string;
  height: string;
  bloodgroup: string;
  allergies: string;
  surgeries: string;
  medications: string;
  hospitalizations: string;
  smoking: boolean;
  alcohol: boolean;
  exercise: boolean;
  diet: boolean;
  other: boolean;
}

const HealthDetails: React.FC<{ profile: Profile }> = ({ profile }) => {
  const [formData, setFormData] = useState<FormData>({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    age: "",
    weight: "",
    height: "",
    bloodgroup: "",
    allergies: "",
    surgeries: "",
    medications: "",
    hospitalizations: "",
    smoking: false,
    alcohol: false,
    exercise: false,
    diet: false,
    other: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Details Sumbitted Sucessfully.");
    console.log(formData);
  };

  return (
    <div className="w-full h-full sm:h-[100vh] 2xl:h-[calc(100vh-72px)] pt-24 2xl:pt-12 mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      {loading ? (
        <div className="space-y-6 pt-4 2xl:pt-8 flex flex-col">
          {/* Header Skeletons */}
          <Skeleton className="h-8 w-1/4" />
          {/* Personal Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="h-4 w-1/2 mb-2" /> {/* Label Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Input Skeleton */}
              </div>
            ))}
          </div>
          {/* Health Information Section */}
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="h-4 w-1/2 mb-2" /> {/* Label Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Input Skeleton */}
              </div>
            ))}
          </div>
          {/* Medical History Section */}
          <Skeleton className="h-8 w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <Skeleton className="h-4 w-1/2 mb-2" /> {/* Label Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Input Skeleton */}
              </div>
            ))}
          </div>
          {/* Lifestyle Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 2xl:grid-cols-8 space-y-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Skeleton className="h-6 w-6" /> {/* Checkbox Skeleton */}
                <Skeleton className="h-4 w-20" /> {/* Label Skeleton */}
              </div>
            ))}
          </div>
          {/* Button Skeleton */}
          <Skeleton className="h-10 w-40 mt-6" /> {/* Button Skeleton */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-3">Personal Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name..."
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number..."
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address"
                >
                  Address
                </label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your address..."
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="city"
                >
                  City
                </label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter your city..."
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="state"
                >
                  State
                </label>
                <Input
                  id="state"
                  type="text"
                  placeholder="Enter your state..."
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="zip">
                  Zip Code
                </label>
                <Input
                  id="zip"
                  type="text"
                  placeholder="Enter your zip code..."
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Health Information</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="age">
                  Age
                </label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age..."
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="weight"
                >
                  Weight
                </label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight..."
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="height"
                >
                  Height
                </label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height..."
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="bloodgroup"
                >
                  Blood Group
                </label>
                <Input
                  id="bloodgroup"
                  type="text"
                  placeholder="Enter your blood group..."
                  name="bloodgroup"
                  value={formData.bloodgroup}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="allergies"
                >
                  Allergies
                </label>
                <Input
                  id="allergies"
                  type="text"
                  placeholder="Enter your allergies..."
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Medical History</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="surgeries"
                >
                  Surgeries
                </label>
                <Input
                  id="surgeries"
                  type="text"
                  placeholder="Enter your surgeries..."
                  name="surgeries"
                  value={formData.surgeries}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="medications"
                >
                  Medications
                </label>
                <Input
                  id="medications"
                  type="text"
                  placeholder="Enter your medications..."
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="hospitalizations"
                >
                  Hospitalizations
                </label>
                <Input
                  id="hospitalizations"
                  type="text"
                  placeholder="Enter your hospitalizations..."
                  name="hospitalizations"
                  value={formData.hospitalizations}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Lifestyle</h1>
            <div className="grid grid-cols-3 md:grid-cols-5 2xl:grid-cols-8 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="smoking"
                  name="smoking"
                  checked={formData?.smoking}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium" htmlFor="smoking">
                  Smoking
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="Alcohol"
                  name="alcohol"
                  checked={formData.alcohol}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium" htmlFor="alcohol">
                  Alcohol
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exercise"
                  name="exercise"
                  checked={formData.exercise}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium" htmlFor="exercise">
                  Exercise
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="diet"
                  name="diet"
                  checked={formData.diet}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium" htmlFor="diet">
                  Diet
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="other"
                  name="other"
                  checked={formData.other}
                  onChange={handleChange}
                />
                <label className="text-sm font-medium" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-40">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default HealthDetails;
