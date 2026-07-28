import React, { useEffect, useState } from "react";

function slugify(str) {
    return (str || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function ConfigurationStep({
    company,
    setCompany,
    suite,
    setSuite,
    domainType,
    setDomainType,
    subdomain,
    setSubdomain,
}) {
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const slug = slugify(company);

        // Suite Name always auto generated
        setSuite(slug);

        // Auto fill domain only when Subdomain selected
        if (domainType === "Subdomain" && !subdomain) {
            setSubdomain(slug);
        }
    }, [company]);

    const validateField = (field, value) => {
        setErrors((prev) => ({
            ...prev,
            [field]: !value?.trim()
                ? "This field is required"
                : "",
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-[16px] font-medium text-left">
                    Suite Configuration
                </h2>

                <p className="text-left text-[14px] text-gray-500 mt-1">
                    Configure your Fusion Suite settings
                </p>
            </div>

            {/* Form */}
            <div className="grid md:grid-cols-2 gap-6 text-left">
                {/* Company Name */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                        Company / Professional Name
                        <span className="text-red-500 text-[12px] ml-1">*</span>
                    </label>

                    <input
                        type="text"
                        value={company}
                        onChange={(e) => {
                            const value = e.target.value;

                            setCompany(value);

                            if (domainType === "Subdomain") {
                                setSubdomain(slugify(value));
                            }

                            validateField("company", value);
                        }}
                        placeholder="My Company Pvt Ltd"
                        className={`w-full h-10 text-[14px] border px-4 focus:outline-none ${errors.company
                            ? "border-red-500"
                            : "border-gray-300 focus:border-black"
                            }`}
                    />

                    {errors.company && (
                        <p className="text-[12px] text-red-500 mt-1">
                            {errors.company}
                        </p>
                    )}
                </div>

                {/* Suite Name */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                        Suite Name
                        <span className="ml-2 text-[12px] text-gray-400 font-normal">
                            auto generated
                        </span>
                    </label>

                    <input
                        type="text"
                        value={suite}
                        disabled
                        className="w-full h-10 text-[14px] border border-gray-300 px-4 bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Domain Type */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                        Domain Type
                        <span className="text-red-500 text-[12px] ml-1">*</span>
                    </label>

                    <select
                        value={domainType}
                        onChange={(e) => {
                            const value = e.target.value;

                            setDomainType(value);

                            if (value === "Subdomain") {
                                setSubdomain(slugify(company));
                            } else {
                                setSubdomain("");
                            }
                        }}
                        className="w-full h-10 text-[14px] border border-gray-300 px-4 focus:outline-none focus:border-black"
                    >
                        <option value="Subdomain">
                            Subdomain
                        </option>

                        <option value="Custom Domain">
                            Custom Domain
                        </option>
                    </select>
                </div>

                {/* Domain */}
                <div>
                    <label className="block text-[14px] font-medium text-gray-700 mb-2">
                        Domain
                        <span className="text-red-500 text-[12px] ml-1">*</span>
                    </label>

                    <div className="flex items-center">
                        <input
                            type="text"
                            value={subdomain}
                            onChange={(e) => {
                                setSubdomain(e.target.value);
                                validateField(
                                    "subdomain",
                                    e.target.value
                                );
                            }}
                            placeholder={
                                domainType === "Custom Domain"
                                    ? "example.com"
                                    : "company-name"
                            }
                            className={`flex-1 h-10 text-[14px] border px-4 focus:outline-none ${errors.subdomain
                                ? "border-red-500"
                                : "border-gray-300 focus:border-black"
                                }`}
                        />

                        {domainType === "Subdomain" && (
                            <div className="h-10 text-[14px] pl-6 pr-4 flex items-center text-gray-500 whitespace-nowrap ">
                                .nexusai.com
                            </div>
                        )}
                    </div>

                    {errors.subdomain && (
                        <p className="text-[12px] text-red-500 mt-1">
                            {errors.subdomain}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}