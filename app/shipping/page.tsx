export default function ShippingPolicy() {
    return (
        <main className="bg-white min-h-screen">
            <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-12 text-center">
                {/* Heading */}
                <div className="mb-10 border-b pb-6 items-center justify-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Shipping Policy
                    </h1>

                    <p className="mt-3 text-gray-600 text-sm sm:text-base">
                        Please read the following important information about how we
                        process, ship and deliver your orders.
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-8 prose-li:text-gray-700">

                    <h2>IMPORTANT INFORMATION</h2>

                    <p className="text-justify">
                        At Jagmeen we make-to-order. We typically take 3-7 working days to
                        process all orders and an additional 2-3 days for shipping within
                        India. Free shipping within India.
                   
                        Our working days are Monday - Friday (9:30am - 6:30pm). No orders
                        are processed over the weekends or on public holidays according to
                        the Indian calendar.
                  
                        Please make sure that your shipping address is correct, as we will
                        not be able to redirect orders once they are dispatched to you.
                   
                        We partner with third party delivery services to send out orders. We
                        ship via Shiprocket, Xpressbees, Shadow fax, Ecom express, Bluedart,
                        DHL, DTDC, Overseas Logistics, Shree Anjani courier services,
                        Tirupati courier services, Borzo and Delhivery depending on the
                        delivery pin code. Third party delivery partners can be added at our
                        discretion. You might receive delivery based communication on our
                        behalf via our logistic partners.
                    
                        Free Shipping in India is only applicable on orders above Rs.2000.
                  
                        We are not responsible for any delays caused by customs clearance
                        processes.
                   
                        All orders will require a signature upon receipt.
                    </p>

                    <h2>INSURANCE</h2>

                    <p className="text-justify">
                        Jagmeenfashion.com ensures each purchase during the time it is in
                        transit until it is delivered to you. We require a signature for any
                        goods delivered, at which point responsibility for your purchased
                        goods passes to you. If you have specified a recipient who is not
                        you for delivery purposes (for example as a gift) then you accept
                        that evidence of a signature by them (or at that delivery address)
                        is evidence of delivery and fulfillment by Jagmeenfashion.com and
                        transfer of responsibility in the same way.
                    </p>

                    <h2>DUTIES & TAXES</h2>

                    <p className="text-justify">
                        All prices displayed on our website are in Indian rupees (INR).
                        Applicable GST is included or charged at checkout as per Indian tax
                        laws. No additional customs duties are applicable on orders
                        delivered within India. Jagmeen Fashion reserves the right to modify
                        this shipping policy at any time without prior notice. Customers are
                        encouraged to review this page before placing an order.
                    </p>

                </div>
            </div>
        </main>
    );
}