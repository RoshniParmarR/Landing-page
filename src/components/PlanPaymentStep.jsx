import React from "react";
const plans = [
    {
        id: "phase-testing",
        name: "Phase Testing",
        price: 849,
        yearlyPrice: 8490,
        originalYearlyPrice: 12990,
        yearlyDiscount: 4500,
        emails: 1,
        credits: 30,
        badge: null,
        unavailable: false,
    },
    {
        id: "free",
        name: "Free",
        price: 0,
        yearlyPrice: 0,
        originalYearlyPrice: 0,
        yearlyDiscount: 0,
        emails: 1,
        credits: 0,
        badge: "Regret",
        unavailable: false,
    },
    {
        id: "pro",
        name: "Pro",
        price: 1399,
        yearlyPrice: 13990,
        originalYearlyPrice: 19990,
        yearlyDiscount: 6000,
        emails: 5,
        credits: 500,
        badge: "Unavailable",
        unavailable: true,
    },
    {
        id: "starter",
        name: "Starter",
        price: 849,
        yearlyPrice: 8490,
        originalYearlyPrice: 12990,
        yearlyDiscount: 4500,
        emails: 2,
        credits: 250,
        badge: "Unavailable",
        unavailable: true,
    },
];

export default function PlanPaymentStep({
    selectedPlan,
    setSelectedPlan,
    billing,
    setBilling,
    coupon,
    setCoupon,
}) {
    const activePlan = selectedPlan || plans[0];

    const isYearly = billing === "yearly";

    const displayPrice = isYearly
        ? activePlan.yearlyPrice
        : activePlan.price;

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="pb-3 border-b border-gray-200">
                <h2 className="text-[16px] font-medium text-left">
                    Plan & Payment
                </h2>

                <p className="text-[14px] text-gray-500 mt-1 text-left">
                    Choose your plan and review pricing
                </p>
            </div>

            {/* Plans */}
            <div className="pb-5 border-b border-gray-200">
                <p className="text-[14px] font-medium mb-4 text-left">
                    Choose a plan
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                    {plans.map((plan) => (
                        <button
                            key={plan.id}
                            type="button"
                            onClick={() => !plan.unavailable && setSelectedPlan(plan)}
                            className={`
                text-left text-[14px] border p-4 transition-all
                ${activePlan?.id === plan.id
                                    ? "border-black border-2"
                                    : "border-gray-300"
                                }
              `}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[14px] font-medium">
                                    {plan.name}
                                </span>

                                <div className="flex items-center gap-2">
                                    {plan.badge && (
                                        <span className="text-[12px] px-2 py-1 border border-amber-400 text-amber-600">
                                            {plan.badge}
                                        </span>
                                    )}

                                    <span className="text-[14px] font-semibold">
                                        {plan.price.toFixed(2)}
                                        <span className="text-[12px] text-gray-500 font-normal">
                                            /month
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <p className="text-[12px] text-gray-500 mt-2">
                                {plan.emails} Business Email (MailX)
                            </p>

                            <p className="text-[12px] text-gray-500 mt-1">
                                Includes {plan.credits} AI credits
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Billing */}
            <div className="pb-3 border-b border-gray-200">
                <p className="text-[14px] font-medium mb-4 text-left">
                    Billing interval
                </p>

                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => setBilling("monthly")}
                        className={`
              border py-[12px] px-[24px] text-[14px] capitalize
              ${billing === "monthly"
                                ? "border-black border-2 font-medium"
                                : "border-gray-300"
                            }
            `}
                    >
                        Monthly
                    </button>

                    <button
                        type="button"
                        onClick={() => setBilling("yearly")}
                        className={`
              border py-[12px] px-[24px] text-[14px] capitalize
              ${billing === "yearly"
                                ? "border-black border-2 font-medium"
                                : "border-gray-300"
                            }
            `}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Pricing Summary */}
            {/* Pricing Summary */}
            <div className="space-y-4">
                <div className="flex justify-between text-[14px]">
                    <span className="text-gray-500">
                        {activePlan.name} ({billing})
                    </span>

                    <div className="text-right text-[14px]">
                        {isYearly ? (
                            <>
                                <span className="relative inline-block text-[14px] font-medium">
                                    {activePlan.originalYearlyPrice?.toFixed(2)}
                                    <span
                                        className="absolute left-0 top-1/2 w-full h-px bg-red-500"
                                        style={{
                                            transform: "rotate(-12deg)",
                                        }}
                                    />
                                </span>

                                <span className="block text-[12px] text-gray-500">
                                    /year
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="text-[14px] font-medium">
                                    {activePlan.price.toFixed(2)}
                                </span>

                                <span className="block text-[12px] text-gray-500">
                                    /month
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {isYearly &&
                    activePlan.yearlyDiscount > 0 && (
                        <div className="flex justify-between text-[14px]">
                            <span className="font-medium">
                                Discount
                            </span>

                            <div className="text-right">
                                <span className="text-[14px] font-medium">
                                    -
                                    {activePlan.yearlyDiscount.toFixed(
                                        2
                                    )}
                                </span>

                                <span className="block text-[12px] text-gray-500">
                                    35% off
                                </span>
                            </div>
                        </div>
                    )}

                <div className="flex justify-between text-[14px] border-t border-dashed pt-4">
                    <span className="text-gray-500">
                        Amount
                    </span>

                    <span className="text-[14px] font-medium">
                        {displayPrice.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-end border-t pt-4">
                    <span className="text-[14px] font-semibold">
                        Total
                    </span>

                    <div className="text-right">
                                <span className="text-[14px] font-semibold">
                            {displayPrice.toFixed(2)}
                        </span>

                        <span className="block text-[12px] text-gray-500">
                            {isYearly ? "/year" : "/month"}
                        </span>
                    </div>
                </div>

                <p className="text-[12px] text-left text-gray-500">
                    Includes {activePlan.credits} AI credits with this
                    plan.
                </p>
            </div>
            {/* Coupon */}
            <div className="pt-3 border-t border-gray-200 space-y-3">
                <div>
                    <p className="text-[14px] font-medium text-left">
                        Coupon code
                    </p>
                </div>

                <div className="flex gap-2">
                    <input
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="SAVE20"
                        className="flex-1 border border-gray-300 px-3 h-10 text-[14px] focus:outline-none focus:border-black"
                    />

                    <button
                        type="button"
                        disabled={!coupon}
                        className="border border-gray-300 px-5 h-10 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Apply
                    </button>
                </div>

                {coupon && coupon !== "SAVE20" && (
                    <p className="text-[12px] text-red-500">
                        Invalid coupon code
                    </p>
                )}

                {coupon === "SAVE20" && (
                    <p className="text-[12px] text-green-600">
                        Coupon applied successfully
                    </p>
                )}
            </div>
        </div>
    );
}