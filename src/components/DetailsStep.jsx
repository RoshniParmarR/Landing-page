import React, { useState } from "react";

const useCaseOptions = [
    "CRM / Sales",
    "Support Desk / Ticketing",
    "Project / Task Management",
    "Internal Tools / Ops",
    "HR / Payroll",
    "Marketing Website",
    "E-commerce",
    "Education / LMS",
    "Productivity / Collaboration",
    "Other",
];

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hong Kong",
    "Hungary",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "UAE",
    "United Kingdom",
    "United States",
    "Vietnam",
];

export default function DetailsStep({
    useCase,
    setUseCase,
    country,
    setCountry,
    tags,
    setTags,
    referral,
    setReferral,
}) {
    const [tagInput, setTagInput] = useState("");

    const [errors, setErrors] = useState({
        useCase: "",
        country: "",
    });

    const validateField = (field, value) => {
        setErrors((prev) => ({
            ...prev,
            [field]: !value?.trim()
                ? "This field is required"
                : "",
        }));
    };

    const addTag = () => {
        if (!tagInput.trim()) return;

        setTags([...tags, tagInput.trim()]);
        setTagInput("");
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div>
            {/* Header */}
            <h2 className="text-[16px] font-medium text-left mb-6">
                Additional Details
            </h2>

            <div className="grid md:grid-cols-2 text-left gap-4">
                {/* Use Case */}
                <div>
                    <label className="block text-[14px] font-medium mb-2">
                        Use Case
                        <span className="text-red-500 text-[12px] ml-1">*</span>
                    </label>

                    <select
                        value={useCase}
                        onChange={(e) => {
                            setUseCase(e.target.value);
                            validateField(
                                "useCase",
                                e.target.value
                            );
                        }}
                        className={`w-full h-10 text-[14px] px-4 border focus:outline-none
                        ${errors.useCase
                                ? "border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                    >
                        <option value="">
                            Select Use Case
                        </option>

                        {useCaseOptions.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>

                    {errors.useCase && (
                        <p className="text-[12px] text-red-500 mt-1">
                            {errors.useCase}
                        </p>
                    )}
                </div>

                {/* Country */}
                <div>
                    <label className="block text-[14px] font-medium mb-2">
                        Country
                        <span className="text-red-500 text-[12px] ml-1">*</span>
                    </label>

                    <select
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            validateField("country", e.target.value);
                        }}
                        className={`w-full h-10 text-[14px] px-4 border focus:outline-none
    ${errors.country
                                ? "border-red-500"
                                : "border-gray-300 focus:border-black"
                            }`}
                    >
                        <option value="">
                            Select Country
                        </option>

                        {countries.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}
                    </select>

                    {errors.country && (
                        <p className="text-[12px] text-red-500 mt-1">
                            {errors.country}
                        </p>
                    )}
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                    <label className="block text-[14px] font-medium mb-2">
                        Tags
                    </label>

                    <div className="flex gap-2">
                        <input
                            value={tagInput}
                            onChange={(e) =>
                                setTagInput(
                                    e.target.value
                                )
                            }
                            placeholder="Add tag"
                            className="flex-1 h-10 text-[14px] border border-gray-300 px-4 focus:outline-none focus:border-black"
                        />

                        <button
                            type="button"
                            onClick={addTag}
                            className="bg-black text-white px-5 text-[14px]"
                        >
                            Add
                        </button>
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 px-3 py-2 flex items-center gap-2"
                                >
                                    {tag}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTag(
                                                index
                                            )
                                        }
                                        className="text-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Referral */}
                <div className="md:col-span-2">
                    <label className="block text-[14px] font-medium mb-2">
                        Referral Code
                    </label>

                    <input
                        value={referral}
                        onChange={(e) =>
                            setReferral(
                                e.target.value
                            )
                        }
                        placeholder="Optional"
                        className="w-full h-10 text-[14px] border border-gray-300 px-4 focus:outline-none focus:border-black"
                    />
                </div>
            </div>
        </div>
    );
}