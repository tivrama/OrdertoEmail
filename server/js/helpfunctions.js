module.exports = {

    ItemSchema: function (itemDetails) { // Used on order_items and 
        this.name = "",
        this.quantity = 0,
        this.description_url = "",
        this.product_sku = "",
        this. attributes = {
            color: "",
            size: "",
            style: "",
            weight: "",
            weight_unit: "",
            price: "",
            currency: "",
            image_url: ""
        }
    },


    ShipmentSchema: function (packageDetails) {
        this.tracking_number = "",
        this.carrier_moniker = "",
        this.carrier_name = "",
        this.carrier_status = "",
        this.carrier_phone_number = "",
        this.guaranteed_delivery_date = "",
        this.tracking_url = "",
        this.address = {
            line1: "",
            line2: "",
            line3: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        },
        this.shipment_date = "",
        this.order_items = [] // itemSchema goes here
    },

    loopThroughOrderItems: function(itemsArray) {
        var arrayOfFormattedItems = [];
        for (var i = 0; i < itemsArray.length; i++) {
            arrayOfFormattedItems.push(new ItemSchema(itemsArray[i]));
        }
        return arrayOfFormattedItems;
    },
  
    loopThroughShipments: function(itemsArray) {


        var arrayOfFormattedShipments = [];
        for (var i = 1; i < itemsArray.length; i++) { // index will start wt 1 as 0 will be already in the current shipment
            arrayOfFormattedShipments.push(new ShipmentSchema(itemsArray[i]));
        }
        return arrayOfFormattedShipments;
    },


    MakeTempProcessorPayload: function (json, retailer) {


        var tempProcessorPayload = {
        	order_info: {
    			order_number: json.order_info.order_number,
    			order_date: json.order_info.order_date,
    			first_name: json.order_info.customer.first_name,
    			last_name: json.order_info.customer.last_name,
    			address: {
    				line1: json.order_info.customer.address.street_1,
    				line2: json.order_info.customer.address.street_2 ? json.order_info.customer.address.street_2 : "",
    				line3: json.order_info.customer.address.street_3 ? json.order_info.customer.address.street_3 : "",
    				city: json.order_info.customer.address.city,
    				state: json.order_info.customer.address.state,
    				zip: json.order_info.customer.address.zip,
    				country: json.order_info.customer.address.country
    			},
        		status: "",
        		current_shipment: {
        			tracking_number: json.order_info.shipments.tracking_number,
        			carrier_moniker: json.order_info.shipments.carrier,
        			carrier_name: json.order_info.shipments.carrier,
        			carrier_status: "",
        			guaranteed_delivery_date: "",
        			tracking_url: "https://tracking.narvar.com/" + retailer + "/tracking/ups?tracking_numbers=" + json.order_info.shipments.tracking_number,
        			address: {
                        line1: json.order_info.shipments.shipped_to.address.street_1,
                        line2: json.order_info.shipments.shipped_to.address.street_2 ? json.order_info.shipments.shipped_to.address.street_2 : "",
                        line3: json.order_info.shipments.shipped_to.address.street_3 ? json.order_info.shipments.shipped_to.address.street_3 : "",
                        city: json.order_info.shipments.shipped_to.address.city,
                        state: json.order_info.shipments.shipped_to.address.state,
                        zip: json.order_info.shipments.shipped_to.address.zip,
                        country: json.order_info.shipments.shipped_to.address.country
                    },
        			shipment_date: json.order_info.shipments.ship_date,
        			order_items: [] // itemSchema goes here
        		},

                multi_shipment: [], // shipmentSchema goes here

        		items_being_processed: [] // itemSchema goes here
        	}
	    }; 

        // call function to add loop through shipment array (starting at 1)
        if (json.order_info.shipments.length > 1) {
            tempProcessorPayload.order_info.multi_shipment = loopThroughShipments(json.order_info.shipments);
        }



    }

}

/*
{
    order_info: {
        order_number: 1507672400,
        order_date: 2018-01-02T10:27:24Z,
        status: SHIPPING,
        order_items: [
            {
                item_id: null,
                retailer: null,
                sku: 108-006-000,
                name: FIREARMS RECORD BOOK (BLUE PRINTING),
                description: FIREARMS RECORD BOOK (BLUE PRINTING),
                quantity: 15,
                unit_price: 2.99,
                discount_amount: null,
                discount_percent: null,
                categories: null,
                item_image: http://www.brownells.com/userdocs/products/p_108006000_1.jpg,
                item_url: http://www.brownells.com/.aspx/sid=0/sku=108-006-000/sku/,
                is_final_sale: false,
                is_active: null,
                fulfillment_status: SHIPPING,
                is_gift: null,
                final_sale_date: null,
                product_type: null,
                product_id: null,
                line_number: null,
                attributes: {
                    insurance: 0,
                    export_fee: 0,
                    gun_processing_fee: 0,
                    export_document_fee: 0,
                    sed_fee: 0,
                    ca_document_fee: 0,
                    product_total: 44.85,
                    shipping_restriction_charges: 0,
                    nra_round_up: 0,
                    misc_charges: 0,
                    cod_fee: 0
                },
                dimensions: null,
                is_backordered: null,
                vendor: null,
                item_promise_date: null,
                pre_shipment: null,
                return_reason_code: null
            }
        ],
        shipments: [
            {
                carrier_service: SP,
                items_info: [
                    {
                        quantity: 15,
                        sku: 108-006-000
                    }
                ],
                carrier: FEDEX,
                shipped_to: {
                    first_name: MATTHEW,
                    last_name: JAMROG,
                    phone: "",
                    email: jamrogm@charter.net,
                    fax: "",
                    address: {
                        street_1: 1614 142ND AVE,
                        street_2: "",
                        city: DORR,
                        state: MI,
                        zip: 49323-9427
                    }
                },
                ship_date: 2018-01-04T06:00:00Z,
                tracking_number: 9261297641699538878532,
                pre_shipment: false
            }
        ],
        billing: {
            billed_to: {
                first_name: MATTHEW,
                last_name: JAMROG,
                phone: 616-395-9300,
                email: jamrogm@charter.net,
                fax: "",
                address: {
                    street_1: 1614 142ND AVE,
                    city: DORR,
                    state: MI,
                    zip: 49323-9427
                }
            },
            amount: 48.8,
            tax_amount: 0,
            payments: [
                {
                    method: CREDIT CARD,
                    is_gift_card: false
                }
            ]
        },
        customer: {
            first_name: MATTHEW,
            last_name: JAMROG,
            phone: "",
            email: jamrogm@charter.net,
            fax: "",
            address: {
                street_1: 1614 142ND AVE,
                city: DORR,
                state: MI,
                zip: 49323-9427
            },
            customer_id: "",
            customer_type: non Edge
        }
    },
    status: SUCCESS,
    messages: [
        {
            code: response.status.success
        }
    ],
    emailTypes: {
        1458: delivery anticipation,
        1459: delayed,
        1460: delivered,
        1461: delivered,
        1462: delivery attempted,
        2245: ship confirmation
    }
}
*/