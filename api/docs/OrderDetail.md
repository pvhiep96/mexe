# OrderDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**order_number** | **string** |  | [optional] [default to undefined]
**status** | **string** |  | [optional] [default to undefined]
**subtotal** | **number** |  | [optional] [default to undefined]
**discount_amount** | **number** |  | [optional] [default to undefined]
**shipping_fee** | **number** |  | [optional] [default to undefined]
**tax_amount** | **number** |  | [optional] [default to undefined]
**total_amount** | **number** |  | [optional] [default to undefined]
**payment_method** | **string** |  | [optional] [default to undefined]
**payment_status** | **string** |  | [optional] [default to undefined]
**delivery_type** | **string** |  | [optional] [default to undefined]
**delivery_address** | **string** |  | [optional] [default to undefined]
**store_location** | **string** |  | [optional] [default to undefined]
**notes** | **string** |  | [optional] [default to undefined]
**coupon_code** | **string** |  | [optional] [default to undefined]
**coupon_discount** | **number** |  | [optional] [default to undefined]
**guest_email** | **string** |  | [optional] [default to undefined]
**guest_phone** | **string** |  | [optional] [default to undefined]
**guest_name** | **string** |  | [optional] [default to undefined]
**created_at** | **string** |  | [optional] [default to undefined]
**order_items** | [**Array&lt;OrderItem&gt;**](OrderItem.md) |  | [optional] [default to undefined]

## Example

```typescript
import { OrderDetail } from './api';

const instance: OrderDetail = {
    id,
    order_number,
    status,
    subtotal,
    discount_amount,
    shipping_fee,
    tax_amount,
    total_amount,
    payment_method,
    payment_status,
    delivery_type,
    delivery_address,
    store_location,
    notes,
    coupon_code,
    coupon_discount,
    guest_email,
    guest_phone,
    guest_name,
    created_at,
    order_items,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
