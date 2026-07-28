import React, { useState, useEffect } from "react";
import ConfigurationStep from "./ConfigurationStep";
import DetailsStep from "./DetailsStep";
import PlanPaymentStep from "./PlanPaymentStep";


export default function CreateFusionSuiteModal({ open, onClose }) {
    const [step, setStep] = useState(1);

    const [company, setCompany] = useState("");
    const [suite, setSuite] = useState("");
    const [domainType, setDomainType] = useState("Subdomain");
    const [subdomain, setSubdomain] = useState("");

    const [useCase, setUseCase] = useState("");
    const [country, setCountry] = useState("");
    const [tags, setTags] = useState([]);
    const [referral, setReferral] = useState("");

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [billing, setBilling] = useState("monthly");
    const [coupon, setCoupon] = useState("");

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        if (!open) return;

        const old = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = old;
        };
    }, [open]);

    if (!open) return null;

    const submitSuite = async () => {
        try {
            setLoading(true);

            const payload = {
                company,
                suite,
                domainType,
                subdomain,
                useCase,
                country,
                tags,
                referral,
                selectedPlan,
                billing,
                coupon,
            };

            console.log("Creating Fusion Suite...", payload);

            await new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );

            setSuccessMessage(
                "Fusion Suite created successfully!"
            );

            setTimeout(() => {
                setSuccessMessage("");
                onClose();
            }, 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const isConfigurationValid =
        company.trim() &&
        suite.trim() &&
        domainType.trim() &&
        subdomain.trim();

    const isDetailsValid =
        useCase.trim() &&
        country.trim();

    return (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Sticky Header */}
                <div className="shrink-0 px-8 pt-8 pb-4 border-b border-gray-200 bg-white">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-[20px] font-medium text-left">
                                Create Fusion Suite
                            </h1>

                            <p className="mt-1 text-[16px] text-gray-500">
                                Configure and deploy your new instance
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-500 text-[14px] hover:text-black"
                        >
                            Close
                        </button>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center justify-center gap-12">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 text-[12px] flex items-center justify-center border
      ${step >= 1
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300"
                                    }`}
                            >
                                1
                            </div>

                            <span className="font-medium text-[14px]">
                                Configuration
                            </span>
                        </div>

                        <div className="w-20 h-px bg-gray-300" />

                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 text-[12px] flex items-center justify-center border
      ${step >= 2
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300"
                                    }`}
                            >
                                2
                            </div>

                            <span className="font-medium text-[14px]">
                                Details
                            </span>
                        </div>

                        <div className="w-20 h-px bg-gray-300" />

                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 text-[12px] flex items-center justify-center border
      ${step >= 3
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300"
                                    }`}
                            >
                                3
                            </div>

                            <span className="font-medium text-[14px]">
                                Plan & Payment
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Center */}
                <div className="flex-1 overflow-y-auto px-8 py-6 min-h-0">
                    {step === 1 && (
                        <ConfigurationStep
                            company={company}
                            setCompany={setCompany}
                            suite={suite}
                            setSuite={setSuite}
                            domainType={domainType}
                            setDomainType={setDomainType}
                            subdomain={subdomain}
                            setSubdomain={setSubdomain}
                        />
                    )}

                    {step === 2 && (
                        <DetailsStep
                            useCase={useCase}
                            setUseCase={setUseCase}
                            country={country}
                            setCountry={setCountry}
                            tags={tags}
                            setTags={setTags}
                            referral={referral}
                            setReferral={setReferral}
                        />
                    )}

                    {step === 3 && (
                        <PlanPaymentStep
                            selectedPlan={selectedPlan}
                            setSelectedPlan={setSelectedPlan}
                            billing={billing}
                            setBilling={setBilling}
                            coupon={coupon}
                            setCoupon={setCoupon}
                            onCreate={submitSuite}
                        />
                    )}
                </div>

                {/* Sticky Footer */}
                <div className="shrink-0 flex justify-between px-8 py-4 border-t border-gray-200 bg-white">
                        <button
                            type="button"
                            onClick={() =>
                                step === 1
                                    ? onClose()
                                    : setStep(step - 1)
                            }
                            className="px-[24px] py-[12px] text-[14px] border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Back
                        </button>

                        {step === 1 && (
                            <button
                                type="button"
                                disabled={!isConfigurationValid}
                                onClick={() => setStep(2)}
                                className={`
                px-[24px] py-[12px] text-[14px] rounded-md transition-all
                ${isConfigurationValid
                                        ? "bg-black text-white hover:bg-gray-900"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }
            `}
                            >
                                Continue
                            </button>
                        )}

                        {step === 2 && (
                            <button
                                type="button"
                                disabled={!isDetailsValid}
                                onClick={() => setStep(3)}
                                className={`
                px-[24px] py-[10px] text-[14px] rounded-md transition-all
                ${isDetailsValid
                                        ? "bg-black text-white hover:bg-gray-900"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }
            `}
                            >
                                Continue
                            </button>
                        )}

                        {step === 3 && (
                            <button
                                type="button"
                                onClick={submitSuite}
                                disabled={loading || !selectedPlan}
                                className={`
                px-[24px] py-[12px] rounded-md transition-all
                ${loading || !selectedPlan
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-black text-white hover:bg-gray-900"
                                    }
            `}
                            >
                                {loading
                                    ? "Creating Fusion Suite..."
                                    : "Create Fusion Suite"}
                            </button>
                        )}
                </div>
            </div>
            {successMessage && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center">
                    <div className="bg-white border border-green-500 px-8 py-5 shadow-xl rounded-md">
                        <p className="text-green-600 font-medium">
                            {successMessage}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}