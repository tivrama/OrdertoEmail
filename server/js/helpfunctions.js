module.exports = {



    ItemSchema: function (itemDetails, quantity) { // Used on order_items and 
        this.name = "",
        this.quantity = quantity,
        this.description_url = "",
        this.product_sku = "",
        this. attributes = {
            // these are custom and have to be fed individually.
        }
    },



    ShipmentSchema: function (shipementDetails, retailer) {
        
        var newShipment = {
            tracking_number: shipementDetails.tracking_number,
            carrier_moniker: shipementDetails.carrier,
            carrier_name: shipementDetails.carrier,
            carrier_status: shipementDetails.carrier_service,
            carrier_phone_number: "1.800.8000",
            guaranteed_delivery_date: "",   // TODO:  Find this field
            tracking_url: "https://tracking.narvar.com/" + retailer + "/tracking/ups?tracking_numbers=" + shipementDetails.tracking_number,
            address: {
                line1: "",
                line2: "",
                line3: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            },
            shipment_date: "",
            order_items: [] // itemSchema goes here
        }

        return newShipment;
    },



    matchShipmentWithItems: function(shipmentsArray, itemsArray, retailer) {
        
        var remainingItems = itemsArray;    // make a copy which can be changed
        var itemOrSku = "";                 // make var with will remember if sku or item_id is the primary key
        var newShipmentOrCurrent = false;   // flag for determining if we make a new shipment, or add to current

        var shipmentsWithRemainingItems = { // object returned: has formatted shipments and any remaining items
            formattedShipments: [],
            remainingFormattedItems: []
        };

        // loop through shipments
        for (var i = 0; i < shipmentsArray.length; i++) {
            // loop through items in current shipment
            for (var j = 0; j < shipmentsArray[i].items_info.length; i++) {
                // first check if item_id exists in shipments
                if (shipmentsArray[i].items_info[j].item_id) {
                    // set itemOrSku to 'item';
                    var itemOrSku = "item_id";
                } else {
                    var itemOrSku = "sku";
                }
                // loop through itemsArray and look for matching item or sku
                for (var k = 0; k < remainingItems.length; k++) {
                    // if itemOrSku matchs, 
                    if (remainingItems[k].itemOrSku === shipmentsArray[i].items_info[j].itemOrSku) {
                        // create the shipment object 
                        var newShipment = new ShipmentSchema(shipmentsArray[i], retailer);
                        newShipmentOrCurrent = true;

                        
                    }
                }
            }

        }

        return shipmentsWithRemainingItems;

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
    				country: json.order_info.customer.address.country ? json.order_info.customer.address.country : ""
    			},
        		status: "",
        		current_shipment: {}, // this will get the first shipment object with matching items from shipmentSchema

                multi_shipment: [], // shipmentSchema goes here

        		items_being_processed: [] // itemSchema goes here
        	}
	    }; 

        // call function to make formated shipments with items, and any remaining formatted items which have not shipped
        var shipmentsAndItems = loopThroughShipments(json.order_info.shipments, json.order_info.order_items, retailer);
        
        tempProcessorPayload.order_info.current_shipment = shipmentsAndItems.formattedShipments.shift();
        tempProcessorPayload.order_info.multi_shipment = shipmentsAndItems.formattedShipments;
        tempProcessorPayload.order_info.items_being_processed = shipmentsAndItems.remainingFormattedItems;

        return tempProcessorPayload;

    }

};

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