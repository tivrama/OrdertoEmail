module.exports = {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////TEMPLATE PROCESSOR//////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ItemSchema: function (itemDetails, quantity) { // Used on order_items and 
        
        var newItem = {  
            name: itemDetails.name,
            quantity: quantity,
            description_url: itemDetails.description,
            product_sku: itemDetails.sku,
            attributes: itemDetails.attributes
        };
        newItem.attributes.image_url = itemDetails.item_image;

        return newItem;
    },



    ShipmentSchema: function (shipementDetails, retailer) {
        
        var newShipment = {
            tracking_number: shipementDetails.tracking_number,
            carrier_moniker: shipementDetails.carrier,
            carrier_name: shipementDetails.carrier,
            carrier_status: shipementDetails.carrier_service ? shipementDetails.carrier_service : "",
            carrier_phone_number: "1.800.8000",
            guaranteed_delivery_date: "",   // TODO:  Find this field
            tracking_url: "https://tracking.narvar.com/" + retailer + "/tracking/ups?tracking_numbers=" + shipementDetails.tracking_number,
            address: {
                line1: shipementDetails.shipped_to.address.street_1 ? shipementDetails.shipped_to.address.street_1 : "",
                line2: shipementDetails.shipped_to.address.street_2 ? shipementDetails.shipped_to.address.street_2 : "",
                line3: shipementDetails.shipped_to.address.street_3 ? shipementDetails.shipped_to.address.street_3 : "",
                city: shipementDetails.shipped_to.address.city ? shipementDetails.shipped_to.address.city : "",
                state: shipementDetails.shipped_to.address.state ? shipementDetails.shipped_to.address.state : "",
                zip: shipementDetails.shipped_to.address.zip ? shipementDetails.shipped_to.address.zip : "",
                country: shipementDetails.shipped_to.address.country ? shipementDetails.shipped_to.address.country : ""
            },
            shipment_date: shipementDetails.ship_date ? shipementDetails.ship_date : "",
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
            for (var j = 0; j < shipmentsArray[i].items_info.length; j++) {

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
                    if (remainingItems[k][itemOrSku] === shipmentsArray[i].items_info[j][itemOrSku]) {

                        // check if we are in a current shipment
                        if (!newShipmentOrCurrent) {
                            // create the shipment object 
                            var newShipment = new this.ShipmentSchema(shipmentsArray[i], retailer);
                            newShipmentOrCurrent = true;
                        } 

                        // create a new item
                        var newItem = new this.ItemSchema(remainingItems[k], shipmentsArray[i].items_info[j].quantity)
                        // subtract the amount of  shipped items from the copy array of items
                        remainingItems[k].quantity = shipmentsArray[i].items_info[j].quantity - remainingItems[k].quantity;

                        // add new item to current shipment
                        newShipment.order_items.push(newItem);
                    }

                    // reset newShipment
                    newShipmentOrCurrent = false;
                }
            }

            // unshift the current shipment into the array to be returned
            shipmentsWithRemainingItems.formattedShipments.unshift(newShipment);
        }

        // format any remaining items
        for (var l = 0; l < remainingItems.length; l++) {
            if (remainingItems[l].quantity > 0) {
                var remainingNewItem = new this.ItemSchema(remainingItems[l], remainingItems[l].quantity);
                // push remaining items into the array to be returned
                shipmentsWithRemainingItems.remainingFormattedItems.push(remainingNewItem);
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
                last_name: json.order_info.customer.last_name ? json.order_info.customer.last_name : "",
                address: {
                    line1: json.order_info.customer.address.street_1 ? json.order_info.customer.address.street_1 : "",
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
        var shipmentsAndItems = this.matchShipmentWithItems(json.order_info.shipments, json.order_info.order_items, retailer);
        
        tempProcessorPayload.order_info.current_shipment = shipmentsAndItems.formattedShipments.pop();
        tempProcessorPayload.order_info.multi_shipment = shipmentsAndItems.formattedShipments;
        tempProcessorPayload.order_info.items_being_processed = shipmentsAndItems.remainingFormattedItems;

        return tempProcessorPayload;

    },


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////SPARKPOST///////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    MakeSparkpostPayload: function (templateResponse, retailer, recipients) {

        templateResponse = JSON.parse(templateResponse);
        
        var SparkpostPayload = {
            options: {
                open_tracking: true,
                click_tracking: true,
                transactional: true
            },
            recipients: recipients,
            content: {
                from: {
                    email: retailer + "@narvar.com",
                    name: retailer
                },
                text: "",
                html: templateResponse.body,
                subject: templateResponse.subject,
                reply_to: "no-reply@narvar.com"   
            }
        };

        return SparkpostPayload;
    }



};
