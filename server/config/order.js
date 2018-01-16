module.exports = {
    order_number: "1234567891",
    order_date: "2018-01-02T10:27:24Z",
    status: "SHIPPING",
    order_items: [
        {
            item_id: null,
            retailer: null,
            sku: "000001",
            name: "Labrador Puppy",
            description: "Fresh from the mill",
            quantity: 7,
            unit_price: 899.99,
            discount_amount: null,
            discount_percent: null,
            categories: null,
            item_image: "https://assets.narvar.com/retailers/peninsula/lab.png",
            item_url: "https://assets.narvar.com/retailers/peninsula/lab.png",
            is_final_sale: false,
            is_active: null,
            fulfillment_status: "SHIPPING",
            is_gift: null,
            final_sale_date: null,
            product_type: null,
            product_id: null,
            line_number: null,
            attributes: {
                color: "White",
                size: "S, but will grow",
                style: "",
                weight: "",
                weight_unit: "",
                price: 899.99,
                currency: ""
            },
            dimensions: null,
            is_backordered: null,
            vendor: null,
            item_promise_date: null,
            pre_shipment: null,
            return_reason_code: null
        },
        {
            item_id: null,
            retailer: null,
            sku: "000002",
            name: "Full Grown Labrador - Male",
            description: "Slighly used, but well loved",
            quantity: 1,
            unit_price: 99.99,
            discount_amount: null,
            discount_percent: null,
            categories: null,
            item_image: "https://assets.narvar.com/retailers/peninsula/lab2.png",
            item_url: "https://assets.narvar.com/retailers/peninsula/lab2.png",
            is_final_sale: false,
            is_active: null,
            fulfillment_status: "SHIPPING",
            is_gift: null,
            final_sale_date: null,
            product_type: null,
            product_id: null,
            line_number: null,
            attributes: {
                color: "White",
                size: "L",
                style: "",
                weight: "",
                weight_unit: "",
                price: 99.99,
                currency: ""
            },
            dimensions: null,
            is_backordered: null,
            vendor: null,
            item_promise_date: null,
            pre_shipment: null,
            return_reason_code: null
        },
        {
            item_id: null,
            retailer: null,
            sku: "000003",
            name: "Cattle Dog",
            description: "Good at hearding cattle, dinner guests, children",
            quantity: 1,
            unit_price: 1299.99,
            discount_amount: null,
            discount_percent: null,
            categories: null,
            item_image: "https://assets.narvar.com/retailers/peninsula/cattle.png",
            item_url: "https://assets.narvar.com/retailers/peninsula/cattle.png",
            is_final_sale: false,
            is_active: null,
            fulfillment_status: "",
            is_gift: null,
            final_sale_date: null,
            product_type: null,
            product_id: null,
            line_number: null,
            attributes: {
                color: "Light Brown",
                size: "MS",
                style: "",
                weight: "",
                weight_unit: "",
                price: 1299.99,
                currency: ""
            },
            dimensions: null,
            is_backordered: true,
            vendor: null,
            item_promise_date: null,
            pre_shipment: null,
            return_reason_code: null
        },
        {
            item_id: null,
            retailer: null,
            sku: "000004",
            name: "Golden Doodle Puppy",
            description: "Hyper Allogenic Poodle Golden Retreiver Mix",
            quantity: 1,
            unit_price: 1399.99,
            discount_amount: null,
            discount_percent: null,
            categories: null,
            item_image: "https://assets.narvar.com/retailers/peninsula/doodle.png",
            item_url: "https://assets.narvar.com/retailers/peninsula/doodle.png",
            is_final_sale: false,
            is_active: null,
            fulfillment_status: "",
            is_gift: null,
            final_sale_date: null,
            product_type: null,
            product_id: null,
            line_number: null,
            attributes: {
                color: "Tan",
                size: "S",
                style: "",
                weight: "",
                weight_unit: "",
                price: 1399.99,
                currency: ""
            },
            dimensions: null,
            is_backordered: true,
            vendor: null,
            item_promise_date: null,
            pre_shipment: null,
            return_reason_code: null
        }
    ],
    shipments: [
        {
            carrier_service: "SP",
            items_info: [
                    {
                        quantity: 5,
                        sku: "000001"
                    },
                    {
                        quantity: 1,
                        sku: "000002"
                    }
                ],
            carrier: "FEDEX",
            shipped_to: {
                first_name: "Joe",
                last_name: "Schmoe",
                phone: "",
                email: "test@narvar.com",
                fax: "",
                address: {
                    street_1: "123 Main St",
                    street_2: "",
                    city: "Springfield",
                    state: "IL",
                    zip: "12345-6789"
                }
            },
            ship_date: "2018-01-04T06:00:00Z",
            tracking_number: "12345678910111213141516",
            pre_shipment: false
        },
        {
            carrier_service: "SP",
            items_info: [
                {
                    quantity: 2,
                    sku: "000001"
                }
            ],
            carrier: "FEDEX",
            shipped_to: {
                first_name: "Joe",
                last_name: "Schmoe",
                phone: "",
                email: "test@narvar.com",
                fax: "",
                address: {
                    street_1: "123 Main St",
                    street_2: "",
                    city: "Springfield",
                    state: "IL",
                    zip: "12345-6789"
                }
            },
            ship_date: "2018-01-04T06:00:00Z",
            tracking_number: "12345678910111213141517",
            pre_shipment: false
        },
        {
            carrier_service: "SP",
            items_info: [
                {
                    quantity: 1,
                    sku: "000003"
                }
            ],
            carrier: "FEDEX",
            shipped_to: {
                first_name: "Joe",
                last_name: "Schmoe",
                phone: "",
                email: "test@narvar.com",
                fax: "",
                address: {
                    street_1: "123 Main St",
                    street_2: "",
                    city: "Springfield",
                    state: "IL",
                    zip: "12345-6789"
                }
            },
            ship_date: "2018-01-04T06:00:00Z",
            tracking_number: "12345678910111213141518",
            pre_shipment: false
        }
    ],
    billing: {
        billed_to: {
            first_name: "Joe",
            last_name: "Schmoe",
            phone: "123-456-7891",
            email: "test@narvar.com",
            fax: "",
            address: {
                street_1: "123 Main St",
                city: "Springfield",
                state: "IL",
                zip: "12345-6789"
                }
            },
        amount: 48.8,
        tax_amount: 0,
        payments: [
            {
                method: "CREDIT CARD",
                is_gift_card: false
            }
        ]
    },
    customer: {
        first_name: "Joe",
        last_name: "Schmoe",
        phone: "",
        email: "test@narvar.com",
        fax: "",
        address: {
            street_1: "123 Main St",
            city: "Springfield",
            state: "IL",
            zip: "12345-6789"
            },
        customer_id: "",
        customer_type: ""
    }
};