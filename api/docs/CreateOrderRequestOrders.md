# CreateOrderRequestOrders


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**order_items** | [**Array&lt;CreateOrderRequestOrdersOrderItemsInner&gt;**](CreateOrderRequestOrdersOrderItemsInner.md) |  | [optional] [default to undefined]
**payment_method** | **string** |  | [optional] [default to undefined]
**order_number** | **string** |  | [optional] [default to undefined]
**delivery_type** | **string** |  | [optional] [default to undefined]
**delivery_address** | **string** |  | [optional] [default to undefined]
**store_location** | **string** |  | [optional] [default to undefined]
**coupon_code** | **string** |  | [optional] [default to undefined]
**guest_email** | **string** |  | [optional] [default to undefined]
**guest_phone** | **string** |  | [optional] [default to undefined]
**guest_name** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateOrderRequestOrders } from './api';

const instance: CreateOrderRequestOrders = {
    order_items,
    payment_method,
    order_number,
    delivery_type,
    delivery_address,
    store_location,
    coupon_code,
    guest_email,
    guest_phone,
    guest_name,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
