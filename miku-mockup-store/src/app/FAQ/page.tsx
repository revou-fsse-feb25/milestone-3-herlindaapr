export default function FAQ() {
    return (
        <div className="bg-gradient-to-bl from-teal-700 to-teal-950 py-6">
            <div className="bg-white flex flex-col w-full lg:w-1/2 h-max justify-self-center shadow-lg shadow-gray-100/40 px-8 mt-12 py-4 lg:py-0">
                <h1 className="text-xl lg:text-3xl text-center text-teal-900 pt-3">Frequently Asked Questions</h1>
                <div className="flex flex-col gap-y-4 lg:gap-y-6 py-4 px-2 lg:py-8 lg:px-10">
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">What is Miku Mockup Store?</h2>
                        <p className="text-sm lg:text-base font-semibold">Miku Mockup Store is an e-commerce mock up platform that use Platzi Fake Store Public API.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">What payment methods do you accept?</h2>
                        <p className="text-sm lg:text-base font-semibold">We accept all major credit and debit cards, ShopeePay, OVO, Gopay, and selected digital PayLater e-wallet.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">How can I track my order?</h2>
                        <p className="text-sm lg:text-base font-semibold">Once your order ships, you’ll receive a confirmation email with a tracking number and link to track your shipment in real time.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">How long does shipping take?</h2>
                        <p className="text-sm lg:text-base font-semibold">Standard shipping usually takes 3–7 business days, while expedited options can arrive within 1–3 business days. Delivery times may vary based on your location and the shipping method selected at checkout.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">Can I modify or cancel my order after placing it?</h2>
                        <p className="text-sm lg:text-base font-semibold">Orders can be modified or canceled within 1 hour of placing them. Please contact our customer service team as soon as possible to request changes.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">What is your return policy?</h2>
                        <p className="text-sm lg:text-base font-semibold">We offer a 30-day return policy for most items. Items must be unused, in original packaging, and accompanied by a receipt.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">What should I do if I receive a damaged or incorrect item?</h2>
                        <p className="text-sm lg:text-base font-semibold">We’re sorry about that! Please contact us within 7 days of receiving your order with photos of the damaged or incorrect item, and we’ll arrange a replacement or refund.</p>
                    </div>
                    <div className="text-teal-800">
                        <h2 className="text-lg lg:text-xl">Is it safe to shop on your website?</h2>
                        <p className="text-sm lg:text-base font-semibold">Absolutely. Our site uses SSL encryption to protect your personal and payment information. We never store your payment details and follow strict data security standards.</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }